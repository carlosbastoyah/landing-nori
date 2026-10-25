/**
 * Public copy of the subscription catalog `2026-v2` seeded by the API
 * (cli-nexus-api › Administration.Infrastructure/Persistence/Seeding/SubscriptionCatalogSeedData.cs).
 * Keep both in sync when the catalog changes. Amounts are MXN per month, before IVA.
 */

export const IVA_RATE = 0.16;

export type AddOnCode = 'billing' | 'inventory' | 'crm';

interface AddOnRule {
	availability: 'included' | 'optional';
	listPrice: number;
	discountPercent?: number;
}

export interface PricingPlan {
	code: 'esencial' | 'crecimiento' | 'escala' | 'enterprise';
	name: string;
	description: string;
	/** `null` for Enterprise: negotiated flat rate, no public price. */
	monthlyBasePrice: number | null;
	/** Studies the monthly fee covers; `null` for Enterprise. */
	includedStudies: number | null;
	/** Each study past `includedStudies`; Enterprise negotiates a fixed price per study. */
	extraStudyPrice: number | null;
	storageIncludedGb: number | null;
	support: 'standard' | 'priority' | 'dedicated';
	analytics: 'none' | 'basic' | 'advanced';
	/** Per issued CFDI stamp; only charged when the billing add-on is active. */
	cfdiStampPrice: number | null;
	addOns: Record<AddOnCode, AddOnRule>;
	features: { text: string; included: boolean }[];
	cta: string;
	featured?: boolean;
}

/** Monthly volume from which Enterprise's negotiated price is the better deal. */
export const ENTERPRISE_FROM_STUDIES = 5000;

export const storageBlock = { sizeGb: 50, price: 40 };

export const addOns: { code: AddOnCode; name: string; description: string; priceToConfirm?: boolean }[] = [
	{
		code: 'billing',
		name: 'Facturación (CFDI)',
		description: 'Facturas, pagos, clientes, estado de cuenta y timbrado fiscal mexicano.',
	},
	{
		code: 'inventory',
		name: 'Inventario',
		description: 'Reactivos, materiales, lotes, caducidades, proveedores y alertas de existencias.',
	},
	{
		code: 'crm',
		name: 'CRM (WhatsApp)',
		description: 'Bandeja, automatizaciones, plantillas y canales de WhatsApp.',
		// The API marks the CRM list price as provisional, so it isn't published yet.
		priceToConfirm: true,
	},
];

export const analyticsLabels = {
	none: 'Sin analytics',
	basic: 'Analytics básico',
	advanced: 'Analytics avanzado',
};

export const pricingPlans: PricingPlan[] = [
	{
		code: 'esencial',
		name: 'Esencial',
		description: 'Para laboratorios que inician su digitalización, con soporte estándar.',
		monthlyBasePrice: 1190,
		includedStudies: 150,
		extraStudyPrice: 3.5,
		storageIncludedGb: 20,
		support: 'standard',
		analytics: 'none',
		cfdiStampPrice: 2,
		addOns: {
			billing: { availability: 'optional', listPrice: 250 },
			inventory: { availability: 'optional', listPrice: 300 },
			crm: { availability: 'optional', listPrice: 250 },
		},
		features: [
			{ text: '150 estudios al mes incluidos', included: true },
			{ text: 'Casos, estudios, resultados y reportes', included: true },
			{ text: '20 GB de almacenamiento', included: true },
			{ text: 'Soporte estándar', included: true },
			{ text: 'Facturación CFDI opcional', included: true },
			{ text: 'Analytics del laboratorio', included: false },
		],
		cta: 'Solicitar demo',
	},
	{
		code: 'crecimiento',
		name: 'Crecimiento',
		description: 'Para laboratorios en crecimiento que necesitan medir su operación.',
		monthlyBasePrice: 2290,
		includedStudies: 500,
		extraStudyPrice: 3,
		storageIncludedGb: 100,
		support: 'priority',
		analytics: 'basic',
		cfdiStampPrice: 2,
		addOns: {
			billing: { availability: 'optional', listPrice: 250, discountPercent: 0.2 },
			inventory: { availability: 'optional', listPrice: 300 },
			crm: { availability: 'optional', listPrice: 250 },
		},
		features: [
			{ text: '500 estudios al mes incluidos', included: true },
			{ text: 'Todo lo de Esencial', included: true },
			{ text: '100 GB de almacenamiento', included: true },
			{ text: 'Soporte prioritario', included: true },
			{ text: 'Analytics básico', included: true },
			{ text: '20% de descuento en Facturación CFDI', included: true },
		],
		cta: 'Agendar demo',
		featured: true,
	},
	{
		code: 'escala',
		name: 'Escala',
		description: 'Para operaciones de alto volumen que facturan desde Nori.',
		monthlyBasePrice: 4790,
		includedStudies: 1500,
		extraStudyPrice: 2.5,
		storageIncludedGb: 300,
		support: 'priority',
		analytics: 'advanced',
		cfdiStampPrice: 1.5,
		addOns: {
			billing: { availability: 'included', listPrice: 0 },
			inventory: { availability: 'optional', listPrice: 300 },
			crm: { availability: 'optional', listPrice: 250 },
		},
		features: [
			{ text: '1,500 estudios al mes incluidos', included: true },
			{ text: 'Todo lo de Crecimiento', included: true },
			{ text: '300 GB de almacenamiento', included: true },
			{ text: 'Facturación CFDI incluida', included: true },
			{ text: 'Timbres CFDI a $1.50', included: true },
			{ text: 'Analytics avanzado y onboarding', included: true },
		],
		cta: 'Agendar demo',
	},
	{
		code: 'enterprise',
		name: 'Enterprise',
		description: 'Cotización a medida según volumen, integraciones y SLA.',
		monthlyBasePrice: null,
		includedStudies: null,
		extraStudyPrice: null,
		storageIncludedGb: null,
		support: 'dedicated',
		analytics: 'advanced',
		cfdiStampPrice: null,
		addOns: {
			billing: { availability: 'included', listPrice: 0 },
			inventory: { availability: 'included', listPrice: 0 },
			crm: { availability: 'included', listPrice: 0 },
		},
		features: [
			{ text: 'Precio fijo por estudio negociado', included: true },
			{ text: 'Pago mensual o anual', included: true },
			{ text: 'Almacenamiento a medida', included: true },
			{ text: 'Soporte dedicado con SLA', included: true },
			{ text: 'Facturación, Inventario y CRM incluidos', included: true },
			{ text: 'Integraciones a la medida', included: true },
		],
		cta: 'Hablar con ventas',
	},
];

export const standardPlans = pricingPlans.filter((plan) => plan.monthlyBasePrice !== null);

/** Monthly price of an add-on on a plan after its discount; 0 when included. */
export function addOnPrice(plan: PricingPlan, code: AddOnCode) {
	const rule = plan.addOns[code];
	if (rule.availability === 'included') return 0;
	return rule.listPrice * (1 - (rule.discountPercent ?? 0));
}

const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const wholeCurrency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });

export function formatMoney(amount: number) {
	return Number.isInteger(amount) ? wholeCurrency.format(amount) : currency.format(amount);
}

/** Per-study and per-stamp prices always keep their cents ($3.00, not $3). */
export function formatUnitPrice(amount: number) {
	return currency.format(amount);
}

/** Monthly cost before IVA of a standard plan for a volume of studies. */
export function monthlyCost(plan: PricingPlan, studies: number) {
	const base = plan.monthlyBasePrice ?? 0;
	const extra = Math.max(0, studies - (plan.includedStudies ?? 0));
	return base + extra * (plan.extraStudyPrice ?? 0);
}

/** Volume where `next` starts costing less than `plan`: the first study count past the break-even. */
export function breakEven(plan: PricingPlan, next: PricingPlan) {
	let studies = plan.includedStudies ?? 0;
	while (monthlyCost(plan, studies) <= monthlyCost(next, studies)) studies += 1;
	return studies;
}
