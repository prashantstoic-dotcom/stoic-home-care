import Link from "next/link";
import Image from "next/image";

/**
 * Brand lockup: the "S" mark + live text "Stoic Home Care".
 * Text is real HTML (not baked into a PNG) so the name is always correct and crawlable.
 */
export default function BrandLogo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const stoic = variant === "dark" ? "text-white" : "text-[var(--primary)]";
  const rest = variant === "dark" ? "text-[var(--teal)]" : "text-[var(--accent)]";

  return (
    <Link href="/" aria-label="Stoic Home Care – home" className={`shrink-0 inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/logo-icon.png"
        alt=""
        width={34}
        height={44}
        priority
        className="h-[40px] w-auto"
      />
      <span className="font-outfit text-[1.35rem] sm:text-[1.5rem] font-extrabold leading-none tracking-tight">
        <span className={stoic}>Stoic</span> <span className={rest}>Home Care</span>
      </span>
    </Link>
  );
}
