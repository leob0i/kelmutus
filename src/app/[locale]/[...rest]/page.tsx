import {notFound} from "next/navigation";

// Tuntemattomat osoitteet -> lokalisoitu 404 ([locale]/not-found.tsx)
export default function CatchAllPage() {
  notFound();
}
