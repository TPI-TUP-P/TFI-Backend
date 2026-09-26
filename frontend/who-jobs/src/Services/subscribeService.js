
const API_URL = import.meta.env?.VITE_API_URL ?? "/api";

export async function subscribeEmail(email, role) {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, role }),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el email");
  }

  return response.json();
}
