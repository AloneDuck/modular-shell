import { describe, expect, it } from "vitest";
import { validateManifest } from "../src/contracts/manifest.js";

const remote = { name: "catalog", route: "/catalog", entry: "https://cdn.example.com/catalog.js", integrity: "sha384-abcdefghijklmnop", version: "1.2.3", requiresHost: "^2.0.0", capabilities: ["products.read"] };
describe("runtime manifest v1", () => {
  it("accepts unique HTTPS remotes with integrity", () => expect(validateManifest({ version: "1", generatedAt: "2026-08-30T10:00:00Z", remotes: [remote] }).ok).toBe(true));
  it("rejects duplicate routes and insecure entries", () => { const result = validateManifest({ version: "1", generatedAt: "2026-08-30T10:00:00Z", remotes: [remote, { ...remote, name: "checkout", entry: "http://unsafe.test/remote.js" }] }); expect(result.ok).toBe(false); if (!result.ok) expect(result.issues).toEqual(expect.arrayContaining([expect.stringContaining("duplicate route"), expect.stringContaining("HTTPS")])); });
});
