import axios from "axios";

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.jjconnections.com";

const API_URL = `${STRAPI_BASE_URL}/api/watches`;

export type WatchImage = {
  url: string;
  alternativeText?: string | null;
};

// 1. EL MOLDE TOTAL: Agregamos todos los campos que usa tu componente de detalle
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
  condicion?: string | null;
  material?: string | null;
  diametro?: string | null;
  movimiento?: string | null;
  tags?: string | null;
  // Campos técnicos detectados en tu componente:
  BraceletMaterial?: string | null;
  cristal?: string | null;
  resistencia_agua?: string | null;
  color_esfera?: string | null;
  bisel?: string | null;
  tienda?: string | null;
  galeria?: WatchImage[];
};

// --- Helpers de Mapeo ---
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

// 2. EL TRADUCTOR: Conectamos los datos de Strapi con el molde de arriba
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
    condicion: raw.condicion ?? "",
    material: raw.material ?? "",
    diametro: raw.diametro ?? "",
    movimiento: raw.movimiento ?? "",
    tags: raw.tags ?? "",
    // Mapeo de nuevos campos técnicos:
    BraceletMaterial: raw.BraceletMaterial ?? raw.braceletMaterial ?? "",
    cristal: raw.cristal ?? "",
    resistencia_agua: raw.resistencia_agua ?? "",
    color_esfera: raw.color_esfera ?? "",
    bisel: raw.bisel ?? "",
    tienda: raw.tienda ?? "",
    galeria: mapGallery(raw.galeria),
  };
}

// --- Búsqueda Multi-campo ---
function buildSearchParams(search: string): Record<string, string> {
  if (!search?.trim()) return {};
  const s = search.trim();
  const fields = ["nombre", "referencia", "modelo", "marca", "tags"];
  return Object.fromEntries(
    fields.map((field, i) => [`filters[$or][${i}][${field}][$containsi]`, s])
  );
}

// --- EXPORT: getWatches (Catálogo y Home) ---
export async function getWatches(search = "", brand = "", featuredOnly = false): Promise<Watch[]> {
  try {
    const params: Record<string, any> = {
      "populate": "*",
      "pagination[pageSize]": featuredOnly ? 8 : 100,
    };

    if (featuredOnly) params["filters[featured][$eq]"] = true;
    if (brand && brand !== "all") params["filters[marca][$containsi]"] = brand;
    if (search.trim()) Object.assign(params, buildSearchParams(search));

    const res = await axios.get(API_URL, { params });
    const items = res.data?.data || [];
    return items.map(mapWatch).filter((w: Watch) => w.activo !== false);
  } catch (error) {
    console.error("Error en getWatches:", error);
    return [];
  }
}

// --- EXPORT: getWatchById (VITAL para la página de detalle) ---
export async function getWatchById(idOrDocumentId: string): Promise<Watch | null> {
  try {
    const res = await axios.get(`${API_URL}/${idOrDocumentId}?populate=*`);
    if (res.data?.data) return mapWatch(res.data.data);
    return null;
  } catch (error) {
    console.error("Error en getWatchById:", error);
    return null;
  }
}

// --- EXPORT: getBrandsFromWatches ---
export function getBrandsFromWatches(watches: Watch[]): string[] {
  return Array.from(
    new Set(watches.map((w) => w.marca).filter(Boolean))
  ).sort() as string[];
}