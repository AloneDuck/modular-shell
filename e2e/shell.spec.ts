import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("switches isolated modules through host navigation", async ({ page }) => { await page.goto("/"); await page.getByRole("button", { name: "checkout" }).click(); await expect(page.getByRole("heading", { level: 1 })).toHaveText("checkout"); await expect(page.getByRole("status")).toContainText("Global navigation remains owned by the host"); });
test("shell has no automatically detectable accessibility violations", async ({ page }) => { await page.goto("/"); expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]); });
