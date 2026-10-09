"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, CheckCircle, MessageCircle, Loader2 } from "lucide-react";

const WA_NUMBER = "917668232867";
const OPEN_DELAY_MS = 5000; // open once, 5 seconds after first page view
const SUPPRESS_DAYS = 7; // after the user closes it, stay quiet for a week
const CLOSED_KEY = "stoic_popup_closed_at"; // localStorage – survives tab/browser restarts
const SHOWN_KEY = "stoic_popup_shown"; // sessionStorage – never opens twice in one visit

const REQUIREMENTS = ["12-Hour Attendant", "24-Hour Attendant", "Home Nurse"] as const;
const SKIP_ROUTES = ["/admin", "/thank-you"];

function safeGet(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null; // private mode / blocked storage
  }
}
function safeSet(store: "local" | "session", key: string, value: string) {
  try {
    (store === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    /* ignore */
  }
}

function recentlyClosed(): boolean {
  const at = Number(safeGet("local", CLOSED_KEY));
  return !!at && Date.now() - at < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
}

export default function EnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [requirement, setRequirement] = useState<string>(REQUIREMENTS[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [doneName, setDoneName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const skip = SKIP_ROUTES.some((r) => pathname?.startsWith(r));

  // Remember the dismissal so the popup never nags again (no re-trigger timers anywhere).
  const close = useCallback(() => {
    setOpen(false);
    safeSet("local", CLOSED_KEY, String(Date.now()));
  }, []);

  // Auto-open: one timer, one time, only if not recently dismissed / not already shown.
  useEffect(() => {
    if (skip) return;
    if (recentlyClosed() || safeGet("session", SHOWN_KEY)) return;

    const t = window.setTimeout(() => {
      if (recentlyClosed() || safeGet("session", SHOWN_KEY)) return;
      safeSet("session", SHOWN_KEY, "1");
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [skip]);

  // Optional manual trigger for other buttons: window.openEnquiryPopup()
  useEffect(() => {
    (window as any).openEnquiryPopup = () => setOpen(true);
    return () => {
      delete (window as any).openEnquiryPopup;
    };
  }, []);

  // ESC to close + lock page scroll + focus first field while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const f = window.setTimeout(() => nameRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(f);
    };
  }, [open, close]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();

    if (!name) return setError("Please enter your name.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid 10-digit phone number.");

    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/popup-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service_interest: requirement }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        safeSet("local", CLOSED_KEY, String(Date.now())); // submitted → don't show again
        setDoneName(name);
        setStatus("done");
      } else {
        setError(data.message || "Something went wrong. Please call us directly.");
        setStatus("idle");
      }
    } catch {
      setError("Network problem. Please try again or call us directly.");
      setStatus("idle");
    }
  };

  if (!open) return null;

  const waText = encodeURIComponent(
    `Hello Stoic Home Care, I need a ${requirement} at home. Please share rates and staff availability.`
  );

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/50"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        className="relative w-full max-w-[420px] max-h-[92dvh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {status === "done" ? (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto text-[var(--wa)]" size={48} />
            <h2 className="mt-3 text-xl font-bold text-[var(--dark)]">Thank you, {doneName}!</h2>
            <p className="mt-2 text-[var(--muted)]">
              We have your details. Our team will call you shortly with rates and staff availability.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--wa)] px-4 py-3 font-bold text-white"
            >
              <MessageCircle size={18} /> Message us on WhatsApp too
            </a>
            <button type="button" onClick={() => setOpen(false)} className="mt-3 text-sm text-[var(--muted)] underline">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="enquiry-popup-title" className="pr-8 text-xl font-bold leading-snug text-[var(--dark)]">
              Need a patient attendant or nurse at home?
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Share your number — we will call back with today&apos;s rates &amp; available staff.
            </p>

            <label htmlFor="popup-name" className="mt-4 block text-sm font-semibold text-[var(--dark)]">
              Your Name
            </label>
            <input
              ref={nameRef}
              id="popup-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={150}
              required
              placeholder="e.g. Rahul Sharma"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
            />

            <label htmlFor="popup-phone" className="mt-3 block text-sm font-semibold text-[var(--dark)]">
              Phone Number
            </label>
            <input
              id="popup-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={15}
              required
              placeholder="10-digit mobile number"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
            />

            <fieldset className="mt-4">
              <legend className="text-sm font-semibold text-[var(--dark)]">Requirement</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {REQUIREMENTS.map((r) => (
                  <label key={r} className="cursor-pointer">
                    <input
                      type="radio"
                      name="requirement"
                      value={r}
                      checked={requirement === r}
                      onChange={() => setRequirement(r)}
                      className="peer sr-only"
                    />
                    <span className="flex h-full min-h-[52px] items-center justify-center rounded-xl border border-gray-300 px-1.5 py-2 text-center text-[13px] font-semibold leading-tight text-[var(--dark)] peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)]/10 peer-checked:text-[var(--primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)]">
                      {r}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && (
              <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3.5 text-base font-bold text-white disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending…
                </>
              ) : (
                "Get Instant Rates & Staff Availability"
              )}
            </button>
            <p className="mt-2 text-center text-xs text-gray-500">No spam. We only call about your enquiry.</p>
          </form>
        )}
      </div>
    </div>
  );
}
