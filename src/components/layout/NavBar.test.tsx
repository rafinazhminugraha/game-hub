import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import NavBar from "./NavBar";
import { useUiStore } from "../../lib/useUiStore";

function renderNavBar(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/games/:id" element={<NavBar />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("NavBar", () => {
  beforeEach(() => {
    localStorage.clear();
    // Keep store deterministic between tests.
    useUiStore.setState({ isGenreOpen: false });
  });

  it("shows search input on home route", () => {
    renderNavBar("/");

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Home" }),
    ).not.toBeInTheDocument();
  });

  it("shows Home button on game details route", () => {
    renderNavBar("/games/42");

    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  it("navigates back to home route when Home is clicked", async () => {
    const user = userEvent.setup();
    renderNavBar("/games/42");

    await user.click(screen.getByRole("button", { name: "Home" }));

    // Critical flow: route changes to "/", so Navbar swaps to search mode.
    expect(await screen.findByPlaceholderText("Search")).toBeInTheDocument();
  });
});
