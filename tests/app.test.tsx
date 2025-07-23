import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App.js";

describe("host navigation", () => { it("moves route ownership without replacing global navigation", () => { render(<App />); fireEvent.click(screen.getByRole("button", { name: "checkout" })); expect(screen.getByRole("heading", { name: "checkout", level: 1 })).toBeInTheDocument(); expect(screen.getByRole("status")).toHaveTextContent("checkout is ready"); }); });
