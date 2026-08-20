// app/privacidad/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Nitaíno Digital maneja los datos de las personas que visitan nitainodigital.com: cookies, analíticas, servicios de terceros y sus derechos.",
  alternates: {
    canonical: "https://www.nitainodigital.com/privacidad",
    languages: {
      "es-PR": "https://www.nitainodigital.com/privacidad",
      "en-US": "https://www.nitainodigital.com/privacy",
    },
  },
  openGraph: {
    title: "Política de Privacidad | Nitaíno Digital",
    description:
      "Cómo Nitaíno Digital maneja los datos de las personas que visitan nitainodigital.com.",
    type: "website",
    locale: "es_PR",
    url: "https://www.nitainodigital.com/privacidad",
  },
};

const EFFECTIVE_DATE = "20 de agosto de 2026";

export default function PrivacidadPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 pt-32 pb-16 md:pb-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Política de Privacidad
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Vigente desde el {EFFECTIVE_DATE}
      </p>

      <div className="mt-10 space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            1. Quién es responsable de sus datos
          </h2>
          <p className="mt-3">
            El responsable de este sitio web es Mario Rafael Ayala, haciendo
            negocios como Nitaíno Digital.
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
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            2. Este sitio no recopila datos mediante formularios
          </h2>
          <p className="mt-3">
            Queremos ser explícitos en esto porque es poco común:{" "}
            <strong className="text-foreground">
              nitainodigital.com no tiene formularios de contacto ni recopila
              información en nuestros servidores.
            </strong>{" "}
            No hay registro de usuarios, no hay cuentas, no hay base de datos de
            visitantes y no le pedimos su nombre, dirección ni número de
            teléfono en ninguna parte del sitio.
          </p>
          <p className="mt-3">
            Toda comunicación ocurre porque usted decide iniciarla: escribiendo a
            nuestro correo electrónico o agendando una cita a través de Calendly.
            En ese momento usted nos comparte voluntariamente la información que
            decida incluir en su mensaje.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            3. Cookies que utilizamos
          </h2>
          <p className="mt-3">
            Este sitio guarda una sola cookie propia, de carácter funcional:
          </p>
          <ul className="mt-4 space-y-3 list-disc pl-5">
            <li>
              <strong className="text-foreground">lang</strong> — almacena si
              usted prefiere ver el sitio en español o en inglés, para no volver
              a preguntárselo en cada visita. Se conserva por un año. No contiene
              información personal ni permite identificarle.
            </li>
          </ul>
          <p className="mt-4">
            Los servicios de analítica descritos en la próxima sección pueden
            establecer sus propias cookies bajo sus respectivas políticas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            4. Analíticas y servicios de terceros
          </h2>
          <p className="mt-3">
            Utilizamos los siguientes servicios de terceros. Cada uno opera bajo
            su propia política de privacidad, y le recomendamos consultarlas.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold text-foreground">
                Vercel Analytics y Vercel Speed Insights
              </h3>
              <p className="mt-2">
                Se cargan en{" "}
                <strong className="text-foreground">todas las páginas</strong>{" "}
                del sitio. Recopilan datos agregados sobre visitas y sobre el
                rendimiento técnico de las páginas (tiempos de carga, métricas de
                Core Web Vitals). Vercel es también la plataforma donde este sitio
                está alojado, por lo que procesa las solicitudes que su navegador
                envía, incluyendo su dirección IP.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Google Analytics
              </h3>
              <p className="mt-2">
                Se utiliza únicamente en la página de{" "}
                <Link
                  href="/servicios"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Servicios
                </Link>
                . Registra vistas de página y ciertas interacciones dentro de esa
                página: profundidad de desplazamiento, clics en botones de acción,
                apertura de preguntas frecuentes y visualización de testimonios.
                Se usa para entender qué contenido resulta útil, no para
                identificar personas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Calendly</h3>
              <p className="mt-2">
                Los enlaces para agendar una cita le llevan fuera de este sitio,
                al dominio de Calendly. Cualquier dato que usted proporcione allí
                (nombre, correo, fecha seleccionada) lo recibe Calendly bajo su
                política de privacidad, y nosotros lo recibimos como notificación
                de la cita agendada.
              </p>
            </div>
          </div>

          <p className="mt-5">
            La tipografía del sitio se sirve desde nuestro propio dominio, por lo
            que su navegador no realiza solicitudes a servidores de fuentes
            externas al visitarnos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            5. Para qué usamos esta información
          </h2>
          <p className="mt-3">
            Los datos agregados de analítica se usan para entender qué páginas
            resultan útiles, detectar problemas de rendimiento y mejorar el sitio.
            La información que usted nos envía por correo o por Calendly se usa
            para responderle y, si procede, para coordinar y prestar el servicio
            que nos solicite.
          </p>
          <p className="mt-3">
            <strong className="text-foreground">
              No vendemos, alquilamos ni compartimos su información con terceros
              para fines de mercadeo.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            6. Cuánto tiempo conservamos la información
          </h2>
          <p className="mt-3">
            La correspondencia por correo electrónico se conserva mientras sea
            necesaria para atender su solicitud y cumplir con obligaciones
            contables o legales. Los datos de analítica se conservan de forma
            agregada según los períodos de retención de cada proveedor. La cookie
            de idioma expira al año, y usted puede borrarla en cualquier momento
            desde su navegador.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            7. Sus derechos
          </h2>
          <p className="mt-3">
            Usted puede solicitarnos acceso a la información que tengamos sobre
            usted, su corrección o su eliminación. Como no mantenemos una base de
            datos de visitantes, en la práctica esto se refiere a la
            correspondencia que usted nos haya enviado.
          </p>
          <p className="mt-3">
            Para ejercer cualquiera de estos derechos, escríbanos a{" "}
            <a
              href="mailto:mario@nitainodigital.com"
              className="text-primary hover:underline underline-offset-4"
            >
              mario@nitainodigital.com
            </a>
            . También puede bloquear o eliminar cookies desde la configuración de
            su navegador, y desactivar la analítica de Google mediante los
            complementos que Google provee para ese fin.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            8. Menores de edad
          </h2>
          <p className="mt-3">
            Este sitio está dirigido a personas y empresas que buscan servicios
            profesionales. No está dirigido a menores de 13 años y no recopilamos
            conscientemente información de menores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            9. Cambios a esta política
          </h2>
          <p className="mt-3">
            Si cambiamos la forma en que manejamos los datos —por ejemplo, si en
            el futuro añadimos un formulario de contacto— actualizaremos esta
            página y modificaremos la fecha de vigencia que aparece al inicio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            10. Contacto
          </h2>
          <p className="mt-3">
            Cualquier pregunta sobre esta política puede dirigirla a{" "}
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
          href="/terminos"
          className="text-primary hover:underline underline-offset-4"
        >
          Términos de Servicio
        </Link>
        <Link
          href="/privacy"
          className="text-primary hover:underline underline-offset-4"
        >
          Read in English
        </Link>
      </div>
    </div>
  );
}
