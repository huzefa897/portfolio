export default function RepoControls({
  query, setQuery,
  language, setLanguage,
  sort, setSort,
  hideForks, setHideForks,
  languages,
  count,
}) {
  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs text-white/60">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, language..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
          />
        </div>

        <div>
          <label className="text-xs text-white/60">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
          >
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/60">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
          >
            <option value="recent">Most recent</option>
            <option value="stars">Most stars</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={hideForks}
            onChange={(e) => setHideForks(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-black/40"
          />
          Hide forks
        </label>

        <div className="text-sm text-white/60">
          Showing <span className="text-white">{count}</span> repos
        </div>
      </div>
    </section>
  );
}
