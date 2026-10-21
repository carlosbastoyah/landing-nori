export interface NavLink {
	href: string;
	label: string;
}

export const mainNav: NavLink[] = [
	{ href: '/#producto', label: 'Producto' },
	{ href: '/software-laboratorio-clinico/', label: 'Laboratorio clínico' },
	{ href: '/software-laboratorio-patologia/', label: 'Patología' },
	{ href: '/precios/', label: 'Precios' },
	{ href: '/preguntas-frecuentes/', label: 'FAQ' },
	{ href: '/descargas/', label: 'Descargas' },
	{ href: '/contacto/', label: 'Contacto' },
];

/** A link is current when its path (ignoring hash) matches the page; hash links to the home page never are. */
export function isCurrent(href: string, pathname: string): boolean {
	if (href.includes('#')) return false;
	const normalize = (p: string) => (p.endsWith('/') ? p : `${p}/`);
	return normalize(href) === normalize(pathname);
}
