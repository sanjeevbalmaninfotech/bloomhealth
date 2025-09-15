/**
 * Wrap numeric JSX attribute values in expression containers.
 * Converts: <img width=600 /> -> <img width={600} />
 *
 * Usage:
 *   npx jscodeshift -t scripts/fix-jsx-attr-numbers.cjs src --extensions=js --parser=babel
 */

module.exports = function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.JSXAttribute).forEach((path) => {
    const attr = path.value;
    const val = attr.value;
    if (!val) return;
    // Literal numbers as direct values
    if (val.type === 'Literal' && typeof val.value === 'number') {
      attr.value = j.jsxExpressionContainer(j.literal(val.value));
    }
    // Babel AST sometimes uses NumericLiteral
    if (val.type === 'NumericLiteral') {
      attr.value = j.jsxExpressionContainer(j.numericLiteral(val.value));
    }
  });

  return root.toSource({ quote: 'single' });
};
