"use client";

import Error from "next/error";

// Varalla pyynnöille, jotka eivät kulje [locale]-reitin kautta (esim. puuttuvat tiedostot).
// Tavalliset 404-sivut renderöi [locale]/not-found.tsx.
export default function GlobalNotFound() {
  return (
    <html lang="fi">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
