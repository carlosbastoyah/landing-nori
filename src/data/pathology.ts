/** Pathology topic cluster: every page links to the hub and its siblings so search engines read them as one subject. */
export const pathologyPages = [
	{
		href: '/software-laboratorio-patologia/',
		title: 'Software de patología',
		description: 'El sistema completo para tu laboratorio de anatomía patológica, de la recepción a la entrega.',
	},
	{
		href: '/software-citologia/',
		title: 'Software de citología',
		description: 'Papanicolaou convencional y en base líquida, BAAF y citología diversa con su propio flujo y precio.',
	},
	{
		href: '/visor-de-laminillas/',
		title: 'Visor de laminillas',
		description: 'Sube o escanea laminillas, navega con zoom, marca hallazgos y adjúntalos como figuras al informe.',
	},
	{
		href: '/plantillas-informe-patologia/',
		title: 'Plantillas de informe de patología',
		description: 'Tu formato de reporte con logo, secciones y datos que se llenan solos. Exporta a PDF y Word.',
	},
];

/** The cluster minus the page being rendered. */
export function pathologySiblings(currentHref: string) {
	return pathologyPages.filter((page) => page.href !== currentHref);
}
