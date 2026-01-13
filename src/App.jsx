import { useMemo, useState } from "react";
import RepoControls from "./components/RepoControls";
import ProjectsGrid from "./components/ProjectsGrid";
import RepoModal from "./components/RepoModal";
import { useGithubRepos } from "./hooks/useGithubRepos";
import { useReadme } from "./hooks/useReadme";

const DEFAULT_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "huzefa897";

export default function App() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);

  const { repos, loading, err, languages } = useGithubRepos(username);
  const { selectedRepo, readme, readmeLoading, readmeErr, openRepo, closeRepo } = useReadme(username);

  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("recent");
  const [hideForks, setHideForks] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = repos.slice();

    if (hideForks) list = list.filter((r) => !r.fork);

    if (language !== "All") {
      list = list.filter((r) => (r.language || "Unknown") === language);
    }

    if (q) {
      list = list.filter((r) => {
        const hay = `${r.name} ${r.description || ""} ${r.language || ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (sort === "recent") list.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    if (sort === "stars") list.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [repos, query, language, sort, hideForks]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white">
      <div className="pointer-events-none fixed inset-x-0 top-[-120px] h-[280px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_60%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {username}
              <span className="text-white/60"> / </span>
              <span className="text-white/90">Projects</span>
            </h1>
            <p className="max-w-2xl text-sm text-white/70">
              A simple portfolio that pulls my public GitHub repositories. Search, filter, and explore.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
              >
                GitHub Profile →
              </a>

              <a
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                href="#projects"
              >
                View Projects ↓
              </a>
            </div>
          </div>

          <div className="w-full md:w-[320px]">
            <label className="text-xs text-white/60">GitHub username</label>
            <div className="mt-2 flex gap-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                placeholder="e.g. huzefa897"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
              />
            </div>
            <p className="mt-2 text-xs text-white/45">
              Tip: set <code className="rounded bg-white/10 px-1">VITE_GITHUB_USERNAME</code> in <code className="rounded bg-white/10 px-1">.env</code>.
            </p>
          </div>
        </header>

        {/* Controls */}
        <RepoControls
          query={query} setQuery={setQuery}
          language={language} setLanguage={setLanguage}
          sort={sort} setSort={setSort}
          hideForks={hideForks} setHideForks={setHideForks}
          languages={languages}
          count={filtered.length}
        />

        {/* Projects */}
        <section id="projects" className="mt-8">
          <ProjectsGrid loading={loading} err={err} repos={filtered} onOpen={openRepo} />
          {!loading && !err && filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              No projects match your filters.
            </div>
          ) : null}
        </section>

        {/* Modal */}
        <RepoModal
          username={username}
          repo={selectedRepo}
          readme={readme}
          loading={readmeLoading}
          error={readmeErr}
          onClose={closeRepo}
        />

        {/* Footer */}
        <footer className="mt-14 border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>Built with React + Tailwind. Pulls from GitHub public API.</div>
            <div className="flex gap-4">
              <a className="hover:text-white" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="hover:text-white" href="#projects">Projects</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
