import { FileDown } from "lucide-react";

const CV_LINKS = [
  {
    label: "CV (Swedish)",
    href: "/Oscar_Ojling_CV_SV.pdf",
  },
  {
    label: "CV (English)",
    href: "/Oscar_Ojling_CV_EN.pdf",
  },
];

export function CVCard() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-border p-4">
      <p className="font-display text-sm tracking-wide text-primary mb-3">
        Download CV
      </p>
      <ul className="flex flex-col gap-2.5">
        {CV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <FileDown className="size-3.5 shrink-0" aria-hidden="true" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
