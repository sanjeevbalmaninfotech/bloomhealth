/**
 * Transform compiled react/jsx-runtime calls (_jsx/_jsxs) back into JSX.
 *
 * Usage:
 *   npx jscodeshift -t scripts/restore-jsx.js src --extensions=js --parser=babel
 */

module.exports = function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find import of react/jsx-runtime and capture local names for jsx/jsxs
  let jsxLocalName = null;
  let jsxsLocalName = null;

  root.find(j.ImportDeclaration, { source: { value: 'react/jsx-runtime' } }).forEach((path) => {
    const specifiers = path.value.specifiers || [];
    specifiers.forEach((spec) => {
      const importedName = spec.imported && spec.imported.name;
      const localName = spec.local && spec.local.name;
      if (importedName === 'jsx') jsxLocalName = localName;
      if (importedName === 'jsxs') jsxsLocalName = localName;
    });
  });

  if (!jsxLocalName && !jsxsLocalName) {
    return file.source; // nothing to do
  }

  const jsxFnNames = new Set([jsxLocalName, jsxsLocalName].filter(Boolean));

  function isStringLiteral(node) {
    return (
      (node.type === 'Literal' && typeof node.value === 'string') || node.type === 'StringLiteral'
    );
  }

  function isBooleanLiteral(node) {
    return (
      node.type === 'BooleanLiteral' || (node.type === 'Literal' && typeof node.value === 'boolean')
    );
  }

  function toJsxName(tagExpr) {
    if (!tagExpr) return j.jsxIdentifier('div');
    if (isStringLiteral(tagExpr)) {
      return j.jsxIdentifier(tagExpr.value);
    }
    if (tagExpr.type === 'Identifier') {
      return j.jsxIdentifier(tagExpr.name);
    }
    if (tagExpr.type === 'MemberExpression') {
      const objectName = toJsxName(tagExpr.object);
      const propertyName = j.jsxIdentifier(tagExpr.property.name || tagExpr.property.value);
      return j.jsxMemberExpression(objectName, propertyName);
    }
    // Fallback to identifier form
    return j.jsxIdentifier('Unknown');
  }

  function toAttributeName(keyNode) {
    if (!keyNode) return 'unknown';
    if (keyNode.type === 'Identifier') return keyNode.name;
    if (isStringLiteral(keyNode)) return keyNode.value;
    return 'unknown';
  }

  function wrapAsJsxAttrValue(node) {
    if (!node) return null;
    if (isStringLiteral(node)) return j.literal(node.value);
    if (node.type === 'Literal') return j.literal(node.value);
    // Everything else becomes an expression container
    return j.jsxExpressionContainer(node);
  }

  function convertChild(node) {
    if (!node) return [];
    if (isStringLiteral(node)) {
      return [j.jsxText(node.value)];
    }
    if (
      node.type === 'TemplateLiteral' ||
      node.type === 'Identifier' ||
      node.type === 'MemberExpression' ||
      node.type === 'CallExpression' ||
      node.type === 'BinaryExpression' ||
      node.type === 'LogicalExpression' ||
      node.type === 'ConditionalExpression' ||
      node.type === 'ArrowFunctionExpression' ||
      node.type === 'ObjectExpression' ||
      node.type === 'ArrayExpression' ||
      node.type === 'NumericLiteral' ||
      node.type === 'NullLiteral' ||
      node.type === 'BooleanLiteral' ||
      node.type === 'NewExpression'
    ) {
      // Special case: if it's a _jsx/_jsxs call, convert into JSX element directly
      if (
        node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        jsxFnNames.has(node.callee.name)
      ) {
        return [convertCallToJsxElement(node)];
      }
      return [j.jsxExpressionContainer(node)];
    }
    if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
      return [node];
    }
    return [j.jsxExpressionContainer(node)];
  }

  function attributesFromPropsObject(propsObject, extraKeyArg) {
    const attrs = [];
    if (propsObject && propsObject.type === 'ObjectExpression') {
      propsObject.properties.forEach((prop) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          const attrName = toAttributeName(prop.key);
          if (attrName === 'children') return; // handled separately
          const valueNode = prop.value;
          if (isBooleanLiteral(valueNode)) {
            if (
              valueNode.value === true ||
              (valueNode.type === 'BooleanLiteral' && valueNode.value === true)
            ) {
              attrs.push(j.jsxAttribute(j.jsxIdentifier(attrName), null));
            } else {
              attrs.push(
                j.jsxAttribute(j.jsxIdentifier(attrName), j.jsxExpressionContainer(valueNode)),
              );
            }
          } else if (valueNode.type === 'NullLiteral') {
            attrs.push(
              j.jsxAttribute(j.jsxIdentifier(attrName), j.jsxExpressionContainer(valueNode)),
            );
          } else if (isStringLiteral(valueNode) || valueNode.type === 'Literal') {
            attrs.push(j.jsxAttribute(j.jsxIdentifier(attrName), j.literal(valueNode.value)));
          } else {
            attrs.push(
              j.jsxAttribute(j.jsxIdentifier(attrName), j.jsxExpressionContainer(valueNode)),
            );
          }
        } else if (prop.type === 'SpreadElement' || prop.type === 'SpreadProperty') {
          attrs.push(j.jsxSpreadAttribute(prop.argument || prop.argument));
        }
      });
    }
    // Handle explicit key from third argument
    if (extraKeyArg) {
      const keyValue =
        isStringLiteral(extraKeyArg) || extraKeyArg.type === 'Literal'
          ? j.literal(extraKeyArg.value)
          : j.jsxExpressionContainer(extraKeyArg);
      attrs.push(j.jsxAttribute(j.jsxIdentifier('key'), keyValue));
    }
    return attrs;
  }

  function childrenFromProps(propsObject) {
    if (!propsObject || propsObject.type !== 'ObjectExpression') return [];
    const childrenProp = propsObject.properties.find(
      (p) =>
        (p.type === 'Property' || p.type === 'ObjectProperty') &&
        toAttributeName(p.key) === 'children',
    );
    if (!childrenProp) return [];
    const valueNode = childrenProp.value;
    if (valueNode.type === 'ArrayExpression') {
      // Flatten array children
      return valueNode.elements.flatMap((el) => convertChild(el));
    }
    if (
      valueNode.type === 'CallExpression' &&
      valueNode.callee.type === 'Identifier' &&
      jsxFnNames.has(valueNode.callee.name)
    ) {
      return [convertCallToJsxElement(valueNode)];
    }
    return convertChild(valueNode);
  }

  function convertCallToJsxElement(callExpr) {
    const [tag, props, maybeKey] = callExpr.arguments;
    const name = toJsxName(tag);
    const attrs = attributesFromPropsObject(props, maybeKey);
    const children = childrenFromProps(props);
    const selfClosing = children.length === 0;
    const opening = j.jsxOpeningElement(name, attrs, selfClosing);
    if (selfClosing) {
      return j.jsxElement(opening, null, []);
    }
    const closing = j.jsxClosingElement(name);
    return j.jsxElement(opening, closing, children);
  }

  // Replace _jsx/_jsxs calls with JSX
  root
    .find(j.CallExpression, {
      callee: { type: 'Identifier', name: jsxLocalName },
    })
    .replaceWith((p) => convertCallToJsxElement(p.value));

  root
    .find(j.CallExpression, {
      callee: { type: 'Identifier', name: jsxsLocalName },
    })
    .replaceWith((p) => convertCallToJsxElement(p.value));

  // Remove import from react/jsx-runtime entirely if present
  root.find(j.ImportDeclaration, { source: { value: 'react/jsx-runtime' } }).remove();

  return root.toSource({ quote: 'single' });
};
