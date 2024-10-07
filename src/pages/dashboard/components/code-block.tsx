import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import useLayout from "../../../hooks/use-layout.ts/use-layout";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const { useDarkTheme } = useLayout();

  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={useDarkTheme ? xonokai : duotoneLight}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
