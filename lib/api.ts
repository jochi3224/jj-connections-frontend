import axios from "axios";

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:4000";

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
  tienda?: string | null;
  diametro?: string | null;
  tags?: string | null;
  marca?: string | null;
  referencia?: string | null;
  moneda?: string | null;
  condicion?: string | null;
  fuente_url?: string | null;
  material?: string | null;
  movimiento?: string | null;
  BraceletMaterial?: string | null;
  activo?: boolean | null;
  resistencia_agua?: string | null;
  cristal?: string | null;
  bisel?: string | null;
  color_esfera?: string | null;
  galeria?: WatchImage[];
};

function normalizeMediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_BASE_URL}${url}`;
}

function mapGallery(item: any): WatchImage[] {
  if (!item) return [];

  if (Array.isArray(item?.data)) {
    return item.data
      .map((img: any) => ({
        url: normalizeMediaUrl(img?.url || img?.attributes?.url) || "",
        alternativeText:
          img?.alternativeText || img?.attributes?.alternativeText || null,
      }))
      .filter((img: WatchImage) => !!img.url);
  }

  if (Array.isArray(item)) {
    return item
      .map((img: any) => ({
        url: normalizeMediaUrl(img?.url) || "",
        alternativeText: img?.alternativeText || null,
      }))
      .filter((img: WatchImage) => !!img.url);
  }

  return [];
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
    tienda: raw.tienda ?? "",
    diametro: raw.diametro ?? "",
    tags: raw.tags ?? "",
    marca: raw.marca ?? "",
    referencia: raw.referencia ?? "",
    moneda: raw.moneda ?? "USD",
    condicion: raw.condicion ?? "",
    fuente_url: raw.fuente_url ?? "",
    material: raw.material ?? "",
    movimiento: raw.movimiento ?? "",
    BraceletMaterial: raw.BraceletMaterial ?? raw.braceletMaterial ?? "",
    activo: raw.activo ?? true,
    resistencia_agua: raw.resistencia_agua ?? "",
    cristal: raw.cristal ?? "",
    bisel: raw.bisel ?? "",
    color_esfera: raw.color_esfera ?? "",
    galeria: mapGallery(raw.galeria),
  };
}

export async function getWatches(): Promise<Watch[]> {
  try {
    let page = 1;
    let pageCount = 1;
    const allItems: Watch[] = [];

    do {
      const res = await axios.get(
        `${API_URL}?populate=*&pagination[page]=${page}&pagination[pageSize]=100`
      );

      const items = res.data?.data || [];
      const mapped = items
        .map(mapWatch)
        .filter((watch: Watch) => watch.activo !== false);

      allItems.push(...mapped);

      pageCount = res.data?.meta?.pagination?.pageCount || 1;
      page++;
    } while (page <= pageCount);

    return allItems;
  } catch (error) {
    console.error("Error cargando relojes:", error);
    return [];
  }
}

export async function getWatchById(idOrDocumentId: string): Promise<Watch | null> {
  try {
    const watches = await getWatches();

    const found =
      watches.find(
        (watch) =>
          String(watch.id) === String(idOrDocumentId) ||
          String(watch.documentId || "") === String(idOrDocumentId)
      ) || null;

    return found;
  } catch (error) {
    console.error("Error cargando reloj:", error);
    return null;
  }
}

export function getBrandsFromWatches(watches: Watch[]) {
  const brands = Array.from(
    new Set(watches.map((watch) => watch.marca).filter(Boolean))
  ) as string[];

  return brands.sort((a, b) => a.localeCompare(b));
}