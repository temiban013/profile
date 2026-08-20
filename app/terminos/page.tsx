// app/terminos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description:
    "Términos que rigen el uso de nitainodigital.com: alcance de los servicios, propiedad intelectual, limitación de responsabilidad y ley aplicable.",
  alternates: {
    canonical: "https://www.nitainodigital.com/terminos",
    languages: {
      "es-PR": "https://www.nitainodigital.com/terminos",
      "en-US": "https://www.nitainodigital.com/terms",
    },
  },
  openGraph: {
    title: "Términos de Servicio | Nitaíno Digital",
    description:
      "Términos que rigen el uso de nitainodigital.com y la contratación de servicios.",
    type: "website",
    locale: "es_PR",
    url: "https://www.nitainodigital.com/terminos",
  },
};

const EFFECTIVE_DATE = "20 de agosto de 2026";

export default function TerminosPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 pt-32 pb-16 md:pb-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Términos de Servicio
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Vigente desde el {EFFECTIVE_DATE}
      </p>

      <div className="mt-10 space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            1. Quiénes somos
          </h2>
          <p className="mt-3">
            Este sitio es operado por Mario Rafael Ayala, haciendo negocios como
            Nitaíno Digital.
          </p>
          <address className="mt-4 not-italic">
            Mario Rafael Ayala DBA Nitaíno Digital
            <br />
            15 Calle Santa Ana
            <br />
            Las Marías, PR 00670
            <br />
            Registro de Comerciante 1641272-0011
            <br />
            Correo:{" "}
            <a
              href="mailto:mario@nitainodigital.com"
              className="text-primary hover:underline underline-offset-4"
            >
              mario@nitainodigital.com
            </a>
            <br />
            Teléfono:{" "}
            <a
              href="tel:+17874585702"
              className="text-primary hover:underline underline-offset-4"
            >
              +1 (787) 458-5702
            </a>
          </address>
          <p className="mt-4">
            Al utilizar este sitio usted acepta estos términos. Si no está de
            acuerdo con ellos, le pedimos que no lo utilice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            2. El contenido del sitio es informativo, no una oferta
          </h2>
          <p className="mt-3">
            Las descripciones de servicios, los precios de referencia, los casos
            de estudio y cualquier otro contenido publicado en este sitio tienen
            carácter informativo.{" "}
            <strong className="text-foreground">
              No constituyen una oferta vinculante ni un contrato.
            </strong>
          </p>
          <p className="mt-3">
            Los precios mostrados son puntos de partida y pueden variar según el
            alcance real del trabajo. Nada de lo publicado aquí obliga a Nitaíno
            Digital a prestar un servicio en términos o precios determinados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            3. Los servicios se rigen por un acuerdo escrito aparte
          </h2>
          <p className="mt-3">
            Todo trabajo que Nitaíno Digital realice para un cliente se rige por
            un acuerdo escrito e individual entre las partes, que define el
            alcance, los entregables, el calendario, el precio y las condiciones
            de pago. Ese acuerdo prevalece sobre cualquier contenido de este
            sitio en caso de discrepancia.
          </p>
          <p className="mt-3">
            Agendar una consulta a través de este sitio no crea una relación
            contractual ni obliga a ninguna de las partes a contratar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            4. Propiedad intelectual
          </h2>
          <p className="mt-3">
            El contenido de este sitio —textos, diseño, código, logotipos, marca,
            fotografías y materiales gráficos— es propiedad de Mario Rafael Ayala
            DBA Nitaíno Digital, salvo donde se indique lo contrario, y está
            protegido por las leyes de propiedad intelectual aplicables.
          </p>
          <p className="mt-3">
            Usted puede leer, citar y compartir enlaces a este contenido. No puede
            reproducirlo, redistribuirlo ni utilizarlo con fines comerciales sin
            nuestra autorización previa por escrito.
          </p>
          <p className="mt-3">
            Las marcas, nombres y logotipos de clientes o de terceros que aparecen
            en los casos de estudio pertenecen a sus respectivos titulares y se
            muestran únicamente con fines ilustrativos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            5. Enlaces y servicios de terceros
          </h2>
          <p className="mt-3">
            Este sitio enlaza a servicios y sitios operados por terceros, entre
            ellos Calendly, GitHub, LinkedIn, YouTube y WhatsApp. No controlamos
            esos servicios y no somos responsables de su contenido, su
            disponibilidad ni de sus prácticas de privacidad. El uso que usted
            haga de ellos se rige por sus propios términos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            6. Sin garantías
          </h2>
          <p className="mt-3">
            Este sitio se ofrece{" "}
            <strong className="text-foreground">tal como está</strong>. Aunque
            procuramos que la información sea correcta y esté al día, no
            garantizamos que esté libre de errores, que el sitio esté disponible
            de forma ininterrumpida, ni que los resultados descritos en los casos
            de estudio se reproduzcan en circunstancias distintas.
          </p>
          <p className="mt-3">
            Las métricas y resultados publicados corresponden a proyectos
            específicos, en contextos específicos, y no constituyen una promesa de
            desempeño para trabajos futuros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            7. Limitación de responsabilidad
          </h2>
          <p className="mt-3">
            En la medida permitida por la ley aplicable, Nitaíno Digital no será
            responsable por daños indirectos, incidentales, especiales o
            consecuentes que se deriven del uso o de la imposibilidad de usar este
            sitio o la información contenida en él.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            8. Privacidad
          </h2>
          <p className="mt-3">
            El manejo de datos de las personas que visitan este sitio se describe
            en nuestra{" "}
            <Link
              href="/privacidad"
              className="text-primary hover:underline underline-offset-4"
            >
              Política de Privacidad
            </Link>
            , que forma parte integral de estos términos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            9. Ley aplicable
          </h2>
          <p className="mt-3">
            Estos términos se rigen por las leyes del Estado Libre Asociado de
            Puerto Rico, sin dar efecto a sus normas sobre conflicto de leyes.
            Cualquier controversia relacionada con este sitio se someterá a los
            tribunales competentes de Puerto Rico.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            10. Cambios a estos términos
          </h2>
          <p className="mt-3">
            Podemos actualizar estos términos en cualquier momento. La versión
            vigente será siempre la publicada en esta página, con su fecha de
            vigencia al inicio. El uso continuado del sitio después de una
            actualización implica su aceptación.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            11. Contacto
          </h2>
          <p className="mt-3">
            Cualquier pregunta sobre estos términos puede dirigirla a{" "}
            <a
              href="mailto:mario@nitainodigital.com"
              className="text-primary hover:underline underline-offset-4"
            >
              mario@nitainodigital.com
            </a>{" "}
            o al{" "}
            <a
              href="tel:+17874585702"
              className="text-primary hover:underline underline-offset-4"
            >
              +1 (787) 458-5702
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-14 pt-8 border-t border-border flex flex-wrap gap-x-6 gap-y-2">
        <Link
          href="/privacidad"
          className="text-primary hover:underline underline-offset-4"
        >
          Política de Privacidad
        </Link>
        <Link
          href="/terms"
          className="text-primary hover:underline underline-offset-4"
        >
          Read in English
        </Link>
      </div>
    </div>
  );
}
