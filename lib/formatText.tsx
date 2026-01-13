import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Компонент для красивого отображения markdown текста AI описания
 */
export function formatAiDescription(text: string): JSX.Element {
  if (!text) return <p className="text-muted-foreground">{text}</p>;

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Стилизация заголовков
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground" {...props} />
          ),
          // Стилизация параграфов
          p: ({ node, ...props }) => (
            <p className="leading-relaxed mb-4 text-muted-foreground" {...props} />
          ),
          // Стилизация списков
          ul: ({ node, ...props }) => (
            <ul className="list-none space-y-2 mb-4 ml-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal space-y-2 mb-4 ml-6" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-1.5 flex-shrink-0">•</span>
              <span className="flex-1" {...props} />
            </li>
          ),
          // Стилизация жирного текста
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          // Стилизация курсива
          em: ({ node, ...props }) => (
            <em className="italic text-muted-foreground" {...props} />
          ),
          // Стилизация ссылок
          a: ({ node, ...props }) => (
            <a
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // Стилизация кода
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
                {...props}
              />
            ) : (
              <code
                className="block bg-muted p-3 rounded-lg text-sm font-mono text-foreground overflow-x-auto mb-4"
                {...props}
              />
            ),
          // Стилизация блоков кода
          pre: ({ node, ...props }) => (
            <pre className="bg-muted p-3 rounded-lg overflow-x-auto mb-4" {...props} />
          ),
          // Стилизация горизонтальной линии
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-border" {...props} />
          ),
          // Стилизация блоков цитат
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
              {...props}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
