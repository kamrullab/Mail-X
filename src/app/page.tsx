import type { Metadata } from "next";
import Link from "next/link";
import { heroMessages, sidebarItems } from "./utils";
import { Inbox, Mail, Search, ShieldCheck } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import { LanguageSelector } from "@/components/language-selector";
import { getHomeBranding } from "./home-server-utils";
import { HomeAuthProvider } from "./home-auth";
import { HomeHeaderActions } from "./home-header-actions";
import { HomeHeroActions } from "./home-hero-actions";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getHomeBranding();
  return {
    title: branding.appName,
    icons: { icon: branding.hasCustomIcon ? "/api/branding/icon" : "/icon-96.png" },
  };
}

export default async function HomePage() {
  const branding = await getHomeBranding();
  const t = await getServerTranslator();

  return (
    <HomeAuthProvider>
    <div className="home-color-shell relative min-h-dvh overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#eef4ff_48%,#f7f0ff_100%)] text-neutral-900">
      <div aria-hidden="true" className="mail-x-orb absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div aria-hidden="true" className="mail-x-orb mail-x-orb-delayed absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl" />
      <header className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={t("home.homeLabel", { app: branding.appName })}
        >
          <span className="rounded-xl bg-white/80 p-1.5 shadow-sm ring-1 ring-white/80 transition-transform group-hover:-rotate-3 group-hover:scale-105">
            <img src={branding.hasCustomIcon ? "/api/branding/icon" : "/icon-96.png"} height={28} width={28} alt="" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            {branding.appName}
          </span>
        </Link>

        {/* <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-600 md:flex">
					{landingNavItems.map((item) => (
						<a key={item.href} href={item.href} className="transition-colors hover:text-neutral-950">
							{item.label}
						</a>
					))}
				</nav> */}

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSelector variant="text" />
          </div>
          <HomeHeaderActions />
        </div>
      </header>

      <main>
        <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-5 sm:px-6 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:px-8 lg:py-4">
          <div className="mail-x-rise flex max-w-2xl flex-col justify-center text-center lg:text-left">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-3 py-1.5 text-sm font-semibold text-blue-800 shadow-sm backdrop-blur lg:mx-0">
              <ShieldCheck className="h-4 w-4" />
              {t("home.badge")}
            </div>
            <h1 className="mx-auto max-w-[12ch] bg-gradient-to-br from-neutral-950 via-blue-800 to-violet-700 bg-clip-text text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-transparent sm:text-5xl lg:mx-0 lg:text-6xl">
              {t("home.headline")}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600 lg:mx-0 lg:text-[17px]">
              {t("home.subheadline")}
            </p>
            <HomeHeroActions />
          </div>

          <div className="mail-x-float relative h-[clamp(380px,64dvh,475px)] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 shadow-[0_28px_80px_-38px_rgba(37,59,160,0.65)] backdrop-blur-xl">
            <div className="grid h-full grid-cols-[156px_1fr] bg-white">
              <aside className="hidden flex-col gap-1.5 bg-[#f6f8fc] px-3 py-4 sm:flex">
                <div className="mb-3 flex items-center gap-3 px-3 text-neutral-700">
                  <Inbox className="h-5 w-5" />
                  <span className="font-semibold">{t("home.mockMail")}</span>
                </div>
                <div className="mb-2 flex h-11 w-fit items-center gap-2 rounded-2xl bg-blue-100 px-4 text-sm font-semibold text-blue-950 shadow-sm">
                  <Mail className="h-4 w-4" />
                  {t("navigation.compose")}
                </div>
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.labelKey}
                      className={`flex h-9 items-center justify-between rounded-r-full px-3 text-sm font-medium ${
                        item.active
                          ? "bg-blue-100 text-blue-950"
                          : "text-neutral-600"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {t(item.labelKey)}
                      </span>
                      {item.count && (
                        <span className="text-xs text-blue-800">
                          {item.count}
                        </span>
                      )}
                    </div>
                  );
                })}
              </aside>

              <div className="col-span-2 flex min-w-0 flex-col sm:col-span-1">
                <div className="flex h-14 items-center gap-3 bg-[#f6f8fc] px-4">
                  <div className="flex h-10 flex-1 items-center gap-3 rounded-full bg-[#eaf1fb] px-4 text-neutral-600">
                    <Search className="h-5 w-5" />
                    <span className="text-[15px]">{t("search.mail")}</span>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-tl-3xl bg-white">
                  <div className="flex h-13 items-center justify-between border-b border-neutral-200 px-5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-neutral-800">
                        {t("home.mockPriority")}
                      </h2>
                      <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                        18
                      </span>
                    </div>
                    <span className="hidden text-sm font-medium text-neutral-500 md:inline">
                      {t("home.mockUpdated")}
                    </span>
                  </div>
                  <div className="home-mail-preview divide-y divide-neutral-100">
                    {heroMessages.map((message) => (
                      <div
                        key={message.sender}
                        className="grid min-h-13 grid-cols-[24px_minmax(105px,160px)_1fr_auto] items-center gap-2.5 px-4 text-[13px] hover:bg-[#f2f6fc]"
                      >
                        <message.icon className="h-4 w-4 text-neutral-300" />
                        <span className="truncate font-semibold text-neutral-900">
                          {message.sender}
                        </span>
                        <span className="truncate text-neutral-600">
                          <span className="font-medium text-neutral-900">
                            {t(message.subjectKey)}
                          </span>
                          <span className="hidden text-neutral-500 md:inline">
                            {" "}
                            - {t(message.previewKey)}
                          </span>
                        </span>
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          {t(message.badgeKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="workflow" className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
					<div id="api" className="rounded-[1.75rem] bg-white p-6 shadow-sm shadow-neutral-200/50">
						<div className="mb-6 flex items-center justify-between gap-4">
							<div>
								<p className="text-sm font-semibold text-blue-700">Operational view</p>
								<h2 className="mt-1 text-2xl font-semibold tracking-tight">From DNS to delivery in one place.</h2>
							</div>
							<Clock3 className="hidden h-6 w-6 text-neutral-400 sm:block" />
						</div>
						<div className="grid gap-4 sm:grid-cols-3">
							{inboxStats.map((stat) => (
								<div key={stat.label} className="border-t border-neutral-200 pt-4">
									<p className="no-font-mono text-2xl font-semibold text-neutral-950">{stat.value}</p>
									<p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
								</div>
							))}
						</div>
					</div>

					<div id="domains" className="rounded-[1.75rem] bg-white p-6 shadow-sm shadow-neutral-200/50">
						<p className="text-sm font-semibold text-blue-700">Delivery signals</p>
						<div className="mt-5 space-y-4">
							{deliverySignals.map((signal) => (
								<div key={signal} className="flex items-center gap-3 text-sm font-medium text-neutral-700">
									<CheckCircle2 className="h-5 w-5 text-blue-600" />
									<span>{signal}</span>
								</div>
							))}
						</div>
					</div>
				</section> */}
      </main>
    </div>
    </HomeAuthProvider>
  );
}
