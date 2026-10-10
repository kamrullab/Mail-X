import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Mail-X",
		short_name: "Mail-X",
		description: "Your private email, anywhere.",
		start_url: "/inbox",
		display: "standalone",
		background_color: "#0f172a",
		theme_color: "#2563eb",
		icons: [
			{ src: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png" },
		],
	};
}
