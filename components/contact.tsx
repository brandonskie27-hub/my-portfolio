import { ArrowUpRight } from "lucide-react"
import { CopyEmailButton } from "@/components/copy-email-button"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const EMAIL = "brandonskie.27@gmail.com"

const CONTACT_LINKS = [
  { label: EMAIL, href: `mailto:${EMAIL}` },
  { label: "GitHub", href: "https://github.com/brandonskie27-hub" },
]

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function Contact() {
  return (
    <section id="contact" className="w-full py-24 sm:py-32">
      <Reveal className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Open to OJT, full-time, and freelance work. The fastest way to
            reach me is email.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {CONTACT_LINKS.map((link) => {
              const isEmail = link.href.startsWith("mailto:")
              return (
                <div key={link.label} className="flex flex-wrap items-center gap-3">
                  <a
                    href={link.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className={cn(
                      "group inline-flex w-fit items-center gap-1 rounded-sm text-base text-foreground transition-colors hover:text-muted-foreground",
                      focusRing
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  {isEmail && <CopyEmailButton email={EMAIL} />}
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
