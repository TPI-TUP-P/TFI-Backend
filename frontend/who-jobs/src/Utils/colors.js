// Paleta oficial de WhoJobs. Un solo lugar para tocar los colores.
export const COLORS = {
  cream: "#F7F8F0",
  ink: "#355872",
  steel: "#7AAACE",
  sky: "#9CD5FF",
};

// rgba(COLORS.steel, 0.4) -> "rgba(122, 170, 206, 0.4)"
export function rgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
