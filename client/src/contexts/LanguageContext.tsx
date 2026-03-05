import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "pt";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("pt");

  function t(key: string): string {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry["en"] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── All site copy ────────────────────────────────────────────────────────────
const translations: Record<string, { en: string; pt: string }> = {
  // NAV
  "nav.about":       { en: "About",     pt: "Sobre" },
  "nav.music":       { en: "Music",     pt: "Música" },
  "nav.tour":        { en: "Tour",      pt: "Digressão" },
  "nav.community":   { en: "Community", pt: "Comunidade" },
  "nav.follow":      { en: "Follow",    pt: "Seguir" },
  "nav.officialSite":{ en: "Official Site", pt: "Site Oficial" },

  // HERO
  "hero.tag":        { en: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland's Anthemic Voice", pt: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 A Voz Hino da Escócia" },
  "hero.sub":        { en: "FAN CLUB — WE ARE STARS",  pt: "FÃ CLUBE — SOMOS ESTRELAS" },
  "hero.joinBtn":    { en: "Join the Fan Club",         pt: "Juntar ao Fã Clube" },
  "hero.streamBtn":  { en: "Stream INDI",               pt: "Ouvir INDI" },
  "hero.scroll":     { en: "Scroll",                    pt: "Rolar" },

  // TICKER
  "ticker.items": {
    en: "NEW ALBUM 'INDI' — OUT NOW ★ #1 SCOTLAND ★ #4 UK CHART ★ OVO HYDRO — 12,000 FANS SOLD OUT ★ UK TOUR MARCH 2026 ★ FOLLOW US ON SOCIALS ★ WE ARE STARS ★ STREAM ON SPOTIFY ★ EDINBURGH CASTLE — JULY 2026",
    pt: "NOVO ÁLBUM 'INDI' — JÁ DISPONÍVEL ★ #1 ESCÓCIA ★ #4 REINO UNIDO ★ OVO HYDRO — 12.000 FÃS ESGOTADO ★ DIGRESSÃO REINO UNIDO MARÇO 2026 ★ SEGUE-NOS NAS REDES ★ SOMOS ESTRELAS ★ OUVE NO SPOTIFY ★ CASTELO DE EDIMBURGO — JULHO 2026",
  },

  // STATS
  "stats.hydro":    { en: "OVO Hydro Fans",        pt: "Fãs no OVO Hydro" },
  "stats.scotland": { en: "Scottish Album Chart",  pt: "Tabela Álbuns Escócia" },
  "stats.uk":       { en: "UK Album Chart",        pt: "Tabela Álbuns Reino Unido" },
  "stats.albums":   { en: "Studio Albums",         pt: "Álbuns de Estúdio" },
  "stats.fanclub":  { en: "Fan Club Followers",    pt: "Seguidores do Fã Clube" },
  "stats.tiktok":   { en: "TikTok Likes",          pt: "Gostos no TikTok" },

  // ABOUT
  "about.tag":      { en: "About Callum",           pt: "Sobre o Callum" },
  "about.headline": { en: "SCOTLAND'S\nAUTHENTIC\nVOICE",  pt: "A VOZ\nAUTÊNTICA\nDA ESCÓCIA" },
  "about.p1":       {
    en: "Born in Musselburgh, East Lothian, Callum Beattie has built a reputation as one of the most genuine and emotionally resonant voices in modern Scottish music. From small venues to selling out Glasgow's OVO Hydro to 12,000 fans — his journey is one of raw talent and relentless dedication.",
    pt: "Nascido em Musselburgh, East Lothian, Callum Beattie construiu uma reputação como uma das vozes mais genuínas e emocionalmente ressonantes da música escocesa moderna. De pequenos palcos a esgotar o OVO Hydro de Glasgow com 12.000 fãs — a sua jornada é de talento puro e dedicação incansável.",
  },
  "about.p2":       {
    en: "His third album INDI — released January 2026 — debuted at #1 in Scotland and #4 in the UK, cementing his place as one of Britain's most compelling singer-songwriters.",
    pt: "O seu terceiro álbum INDI — lançado em janeiro de 2026 — estreou em #1 na Escócia e #4 no Reino Unido, consolidando o seu lugar como um dos compositores mais cativantes da Grã-Bretanha.",
  },
  "about.officialBtn": { en: "Official Website", pt: "Site Oficial" },
  "about.followBtn":   { en: "Follow Callum",    pt: "Seguir o Callum" },

  // ALBUM
  "album.tag":       { en: "Latest Release",        pt: "Último Lançamento" },
  "album.title":     { en: "INDI — OUT NOW",         pt: "INDI — JÁ DISPONÍVEL" },
  "album.tracklist": { en: "Tracklisting",           pt: "Lista de Faixas" },
  "album.streamBtn": { en: "Stream Now",             pt: "Ouvir Agora" },
  "album.orderBtn":  { en: "Order Physical Copy",    pt: "Encomendar Cópia Física" },
  "album.formats":   {
    en: "Available on CD, Coloured Vinyl, Cassette, Download & Streaming",
    pt: "Disponível em CD, Vinil Colorido, Cassete, Download e Streaming",
  },

  // OVO HYDRO
  "hydro.tag":   { en: "November 2025",   pt: "Novembro 2025" },
  "hydro.title": { en: "12,000 FANS.\nOVO HYDRO.\nSOLD OUT.", pt: "12.000 FÃS.\nOVO HYDRO.\nESOGOTADO." },
  "hydro.desc":  {
    en: "Callum headlined Glasgow's iconic OVO Hydro in front of 12,000 fans — the biggest show of his career. The real Glasgow showed up.",
    pt: "Callum foi o cabeça de cartaz do icónico OVO Hydro de Glasgow perante 12.000 fãs — o maior espetáculo da sua carreira. O verdadeiro Glasgow apareceu.",
  },

  // TOUR
  "tour.tag":      { en: "Live Dates",   pt: "Datas ao Vivo" },
  "tour.title":    { en: "2026 TOUR",    pt: "DIGRESSÃO 2026" },
  "tour.allDates": { en: "All Dates",    pt: "Todas as Datas" },
  "tour.tickets":  { en: "Tickets",      pt: "Bilhetes" },

  // COMMUNITY
  "community.tag":   { en: "The Fan Club",  pt: "O Fã Clube" },
  "community.title": { en: "WE ARE THE\nSTARS", pt: "SOMOS AS\nESTRELAS" },
  "community.desc":  {
    en: "We are a fan page dedicated to supporting the incredible talent of Callum Beattie. A place to share videos, photos, news, and to help further Callum's career path — helping him reach the stardom he so well deserves.",
    pt: "Somos uma página de fãs dedicada a apoiar o incrível talento de Callum Beattie. Um lugar para partilhar vídeos, fotos, notícias e ajudar a impulsionar a carreira do Callum — ajudando-o a alcançar a fama que tão bem merece.",
  },
  "community.fbBtn": { en: "Follow on Facebook",  pt: "Seguir no Facebook" },
  "community.igBtn": { en: "Follow on Instagram", pt: "Seguir no Instagram" },

  // FOLLOW
  "follow.tag":        { en: "Stay Connected",         pt: "Fica Ligado" },
  "follow.title":      { en: "FOLLOW THE\nFAN CLUB",   pt: "SEGUE O\nFÃ CLUBE" },
  "follow.desc":       {
    en: "Join thousands of fans across all platforms. Every follow helps Callum reach more people.",
    pt: "Junta-te a milhares de fãs em todas as plataformas. Cada seguidor ajuda o Callum a chegar a mais pessoas.",
  },
  "follow.fanClubLabel":  { en: "Fan Club Accounts — Follow Us!", pt: "Contas do Fã Clube — Segue-nos!" },
  "follow.callumLabel":   { en: "Follow Callum Beattie Directly", pt: "Segue o Callum Beattie Diretamente" },
  "follow.fb.cta":        { en: "Follow on Facebook",  pt: "Seguir no Facebook" },
  "follow.ig.cta":        { en: "Follow on Instagram", pt: "Seguir no Instagram" },
  "follow.tt.cta":        { en: "Follow on TikTok",    pt: "Seguir no TikTok" },
  "follow.yt.cta":        { en: "Subscribe on YouTube",pt: "Subscrever no YouTube" },
  "follow.fb.followers":  { en: "1.6K followers",           pt: "1,6 mil seguidores" },
  "follow.ig.followers":  { en: "Fan photos & updates",     pt: "Fotos de fãs e novidades" },
  "follow.tt.followers":  { en: "1.5K followers · 13.5K likes", pt: "1,5 mil seguidores · 13,5 mil gostos" },
  "follow.yt.followers":  { en: "818 subscribers · 165 videos", pt: "818 subscritores · 165 vídeos" },
  "follow.callum.ig.note":{ en: "69K followers",        pt: "69 mil seguidores" },
  "follow.callum.fb.note":{ en: "Official page",        pt: "Página oficial" },
  "follow.callum.sp.note":{ en: "Stream INDI now",      pt: "Ouvir INDI agora" },
  "follow.callum.yt.note":{ en: "Official videos",      pt: "Vídeos oficiais" },
  "follow.callum.tt.note":{ en: "Official TikTok",      pt: "TikTok oficial" },

  // VIDEOS
  "videos.tag":   { en: "Watch",          pt: "Ver" },
  "videos.title": { en: "LATEST VIDEOS",  pt: "ÚLTIMOS VÍDEOS" },
  "videos.v1.title": { en: "Wild Mountain Thyme — OVO Hydro Live", pt: "Wild Mountain Thyme — Ao Vivo no OVO Hydro" },
  "videos.v1.note":  { en: "Live at OVO Hydro, Glasgow",           pt: "Ao vivo no OVO Hydro, Glasgow" },
  "videos.v2.title": { en: "Always Rains in Glasgow — Official Video", pt: "Always Rains in Glasgow — Vídeo Oficial" },
  "videos.v2.note":  { en: "From the album INDI",                  pt: "Do álbum INDI" },
  "videos.v3.title": { en: "We Are Stars — Sofar London",          pt: "We Are Stars — Sofar Londres" },
  "videos.v3.note":  { en: "Debut single, 2017",                   pt: "Single de estreia, 2017" },
  "videos.allBtn":   { en: "All Videos on YouTube",                pt: "Todos os Vídeos no YouTube" },

  // FINAL CTA
  "cta.tag":   { en: "Join the Movement",                    pt: "Junta-te ao Movimento" },
  "cta.title": { en: "HELP CALLUM\nREACH THE\nSTARS",        pt: "AJUDA O CALLUM\nA ALCANÇAR\nAS ESTRELAS" },
  "cta.desc":  {
    en: "Every follow, every share, every stream makes a difference. Be part of the story.",
    pt: "Cada seguidor, cada partilha, cada reprodução faz a diferença. Faz parte desta história.",
  },
  "cta.fanBtn":    { en: "Follow Fan Club",  pt: "Seguir Fã Clube" },
  "cta.callumBtn": { en: "Follow Callum",    pt: "Seguir Callum" },
  "cta.streamBtn": { en: "Stream INDI",      pt: "Ouvir INDI" },

  // FOOTER
  "footer.disclaimer": {
    en: "An independent fan community. Not officially affiliated with Callum Beattie.",
    pt: "Uma comunidade de fãs independente. Não oficialmente afiliada com Callum Beattie.",
  },
  "footer.copyright": { en: "© 2026 Callum Beattie Fan Club. All rights reserved.", pt: "© 2026 Fã Clube Callum Beattie. Todos os direitos reservados." },
};
