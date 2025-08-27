// lib/api.ts
export async function getHajjPackages() {
  const res = await fetch("https://your-dashboard-domain.com/api/hajj", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch packages");
  return res.json();
}
