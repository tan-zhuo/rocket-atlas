import { jsonLdGraph } from "@/lib/seo";

/**
 * 结构化数据注入点。
 *
 * 全站静态预渲染，所以这段 script 会直接落在 HTML 里，
 * 爬虫不需要执行 JS 就能读到。
 */
export function JsonLd({ nodes }: { nodes: (Record<string, unknown> | null)[] }) {
  const json = jsonLdGraph(nodes);
  return (
    <script
      type="application/ld+json"
      // 内容由本地数据生成，不含用户输入
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
