import { DESKTOP_DOWNLOADS_URL } from '../data/content';

/**
 * Wires the desktop installer buttons of any page:
 * - `[data-download="windows/x86_64"]` downloads that platform; `"auto"` resolves to the visitor's OS.
 * - `[data-download-label]` inside an auto button receives "Descargar para Windows/Mac".
 * - `[data-release-info="<platform|auto>"]` shows version, date and size.
 * - `[data-download-error="<platform|auto>"]` is revealed when the installer can't be obtained.
 * - `[data-platform-card="windows|mac|web"]` gets `is-recommended` for the visitor's OS.
 * - `[data-hide-on-platform="<platform>"]` is hidden when it matches the visitor's OS.
 */

type Platform = 'windows/x86_64' | 'darwin/aarch64';

interface Release {
	url: string;
	version: string;
	pub_date: string;
	notes?: string;
	size_bytes?: number;
	fetchedAt: number;
}

const PLATFORM_NAMES: Record<Platform, string> = { 'windows/x86_64': 'Windows', 'darwin/aarch64': 'Mac' };
const PLATFORM_CARDS: Record<Platform, string> = { 'windows/x86_64': 'windows', 'darwin/aarch64': 'mac' };

// The backend answers with a presigned S3 link that expires after an hour, so a fresh one is
// requested whenever the cached one is close to expiring.
const MAX_AGE_MS = 45 * 60 * 1000;
const releases = new Map<Platform, Promise<Release>>();

function fetchRelease(platform: Platform): Promise<Release> {
	const cached = releases.get(platform);
	if (cached) return cached;
	const request = fetch(`${DESKTOP_DOWNLOADS_URL}/${platform}`, { cache: 'no-store' }).then(async (response) => {
		if (response.status !== 200) throw Object.assign(new Error(`HTTP ${response.status}`), { status: response.status });
		return { ...(await response.json()), fetchedAt: Date.now() } as Release;
	});
	releases.set(platform, request);
	request.then(
		(release) => setTimeout(() => releases.delete(platform), MAX_AGE_MS - (Date.now() - release.fetchedAt)),
		() => releases.delete(platform),
	);
	return request;
}

/** Phones and tablets, Linux and unknown systems get `null`: they are pointed to the web app. */
export function detectPlatform(): Platform | null {
	const nav = navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } };
	if (nav.userAgentData?.mobile) return null;
	const source = `${nav.userAgentData?.platform ?? ''} ${navigator.userAgent}`;
	if (/android|iphone|ipad|ipod/i.test(source)) return null;
	// iPadOS reports itself as a Mac; touch support gives it away.
	if (/mac/i.test(source)) return navigator.maxTouchPoints > 1 ? null : 'darwin/aarch64';
	if (/win/i.test(source)) return 'windows/x86_64';
	return null;
}

const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

function describe(release: Release) {
	const size = release.size_bytes ? ` · ${(release.size_bytes / 1048576).toFixed(0)} MB` : '';
	return `Versión ${release.version} · ${dateFormat.format(new Date(release.pub_date))}${size}`;
}

function initDownloads() {
	const detected = detectPlatform();

	if (detected) {
		document
			.querySelectorAll(`[data-platform-card="${PLATFORM_CARDS[detected]}"]`)
			.forEach((card) => card.classList.add('is-recommended'));
		document
			.querySelectorAll<HTMLElement>(`[data-hide-on-platform="${detected}"]`)
			.forEach((el) => el.classList.add('hidden'));
	} else {
		document.querySelectorAll('[data-platform-card="web"]').forEach((card) => card.classList.add('is-recommended'));
	}

	document.querySelectorAll<HTMLAnchorElement>('[data-download]').forEach(async (button) => {
		const key = button.dataset.download!;
		// Without a desktop OS the auto button keeps its fallback href (the downloads page).
		const platform = (key === 'auto' ? detected : key) as Platform | null;
		if (!platform) return;

		const info = document.querySelector(`[data-release-info="${key}"]`);
		const error = document.querySelector(`[data-download-error="${key}"]`);
		const label = button.querySelector('[data-download-label]');
		if (key === 'auto' && label) label.textContent = `Descargar para ${PLATFORM_NAMES[platform]}`;

		button.addEventListener('click', async (event) => {
			event.preventDefault();
			error?.classList.add('hidden');
			button.setAttribute('aria-busy', 'true');
			try {
				const release = await fetchRelease(platform);
				window.location.href = release.url;
				document.dispatchEvent(new CustomEvent('nori:download-started', { detail: { platform } }));
			} catch {
				error?.classList.remove('hidden');
			} finally {
				button.removeAttribute('aria-busy');
			}
		});

		try {
			const release = await fetchRelease(platform);
			if (info) info.textContent = describe(release);
			const notesWrap = document.querySelector('[data-release-notes-wrap]');
			if (release.notes && notesWrap) {
				notesWrap.querySelector('[data-release-version]')!.textContent = release.version;
				notesWrap.querySelector('[data-release-notes]')!.textContent = release.notes;
				notesWrap.classList.remove('hidden');
			}
		} catch (err) {
			// 404: no published release ships an installer for this platform yet.
			if ((err as { status?: number }).status !== 404) return;
			if (key === 'auto') {
				button.href = '/descargas/';
				if (label) label.textContent = 'Ver opciones de descarga';
				button.replaceWith(button.cloneNode(true));
			} else {
				button.classList.add('hidden');
			}
			if (info) info.textContent = 'Aún no disponible. Mientras tanto usa Nori desde el navegador.';
		}
	});
}

initDownloads();
