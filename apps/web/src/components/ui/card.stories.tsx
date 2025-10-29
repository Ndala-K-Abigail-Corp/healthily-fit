import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A card without a description.</p>
      </CardContent>
    </Card>
  ),
};

export const WithBorder: Story = {
  render: () => (
    <Card className="w-[350px] border-2 border-primary">
      <CardHeader>
        <CardTitle>Highlighted Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card has a colored border.</p>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A card with content only, no header.</p>
      </CardContent>
    </Card>
  ),
};

