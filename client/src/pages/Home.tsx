/*
 * CALLUM BEATTIE FAN CLUB — Home Page
 * Design: Glasgow Brutalist Punk
 * Colors: #0d0d0d bg, #f0ede8 text, #b5ff3a lime accent
 * Fonts: Bebas Neue (display), Source Serif 4 (body), Space Grotesk (UI)
 * Layout: Asymmetric, staggered, full-bleed photography
 * i18n: EN / PT toggle via LanguageContext
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

// ── CDN asset URLs ────────────────────────────────────────────────────────────
const ASSETS = {
  heroBg:       "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/hero_bg-dyBBWuykvAtBFMFr7zMtks.webp",
  fanCommunity: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/fan_community-KWfNVLUAPFntNxB55XiDWX.webp",
  musicTexture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/music_texture-R2eZfEH8xoabhnSeSDKCzr.webp",
  scotlandStage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/scotland_stage-MaBUxMMu3Zbt2ovwtZRREZ.webp",
  callumPhoto:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_official_photo1_56d32b62.webp",
  indiVinyl:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_indi_vinyl_11908bd5.jpg",
};

const SOCIALS = {
  facebook:         "https://www.facebook.com/callumbeattiefanclub/",
  instagram:        "https://www.instagram.com/callum_beattie_fan_club/",
  tiktok:           "https://www.tiktok.com/@callumbeattiefanclub",
  youtube:          "https://www.youtube.com/@callumbeattiefanclub",
  callumInstagram:  "https://www.instagram.com/callumbeattieofficial/",
  callumFacebook:   "https://www.facebook.com/callumbeattieofficial",
  callumSpotify:    "https://open.spotify.com/artist/4uFxymnU41sM7ytUCjuYTN",
  callumYoutube:    "https://www.youtube.com/@CallumBeattieVEVO",
  callumWebsite:    "https://callumbeattiemusic.com",
  callumTikTok:     "https://www.tiktok.com/@callumbeattieofficial",
};

const TOUR_DATES = [
  { date: "SEX 20 MAR / FRI 20 MAR", venue: "Gorilla",                  city: "Manchester",  tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SÁB 21 MAR / SAT 21 MAR", venue: "Northumbria University",   city: "Newcastle",   tickets: "https://callumbeattiemusic.com/home/" },
  { date: "QUI 26 MAR / THU 26 MAR", venue: "Scala",                    city: "London",      tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SEX 27 MAR / FRI 27 MAR", venue: "Thekla",                   city: "Bristol",     tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SÁB 28 MAR / SAT 28 MAR", venue: "O2 Institute2",            city: "Birmingham",  tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SEX 10 JUL / FRI 10 JUL", venue: "Edinburgh Castle Esplanade", city: "Edinburgh", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "QUI 30 JUL / THU 30 JUL", venue: "Belladrum Estate",         city: "Inverness",   tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SEX 28 AGO / FRI 28 AUG", venue: "Queen's Park Recreation Ground", city: "Glasgow", tickets: "https://callumbeattiemusic.com/home/" },
];

const TRACKS = [
  "Two Pretenders","Always Rains in Glasgow","Bed Is Burning","Pins and Needles",
  "Birthday","Something In My Eye","Lanterns","Salamander Street",
  "Heart Stops Beating","Easter Road","We Are Stars",
];

// ── Intersection observer hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const FacebookIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TikTokIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>;
const YouTubeIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const SpotifyIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
const ChevronRight  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/></svg>;
const ExternalLink  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>;

// ── Language toggle pill ──────────────────────────────────────────────────────
const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1e1e1e",
      border: "1px solid #2a2a2a",
      padding: "2px",
      gap: "2px",
    }}>
      {LANG_OPTIONS.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0.3rem 0.6rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
            backgroundColor: lang === code ? "#b5ff3a" : "transparent",
            color: lang === code ? "#0d0d0d" : "#888",
            whiteSpace: "nowrap",
          }}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Home() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutSection     = useInView();
  const albumSection     = useInView();
  const tourSection      = useInView();
  const communitySection = useInView();
  const followSection    = useInView();
  const statsSection     = useInView();

  const navItems = [
    { key: "nav.about",     href: "#about" },
    { key: "nav.music",     href: "#music" },
    { key: "nav.tour",      href: "#tour" },
    { key: "nav.community", href: "#community" },
    { key: "nav.follow",    href: "#follow" },
  ];

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "#f0ede8", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? "rgba(13,13,13,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "0.85rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.05em" }}>
          <span style={{ color: "#b5ff3a" }}>CALLUM BEATTIE</span>
          <span style={{ color: "#888", marginLeft: "0.5rem", fontSize: "0.9rem" }}>FAN CLUB</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: "1.5rem", alignItems: "center" }}>
          {navItems.map(({ key, href }) => (
            <a key={key} href={href}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#b5ff3a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >{t(key)}</a>
          ))}
          <LangToggle />
          <a href={SOCIALS.callumWebsite} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "0.85rem", padding: "0.5rem 1.2rem" }}>
            {t("nav.officialSite")}
          </a>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LangToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "#f0ede8", fontSize: "1.5rem", cursor: "pointer" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          backgroundColor: "#0d0d0d", borderBottom: "1px solid #2a2a2a",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem",
        }}>
          {navItems.map(({ key, href }) => (
            <a key={key} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#f0ede8", textDecoration: "none" }}>
              {t(key)}
            </a>
          ))}
          <a href={SOCIALS.callumWebsite} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ textAlign: "center" }}>
            {t("nav.officialSite")}
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden", display: "flex", alignItems: "flex-end", paddingBottom: "5rem" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${ASSETS.heroBg})`, backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.45)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.3) 50%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 2rem", maxWidth: "900px" }}>
          <p className="ui-label animate-fade-up" style={{ color: "#b5ff3a", marginBottom: "1rem", opacity: 0, animationFillMode: "forwards" }}>
            {t("hero.tag")}
          </p>
          <h1 className="display-headline animate-fade-up delay-100" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: "0.88", color: "#f0ede8", opacity: 0, animationFillMode: "forwards", marginBottom: "0.5rem" }}>
            CALLUM<br /><span style={{ color: "#b5ff3a" }}>BEATTIE</span>
          </h1>
          <h2 className="display-headline animate-fade-up delay-200" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "#888", opacity: 0, animationFillMode: "forwards", marginBottom: "2rem" }}>
            {t("hero.sub")}
          </h2>
          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0, animationFillMode: "forwards" }}>
            <a href="#follow" className="btn-lime">{t("hero.joinBtn")} <ChevronRight /></a>
            <a href={SOCIALS.callumSpotify} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              <SpotifyIcon /> {t("hero.streamBtn")}
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "2rem", zIndex: 2, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", writingMode: "vertical-rl", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {t("hero.scroll")}
          <div style={{ width: "1px", height: "40px", backgroundColor: "#b5ff3a" }} />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ backgroundColor: "#b5ff3a", overflow: "hidden", padding: "0.75rem 0" }}>
        <div className="animate-ticker" style={{ display: "flex", whiteSpace: "nowrap", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.08em", color: "#0d0d0d", gap: "3rem" }}>
          {Array(2).fill(null).map((_, i) => (
            <span key={i} style={{ display: "flex", gap: "3rem" }}>
              {t("ticker.items").split(" ★ ").map((text, j) => (
                <span key={j}>{text} <span style={{ color: "#4a7a00" }}>★</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div ref={statsSection.ref} style={{ backgroundColor: "#161616", borderBottom: "1px solid #2a2a2a", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[
            { num: "12,000", key: "stats.hydro" },
            { num: "#1",     key: "stats.scotland" },
            { num: "#4",     key: "stats.uk" },
            { num: "3",      key: "stats.albums" },
            { num: "1.6K",   key: "stats.fanclub" },
            { num: "13.5K",  key: "stats.tiktok" },
          ].map(({ num, key }, i) => (
            <div key={i} style={{ opacity: statsSection.inView ? 1 : 0, transform: statsSection.inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
              <div className="display-headline" style={{ fontSize: "3rem", color: "#b5ff3a", lineHeight: 1 }}>{num}</div>
              <div className="ui-label" style={{ color: "#888", marginTop: "0.4rem" }}>{t(key)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={aboutSection.ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="md:grid-cols-2 grid-cols-1">
          <div style={{ position: "relative", opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s ease" }}>
            <img src={ASSETS.callumPhoto} alt="Callum Beattie" style={{ width: "100%", height: "600px", objectFit: "cover", objectPosition: "top", filter: "grayscale(20%)" }} />
            <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "100%", height: "100%", border: "3px solid #b5ff3a", zIndex: -1 }} />
          </div>
          <div style={{ opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(40px)", transition: "all 0.7s ease 0.2s" }}>
            <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem" }}>{t("about.tag")}</p>
            <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 0.9, marginBottom: "1.5rem", whiteSpace: "pre-line" }}>
              {t("about.headline")}
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", lineHeight: 1.7, color: "#ccc", marginBottom: "1.5rem" }}>
              {t("about.p1")}
            </p>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", lineHeight: 1.7, color: "#ccc", marginBottom: "2rem" }}>
              {t("about.p2").split("INDI").map((part, i, arr) =>
                i < arr.length - 1
                  ? <span key={i}>{part}<em style={{ color: "#b5ff3a" }}>INDI</em></span>
                  : <span key={i}>{part}</span>
              )}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={SOCIALS.callumWebsite} target="_blank" rel="noopener noreferrer" className="btn-lime">{t("about.officialBtn")} <ExternalLink /></a>
              <a href={SOCIALS.callumInstagram} target="_blank" rel="noopener noreferrer" className="btn-outline-lime"><InstagramIcon /> {t("about.followBtn")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALBUM ── */}
      <section id="music" style={{ position: "relative", overflow: "hidden", backgroundImage: `url(${ASSETS.musicTexture})`, backgroundSize: "cover", backgroundPosition: "center", padding: "6rem 2rem" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(13,13,13,0.88)" }} />
        <div ref={albumSection.ref} style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem", opacity: albumSection.inView ? 1 : 0, transition: "opacity 0.5s ease" }}>{t("album.tag")}</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9, marginBottom: "3rem", opacity: albumSection.inView ? 1 : 0, transform: albumSection.inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.1s" }}>
            {t("album.title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4rem", alignItems: "start" }} className="md:grid-cols-2-auto grid-cols-1">
            <div style={{ opacity: albumSection.inView ? 1 : 0, transform: albumSection.inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.2s" }}>
              <img src={ASSETS.indiVinyl} alt="INDI Album — Callum Beattie" style={{ width: "280px", height: "280px", objectFit: "cover" }} />
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href={SOCIALS.callumSpotify} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ textAlign: "center", justifyContent: "center" }}>
                  <SpotifyIcon /> {t("album.streamBtn")}
                </a>
                <a href="https://callumbeattiemusic.com/home/" target="_blank" rel="noopener noreferrer" className="btn-outline-lime" style={{ textAlign: "center", justifyContent: "center" }}>
                  {t("album.orderBtn")}
                </a>
              </div>
            </div>
            <div style={{ opacity: albumSection.inView ? 1 : 0, transform: albumSection.inView ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
              <p className="ui-label" style={{ color: "#888", marginBottom: "1.5rem" }}>{t("album.tracklist")}</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {TRACKS.map((track, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid #2a2a2a", cursor: "pointer", transition: "all 0.15s ease" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0.5rem"; (e.currentTarget as HTMLDivElement).style.color = "#b5ff3a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; (e.currentTarget as HTMLDivElement).style.color = "#f0ede8"; }}
                  >
                    <span className="ui-label" style={{ color: "#555", minWidth: "1.5rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}>{track}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#555", marginTop: "1rem" }}>{t("album.formats")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVO HYDRO ── */}
      <section style={{ position: "relative", height: "500px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${ASSETS.scotlandStage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,13,13,0.7) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 2rem", maxWidth: "800px" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem" }}>{t("hydro.tag")}</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.9, marginBottom: "1.5rem", whiteSpace: "pre-line" }}>
            {t("hydro.title")}
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", color: "#ccc", maxWidth: "500px", lineHeight: 1.6 }}>
            {t("hydro.desc")}
          </p>
        </div>
      </section>

      {/* ── TOUR ── */}
      <section id="tour" style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={tourSection.ref}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "0.75rem", opacity: tourSection.inView ? 1 : 0, transition: "opacity 0.5s" }}>{t("tour.tag")}</p>
              <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9, opacity: tourSection.inView ? 1 : 0, transform: tourSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
                {t("tour.title")}
              </h2>
            </div>
            <a href="https://callumbeattiemusic.com/home/" target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              {t("tour.allDates")} <ExternalLink />
            </a>
          </div>
          <div style={{ borderTop: "1px solid #2a2a2a" }}>
            {TOUR_DATES.map((show, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.25rem 0", borderBottom: "1px solid #2a2a2a", flexWrap: "wrap", opacity: tourSection.inView ? 1 : 0, transform: tourSection.inView ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.07}s` }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.backgroundColor = "#161616"; el.style.paddingLeft = "1rem"; el.style.marginLeft = "-1rem"; el.style.paddingRight = "1rem"; el.style.marginRight = "-1rem"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.backgroundColor = "transparent"; el.style.paddingLeft = "0"; el.style.marginLeft = "0"; el.style.paddingRight = "0"; el.style.marginRight = "0"; }}
              >
                <span className="display-headline" style={{ fontSize: "1.1rem", color: "#b5ff3a", minWidth: "160px" }}>{show.date}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem" }}>{show.venue}</div>
                  <div className="ui-label" style={{ color: "#888", marginTop: "0.2rem" }}>{show.city}</div>
                </div>
                <a href={show.tickets} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "0.85rem", padding: "0.5rem 1.2rem", whiteSpace: "nowrap" }}>
                  {t("tour.tickets")} <ExternalLink />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section id="community" style={{ position: "relative", overflow: "hidden", backgroundImage: `url(${ASSETS.fanCommunity})`, backgroundSize: "cover", backgroundPosition: "center", padding: "8rem 2rem" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(13,13,13,0.82)" }} />
        <div ref={communitySection.ref} style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem", opacity: communitySection.inView ? 1 : 0, transition: "opacity 0.5s ease" }}>{t("community.tag")}</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9, marginBottom: "1.5rem", whiteSpace: "pre-line", opacity: communitySection.inView ? 1 : 0, transform: communitySection.inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.1s" }}>
            {t("community.title").split("\n").map((line, i) =>
              i === 1 ? <span key={i} style={{ color: "#b5ff3a" }}>{line}</span> : <span key={i}>{line}<br /></span>
            )}
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.15rem", lineHeight: 1.7, color: "#ccc", marginBottom: "2.5rem", opacity: communitySection.inView ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            {t("community.desc")}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", opacity: communitySection.inView ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
            <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="btn-lime"><FacebookIcon /> {t("community.fbBtn")}</a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline-lime"><InstagramIcon /> {t("community.igBtn")}</a>
          </div>
        </div>
      </section>

      {/* ── FOLLOW ── */}
      <section id="follow" style={{ padding: "6rem 2rem", backgroundColor: "#0d0d0d" }}>
        <div ref={followSection.ref} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "0.75rem", opacity: followSection.inView ? 1 : 0, transition: "opacity 0.5s" }}>{t("follow.tag")}</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9, marginBottom: "1rem", whiteSpace: "pre-line", opacity: followSection.inView ? 1 : 0, transform: followSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
            {t("follow.title")}
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", color: "#888", marginBottom: "3rem", maxWidth: "500px", opacity: followSection.inView ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            {t("follow.desc")}
          </p>

          {/* Fan Club accounts */}
          <div style={{ marginBottom: "4rem" }}>
            <p className="ui-label" style={{ color: "#555", marginBottom: "1.5rem" }}>{t("follow.fanClubLabel")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { icon: <FacebookIcon />,  platform: "Facebook",  handle: "@callumbeattiefanclub",    followersKey: "follow.fb.followers", url: SOCIALS.facebook,  color: "#1877f2", ctaKey: "follow.fb.cta" },
                { icon: <InstagramIcon />, platform: "Instagram", handle: "@callum_beattie_fan_club", followersKey: "follow.ig.followers", url: SOCIALS.instagram, color: "#e1306c", ctaKey: "follow.ig.cta" },
                { icon: <TikTokIcon />,    platform: "TikTok",    handle: "@callumbeattiefanclub",    followersKey: "follow.tt.followers", url: SOCIALS.tiktok,    color: "#ff0050", ctaKey: "follow.tt.cta" },
                { icon: <YouTubeIcon />,   platform: "YouTube",   handle: "@callumbeattiefanclub",    followersKey: "follow.yt.followers", url: SOCIALS.youtube,   color: "#ff0000", ctaKey: "follow.yt.cta" },
              ].map(({ icon, platform, handle, followersKey, url, color, ctaKey }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ backgroundColor: "#161616", border: "1px solid #2a2a2a", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", textDecoration: "none", color: "#f0ede8", transition: "all 0.2s ease", opacity: followSection.inView ? 1 : 0, transform: followSection.inView ? "translateY(0)" : "translateY(20px)", transitionDelay: `${0.1 + i * 0.07}s` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = color; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
                >
                  <div style={{ color, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {icon}<span className="ui-label" style={{ color }}>{platform}</span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>{handle}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#888" }}>{t(followersKey)}</div>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "0.3rem", color: "#b5ff3a", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>
                    {t(ctaKey)} <ChevronRight />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Callum's official accounts */}
          <div>
            <p className="ui-label" style={{ color: "#555", marginBottom: "1.5rem" }}>{t("follow.callumLabel")}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { icon: <InstagramIcon />, platform: "Instagram", handle: "@callumbeattieofficial", noteKey: "follow.callum.ig.note", url: SOCIALS.callumInstagram, color: "#e1306c" },
                { icon: <FacebookIcon />,  platform: "Facebook",  handle: "callumbeattieofficial",  noteKey: "follow.callum.fb.note", url: SOCIALS.callumFacebook,  color: "#1877f2" },
                { icon: <SpotifyIcon />,   platform: "Spotify",   handle: "Callum Beattie",         noteKey: "follow.callum.sp.note", url: SOCIALS.callumSpotify,   color: "#1db954" },
                { icon: <YouTubeIcon />,   platform: "YouTube",   handle: "CallumBeattieVEVO",      noteKey: "follow.callum.yt.note", url: SOCIALS.callumYoutube,   color: "#ff0000" },
                { icon: <TikTokIcon />,    platform: "TikTok",    handle: "@callumbeattieofficial", noteKey: "follow.callum.tt.note", url: SOCIALS.callumTikTok,    color: "#ff0050" },
              ].map(({ icon, platform, handle, noteKey, url, color }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ backgroundColor: "#0d0d0d", border: "1px solid #2a2a2a", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", color: "#f0ede8", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = color; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#161616"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0d0d0d"; }}
                >
                  <div style={{ color, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.85rem" }}>{handle}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#888" }}>{t(noteKey)}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#b5ff3a" }}><ChevronRight /></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#111" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "0.75rem" }}>{t("videos.tag")}</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9, marginBottom: "3rem" }}>{t("videos.title")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { id: "dROMSjh7SQM", titleKey: "videos.v1.title", noteKey: "videos.v1.note" },
              { id: "BkDjMsYMxRk", titleKey: "videos.v2.title", noteKey: "videos.v2.note" },
              { id: "kjTJYNm59BU", titleKey: "videos.v3.title", noteKey: "videos.v3.note" },
            ].map(({ id, titleKey, noteKey }, i) => (
              <a key={i} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none", color: "#f0ede8", backgroundColor: "#161616", border: "1px solid #2a2a2a", overflow: "hidden", transition: "all 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#b5ff3a"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
                  <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={t(titleKey)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <div style={{ width: "56px", height: "56px", backgroundColor: "#b5ff3a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 24 24" fill="#0d0d0d" style={{ width: "24px", height: "24px", marginLeft: "3px" }}><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{t(titleKey)}</div>
                  <div className="ui-label" style={{ color: "#888" }}>{t(noteKey)}</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              <YouTubeIcon /> {t("videos.allBtn")}
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "8rem 2rem", backgroundColor: "#0d0d0d", borderTop: "1px solid #2a2a2a", textAlign: "center" }}>
        <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem" }}>{t("cta.tag")}</p>
        <h2 className="display-headline" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.88, marginBottom: "1.5rem", whiteSpace: "pre-line" }}>
          {t("cta.title").split("\n").map((line, i) =>
            i === 2
              ? <span key={i} style={{ color: "#b5ff3a" }}>{line}</span>
              : <span key={i}>{line}<br /></span>
          )}
        </h2>
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.15rem", color: "#888", maxWidth: "500px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
          {t("cta.desc")}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="btn-lime"><FacebookIcon /> {t("cta.fanBtn")}</a>
          <a href={SOCIALS.callumInstagram} target="_blank" rel="noopener noreferrer" className="btn-outline-lime"><InstagramIcon /> {t("cta.callumBtn")}</a>
          <a href={SOCIALS.callumSpotify} target="_blank" rel="noopener noreferrer" className="btn-outline-lime"><SpotifyIcon /> {t("cta.streamBtn")}</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div className="display-headline" style={{ fontSize: "1.8rem", color: "#f0ede8", marginBottom: "0.3rem" }}>
              CALLUM BEATTIE <span style={{ color: "#b5ff3a" }}>FAN CLUB</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#555" }}>
              {t("footer.disclaimer")}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {[
              { icon: <FacebookIcon />,  url: SOCIALS.facebook },
              { icon: <InstagramIcon />, url: SOCIALS.instagram },
              { icon: <TikTokIcon />,    url: SOCIALS.tiktok },
              { icon: <YouTubeIcon />,   url: SOCIALS.youtube },
            ].map(({ icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                style={{ color: "#555", transition: "color 0.15s ease", display: "flex" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#b5ff3a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              >{icon}</a>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "2rem auto 0", borderTop: "1px solid #1a1a1a", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#444" }}>{t("footer.copyright")}</p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#444" }}>#callumbeattie #wearestars #indi</p>
        </div>
      </footer>
    </div>
  );
}
