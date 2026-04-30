import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Select from "./Select";

describe("Select", () => {
  it("renders default option and list options", () => {
    render(
      <Select
        customTitle="All Platforms"
        options={[
          { label: "PC", value: "1" },
          { label: "PlayStation", value: "2" },
        ]}
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("option", { name: "All Platforms" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "PC" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "PlayStation" }),
    ).toBeInTheDocument();
  });

  it("calls onChange with selected value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        options={[
          { label: "PC", value: "1" },
          { label: "PlayStation", value: "2" },
        ]}
        onChange={onChange}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "2");

    // Critical flow: component emits primitive selected value to parent filter state.
    expect(onChange).toHaveBeenCalledWith("2");
  });
});
