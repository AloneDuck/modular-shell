import { useState } from "react";
import type { RemoteModule } from "./contracts/manifest.js";
import { resolveRemote } from "./runtime/router.js";
import "./styles.css";

const remotes: RemoteModule[] = [
  { name: "catalog", route: "/catalog", entry: "https://cdn.example.com/catalog.js", integrity: "sha384-abcdefghijklmnop", version: "3.4.1", requiresHost: "^2.0.0", capabilities: ["products.read"] },
  { name: "checkout", route: "/checkout", entry: "https://cdn.example.com/checkout.js", integrity: "sha384-qrstuvwxyzABCDEF", version: "5.2.0", requiresHost: "^2.0.0", capabilities: ["orders.write"] },
  { name: "accounts", route: "/accounts", entry: "https://cdn.example.com/accounts.js", integrity: "sha384-GHIJKLMNOPQRSTUV", version: "2.8.3", requiresHost: "^2.0.0", capabilities: ["profile.read"] }
];

export default function App() {
  const [pathname, setPathname] = useState("/catalog");
  const active = resolveRemote(pathname, remotes)!;
  return <div className="shell"><aside><p className="brand">Modular Shell</p><nav aria-label="Product modules">{remotes.map((remote) => <button key={remote.name} aria-current={active.name === remote.name ? "page" : undefined} onClick={() => setPathname(remote.route)}>{remote.name}</button>)}</nav><p className="health"><span aria-hidden="true"/>3 remotes healthy</p></aside><main><p className="eyebrow">Runtime manifest v1</p><h1>{active.name}</h1><p>Route ownership, compatibility, and failure isolation are verified before this module mounts.</p><dl><div><dt>Route</dt><dd>{active.route}</dd></div><div><dt>Version</dt><dd>{active.version}</dd></div><div><dt>Capability</dt><dd>{active.capabilities[0]}</dd></div></dl><section aria-labelledby="boundary"><h2 id="boundary">Isolation boundary</h2><p role="status">{active.name} is ready. Global navigation remains owned by the host.</p></section></main></div>;
}
