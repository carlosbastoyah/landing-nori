import type { APIRoute } from 'astro';
import { COMPANY, WEB_APP_URL } from '../data/content';
import { pathologyPages } from '../data/pathology';
import { standardPlans, formatMoney, formatUnitPrice, ENTERPRISE_FROM_STUDIES } from '../data/pricing';

/** llms.txt (https://llmstxt.org): a plain summary AI assistants read to describe and cite Nori accurately. */
export const GET: APIRoute = ({ site }) => {
	const url = (path: string) => new URL(path, site).toString();

	const plans = standardPlans
		.map(
			(plan) =>
				`- ${plan.name}: ${formatMoney(plan.monthlyBasePrice!)} MXN al mes + IVA, ${plan.includedStudies!.toLocaleString('es-MX')} estudios incluidos, estudio adicional a ${formatUnitPrice(plan.extraStudyPrice!)}.`
		)
		.join('\n');

	const body = `# ${COMPANY.brandName}

> ${COMPANY.brandName} es un software LIS (sistema de información de laboratorio) para laboratorios clínicos y de anatomía patológica en México. Gestiona casos, biopsias, citologías, resultados, visor de laminillas, plantillas de informe, cobro y facturación CFDI, en web y en app de escritorio para Windows y macOS.

${COMPANY.brandName} es desarrollado por ${COMPANY.legalNameShort}, con sede en ${COMPANY.address.city}, ${COMPANY.address.state}, México. Teléfono y WhatsApp: ${COMPANY.phone}.

## Software de patología

${pathologyPages.map((page) => `- [${page.title}](${url(page.href)}): ${page.description}`).join('\n')}

## Software de laboratorio clínico

- [Software para laboratorio clínico](${url('/software-laboratorio-clinico/')}): órdenes, captura de resultados por variable con valores de referencia, reportes y cobro.

## Precios

Suscripción mensual en pesos mexicanos. Detalle completo en [Precios](${url('/precios/')}).

${plans}
- Enterprise: precio negociado para más de ${ENTERPRISE_FROM_STUDIES.toLocaleString('es-MX')} estudios al mes, con soporte dedicado e integraciones a la medida.

## Más información

- [Preguntas frecuentes](${url('/preguntas-frecuentes/')})
- [Descargar la app de escritorio](${url('/descargas/')})
- [Usar Nori en el navegador](${WEB_APP_URL})
- [Contacto y demo](${url('/contacto/')})
`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
