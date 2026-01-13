import { useEffect, useMemo, useState } from "react";

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr("");

      try {
        const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`GitHub API error (${res.status}).`);

        const data = await res.json();
        if (cancelled) return;

        const cleaned = (Array.isArray(data) ? data : [])
          .filter((r) => r && !r.archived)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            language: r.language,
            stargazers_count: r.stargazers_count ?? 0,
            fork: !!r.fork,
            pushed_at: r.pushed_at,
            default_branch: r.default_branch || "main",
          }));

        setRepos(cleaned);
      } catch (e) {
        setErr(e?.message || "Failed to load repos.");
        setRepos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const languages = useMemo(() => {
    const set = new Set();
    for (const r of repos) if (r.language) set.add(r.language);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [repos]);

  return { repos, loading, err, languages };
}
