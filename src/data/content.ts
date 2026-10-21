export const WHATSAPP_URL =
	'https://api.whatsapp.com/send/?phone=529994533797&text=Hola%2C+quiero+conocer+m%C3%A1s+sobre+la+plataforma+para+laboratorios+cl%C3%ADnicos+y+de+patolog%C3%ADa.&type=phone_number&app_absent=0';

export const PHONE_URL = 'tel:+529994533797';

export const WEB_APP_URL = 'https://app.wsnori.com/';

/** Public installer download of the backend: `{target}/{arch}` answers with the latest published installer. */
export const DESKTOP_DOWNLOADS_URL = 'https://app.wsnori.com/api/administration/desktop-downloads';

export const COMPANY = {
	brandName: 'Nori',
	legalName: 'WERSOFT SOLUTIONS',
	regimenCapital: 'SOCIEDAD ANONIMA PROMOTORA DE INVERSION DE CAPITAL VARIABLE',
	legalNameFull:
		'WERSOFT SOLUTIONS, SOCIEDAD ANONIMA PROMOTORA DE INVERSION DE CAPITAL VARIABLE',
	legalNameShort: 'Wersoft Solutions S.A.P.I. de C.V.',
	rfc: 'WSO260707KC6',
	tradeName: 'WERSOFT',
	phone: '+52 999 453 3797',
	address: {
		street: 'Calle 55 C 988',
		neighborhood: 'Las Américas II',
		city: 'Mérida',
		state: 'Yucatán',
		postalCode: '97302',
		country: 'México',
	},
	get formattedAddress() {
		return `${this.address.street}, Col. ${this.address.neighborhood}, ${this.address.city}, ${this.address.state}, C.P. ${this.address.postalCode}, ${this.address.country}`;
	},
} as const;

export const painPoints = [
	{
		title: 'Trazabilidad fragmentada',
		description:
			'Casos, muestras y reportes viven en sistemas distintos. Eso retrasa decisiones clínicas y aumenta errores operativos.',
	},
	{
		title: 'Demasiado trabajo manual',
		description:
			'Validaciones, seguimiento y comunicación requieren demasiados pasos repetitivos que consumen tiempo del equipo.',
	},
	{
		title: 'Falta de visibilidad ejecutiva',
		description:
			'Sin indicadores claros en tiempo real, es difícil detectar cuellos de botella y crecer con control.',
	},
];

export const features = [
	{
		title: 'Gestión de casos y estudios',
		description:
			'Desde recepción hasta validación final, con historial completo y estados visibles para todo el equipo.',
		image: '/nori/illustrations/feature-cases.svg',
	},
	{
		title: 'Flujos inteligentes',
		description: 'Reglas de negocio, alertas y asignaciones automáticas para reducir tiempos de entrega.',
		image: '/nori/illustrations/feature-flows.svg',
	},
	{
		title: 'Colaboración clínica',
		description:
			'Comentarios y seguimiento entre área clínica, laboratorio y administración en un solo lugar.',
		image: '/nori/illustrations/feature-collab.svg',
	},
	{
		title: 'Reportería personalizable',
		description: 'Paneles por rol para dirección, coordinación y operación con KPIs accionables.',
		image: '/nori/illustrations/feature-reports.svg',
	},
];

export const modules = [
	{
		title: 'Casos y estudios',
		description: 'Recepción de órdenes, seguimiento por estado, urgencias y catálogo de estudios con precios.',
	},
	{
		title: 'Laminillas',
		description: 'Escanea o sube laminillas, revísalas con zoom, anota hallazgos y adjúntalos al informe.',
	},
	{
		title: 'Resultados e informes',
		description: 'Captura con valores de referencia, plantillas de informe propias y exportación a PDF o Word.',
	},
	{
		title: 'CRM',
		description: 'Administra médicos, pacientes y clientes del laboratorio, sus convenios y el seguimiento de cada relación.',
	},
	{
		title: 'Cobro',
		description: 'Estado de pago por caso, cuentas por cobrar y precios por forma de pago.',
	},
	{
		title: 'Facturación',
		description: 'Emite las facturas de tus estudios directamente desde Nori, sin capturar dos veces.',
		comingSoon: true,
	},
];

export const steps = [
	{
		title: 'Captura y priorización',
		description: 'Registra solicitudes, adjunta archivos y organiza urgencias con reglas claras.',
	},
	{
		title: 'Revisión y diagnóstico',
		description: 'Consolida información del paciente y del estudio para validar cada caso con contexto.',
	},
	{
		title: 'Entrega y seguimiento',
		description: 'Comparte reportes, deja evidencia de cambios y mide tiempos por etapa.',
	},
];

export const whyChooseUs = [
	{
		title: 'Trazabilidad completa',
		description: 'Cada caso, muestra y reporte queda registrado con historial auditable para todo el equipo.',
		accent: 'ink' as const,
	},
	{
		title: 'Interfaz clínica intuitiva',
		description: 'Diseñada para patólogos, técnicos y administración sin curva de aprendizaje prolongada.',
		accent: 'mint' as const,
	},
	{
		title: 'Implementación ágil',
		description: 'Configuración por especialidad y acompañamiento para operar desde el primer mes.',
		accent: 'ocean' as const,
	},
];

export const stats = [
	{ value: 3500, suffix: '+', label: 'Casos gestionados al mes' },
	{ value: 98, suffix: '%', label: 'Satisfacción de equipos clínicos' },
	{ value: 40, suffix: '%', label: 'Reducción de trabajo manual' },
	{ value: 24, suffix: '/7', label: 'Visibilidad operativa en tiempo real' },
];

export const testimonials = [
	{
		name: 'Dirección de Operaciones',
		role: 'Laboratorio aliado',
		avatar: '/nori/template/avatars/avatar-1.jpg',
		quote:
			'Con Nori redujimos tiempo administrativo, tenemos visibilidad del avance por caso y el equipo médico puede concentrarse en lo importante.',
	},
	{
		name: 'Coordinación clínica',
		role: 'Laboratorio aliado',
		avatar: '/nori/template/avatars/avatar-2.jpg',
		quote:
			'Ahora cada estudio tiene un responsable y un estado claro. El equipo responde con más rapidez y menos seguimiento manual.',
	},
	{
		name: 'Dirección médica',
		role: 'Laboratorio aliado',
		avatar: '/nori/template/avatars/avatar-3.jpg',
		quote:
			'La trazabilidad en tiempo real nos permite anticipar retrasos y tomar decisiones con la información completa.',
	},
	{
		name: 'Administración',
		role: 'Laboratorio aliado',
		avatar: '/nori/template/avatars/avatar-4.jpg',
		quote:
			'Los reportes por rol nos dan visibilidad ejecutiva sin depender de hojas de cálculo dispersas.',
	},
	{
		name: 'Patología',
		role: 'Laboratorio aliado',
		avatar: '/nori/template/avatars/avatar-5.jpg',
		quote:
			'La interfaz es clara para el equipo clínico y la implementación fue mucho más rápida de lo que esperábamos.',
	},
];

export const blogPosts = [
	{
		title: 'Cómo digitalizar el flujo de casos clínicos sin frenar la operación',
		category: 'Operación',
		author: 'Equipo Nori',
		date: '15 Ene, 2026',
		image: '/nori/template/blog/post-img-1.jpg',
		href: '#',
	},
	{
		title: 'Trazabilidad en laboratorios: de Excel a un sistema unificado',
		category: 'Trazabilidad',
		author: 'Equipo Nori',
		date: '8 Ene, 2026',
		image: '/nori/template/blog/post-img-2.jpg',
		href: '#',
	},
	{
		title: 'KPIs que tu laboratorio debe monitorear en tiempo real',
		category: 'Reportería',
		author: 'Equipo Nori',
		date: '2 Ene, 2026',
		image: '/nori/template/blog/post-img-3.jpg',
		href: '#',
	},
];

export const faqs = [
	{
		question: '¿Para qué tipo de laboratorios está diseñado Nori?',
		answer:
			'Nori está pensado para laboratorios clínicos y de patología que gestionan casos, estudios, muestras y reportes con equipos multidisciplinarios.',
	},
	{
		question: '¿Cuánto tiempo toma la implementación?',
		answer:
			'La mayoría de los laboratorios inicia operación en 2 a 4 semanas, con configuración por especialidad y capacitación del equipo incluida.',
	},
	{
		question: '¿Cómo funciona el modelo de precios?',
		answer:
			'Pagas una cuota mensual según tu plan (desde $690 MXN + IVA) más un cargo por cada caso procesado, que baja conforme crece tu volumen. No cobramos por usuario.',
	},
	{
		question: '¿Mis datos están seguros?',
		answer:
			'Contamos con controles de acceso por rol, trazabilidad de cambios y respaldo seguro de información sensible para cumplimiento clínico.',
	},
	{
		question: '¿Puedo migrar desde Excel u otro sistema?',
		answer:
			'Sí. Nuestro equipo te acompaña en la migración de datos históricos y la configuración de flujos equivalentes a tu operación actual.',
	},
	{
		question: '¿Ofrecen soporte y capacitación?',
		answer:
			'Todos los planes incluyen soporte. Esencial cuenta con soporte estándar, Crecimiento y Escala con soporte prioritario, y Enterprise con soporte dedicado con SLA. Escala incluye onboarding.',
	},
];
