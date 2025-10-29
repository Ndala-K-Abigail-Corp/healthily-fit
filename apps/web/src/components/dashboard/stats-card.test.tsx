import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCard } from "./stats-card";
import { Flame } from "lucide-react";

describe("StatsCard", () => {
  it("should render title, value, and description", () => {
    render(
      <StatsCard
        icon={Flame}
        title="Workouts This Week"
        value="5"
        description="Keep it up!"
      />
    );

    expect(screen.getByText("Workouts This Week")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Keep it up!")).toBeInTheDocument();
  });

  it("should render with icon", () => {
    const { container } = render(
      <StatsCard
        icon={Flame}
        title="Test"
        value="10"
        description="Description"
      />
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should handle zero value", () => {
    render(
      <StatsCard
        icon={Flame}
        title="Workouts"
        value="0"
        description="Start today!"
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should handle long descriptions", () => {
    render(
      <StatsCard
        icon={Flame}
        title="Progress"
        value="100"
        description="You've made incredible progress this month and achieved all your goals!"
      />
    );

    expect(
      screen.getByText(/You've made incredible progress/i)
    ).toBeInTheDocument();
  });
});

