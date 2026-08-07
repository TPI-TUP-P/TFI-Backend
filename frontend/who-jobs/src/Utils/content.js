import { Briefcase, UserRound, Code2, PenTool, Users, User } from "lucide-react";

// Copy que cambia según el rol seleccionado (Candidato / Reclutador).
export const content = {
  candidato: {
    eyebrow: "SIN FEED · SIN SPAM · SIN RUIDO",
    badgeRole: "Candidato",
    badgeSub: "Perfil activo",
    badgeIcon: UserRound,
    headline: ["Un lugar de trabajo,", "no un feed para scrollear."],
    sub: "Sin publicaciones ni likes. Armá tu perfil una sola vez y dejá que las búsquedas correctas te encuentren a vos.",
    ctaLabel: "Crear mi perfil",
    ctaSub: "Gratis para siempre · sin tarjeta",
    placeholder: "tu@email.com",
    badgeIcon: User,
  },
  reclutador: {
    eyebrow: "SIN FEED · SIN SPAM · SIN RUIDO",
    badgeRole: "Reclutador",
    badgeSub: "Búsqueda activa",
    badgeIcon: Briefcase,
    headline: ["Encontrá gente real,", "no publiques al vacío."],
    sub: "Sin postulantes fantasma ni feeds infinitos. Accedé directo a perfiles verificados y hablá con quien realmente te interesa.",
    ctaLabel: "Buscar talento",
    ctaSub: "Primera búsqueda sin costo",
    placeholder: "empresa@trabajo.com",
    badgeIcon: Briefcase, 
  },
};

// Etiquetas decorativas que flotan con parallax en el Hero.
export const floatingTags = [
  { label: "React + .NET Dev", Icon: Code2, top: "10%", left: "2%", speed: -70, delay: 0.1 },
  { label: "Reclutador Tech", Icon: Briefcase, top: "6%", right: "4%", speed: 50, delay: 0.25 },
  { label: "UX Writer Senior", Icon: PenTool, top: "66%", left: "0%", speed: 35, delay: 0.4 },
  { label: "Talent Partner", Icon: Users, top: "74%", right: "2%", speed: -45, delay: 0.55 },
];
