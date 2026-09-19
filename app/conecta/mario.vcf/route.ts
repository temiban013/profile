// app/conecta/mario.vcf/route.ts
// Serves Mario's vCard 3.0 for the "Guardar contacto" button on /conecta.
// Dotted route-handler folder, same convention as app/llms.txt/route.ts.
import { buildVCard } from "@/lib/contact-card";

export const dynamic = "force-static";

export async function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mario-ayala.vcf"',
    },
  });
}
