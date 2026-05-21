import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useT, LangSwitcher } from "@/lib/i18n";
import logo from "/images/logo-golf-rova.png?url";

type ActiveKey = "hotel" | "rooms" | "restaurants" | "golf" | null;

export function SiteHeader({ active = null }: { active?: ActiveKey }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkCls = (k: ActiveKey) =>
    active === k
      ? "text-primary"
      : "hover:text-primary transition-colors";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-5 md:px-10 py-4 md:py-5 flex justify-between items-center bg-background/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 leading-none">
            <img
              src={logo}
              alt="Golf du Rova"
              width={44}
              height={44}
              className="h-10 w-auto md:h-11"
            />
            <span className="hidden sm:flex flex-col">
              <span className="font-display text-xl md:text-2xl tracking-tight text-primary font-semibold italic">
                Golf du Rova
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] mt-1 text-muted-foreground">
                {t("nav.tagline")}
              </span>
            </span>
          </Link>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.18em] font-medium text-foreground/80">
            <Link to="/" className={linkCls("hotel")}>{t("nav.hotel")}</Link>
            <Link to="/chambres" className={linkCls("rooms")}>{t("nav.rooms")}</Link>
            <Link to="/restaurants" className={linkCls("restaurants")}>{t("nav.restaurants")}</Link>
            <Link to="/golf" className={linkCls("golf")}>{t("nav.golf")}</Link>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <LangSwitcher />
          <button className="hidden sm:inline-flex bg-primary text-primary-foreground px-4 md:px-5 py-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all">
            {t("nav.book")}
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2 text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-background shadow-2xl flex flex-col transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <img src={logo} alt="Golf du Rova" className="h-10 w-auto" />
              <span className="font-display text-xl italic text-primary">Golf du Rova</span>
            </Link>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="p-2 -mr-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-6 text-sm uppercase tracking-[0.2em]">
            <Link to="/" onClick={() => setOpen(false)} className={linkCls("hotel")}>{t("nav.hotel")}</Link>
            <Link to="/chambres" onClick={() => setOpen(false)} className={linkCls("rooms")}>{t("nav.rooms")}</Link>
            <Link to="/restaurants" onClick={() => setOpen(false)} className={linkCls("restaurants")}>{t("nav.restaurants")}</Link>
            <Link to="/golf" onClick={() => setOpen(false)} className={linkCls("golf")}>{t("nav.golf")}</Link>
          </nav>
          <div className="mt-auto px-6 pb-10 pt-6 border-t border-border">
            <button className="w-full bg-primary text-primary-foreground px-5 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-primary/90 transition-all">
              {t("nav.book")}
            </button>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-6">
              Andakana — Antananarivo
            </p>
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground mt-1">
              +261 34 20 22 011 90
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
