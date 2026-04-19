import type {
  HomePageData,
  StrapiSingleResponse,
} from "@/types/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

// ─── Base fetch wrapper ───────────────────────────────────────────────────────
async function strapiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_API_TOKEN && {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      }),
    },
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    ...options,
  });

  if (!res.ok) {
    throw new Error(
      `Strapi request failed: ${res.status} ${res.statusText} — ${url}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export async function getHomePage(): Promise<HomePageData> {
  const data = await strapiRequest<StrapiSingleResponse<HomePageData>>(
    "/home-page?populate[heroBackground]=*&populate[heroLogo]=*&populate[whyChooseUsItems][populate][icon]=*&populate[whyChooseUsMainImage]=*&populate[services][populate][coverImage]=*&populate[aboutImage]=*&populate[socialLinks]=*"
  );
  return data.data;
}

// ─── Helper: build full media URL ────────────────────────────────────────────
export function buildMediaUrl(path: string): string {
  if (!path) return "/placeholder-watch.jpg";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}
