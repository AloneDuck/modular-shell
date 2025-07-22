import type { RemoteModule } from "../contracts/manifest.js";

export function resolveRemote(pathname: string, remotes: RemoteModule[]): RemoteModule | undefined {
  const normalized = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return [...remotes].sort((a, b) => b.route.length - a.route.length).find((remote) => normalized === remote.route || normalized.startsWith(`${remote.route}/`));
}
