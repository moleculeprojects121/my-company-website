import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - My Website",
  description: "Get started with My Website.",
};

export default function GetStarted() {
  return (
    <main>
      <h1>Get Started</h1>
      <p>Follow the steps below to get started with this website.</p>
    </main>
  );
}
