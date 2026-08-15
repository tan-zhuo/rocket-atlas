import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";

/**
 * 长文渲染器（服务端组件）。
 * 支持 GFM 表格/删除线 + KaTeX（$...$ 行内、$$...$$ 块级）。
 * 排版样式集中在 globals.css 的 `.prose-atlas` 中。
 */
export async function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn("prose-atlas", className)}>
      <MarkdownAsync
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ href, children: kids }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {kids}
              </a>
            );
          },
          table: ({ children: kids }) => (
            <div className="-mx-1 overflow-x-auto">
              <table>{kids}</table>
            </div>
          ),
        }}
      >
        {children}
      </MarkdownAsync>
    </div>
  );
}
