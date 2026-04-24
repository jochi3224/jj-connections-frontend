import axios from "axios";

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.jjconnections.com";

const API_URL = `${STRAPI_BASE_URL}/api/watches`;

export type WatchImage = {
  url: string;
  alternativeText?: string | null;
};

export type Watch = {
  id: number;
  documentId?: string | null;
  nombre: string;
  modelo?: string | null;
  precio?: number | null;
  descripcion?: string | null;
  imagen_url?: string | null;
  marca?: string | null;
  referencia?: string | null;
  moneda?: string | null;
  activo?: boolean | null;
  featured?: boolean | null; 
  galeria?: WatchImage[];
};

// --- Helpers ---
function normalizeMediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_BASE_URL}${url}`;
}

function mapGallery(item: any): WatchImage[] {
  if (!item) return [];
  const data = Array.isArray(item?.data) ? item.data : Array.isArray(item) ? item : [];
  return data
    .map((img: any) => ({
      url: normalizeMediaUrl(img?.url || img?.attributes?.url) || "",
      alternativeText: img?.alternativeText || img?.attributes?.alternativeText || null,
    }))
    .filter((img: WatchImage) => !!img.url);
}

function mapWatch(item: any): Watch {
  const raw = item?.attributes ? { id: item.id, ...item.attributes } : item;
  return {
    id: raw.id,
    documentId: raw.documentId ?? null,
    nombre: raw.nombre || "Reloj sin nombre",
    modelo: raw.modelo ?? "",
    precio: raw.precio ?? null,
    descripcion: raw.descripcion ?? "",
    imagen_url: raw.imagen_url ?? "",
    marca: raw.marca ?? "",
    referencia: raw.referencia ?? "",
    moneda: raw.moneda ?? "USD",
    activo: raw.activo ?? true,
    featured: !!raw.featured,
    galeria: mapGallery(raw.galeria),
  };
}

// --- getWatches (Catálogo y Highlights) ---
export async function getWatches(search = "", brand = "", featuredOnly = false): Promise<Watch[]> {
  try {
    const params: Record<string, any> = {
      "populate": "*",
      "pagination[pageSize]": featuredOnly ? 8 : 100,
    };

    if (featuredOnly) {
      params["filters[featured][$eq]"] = true;
    }

    if (brand && brand !== "all") {
      params["filters[marca][$containsi]"] = brand;
    }

    const res = await axios.get(API_URL, { params });
    const items = res.data?.data || [];
    return items.map(mapWatch).filter((w: Watch) => w.activo !== false);
  } catch (error) {
    console.error("Error cargando relojes:", error);
    return [];
  }
}

// --- getWatchById (LA QUE TE DABA ERROR) ---
export async function getWatchById(idOrDocumentId: string): Promise<Watch | null> {
  try {
    const res = await axios.get(`${API_URL}/${idOrDocumentId}?populate=*`);
    if (res.data?.data) return mapWatch(res.data.data);
    return null;
  } catch (error) {
    console.error("Error cargando reloj individual:", error);
    return null;
  }
}

// --- getBrandsFromWatches ---
export function getBrandsFromWatches(watches: Watch[]): string[] {
  return Array.from(
    new Set(watches.map((w) => w.marca).filter(Boolean))
  ).sort() as string[];
}