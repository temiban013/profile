// app/connect/page.tsx
// English-URL stub for /conecta. Bilingual content lives at the one route
// (Spanish default, language context/cookie), so this only redirects —
// preserving the query string, since UTM params (?utm_source=qr, etc.) must
// survive for Vercel Analytics attribution.
import { redirect } from "next/navigation";

export default async function ConnectRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const v of value) query.append(key, v);
    } else if (value !== undefined) {
      query.append(key, value);
    }
  }

  const queryString = query.toString();
  redirect(queryString ? `/conecta?${queryString}` : "/conecta");
}
