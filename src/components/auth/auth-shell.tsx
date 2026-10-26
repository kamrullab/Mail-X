"use client";

import { useEffect, useState } from "react";
import { useBranding } from "@/components/branding-provider";
import { LanguageSelector } from "@/components/language-selector";
import type { AuthShellProps } from "./types";

export function AuthShell({
  icon: Icon,
  title,
  description,
  children,
  footer,
  steps,
}: AuthShellProps) {
  const branding = useBranding();
  const [iconUrl, setIconUrl] = useState(branding.iconUrl);
  const [iconFailed, setIconFailed] = useState(false);

  useEffect(() => {
    setIconUrl(branding.iconUrl);
    setIconFailed(false);
  }, [branding.iconUrl]);

  return (
    <div className="auth-color-shell relative flex min-h-dvh items-center overflow-hidden bg-[linear-gradient(135deg,#eef6ff_0%,#f6f0ff_52%,#edfbff_100%)] px-4 py-4 text-neutral-900 sm:px-6">
      <div aria-hidden="true" className="mail-x-orb absolute -left-24 top-8 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div aria-hidden="true" className="mail-x-orb mail-x-orb-delayed absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />
      <main className="mail-x-rise relative mx-auto grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_30px_90px_-45px_rgba(59,37,160,0.6)] backdrop-blur-xl lg:min-h-[520px] lg:grid-cols-[0.88fr_1.12fr]">
        <section className="auth-brand-panel relative flex flex-col overflow-hidden p-7 text-white sm:p-9 lg:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[36px] border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="flex items-center gap-2">
            <span className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white/95 p-1.5 shadow-lg shadow-blue-950/15">
              {iconFailed ? (
                <Icon className="h-7 w-7 text-blue-600" />
              ) : (
                <img
                  src={iconUrl}
                  onError={() => {
                    if (iconUrl !== "/icon-96.png") setIconUrl("/icon-96.png");
                    else setIconFailed(true);
                  }}
                  alt=""
                  className="h-7 w-7 object-contain"
                />
              )}
            </span>
            <span className="relative truncate text-base font-semibold text-white">
              {branding.appName}
            </span>
          </div>

          <div className="relative mt-7 lg:mt-auto lg:mb-auto">
            <div className="mb-4 h-1 w-12 rounded-full bg-cyan-300" />
            <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-md text-sm leading-6 text-blue-50/85 sm:text-base">
                {description}
              </p>
            )}
          </div>
        </section>

        <section className="flex min-w-0 flex-col justify-center p-7 sm:p-9 lg:p-10">
          {steps && (
            <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold">
              {steps.map((step, index) => (
                <span key={step.label} className="flex items-center gap-2">
                  <span
                    className={
                      step.active ? "text-blue-700" : "text-neutral-400"
                    }
                  >
                    {index + 1} {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="text-neutral-300">/</span>
                  )}
                </span>
              ))}
            </div>
          )}
          <div className="mx-auto w-full max-w-sm">{children}</div>
          <div className="mx-auto mt-6 w-full max-w-sm">
            <LanguageSelector />
          </div>
          {footer && (
            <div className="mx-auto mt-6 w-full max-w-sm text-sm font-medium text-blue-700">
              {footer}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
