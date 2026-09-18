import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TypingTestTrigger } from "@/components/TypingTest/TypingTestTrigger";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
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
