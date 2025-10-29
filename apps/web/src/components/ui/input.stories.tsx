import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        placeholder="Enter username"
        className="border-error"
      />
      <p className="text-sm text-error">Username is required</p>
    </div>
  ),
};

export const Number: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="age">Age</Label>
      <Input id="age" type="number" placeholder="Enter your age" min="0" />
    </div>
  ),
};

export const Password: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Enter password" />
    </div>
  ),
};

