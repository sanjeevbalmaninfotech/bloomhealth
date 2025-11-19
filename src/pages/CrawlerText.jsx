import React, { useState, useEffect } from "react";

const CrawlerText = () => {
  const lines = [
    "Coming Soon to Milton Keynes.",
    "Awaiting CQC Registration."
  ];

  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(lines[lineIndex].slice(0, charIndex + 1));
      setCharIndex(prev => prev + 1);
    }, 55);

    if (charIndex === lines[lineIndex].length) {
      clearInterval(interval);
      setTimeout(() => {
        setCharIndex(0);
        setText("");
        setLineIndex(prev => (prev + 1) % lines.length);
      }, 800);
    }

    return () => clearInterval(interval);
  }, [charIndex, lineIndex]);

  return (
    <div className="w-full text-center py-6">
      <span className="text-blue-500 font-semibold text-2xl sm:text-3xl tracking-wide">
        {text}
      </span>

      {/* Cursor */}
      <span className="inline-block w-[3px] h-7 bg-blue-500 ml-1 animate-pulse"></span>
    </div>
  );
};

export default CrawlerText;
