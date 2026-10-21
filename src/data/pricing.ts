/**
 * Public copy of the subscription catalog `2026-v1` seeded by the API
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

/** Progressive tiers per processed case, shared by every standard plan. */
export const caseTiers = [
	{ from: 1, to: 300, unitPrice: 3.5 },
	{ from: 301, to: 800, unitPrice: 3.0 },
	{ from: 801, to: 2000, unitPrice: 2.5 },
	{ from: 2001, to: 5000, unitPrice: 2.2 },
	{ from: 5001, to: null, unitPrice: 1.8, requiresNegotiation: true },
];

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
		monthlyBasePrice: 690,
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
		monthlyBasePrice: 1190,
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
		monthlyBasePrice: 1890,
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
			{ text: 'Tarifa por caso negociada', included: true },
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

/** Per-case and per-stamp prices always keep their cents ($3.00, not $3). */
export function formatUnitPrice(amount: number) {
	return currency.format(amount);
}
