import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Badge from "./Badge";
import { isRelative, toBlobUrl, toRawUrl } from "../utils/github";

export default function RepoModal({
  username,
  repo,
  readme,
  loading,
  error,
  onClose,
}) {
  if (!repo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <h2 className="text-xl font-semibold text-white">{repo.name}</h2>
            <p className="mt-1 text-sm text-white/70">{repo.description || "No description yet."}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {repo.language ? <Badge>{repo.language}</Badge> : <Badge>Unknown</Badge>}
              <Badge>⭐ {repo.stargazers_count}</Badge>
              <Badge>Branch {repo.default_branch}</Badge>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Close ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-5">
          {loading ? (
            <div className="text-sm text-white/70">Loading README…</div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : (
            <div style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="mt-2 mb-3 text-xl font-semibold text-white">{children}</h1>,
                  h2: ({ children }) => <h2 className="mt-6 mb-2 text-lg font-semibold text-white">{children}</h2>,
                  h3: ({ children }) => <h3 className="mt-5 mb-2 text-base font-semibold text-white">{children}</h3>,
                  p: ({ children }) => <p className="my-3 text-sm leading-6 text-white/80">{children}</p>,
                  ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-5 text-sm text-white/80">{children}</ul>,
                  ol: ({ children }) => <ol className="my-3 list-decimal space-y-1 pl-5 text-sm text-white/80">{children}</ol>,
                  li: ({ children }) => <li className="leading-6">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                  hr: () => <hr className="my-5 border-white/10" />,
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 border-l-2 border-white/10 pl-4 text-sm italic text-white/70">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src = "", alt = "" }) => {
                    const fixedSrc = isRelative(src) ? toRawUrl(username, repo, src) : src;
                    return <img src={fixedSrc} alt={alt} className="my-4 rounded-xl border border-white/10" loading="lazy" />;
                  },
                  a: ({ href = "", children }) => {
                    const fixedHref = isRelative(href) ? toBlobUrl(username, repo, href) : href;
                    return (
                      <a href={fixedHref} target="_blank" rel="noreferrer" className="text-white underline underline-offset-4 opacity-90 hover:opacity-100">
                        {children}
                      </a>
                    );
                  },
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match?.[1];

                    if (inline) {
                      return (
                        <code
                          className="rounded bg-white/10 px-1 py-0.5 text-white"
                          style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <div className="my-4">
                        <SyntaxHighlighter
                          language={language || "text"}
                          PreTag="div"
                          useInlineStyles={false}
                          className="codeBlock"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                }}
              >
                {readme}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
