import { useState } from "react";
import { decodeBase64Utf8 } from "../utils/github";

export function useReadme(username) {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readme, setReadme] = useState("");
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeErr, setReadmeErr] = useState("");

  async function openRepo(repo) {
    setSelectedRepo(repo);
    setReadme("");
    setReadmeErr("");
    setReadmeLoading(true);

    try {
      const url = `https://api.github.com/repos/${username}/${repo.name}/readme`;
      const res = await fetch(url, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (res.status === 404) {
        setReadmeErr("No README.md found for this repository.");
        return;
      }
      if (!res.ok) throw new Error(`README fetch failed (${res.status})`);

      const data = await res.json();
      setReadme(decodeBase64Utf8(data.content || ""));
    } catch (e) {
      setReadmeErr(e?.message || "Could not load README.");
    } finally {
      setReadmeLoading(false);
    }
  }

  function closeRepo() {
    setSelectedRepo(null);
  }

  return {
    selectedRepo,
    readme,
    readmeLoading,
    readmeErr,
    openRepo,
    closeRepo,
  };
}
