"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { useHomeAuth } from "./home-auth";

export function HomeHeroActions() {
	const { t } = useLanguage();
	const hasUser = !!useHomeAuth();

	return (
		<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
			<Button size="lg" asChild className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.02]">
				<Link href={hasUser ? "/inbox" : "/setup"}>
					{hasUser ? t("home.openDashboard") : t("home.createAccount")}
					<ArrowRight className="h-4 w-4" />
				</Link>
			</Button>
			<Button size="lg" variant="outline" asChild className="rounded-full border-white/80 bg-white/75 px-6 shadow-sm backdrop-blur transition-transform hover:scale-[1.02]">
				<Link href={hasUser ? "/inbox" : "/login"}>
					{hasUser ? t("home.viewInbox") : t("home.logIn")}
				</Link>
			</Button>
		</div>
	);
}
