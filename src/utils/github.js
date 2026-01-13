export function isRelative(url) {
  return url && !url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("#");
}

export function toRawUrl(username, repo, path) {
  const branch = repo?.default_branch || "main";
  return `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}/${path.replace(/^\.?\//, "")}`;
}

export function toBlobUrl(username, repo, path) {
  const branch = repo?.default_branch || "main";
  return `https://github.com/${username}/${repo.name}/blob/${branch}/${path.replace(/^\.?\//, "")}`;
}

export function decodeBase64Utf8(contentBase64 = "") {
  const base64 = contentBase64.replace(/\n/g, "");
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}
