// <html> ja <body> ovat [locale]/layout.tsx:ssä, jotta kieli saadaan URL:sta
// ja sivut voidaan esirenderöidä staattisesti.
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
