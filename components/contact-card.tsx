import { Mail, ArrowUpRight } from "lucide-react";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:oscarojling@gmail.com",
    display: "oscarojling@gmail.com",
    icon: Mail,
  },
  {
    label: "Portfolio",
    href: "https://oscarojling.vercel.app",
    display: "oscarojling.vercel.app",
    icon: ArrowUpRight,
  },
];

export function ContactCard() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-border p-4">
      <p className="font-display text-sm tracking-wide text-primary mb-3">
        Get in touch
      </p>
      <ul className="flex flex-col gap-2.5">
        {CONTACT_LINKS.map(({ label, href, display, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              {display}
              <span className="sr-only"> ({label})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
