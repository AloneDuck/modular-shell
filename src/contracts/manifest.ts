export const manifestVersion = "1" as const;
export interface RemoteModule { name: string; route: `/${string}`; entry: `https://${string}`; integrity: `sha384-${string}`; version: string; requiresHost: string; capabilities: string[] }
export interface RuntimeManifest { version: typeof manifestVersion; generatedAt: string; remotes: RemoteModule[] }

export function validateManifest(value: unknown): { ok: true; manifest: RuntimeManifest } | { ok: false; issues: string[] } {
  if (!value || typeof value !== "object") return { ok: false, issues: ["manifest must be an object"] };
  const candidate = value as Partial<RuntimeManifest>;
  const issues: string[] = [];
  if (candidate.version !== manifestVersion) issues.push("unsupported manifest version");
  if (!candidate.generatedAt || Number.isNaN(Date.parse(candidate.generatedAt))) issues.push("generatedAt must be ISO-8601");
  if (!Array.isArray(candidate.remotes) || candidate.remotes.length === 0) issues.push("at least one remote is required");
  const names = new Set<string>(); const routes = new Set<string>();
  for (const remote of candidate.remotes ?? []) {
    if (!/^[a-z][a-z0-9-]+$/.test(remote.name) || names.has(remote.name)) issues.push(`invalid or duplicate remote name: ${remote.name}`); else names.add(remote.name);
    if (!/^\/[a-z0-9-]+$/.test(remote.route) || routes.has(remote.route)) issues.push(`invalid or duplicate route: ${remote.route}`); else routes.add(remote.route);
    if (!remote.entry.startsWith("https://")) issues.push(`${remote.name} must use HTTPS`);
    if (!/^sha384-[A-Za-z0-9+/=]{16,}$/.test(remote.integrity)) issues.push(`${remote.name} requires sha384 integrity`);
    if (!/^\d+\.\d+\.\d+$/.test(remote.version)) issues.push(`${remote.name} requires a semantic version`);
  }
  return issues.length ? { ok: false, issues } : { ok: true, manifest: candidate as RuntimeManifest };
}
