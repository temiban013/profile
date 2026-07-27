// app/casos-de-exito/papamin/page.tsx
// Caso de éxito público de Café Papamín. Todo dato publicado proviene de los
// informes mensuales entregados al cliente (GSC) o del código en producción —
// sin cifras contractuales (confidenciales por Cláusula 6.3(b)).
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.nitainodigital.com";

export const metadata: Metadata = {
  title: "Caso de Éxito: Café Papamín — E-Commerce y SEO",
  description:
    "Cómo Nitaíno Digital llevó a Café Papamín, marca de café de San Sebastián, de un sitio bilingüe a un e-commerce con motor de envíos inteligente: +124% de impresiones en Google en 6 meses y cotización automática a 3 zonas de EE.UU.",
  alternates: {
    canonical: `${BASE_URL}/casos-de-exito/papamin`,
  },
  openGraph: {
    title: "Caso de Éxito: Café Papamín | Nitaíno Digital",
    description:
      "De sitio local a e-commerce con motor de envíos inteligente: +124% de impresiones en Google en 6 meses.",
    url: `${BASE_URL}/casos-de-exito/papamin`,
    images: `${BASE_URL}/papamin-preview.png`,
    type: "article",
  },
};

const stats = [
  { value: "+124%", label: "Impresiones en Google en 6 meses (2,794 vs 1,247)" },
  { value: "+105%", label: "Clics en Google en 6 meses (377 vs 184)" },
  { value: "10.5–13.5%", label: "CTR — de 4 a 5 veces el promedio de un pequeño negocio (2–3%)" },
  { value: "80+", label: "Países con impresiones en 6 meses" },
  { value: "83%", label: "De los clics llegan desde móvil" },
  { value: "500+", label: "Pruebas automatizadas (Vitest) + 23 escenarios E2E (Playwright)" },
];

const features = [
  {
    title: "Empaque óptimo por programación dinámica",
    detail:
      "El motor evalúa todas las combinaciones de cajas y elige la más económica — donde un algoritmo simple escogería $42.99 en envío, el óptimo encuentra $42.34. Capacidades basadas en pruebas físicas de empaque reales, no en volumen teórico.",
  },
  {
    title: "Cotización en vivo entre transportistas",
    detail:
      "Compara iWide (Puerto Rico), USPS Priority Flat Rate y USPS Priority Cubic por zona, y clasifica el destino solo con el ZIP: Puerto Rico, EE.UU. continental o Hawái/Alaska — el cliente nunca tiene que escoger estado.",
  },
  {
    title: "Operación de despacho para el dueño del negocio",
    detail:
      "Cola de órdenes con máquina de estados (pendiente → empacada → enviada), exportes CSV separados por transportista y una tabla de tarifas que el propio cliente edita — con historial de cambios y guía en español.",
  },
  {
    title: "Monitoreo que no duerme",
    detail:
      "Un cron mensual verifica que las tarifas de envío no estén vencidas, y una sonda de salud de base de datos detecta interrupciones antes que los clientes.",
  },
  {
    title: "Checkout con tarjeta, construido y endurecido",
    detail:
      "Stripe Hosted Checkout con precios resueltos en el servidor, verificación de firmas de webhooks e idempotencia a prueba de reintentos — listo para activarse con la cuenta Stripe del cliente en la fase final. Hoy las órdenes fluyen por WhatsApp con la cotización ya calculada.",
  },
  {
    title: "SEO bilingüe que paga",
    detail:
      "El sitio en español pasó de casi cero a 138 clics en 6 meses (la versión en inglés: 155). La búsqueda 'cafe papamin' rankea en posición 1.9 con 35% de CTR.",
  },
];

const timeline = [
  { date: "Mayo 2025", event: "Lanzamiento del sitio con catálogo de productos" },
  { date: "Noviembre 2025", event: "Sitio bilingüe (español/inglés) con next-intl" },
  { date: "Abril 2026", event: "Acuerdo de mantenimiento mensual con informes de rendimiento" },
  { date: "Mayo 2026", event: "Contrato de e-commerce: envíos, pagos y operación" },
  { date: "Junio 2026", event: "Motor de envíos en producción — mes récord: 715 impresiones en Google" },
];

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Neon PostgreSQL",
  "Stripe",
  "next-intl",
  "Tailwind CSS 4",
  "Vitest",
  "Playwright",
  "Vercel",
];

export default function PapaminCasePage() {
  return (
    <main className="bg-white text-neutral-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-900 to-ocean-700 text-white pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 font-semibold uppercase tracking-widest text-sm mb-4">
            Caso de Éxito · E-Commerce
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Café Papamín: café de San Sebastián con envíos inteligentes a todo EE.UU.
          </h1>
          <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
            Una marca artesanal de café puertorriqueño que pasó de un sitio local a una
            tienda bilingüe con motor de envíos propio — y multiplicó su visibilidad en
            Google en el proceso.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://cafepapamin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-colors"
            >
              Visitar cafepapamin.com ↗
            </a>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 hover:border-white text-white font-semibold rounded-full transition-colors"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Preview image */}
      <section className="px-6 -mt-8">
        <div className="max-w-4xl mx-auto">
          <Image
            src="/papamin-preview.png"
            alt="Página principal de cafepapamin.com mostrando el catálogo de café"
            width={1200}
            height={800}
            className="rounded-2xl shadow-2xl border border-neutral-200 w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-ocean-900 mb-2">Resultados medidos</h2>
          <p className="text-neutral-600 mb-10">
            Cifras de Google Search Console reportadas al cliente en los informes
            mensuales (período nov 2025 – jun 2026).
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
              >
                <div className="text-3xl font-bold text-teal-600">{value}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* El reto */}
      <section className="py-12 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-ocean-900 mb-4">El reto</h2>
            <p className="text-neutral-700 leading-relaxed">
              Vender café más allá de Puerto Rico suena simple hasta que hay que
              cotizar un envío: cajas de distintos tamaños, pesos que cambian con
              cada combinación de productos, un transportista para la isla y otro
              para el continente — con reglas distintas para Hawái y Alaska. Todo
              eso sin que el dueño del negocio tenga que tocar una hoja de cálculo.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ocean-900 mb-4">La solución</h2>
            <p className="text-neutral-700 leading-relaxed">
              Un motor de envíos hecho a la medida que empaca, compara y cotiza en
              tiempo real, una operación de despacho que el cliente maneja solo, y
              una base bilingüe optimizada para Google — mantenida bajo un acuerdo
              mensual con informes de rendimiento que el cliente puede leer en
              cinco minutos.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-ocean-900 mb-10">Lo que construimos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map(({ title, detail }) => (
              <div key={title} className="border-l-4 border-teal-400 pl-5">
                <h3 className="font-bold text-ocean-900 mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-ocean-900 mb-10">Cronología</h2>
          <ol className="space-y-6">
            {timeline.map(({ date, event }) => (
              <li key={date} className="flex gap-6 items-baseline">
                <span className="shrink-0 w-36 font-semibold text-teal-600">{date}</span>
                <span className="text-neutral-700">{event}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-ocean-900 mb-6">Tecnologías</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-ocean-900/5 border border-neutral-200 rounded-full text-sm font-medium text-ocean-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-ocean-900 to-ocean-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tu negocio también puede vender más allá de la isla?
          </h2>
          <p className="text-white/85 mb-8">
            Hablemos de tu tienda en línea — desde el catálogo hasta el envío.
          </p>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-full transition-colors"
          >
            Ver servicios y precios
          </Link>
        </div>
      </section>
    </main>
  );
}
