import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import BottomNav from "@/campusly/BottomNav";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("opens Study Materials from the bottom navigation", () => {
  vi.stubGlobal("requestAnimationFrame", vi.fn());
  const setPage = vi.fn();

  render(<BottomNav page="dashboard" setPage={setPage} onMore={vi.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: "Study Materials" }));

  expect(setPage).toHaveBeenCalledWith("materials");
});

it("does not jump the Course page back to the top when it opens", () => {
  const raf = vi.fn();
  vi.stubGlobal("requestAnimationFrame", raf);
  const setPage = vi.fn();

  render(<BottomNav page="dashboard" setPage={setPage} onMore={vi.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: /Course/ }));

  expect(setPage).toHaveBeenCalledWith("courses");
  expect(raf).not.toHaveBeenCalled();
});
