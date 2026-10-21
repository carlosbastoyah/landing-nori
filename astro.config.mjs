// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://wsnori.com',
	trailingSlash: 'always',
	integrations: [sitemap()],
	env: {
		schema: {
			/** Google Tag Manager container; GA4 and other tags are configured inside GTM. Set it empty to disable. */
			PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', default: 'GTM-5T74VC56' }),
			/** Google Search Console HTML-tag verification token (only the `content` value). */
			PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: 'client', access: 'public', optional: true }),
		},
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'DM Sans',
			cssVariable: '--font-dm-sans',
			weights: ['400 700'],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Kodchasan',
			cssVariable: '--font-kodchasan',
			weights: [400, 500, 600, 700],
			subsets: ['latin'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		},
	],
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
