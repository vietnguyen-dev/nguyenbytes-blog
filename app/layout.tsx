import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nguyen Bytes by Viet Nguyen | Developer Blog and Portfolio",
  description:
    "Explore my projects, read programming articles, and learn more about my journey as a developer.",
  openGraph: {
    type: "website",
    url: "https://nguyenbytes.com/",
    title: "Nguyen Bytes - Developer Blog & Portfolio",
    description:
      "Explore my projects, read programming articles, and learn more about my journey as a developer.",
    images: [{ url: "https://nguyenbytes.com/software-engineer.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Bytes by Viet - Developer Blog & Portfolio",
    description:
      "Explore my projects, read programming articles, and learn more about my journey as a developer.",
    images: ["https://nguyenbytes.com/twitter-image.jpg"],
  },
  keywords: [
    "developer blog",
    "portfolio",
    "programming",
    "web development",
    "software engineering",
  ],
  authors: [{ name: "Nguyen Bytes" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://nguyenbytes.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
