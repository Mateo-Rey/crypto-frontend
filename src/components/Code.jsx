import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
export function CodeParagraph({ text }) {
  // Define a regular expression to detect code snippets
  const codeRegex = /```([^`]+)```/g;

  // Split the response into an array of strings and code snippets
  const parts = text.split(codeRegex);
  const match = text.match(codeRegex);

  const replaced = text.replace(codeRegex, "--");
  const arrayParts = replaced.split("--");
  console.log(replaced);
  console.log(match);
  console.log(parts);

  // Define state to store the copied code
  const [copiedCode, setCopiedCode] = useState("");

  // Define a function to handle copying the code to the clipboard
  const handleCopyClick = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
  };

  // Map over the parts array and render either a p tag or a pre/code tag with a copy button
  const renderedParts = parts.map((part, index) => {
    if (index === 1) {
      // If the part is a code snippet, render a pre/code tag with a copy button
      const code = part;
      const python = part.includes('python')
      const javascript = part.includes('javascript');
      console.log(code);
      return (
        <div className="my-3">
          <div key={index} className="code-block">
          <SyntaxHighlighter language={javascript} style={a11yDark}>
            {code}
          </SyntaxHighlighter>
          </div>
          <button onClick={() => handleCopyClick(code)}>
            {copiedCode === code ? "Copied!" : "Copy"}
          </button>
        </div>
      );
    } else {
      // Otherwise, render a regular p tag
      return <p key={index}>{part}</p>;
    }
  });

  return <div>{renderedParts}</div>;
}
