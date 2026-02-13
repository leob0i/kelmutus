// src/app/ohjeet/veneen-talvisailytys/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "talvisailytys" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function VeneenTalvisailytysPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "talvisailytys" });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Sisältö (pt jättää tilaa läpinäkyvälle headerille) */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          {t("title")}
        </h1>

        <div className="mt-10 space-y-10 text-white/85">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {t("sections.cleaning.title")}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">
                  {t("sections.cleaning.items.cleanSurfaces.label")}
                </span>{" "}
                {t("sections.cleaning.items.cleanSurfaces.text")}
              </li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.cleaning.items.removeMoisture.label")}
                </span>{" "}
                {t("sections.cleaning.items.removeMoisture.text")}
              </li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.cleaning.items.dryThoroughly.label")}
                </span>{" "}
                {t("sections.cleaning.items.dryThoroughly.text")}
              </li>
              <li>{t("sections.cleaning.items.dehumidifier")}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {t("sections.engine.title")}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">
                  {t("sections.engine.items.fillTank.label")}
                </span>{" "}
                {t("sections.engine.items.fillTank.text")}
              </li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.engine.items.protectEngine.label")}
                </span>{" "}
                {t("sections.engine.items.protectEngine.text")}
              </li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.engine.items.service.label")}
                </span>{" "}
                {t("sections.engine.items.service.text")}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {t("sections.gear.title")}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">
                  {t("sections.gear.items.removeSensitive.label")}
                </span>{" "}
                {t("sections.gear.items.removeSensitive.text")}
              </li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.gear.items.storeBatteries.label")}
                </span>{" "}
                {t("sections.gear.items.storeBatteries.text")}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {t("sections.storage.title")}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">
                  {t("sections.storage.items.washRopes.label")}
                </span>{" "}
                {t("sections.storage.items.washRopes.text")}
              </li>
              <li>{t("sections.storage.items.shrinkWrap")}</li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.storage.items.ventilation.label")}
                </span>{" "}
                {t("sections.storage.items.ventilation.text")}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {t("sections.safety.title")}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">
                  {t("sections.safety.items.emptyBilge.label")}
                </span>{" "}
                {t("sections.safety.items.emptyBilge.text")}
              </li>
              <li>
                <span className="font-medium text-white">
                  {t("sections.safety.items.drainWaterSystems.label")}
                </span>{" "}
                {t("sections.safety.items.drainWaterSystems.text")}
              </li>
              <li>{t("sections.safety.items.finalNote")}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
