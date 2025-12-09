const publicApiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const serverPreferredBase = typeof window === "undefined" ? process.env.NEXT_INTERNAL_API_BASE_URL ?? publicApiBase : publicApiBase;

export const API_BASE_URL = (serverPreferredBase ?? "http://localhost:8080").replace(/\/$/, "");
