import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "pt" | "es";

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
  const [lang, setLang] = useState<Language>("en");

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
const translations: Record<string, { en: string; pt: string; es: string }> = {
  // NAV
  "nav.about":        { en: "About",     pt: "Sobre",       es: "Sobre" },
  "nav.music":        { en: "Music",     pt: "Música",      es: "Música" },
  "nav.tour":         { en: "Tour",      pt: "Digressão",   es: "Gira" },
  "nav.community":    { en: "Community", pt: "Comunidade",  es: "Comunidad" },
  "nav.follow":       { en: "Follow",    pt: "Seguir",      es: "Seguir" },
  "nav.officialSite": { en: "Official Site", pt: "Site Oficial", es: "Sitio Oficial" },

  // HERO
  "hero.tag":     { en: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland's Anthemic Voice", pt: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 A Voz Hino da Escócia",    es: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 La Voz Himno de Escocia" },
  "hero.sub":     { en: "FAN CLUB — WE ARE STARS",  pt: "FÃ CLUBE — SOMOS ESTRELAS", es: "FAN CLUB — SOMOS ESTRELLAS" },
  "hero.joinBtn": { en: "Join the Fan Club",         pt: "Juntar ao Fã Clube",         es: "Únete al Fan Club" },
  "hero.streamBtn":{ en: "Stream INDI",              pt: "Ouvir INDI",                 es: "Escuchar INDI" },
  "hero.scroll":  { en: "Scroll",                    pt: "Rolar",                      es: "Deslizar" },

  // TICKER
  "ticker.items": {
    en: "NEW ALBUM 'INDI' — OUT NOW ★ #1 SCOTLAND ★ #4 UK CHART ★ OVO HYDRO — 12,000 FANS SOLD OUT ★ UK TOUR MARCH 2026 ★ FOLLOW US ON SOCIALS ★ WE ARE STARS ★ STREAM ON SPOTIFY ★ EDINBURGH CASTLE — JULY 2026",
    pt: "NOVO ÁLBUM 'INDI' — JÁ DISPONÍVEL ★ #1 ESCÓCIA ★ #4 REINO UNIDO ★ OVO HYDRO — 12.000 FÃS ESGOTADO ★ TURNÊ REINO UNIDO MARÇO 2026 ★ SEGUE-NOS NAS REDES ★ SOMOS ESTRELAS ★ OUÇA NO SPOTIFY ★ CASTELO DE EDIMBURGO — JULHO 2026",
    es: "NUEVO ÁLBUM 'INDI' — YA DISPONIBLE ★ #1 ESCOCIA ★ #4 REINO UNIDO ★ OVO HYDRO — 12.000 FANS AGOTADO ★ GIRA REINO UNIDO MARZO 2026 ★ SÍGUENOS EN REDES ★ SOMOS ESTRELLAS ★ ESCUCHA EN SPOTIFY ★ CASTILLO DE EDIMBURGO — JULIO 2026",
  },

  // STATS
  "stats.hydro":    { en: "OVO Hydro Fans",        pt: "Fãs no OVO Hydro",          es: "Fans en OVO Hydro" },
  "stats.scotland": { en: "Scottish Album Chart",  pt: "Tabela Álbuns Escócia",      es: "Lista Álbumes Escocia" },
  "stats.uk":       { en: "UK Album Chart",        pt: "Tabela Álbuns Reino Unido",  es: "Lista Álbumes Reino Unido" },
  "stats.albums":   { en: "Studio Albums",         pt: "Álbuns de Estúdio",          es: "Álbumes de Estudio" },
  "stats.fanclub":  { en: "Fan Club Followers",    pt: "Seguidores do Fã Clube",     es: "Seguidores del Fan Club" },
  "stats.tiktok":   { en: "TikTok Likes",          pt: "Curtidas no TikTok",         es: "Me gusta en TikTok" },

  // ABOUT
  "about.tag":      { en: "About Callum",           pt: "Sobre o Callum",             es: "Sobre Callum" },
  "about.headline": { en: "SCOTLAND'S\nAUTHENTIC\nVOICE",  pt: "A VOZ\nAUTÊNTICA\nDA ESCÓCIA", es: "LA VOZ\nAUTÉNTICA\nDE ESCOCIA" },
  "about.p1": {
    en: "Born in Musselburgh, East Lothian, Callum Beattie has built a reputation as one of the most genuine and emotionally resonant voices in modern Scottish music. From small venues to selling out Glasgow's OVO Hydro to 12,000 fans — his journey is one of raw talent and relentless dedication.",
    pt: "Nascido em Musselburgh, East Lothian, Callum Beattie construiu uma reputação como uma das vozes mais genuínas e emocionalmente ressonantes da música escocesa moderna. De pequenos palcos a esgotar o OVO Hydro de Glasgow com 12.000 fãs — a sua jornada é de talento puro e dedicação incansável.",
    es: "Nacido en Musselburgh, East Lothian, Callum Beattie se ha ganado una reputación como una de las voces más genuinas y emocionalmente resonantes de la música escocesa moderna. Desde pequeños locales hasta agotar el OVO Hydro de Glasgow con 12.000 fans — su trayectoria es de talento puro y dedicación incansable.",
  },
  "about.p2": {
    en: "His third album INDI — released January 2026 — debuted at #1 in Scotland and #4 in the UK, cementing his place as one of Britain's most compelling singer-songwriters.",
    pt: "O seu terceiro álbum INDI — lançado em janeiro de 2026 — estreou em #1 no Brasil e #4 no Reino Unido, consolidando o seu lugar como um dos compositores mais cativantes da Grã-Bretanha.",
    es: "Su tercer álbum INDI — lanzado en enero de 2026 — debutó en el #1 de Escocia y #4 en el Reino Unido, consolidando su lugar como uno de los cantautores más destacados de Gran Bretaña.",
  },
  "about.officialBtn": { en: "Official Website", pt: "Site Oficial",    es: "Sitio Oficial" },
  "about.followBtn":   { en: "Follow Callum",    pt: "Seguir o Callum", es: "Seguir a Callum" },

  // ALBUM
  "album.tag":       { en: "Latest Release",        pt: "Último Lançamento",    es: "Último Lanzamiento" },
  "album.title":     { en: "INDI — OUT NOW",         pt: "INDI — JÁ DISPONÍVEL", es: "INDI — YA DISPONIBLE" },
  "album.tracklist": { en: "Tracklisting",           pt: "Lista de Faixas",      es: "Lista de Canciones" },
  "album.streamBtn": { en: "Stream Now",             pt: "Ouvir Agora",          es: "Escuchar Ahora" },
  "album.orderBtn":  { en: "Order Physical Copy",    pt: "Encomendar Cópia Física", es: "Pedir Copia Física" },
  "album.formats": {
    en: "Available on CD, Coloured Vinyl, Cassette, Download & Streaming",
    pt: "Disponível em CD, Vinil Colorido, Cassete, Download e Streaming",
    es: "Disponible en CD, Vinilo de Color, Cassette, Descarga y Streaming",
  },

  // OVO HYDRO
  "hydro.tag":   { en: "November 2025",   pt: "Novembro 2025",   es: "Noviembre 2025" },
  "hydro.title": { en: "12,000 FANS.\nOVO HYDRO.\nSOLD OUT.", pt: "12.000 FÃS.\nOVO HYDRO.\nESOGOTADO.", es: "12.000 FANS.\nOVO HYDRO.\nAGOTADO." },
  "hydro.desc": {
    en: "Callum headlined Glasgow's iconic OVO Hydro in front of 12,000 fans — the biggest show of his career. The real Glasgow showed up.",
    pt: "Callum foi o cabeça de cartaz do icónico OVO Hydro de Glasgow perante 12.000 fãs — o maior espetáculo da sua carreira. O verdadeiro Glasgow apareceu.",
    es: "Callum encabezó el icónico OVO Hydro de Glasgow ante 12.000 fans — el mayor espectáculo de su carrera. El verdadero Glasgow se presentó.",
  },

  // TOUR
  "tour.tag":      { en: "Live Dates",   pt: "Datas ao Vivo",   es: "Fechas en Vivo" },
  "tour.title":    { en: "2026 TOUR",    pt: "TURNÊ 2026",      es: "GIRA 2026" },
  "tour.allDates": { en: "All Dates",    pt: "Todas as Datas",  es: "Todas las Fechas" },
  "tour.tickets":  { en: "Tickets",      pt: "Ingressos",       es: "Entradas" },

  // COMMUNITY
  "community.tag":   { en: "The Fan Club",  pt: "O Fã Clube",      es: "El Fan Club" },
  "community.title": { en: "WE ARE THE\nSTARS", pt: "SOMOS AS\nESTRELAS", es: "SOMOS LAS\nESTRELLAS" },
  "community.desc": {
    en: "We are a fan page dedicated to supporting the incredible talent of Callum Beattie. A place to share videos, photos, news, and to help further Callum's career path — helping him reach the stardom he so well deserves.",
    pt: "Somos uma página de fãs dedicada a apoiar o incrível talento de Callum Beattie. Um lugar para compartilhar vídeos, fotos, notícias e ajudar a impulsionar a carreira do Callum — ajudando-o a alcançar a fama que tão bem merece.",
    es: "Somos una página de fans dedicada a apoyar el increíble talento de Callum Beattie. Un lugar para compartir vídeos, fotos, noticias y ayudar a impulsar la carrera de Callum — ayudándole a alcanzar la fama que tan bien merece.",
  },
  "community.fbBtn": { en: "Follow on Facebook",  pt: "Seguir no Facebook",  es: "Seguir en Facebook" },
  "community.igBtn": { en: "Follow on Instagram", pt: "Seguir no Instagram", es: "Seguir en Instagram" },

  // FOLLOW
  "follow.tag":   { en: "Stay Connected",       pt: "Fique Ligado",        es: "Mantente Conectado" },
  "follow.title": { en: "FOLLOW THE\nFAN CLUB", pt: "SEGUE O\nFÃ CLUBE",   es: "SIGUE EL\nFAN CLUB" },
  "follow.desc": {
    en: "Join thousands of fans across all platforms. Every follow helps Callum reach more people.",
    pt: "Junte-se a milhares de fãs em todas as plataformas. Cada seguidor ajuda o Callum a chegar a mais pessoas.",
    es: "Únete a miles de fans en todas las plataformas. Cada seguidor ayuda a Callum a llegar a más personas.",
  },
  "follow.fanClubLabel":  { en: "Fan Club Accounts — Follow Us!", pt: "Contas do Fã Clube — Siga-nos!",     es: "Cuentas del Fan Club — ¡Síguenos!" },
  "follow.callumLabel":   { en: "Follow Callum Beattie Directly", pt: "Siga o Callum Beattie Diretamente",  es: "Sigue a Callum Beattie Directamente" },
  "follow.fb.cta":        { en: "Follow on Facebook",   pt: "Seguir no Facebook",   es: "Seguir en Facebook" },
  "follow.ig.cta":        { en: "Follow on Instagram",  pt: "Seguir no Instagram",  es: "Seguir en Instagram" },
  "follow.tt.cta":        { en: "Follow on TikTok",     pt: "Seguir no TikTok",     es: "Seguir en TikTok" },
  "follow.yt.cta":        { en: "Subscribe on YouTube", pt: "Inscrever no YouTube", es: "Suscribirse en YouTube" },
  "follow.fb.followers":  { en: "1.6K followers",            pt: "1,6 mil seguidores",          es: "1,6 mil seguidores" },
  "follow.ig.followers":  { en: "Fan photos & updates",      pt: "Fotos de fãs e novidades",    es: "Fotos de fans y novedades" },
  "follow.tt.followers":  { en: "1.5K followers · 13.5K likes", pt: "1,5 mil seguidores · 13,5 mil curtidas", es: "1,5 mil seguidores · 13,5 mil me gusta" },
  "follow.yt.followers":  { en: "818 subscribers · 165 videos", pt: "818 inscritos · 165 vídeos",             es: "818 suscriptores · 165 vídeos" },
  "follow.callum.ig.note":{ en: "69K followers",       pt: "69 mil seguidores",    es: "69 mil seguidores" },
  "follow.callum.fb.note":{ en: "Official page",       pt: "Página oficial",       es: "Página oficial" },
  "follow.callum.sp.note":{ en: "Stream INDI now",     pt: "Ouça INDI agora",      es: "Escucha INDI ahora" },
  "follow.callum.yt.note":{ en: "Official videos",     pt: "Vídeos oficiais",      es: "Vídeos oficiales" },
  "follow.callum.tt.note":{ en: "Official TikTok",     pt: "TikTok oficial",       es: "TikTok oficial" },

  // VIDEOS
  "videos.tag":      { en: "Watch",         pt: "Assistir",       es: "Ver" },
  "videos.title":    { en: "LATEST VIDEOS", pt: "ÚLTIMOS VÍDEOS", es: "ÚLTIMOS VÍDEOS" },
  "videos.v1.title": { en: "Wild Mountain Thyme — OVO Hydro Live",      pt: "Wild Mountain Thyme — Ao Vivo no OVO Hydro",   es: "Wild Mountain Thyme — En Vivo en OVO Hydro" },
  "videos.v1.note":  { en: "Live at OVO Hydro, Glasgow",                pt: "Ao vivo no OVO Hydro, Glasgow",                es: "En vivo en OVO Hydro, Glasgow" },
  "videos.v2.title": { en: "Always Rains in Glasgow — Official Video",  pt: "Always Rains in Glasgow — Vídeo Oficial",      es: "Always Rains in Glasgow — Vídeo Oficial" },
  "videos.v2.note":  { en: "From the album INDI",                       pt: "Do álbum INDI",                                es: "Del álbum INDI" },
  "videos.v3.title": { en: "We Are Stars — Sofar London",               pt: "We Are Stars — Sofar Londres",                 es: "We Are Stars — Sofar Londres" },
  "videos.v3.note":  { en: "Debut single, 2017",                        pt: "Single de estreia, 2017",                      es: "Sencillo debut, 2017" },
  "videos.allBtn":   { en: "All Videos on YouTube",                     pt: "Todos os Vídeos no YouTube",                   es: "Todos los Vídeos en YouTube" },

  // FINAL CTA
  "cta.tag":   { en: "Join the Movement",               pt: "Junte-se ao Movimento",     es: "Únete al Movimiento" },
  "cta.title": { en: "HELP CALLUM\nREACH THE\nSTARS",   pt: "AJUDE O CALLUM\nA ALCANÇAR\nAS ESTRELAS", es: "AYUDA A CALLUM\nA ALCANZAR\nLAS ESTRELLAS" },
  "cta.desc": {
    en: "Every follow, every share, every stream makes a difference. Be part of the story.",
    pt: "Cada seguidor, cada compartilhamento, cada reprodução faz a diferença. Faça parte desta história.",
    es: "Cada seguidor, cada compartido, cada reproducción marca la diferencia. Sé parte de esta historia.",
  },
  "cta.fanBtn":    { en: "Follow Fan Club",  pt: "Seguir Fã Clube",    es: "Seguir Fan Club" },
  "cta.callumBtn": { en: "Follow Callum",    pt: "Seguir Callum",      es: "Seguir a Callum" },
  "cta.streamBtn": { en: "Stream INDI",      pt: "Ouvir INDI",         es: "Escuchar INDI" },

  // FOOTER
  "footer.disclaimer": {
    en: "An independent fan community. Not officially affiliated with Callum Beattie.",
    pt: "Uma comunidade de fãs independente. Não oficialmente afiliada com Callum Beattie.",
    es: "Una comunidad de fans independiente. No afiliada oficialmente con Callum Beattie.",
  },
  "footer.copyright": {
    en: "© 2026 Callum Beattie Fan Club. All rights reserved.",
    pt: "© 2026 Fã Clube Callum Beattie. Todos os direitos reservados.",
    es: "© 2026 Fan Club Callum Beattie. Todos los derechos reservados.",
  },
};
