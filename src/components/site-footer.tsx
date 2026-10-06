import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
const logo = "/images/logo-golf-rova.png";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
        <div className="lg:col-span-5">
          <h4 className="font-display text-3xl md:text-4xl mb-6 italic">{t("footer.newsletter.title")}</h4>
          <p className="text-primary-foreground/60 mb-8 max-w-sm text-sm leading-relaxed">
            {t("footer.newsletter.p")}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border-b border-primary-foreground/20 pb-2"
          >
            <input
              type="email"
              placeholder={t("footer.email.placeholder")}
              className="bg-transparent flex-1 text-[11px] tracking-[0.2em] outline-none placeholder:text-primary-foreground/30"
            />
            <button
              type="submit"
              className="text-[11px] font-bold tracking-[0.2em] hover:text-accent transition-colors"
            >
              {t("footer.subscribe")}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 text-[11px] uppercase tracking-[0.2em]">
          <div className="space-y-4">
            <h5 className="text-accent font-bold mb-6">{t("footer.col.explore")}</h5>
            <Link to="/chambres" className="block opacity-60 hover:opacity-100 transition-opacity">{t("nav.rooms")}</Link>
            <Link to="/restaurants" className="block opacity-60 hover:opacity-100 transition-opacity">{t("nav.restaurants")}</Link>
            <Link to="/golf" className="block opacity-60 hover:opacity-100 transition-opacity">{t("nav.golf")}</Link>
          </div>
          <div className="space-y-4">
            <h5 className="text-accent font-bold mb-6">{t("footer.col.services")}</h5>
            <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">{t("footer.helicopter")}</a>
            <Link to="/evenements" className="block opacity-60 hover:opacity-100 transition-opacity">{t("footer.events")}</Link>
            <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">{t("footer.concierge")}</a>
          </div>
          <div className="space-y-4">
            <h5 className="text-accent font-bold mb-6">{t("footer.col.contact")}</h5>
            <span className="block opacity-60 italic normal-case tracking-normal">
              Andakana — PK 20, Route de Mahajanga, Antananarivo
            </span>
            <span className="block opacity-60">+261 34 20 22 011 90</span>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Golf du Rova" className="h-12 w-auto" />
          <span className="text-[9px] opacity-40 uppercase tracking-[0.25em]">
            {t("footer.rights")}
          </span>
        </div>
        <div className="flex gap-8 opacity-50 text-[10px] tracking-[0.2em]">
          <a href="#" className="hover:opacity-100 transition-opacity">{t("footer.legal")}</a>
          <a href="#" className="hover:opacity-100 transition-opacity">{t("footer.privacy")}</a>
        </div>
      </div>
    </footer>
  );
}
