
import Link from "next/link";

export default function VIPHome() {
  return (
    <div style={{
      backgroundImage: "url('/logo_jaguar.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: "blur(4px) brightness(0.6)"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Welcome to the VIP Lounge</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Your space, your rhythm, your flow.</p>
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/vip/music">🎵 Music</Link>
        <Link href="/vip/videos">🎥 Videos</Link>
        <Link href="/vip/articles">📝 Articles</Link>
      </nav>
    </div>
  );
}
