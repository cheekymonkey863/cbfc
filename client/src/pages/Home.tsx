/*
 * CALLUM BEATTIE FAN CLUB — Home Page
 * Design: Glasgow Brutalist Punk
 * Colors: #0d0d0d bg, #f0ede8 text, #b5ff3a lime accent
 * Fonts: Bebas Neue (display), Source Serif 4 (body), Space Grotesk (UI)
 * Layout: Asymmetric, staggered, full-bleed photography
 */

import { useEffect, useRef, useState } from "react";

// CDN URLs for all assets
const ASSETS = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/hero_bg-dyBBWuykvAtBFMFr7zMtks.webp",
  fanCommunity: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/fan_community-KWfNVLUAPFntNxB55XiDWX.webp",
  musicTexture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/music_texture-R2eZfEH8xoabhnSeSDKCzr.webp",
  scotlandStage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/scotland_stage-MaBUxMMu3Zbt2ovwtZRREZ.webp",
  callumPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_official_photo1_56d32b62.webp",
  ovoHydro1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_ovo_hydro1_79715a6d.jpg",
  ovoHydro2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_ovo_hydro2_a6834806.jpg",
  indiPress: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_indi_press_016bd902.jpg",
  indiVinyl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_indi_vinyl_11908bd5.jpg",
  indiSpotify: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_indi_spotify_6addf4ba.jpg",
  facebookCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663398957368/TR9F8icgEr5fDHtduajcGC/callum_facebook_cover_9c32a870.jpeg",
};

const SOCIALS = {
  facebook: "https://www.facebook.com/callumbeattiefanclub/",
  instagram: "https://www.instagram.com/callum_beattie_fan_club/",
  tiktok: "https://www.tiktok.com/@callumbeattiefanclub",
  youtube: "https://www.youtube.com/@callumbeattiefanclub",
  callumInstagram: "https://www.instagram.com/callumbeattieofficial/",
  callumFacebook: "https://www.facebook.com/callumbeattieofficial",
  callumSpotify: "https://open.spotify.com/artist/4uFxymnU41sM7ytUCjuYTN",
  callumYoutube: "https://www.youtube.com/@CallumBeattieVEVO",
  callumWebsite: "https://callumbeattiemusic.com",
  callumTikTok: "https://www.tiktok.com/@callumbeattieofficial",
};

const TOUR_DATES = [
  { date: "FRI 20 MAR", venue: "Gorilla", city: "Manchester", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SAT 21 MAR", venue: "Northumbria University", city: "Newcastle", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "THU 26 MAR", venue: "Scala", city: "London", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "FRI 27 MAR", venue: "Thekla", city: "Bristol", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "SAT 28 MAR", venue: "O2 Institute2", city: "Birmingham", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "FRI 10 JUL", venue: "Edinburgh Castle Esplanade", city: "Edinburgh", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "THU 30 JUL", venue: "Belladrum Estate", city: "Inverness", tickets: "https://callumbeattiemusic.com/home/" },
  { date: "FRI 28 AUG", venue: "Queen's Park Recreation Ground", city: "Glasgow", tickets: "https://callumbeattiemusic.com/home/" },
];

const TRACKS = [
  "Two Pretenders",
  "Always Rains in Glasgow",
  "Bed Is Burning",
  "Pins and Needles",
  "Birthday",
  "Something In My Eye",
  "Lanterns",
  "Salamander Street",
  "Heart Stops Beating",
  "Easter Road",
  "We Are Stars",
];

// Intersection Observer hook for scroll animations
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

// Facebook icon
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Instagram icon
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// TikTok icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
  </svg>
);

// YouTube icon
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Spotify icon
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

// Chevron right
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

// External link
const ExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutSection = useInView();
  const albumSection = useInView();
  const tourSection = useInView();
  const communitySection = useInView();
  const followSection = useInView();
  const statsSection = useInView();

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "#f0ede8", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(13,13,13,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.05em" }}>
          <span style={{ color: "#b5ff3a" }}>CALLUM BEATTIE</span>
          <span style={{ color: "#888", marginLeft: "0.5rem", fontSize: "0.9rem" }}>FAN CLUB</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: "2rem", alignItems: "center" }}>
          {["About", "Music", "Tour", "Community", "Follow"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#b5ff3a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >{item}</a>
          ))}
          <a href={SOCIALS.callumWebsite} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "0.85rem", padding: "0.5rem 1.2rem" }}>
            Official Site
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#f0ede8", fontSize: "1.5rem", cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          backgroundColor: "#0d0d0d", borderBottom: "1px solid #2a2a2a",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem"
        }}>
          {["About", "Music", "Tour", "Community", "Follow"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#f0ede8", textDecoration: "none" }}>
              {item}
            </a>
          ))}
          <a href={SOCIALS.callumWebsite} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ textAlign: "center" }}>
            Official Site
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "5rem",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${ASSETS.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "brightness(0.45)",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.3) 50%, transparent 100%)",
        }} />

        {/* Hero content — anchored bottom-left */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 2rem", maxWidth: "900px" }}>
          <p className="ui-label animate-fade-up" style={{ color: "#b5ff3a", marginBottom: "1rem", opacity: 0, animationFillMode: "forwards" }}>
            🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland's Anthemic Voice
          </p>
          <h1 className="display-headline animate-fade-up delay-100" style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
            lineHeight: "0.88",
            color: "#f0ede8",
            opacity: 0,
            animationFillMode: "forwards",
            marginBottom: "0.5rem",
          }}>
            CALLUM<br />
            <span style={{ color: "#b5ff3a", WebkitTextStroke: "0px" }}>BEATTIE</span>
          </h1>
          <h2 className="display-headline animate-fade-up delay-200" style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            color: "#888",
            opacity: 0,
            animationFillMode: "forwards",
            marginBottom: "2rem",
          }}>
            FAN CLUB — WE ARE STARS
          </h2>
          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0, animationFillMode: "forwards" }}>
            <a href="#follow" className="btn-lime">
              Join the Fan Club <ChevronRight />
            </a>
            <a href={SOCIALS.callumSpotify} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              <SpotifyIcon /> Stream INDI
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", right: "2rem", zIndex: 2,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em",
          color: "#555", textTransform: "uppercase", writingMode: "vertical-rl",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          Scroll
          <div style={{ width: "1px", height: "40px", backgroundColor: "#b5ff3a" }} />
        </div>
      </section>

      {/* ── TICKER BANNER ── */}
      <div style={{
        backgroundColor: "#b5ff3a",
        overflow: "hidden",
        padding: "0.75rem 0",
        borderTop: "none",
        borderBottom: "none",
      }}>
        <div className="animate-ticker" style={{
          display: "flex",
          whiteSpace: "nowrap",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.2rem",
          letterSpacing: "0.08em",
          color: "#0d0d0d",
          gap: "3rem",
        }}>
          {Array(2).fill(null).map((_, i) => (
            <span key={i} style={{ display: "flex", gap: "3rem" }}>
              {["NEW ALBUM 'INDI' — OUT NOW", "#1 SCOTLAND", "#4 UK CHART", "OVO HYDRO — 12,000 FANS SOLD OUT", "UK TOUR MARCH 2026", "FOLLOW US ON SOCIALS", "WE ARE STARS", "STREAM ON SPOTIFY", "EDINBURGH CASTLE — JULY 2026"].map((text, j) => (
                <span key={j}>{text} <span style={{ color: "#4a7a00" }}>★</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div ref={statsSection.ref} style={{ backgroundColor: "#161616", borderBottom: "1px solid #2a2a2a", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[
            { num: "12,000", label: "OVO Hydro Fans" },
            { num: "#1", label: "Scottish Album Chart" },
            { num: "#4", label: "UK Album Chart" },
            { num: "3", label: "Studio Albums" },
            { num: "1.6K", label: "Fan Club Followers" },
            { num: "13.5K", label: "TikTok Likes" },
          ].map(({ num, label }, i) => (
            <div key={i} style={{
              opacity: statsSection.inView ? 1 : 0,
              transform: statsSection.inView ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}>
              <div className="display-headline" style={{ fontSize: "3rem", color: "#b5ff3a", lineHeight: 1 }}>{num}</div>
              <div className="ui-label" style={{ color: "#888", marginTop: "0.4rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={aboutSection.ref} style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }} className="md:grid-cols-2 grid-cols-1">
          {/* Image */}
          <div style={{
            position: "relative",
            opacity: aboutSection.inView ? 1 : 0,
            transform: aboutSection.inView ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.7s ease",
          }}>
            <img
              src={ASSETS.callumPhoto}
              alt="Callum Beattie"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                objectPosition: "top",
                filter: "grayscale(20%)",
              }}
            />
            {/* Lime accent border */}
            <div style={{
              position: "absolute",
              bottom: "-12px",
              right: "-12px",
              width: "100%",
              height: "100%",
              border: "3px solid #b5ff3a",
              zIndex: -1,
            }} />
          </div>

          {/* Text */}
          <div style={{
            opacity: aboutSection.inView ? 1 : 0,
            transform: aboutSection.inView ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem" }}>About Callum</p>
            <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 0.9, marginBottom: "1.5rem" }}>
              SCOTLAND'S<br />AUTHENTIC<br />VOICE
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", lineHeight: 1.7, color: "#ccc", marginBottom: "1.5rem" }}>
              Born in Musselburgh, East Lothian, Callum Beattie has built a reputation as one of the most genuine and emotionally resonant voices in modern Scottish music. From small venues to selling out Glasgow's OVO Hydro to 12,000 fans — his journey is one of raw talent and relentless dedication.
            </p>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", lineHeight: 1.7, color: "#ccc", marginBottom: "2rem" }}>
              His third album <em style={{ color: "#b5ff3a" }}>INDI</em> — released January 2026 — debuted at #1 in Scotland and #4 in the UK, cementing his place as one of Britain's most compelling singer-songwriters.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={SOCIALS.callumWebsite} target="_blank" rel="noopener noreferrer" className="btn-lime">
                Official Website <ExternalLink />
              </a>
              <a href={SOCIALS.callumInstagram} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
                <InstagramIcon /> Follow Callum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALBUM SECTION ── */}
      <section id="music" style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${ASSETS.musicTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "6rem 2rem",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(13,13,13,0.88)",
        }} />
        <div ref={albumSection.ref} style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem", opacity: albumSection.inView ? 1 : 0, transition: "opacity 0.5s ease" }}>Latest Release</p>
          <h2 className="display-headline" style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 0.9,
            marginBottom: "3rem",
            opacity: albumSection.inView ? 1 : 0,
            transform: albumSection.inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            INDI — OUT NOW
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4rem", alignItems: "start" }} className="md:grid-cols-2-auto grid-cols-1">
            {/* Album art */}
            <div style={{
              opacity: albumSection.inView ? 1 : 0,
              transform: albumSection.inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.2s",
            }}>
              <img
                src={ASSETS.indiVinyl}
                alt="INDI Album — Callum Beattie"
                style={{ width: "280px", height: "280px", objectFit: "cover" }}
              />
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href={SOCIALS.callumSpotify} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ textAlign: "center", justifyContent: "center" }}>
                  <SpotifyIcon /> Stream Now
                </a>
                <a href="https://callumbeattiemusic.com/home/" target="_blank" rel="noopener noreferrer" className="btn-outline-lime" style={{ textAlign: "center", justifyContent: "center" }}>
                  Order Physical Copy
                </a>
              </div>
            </div>

            {/* Track list */}
            <div style={{
              opacity: albumSection.inView ? 1 : 0,
              transform: albumSection.inView ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.6s ease 0.3s",
            }}>
              <p className="ui-label" style={{ color: "#888", marginBottom: "1.5rem" }}>Tracklisting</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {TRACKS.map((track, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid #2a2a2a",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.paddingLeft = "0.5rem";
                      (e.currentTarget as HTMLDivElement).style.color = "#b5ff3a";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
                      (e.currentTarget as HTMLDivElement).style.color = "#f0ede8";
                    }}
                  >
                    <span className="ui-label" style={{ color: "#555", minWidth: "1.5rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}>{track}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#555", marginTop: "1rem" }}>
                Available on CD, Coloured Vinyl, Cassette, Download & Streaming
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVO HYDRO MOMENT ── */}
      <section style={{
        position: "relative",
        height: "500px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${ASSETS.scotlandStage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(13,13,13,0.7) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 2rem", maxWidth: "800px" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem" }}>November 2025</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.9, marginBottom: "1.5rem" }}>
            12,000 FANS.<br />OVO HYDRO.<br />SOLD OUT.
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.1rem", color: "#ccc", maxWidth: "500px", lineHeight: 1.6 }}>
            Callum headlined Glasgow's iconic OVO Hydro in front of 12,000 fans — the biggest show of his career. The real Glasgow showed up.
          </p>
        </div>
      </section>

      {/* ── TOUR DATES ── */}
      <section id="tour" style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={tourSection.ref}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "0.75rem", opacity: tourSection.inView ? 1 : 0, transition: "opacity 0.5s" }}>Live Dates</p>
              <h2 className="display-headline" style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                lineHeight: 0.9,
                opacity: tourSection.inView ? 1 : 0,
                transform: tourSection.inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}>
                2026 TOUR
              </h2>
            </div>
            <a href="https://callumbeattiemusic.com/home/" target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              All Dates <ExternalLink />
            </a>
          </div>

          <div style={{ borderTop: "1px solid #2a2a2a" }}>
            {TOUR_DATES.map((show, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.25rem 0",
                borderBottom: "1px solid #2a2a2a",
                flexWrap: "wrap",
                opacity: tourSection.inView ? 1 : 0,
                transform: tourSection.inView ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#161616";
                  (e.currentTarget as HTMLDivElement).style.paddingLeft = "1rem";
                  (e.currentTarget as HTMLDivElement).style.paddingRight = "1rem";
                  (e.currentTarget as HTMLDivElement).style.marginLeft = "-1rem";
                  (e.currentTarget as HTMLDivElement).style.marginRight = "-1rem";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
                  (e.currentTarget as HTMLDivElement).style.paddingRight = "0";
                  (e.currentTarget as HTMLDivElement).style.marginLeft = "0";
                  (e.currentTarget as HTMLDivElement).style.marginRight = "0";
                }}
              >
                <span className="display-headline" style={{ fontSize: "1.2rem", color: "#b5ff3a", minWidth: "120px" }}>{show.date}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem" }}>{show.venue}</div>
                  <div className="ui-label" style={{ color: "#888", marginTop: "0.2rem" }}>{show.city}</div>
                </div>
                <a href={show.tickets} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "0.85rem", padding: "0.5rem 1.2rem", whiteSpace: "nowrap" }}>
                  Tickets <ExternalLink />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY / FAN CLUB ── */}
      <section id="community" style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${ASSETS.fanCommunity})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "8rem 2rem",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(13,13,13,0.82)" }} />
        <div ref={communitySection.ref} style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="ui-label" style={{
            color: "#b5ff3a", marginBottom: "1rem",
            opacity: communitySection.inView ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}>The Fan Club</p>
          <h2 className="display-headline" style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 0.9,
            marginBottom: "1.5rem",
            opacity: communitySection.inView ? 1 : 0,
            transform: communitySection.inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            WE ARE THE<br /><span style={{ color: "#b5ff3a" }}>STARS</span>
          </h2>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            color: "#ccc",
            marginBottom: "2.5rem",
            opacity: communitySection.inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}>
            We are a fan page dedicated to supporting the incredible talent of Callum Beattie. A place to share videos, photos, news, and to help further Callum's career path — helping him reach the stardom he so well deserves.
          </p>
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: communitySection.inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}>
            <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="btn-lime">
              <FacebookIcon /> Follow on Facebook
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              <InstagramIcon /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── FOLLOW SECTION ── */}
      <section id="follow" style={{ padding: "6rem 2rem", backgroundColor: "#0d0d0d" }}>
        <div ref={followSection.ref} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "0.75rem", opacity: followSection.inView ? 1 : 0, transition: "opacity 0.5s" }}>Stay Connected</p>
          <h2 className="display-headline" style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 0.9,
            marginBottom: "1rem",
            opacity: followSection.inView ? 1 : 0,
            transform: followSection.inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            FOLLOW THE<br />FAN CLUB
          </h2>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: "1.1rem",
            color: "#888",
            marginBottom: "3rem",
            maxWidth: "500px",
            opacity: followSection.inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}>
            Join thousands of fans across all platforms. Every follow helps Callum reach more people.
          </p>

          {/* Fan Club socials */}
          <div style={{ marginBottom: "4rem" }}>
            <p className="ui-label" style={{ color: "#555", marginBottom: "1.5rem" }}>Fan Club Accounts — Follow Us!</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { icon: <FacebookIcon />, platform: "Facebook", handle: "@callumbeattiefanclub", followers: "1.6K followers", url: SOCIALS.facebook, color: "#1877f2", cta: "Follow on Facebook" },
                { icon: <InstagramIcon />, platform: "Instagram", handle: "@callum_beattie_fan_club", followers: "Fan photos & updates", url: SOCIALS.instagram, color: "#e1306c", cta: "Follow on Instagram" },
                { icon: <TikTokIcon />, platform: "TikTok", handle: "@callumbeattiefanclub", followers: "1.5K followers · 13.5K likes", url: SOCIALS.tiktok, color: "#ff0050", cta: "Follow on TikTok" },
                { icon: <YouTubeIcon />, platform: "YouTube", handle: "@callumbeattiefanclub", followers: "818 subscribers · 165 videos", url: SOCIALS.youtube, color: "#ff0000", cta: "Subscribe on YouTube" },
              ].map(({ icon, platform, handle, followers, url, color, cta }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#161616",
                    border: "1px solid #2a2a2a",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    textDecoration: "none",
                    color: "#f0ede8",
                    transition: "all 0.2s ease",
                    opacity: followSection.inView ? 1 : 0,
                    transform: followSection.inView ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${0.1 + i * 0.07}s`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ color, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {icon}
                    <span className="ui-label" style={{ color }}>{platform}</span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>{handle}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#888" }}>{followers}</div>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "0.3rem", color: "#b5ff3a", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>
                    {cta} <ChevronRight />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Callum's official socials */}
          <div>
            <p className="ui-label" style={{ color: "#555", marginBottom: "1.5rem" }}>Follow Callum Beattie Directly</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { icon: <InstagramIcon />, platform: "Instagram", handle: "@callumbeattieofficial", note: "69K followers", url: SOCIALS.callumInstagram, color: "#e1306c" },
                { icon: <FacebookIcon />, platform: "Facebook", handle: "callumbeattieofficial", note: "Official page", url: SOCIALS.callumFacebook, color: "#1877f2" },
                { icon: <SpotifyIcon />, platform: "Spotify", handle: "Callum Beattie", note: "Stream INDI now", url: SOCIALS.callumSpotify, color: "#1db954" },
                { icon: <YouTubeIcon />, platform: "YouTube", handle: "CallumBeattieVEVO", note: "Official videos", url: SOCIALS.callumYoutube, color: "#ff0000" },
                { icon: <TikTokIcon />, platform: "TikTok", handle: "@callumbeattieofficial", note: "Official TikTok", url: SOCIALS.callumTikTok, color: "#ff0050" },
              ].map(({ icon, platform, handle, note, url, color }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#0d0d0d",
                    border: "1px solid #2a2a2a",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "#f0ede8",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#161616";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0d0d0d";
                  }}
                >
                  <div style={{ color, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.85rem" }}>{handle}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#888" }}>{note}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#b5ff3a" }}><ChevronRight /></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS SECTION ── */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#111" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "0.75rem" }}>Watch</p>
          <h2 className="display-headline" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9, marginBottom: "3rem" }}>
            LATEST VIDEOS
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { id: "dROMSjh7SQM", title: "Wild Mountain Thyme — OVO Hydro Live", note: "Live at OVO Hydro, Glasgow" },
              { id: "BkDjMsYMxRk", title: "Always Rains in Glasgow — Official Video", note: "From the album INDI" },
              { id: "kjTJYNm59BU", title: "We Are Stars — Sofar London", note: "Debut single, 2017" },
            ].map(({ id, title, note }, i) => (
              <a key={i} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#f0ede8",
                  backgroundColor: "#161616",
                  border: "1px solid #2a2a2a",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#b5ff3a";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
                  <img
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt={title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}>
                    <div style={{
                      width: "56px", height: "56px",
                      backgroundColor: "#b5ff3a",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg viewBox="0 0 24 24" fill="#0d0d0d" style={{ width: "24px", height: "24px", marginLeft: "3px" }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{title}</div>
                  <div className="ui-label" style={{ color: "#888" }}>{note}</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
              <YouTubeIcon /> All Videos on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: "8rem 2rem",
        backgroundColor: "#0d0d0d",
        borderTop: "1px solid #2a2a2a",
        textAlign: "center",
      }}>
        <p className="ui-label" style={{ color: "#b5ff3a", marginBottom: "1rem" }}>Join the Movement</p>
        <h2 className="display-headline" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.88, marginBottom: "1.5rem" }}>
          HELP CALLUM<br />REACH THE<br /><span style={{ color: "#b5ff3a" }}>STARS</span>
        </h2>
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.15rem", color: "#888", maxWidth: "500px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
          Every follow, every share, every stream makes a difference. Be part of the story.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="btn-lime">
            <FacebookIcon /> Follow Fan Club
          </a>
          <a href={SOCIALS.callumInstagram} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
            <InstagramIcon /> Follow Callum
          </a>
          <a href={SOCIALS.callumSpotify} target="_blank" rel="noopener noreferrer" className="btn-outline-lime">
            <SpotifyIcon /> Stream INDI
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        padding: "3rem 2rem",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div className="display-headline" style={{ fontSize: "1.8rem", color: "#f0ede8", marginBottom: "0.3rem" }}>
              CALLUM BEATTIE <span style={{ color: "#b5ff3a" }}>FAN CLUB</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#555" }}>
              An independent fan community. Not officially affiliated with Callum Beattie.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {[
              { icon: <FacebookIcon />, url: SOCIALS.facebook },
              { icon: <InstagramIcon />, url: SOCIALS.instagram },
              { icon: <TikTokIcon />, url: SOCIALS.tiktok },
              { icon: <YouTubeIcon />, url: SOCIALS.youtube },
            ].map(({ icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                style={{
                  color: "#555",
                  transition: "color 0.15s ease",
                  display: "flex",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#b5ff3a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "2rem auto 0", borderTop: "1px solid #1a1a1a", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#444" }}>
            © 2026 Callum Beattie Fan Club. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#444" }}>
            #callumbeattie #wearestars #indi
          </p>
        </div>
      </footer>
    </div>
  );
}
