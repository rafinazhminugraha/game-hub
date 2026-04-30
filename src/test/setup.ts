import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.IntersectionObserver) {
  // GameGrid uses IntersectionObserver for infinite scrolling.
  globalThis.IntersectionObserver =
    MockIntersectionObserver as typeof IntersectionObserver;
}

afterEach(() => {
  cleanup();
});
