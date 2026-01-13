import ProjectCard from "./ProjectCard";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
      <div className="h-5 w-2/3 rounded bg-white/10" />
      <div className="mt-3 h-4 w-full rounded bg-white/10" />
      <div className="mt-2 h-4 w-4/5 rounded bg-white/10" />
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-white/10" />
        <div className="h-5 w-20 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default function ProjectsGrid({ loading, err, repos, onOpen }) {
  if (err) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
        <div className="font-semibold">Couldn’t load GitHub repos</div>
        <div className="mt-1 text-red-200/80">{err}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} onOpen={onOpen} />
      ))}
    </div>
  );
}
