import type { Meta, StoryObj } from "@storybook/react";
import { StatsCard } from "./stats-card";
import { Flame, Target, Activity, TrendingUp } from "lucide-react";

const meta: Meta<typeof StatsCard> = {
  title: "Dashboard/StatsCard",
  component: StatsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const WorkoutsThisWeek: Story = {
  args: {
    icon: Flame,
    title: "Workouts This Week",
    value: "5",
    description: "Keep up the momentum!",
  },
};

export const CurrentWeight: Story = {
  args: {
    icon: Target,
    title: "Current Weight",
    value: "75 kg",
    description: "Goal: 70 kg",
  },
};

export const BMI: Story = {
  args: {
    icon: Activity,
    title: "BMI",
    value: "24.2",
    description: "Normal weight",
  },
};

export const FitnessGoal: Story = {
  args: {
    icon: TrendingUp,
    title: "Fitness Goal",
    value: "Weight Loss",
    description: "Vegetarian",
  },
};

export const ZeroValue: Story = {
  args: {
    icon: Flame,
    title: "Workouts This Week",
    value: "0",
    description: "Start your first workout!",
  },
};

