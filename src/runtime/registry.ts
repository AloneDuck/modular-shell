export type RemoteState = "idle" | "loading" | "ready" | "failed";
export interface RegistryEntry { name: string; state: RemoteState; attempts: number; message?: string }

export function transition(entry: RegistryEntry, event: "load" | "resolve" | "reject" | "retry"): RegistryEntry {
  if (event === "load") return { ...entry, state: "loading" };
  if (event === "resolve") return { ...entry, state: "ready", message: undefined };
  if (event === "reject") return { ...entry, state: "failed", message: "remote unavailable" };
  return { ...entry, state: "loading", attempts: entry.attempts + 1, message: undefined };
}
