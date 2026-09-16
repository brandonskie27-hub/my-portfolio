import { Reveal } from "@/components/reveal"

export function About() {
  return (
    <section id="about" className="w-full py-24 sm:py-32">
      <Reveal className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            My work spans both engineering and design, but the layer I
            gravitate toward most is the frontend, where code and craft
            meet. I like reasoning through a problem on the backend, then
            spending the extra care making the interface feel considered:
            consistent spacing, states that don&apos;t break when something
            goes wrong, motion that has a reason to be there.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
