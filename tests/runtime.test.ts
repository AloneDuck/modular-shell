import { describe, expect, it } from "vitest";
import { resolveRemote } from "../src/runtime/router.js";
import { isCompatible } from "../src/runtime/compatibility.js";
import { transition } from "../src/runtime/registry.js";
import type { RemoteModule } from "../src/contracts/manifest.js";

const remote = (name: string, route: `/${string}`): RemoteModule => ({ name, route, entry: "https://cdn.test/remote.js", integrity: "sha384-abcdefghijklmnop", version: "1.0.0", requiresHost: "^2.0.0", capabilities: [] });
describe("host runtime", () => {
  it("uses longest-prefix route ownership", () => expect(resolveRemote("/catalog/admin/users", [remote("catalog", "/catalog"), remote("admin", "/catalog/admin")])?.name).toBe("admin"));
  it("checks host major compatibility", () => { expect(isCompatible("^2.0.0", "2.8.1")).toBe(true); expect(isCompatible("^3.0.0", "2.8.1")).toBe(false); });
  it("keeps remote retry state explicit", () => expect(transition({ name: "catalog", state: "failed", attempts: 1 }, "retry")).toMatchObject({ state: "loading", attempts: 2 }));
});
