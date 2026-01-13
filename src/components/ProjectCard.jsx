import Badge from "./Badge";
import { formatDate } from "../utils/format";

export default function ProjectCard({ repo, onOpen }) {
  return (
    <button
      onClick={() => onOpen(repo)}
      className="group text-left w-full rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-white">{repo.name}</h3>
          <p className="mt-1 text-sm text-white/70 line-clamp-2">
            {repo.description || "No description yet."}
          </p>
        </div>

        <div className="shrink-0 text-xs text-white/60">
          <div className="rounded-full border border-white/10 bg-black/30 px-2 py-1">
            ⭐ {repo.stargazers_count}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {repo.language ? <Badge>{repo.language}</Badge> : <Badge>Unknown</Badge>}
        <Badge>Updated {formatDate(repo.pushed_at)}</Badge>
        {repo.fork ? <Badge>Fork</Badge> : null}
      </div>

      <div className="mt-4 text-sm text-white/70">
        <span className="group-hover:text-white transition">View details →</span>
      </div>
    </button>
  );
}
