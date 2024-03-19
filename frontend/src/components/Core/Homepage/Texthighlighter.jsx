import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
      {"      "}
      {text}
    </span>
  );
};

export const Redhighlight = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#ff1f1f] via-[#fa6712] to-[#ffa6b9] text-transparent bg-clip-text font-bold">
      {"      "}
      {text}
    </span>
  );
};

export default HighlightText;
