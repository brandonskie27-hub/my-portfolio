import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TypingTestTrigger } from "@/components/TypingTest/TypingTestTrigger";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Tells search engines this site is about one person, and links it to their
// other profiles. Only facts already shown on the site or CV belong here.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Brandon Dylan Narito",
      url: siteUrl,
      jobTitle: "Full-stack Developer",
      description:
        "Computer Science student building full-stack web and mobile apps with React, TypeScript and Laravel.",
      sameAs: ["https://github.com/brandonskie27-hub"],
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "PHINMA UPANG College of Urdaneta",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Pangasinan",
        addressCountry: "PH",
      },
      knowsAbout: [
        "React",
        "TypeScript",
        "Next.js",
        "Laravel",
        "React Native",
        "Supabase",
        "PostgreSQL",
        "MySQL",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Brandon Dylan Narito",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <TypingTestTrigger />
      <Experience />
      <Contact />
    </main>
  );
}
