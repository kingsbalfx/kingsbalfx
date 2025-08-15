
export default function VIPVideos() {
  return (
    <div style={{
      backgroundImage: "url('/logo_jaguar.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "white",
      padding: "2rem",
      backdropFilter: "blur(4px) brightness(0.6)"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Exclusive Videos</h1>
      <p style={{ marginBottom: "2rem" }}>Relax, press play, and enjoy.</p>
      <ul>
        <li>Video 1 - Behind the Scenes</li>
        <li>Video 2 - Live Jaguar Session</li>
        <li>Video 3 - VIP Interview Special</li>
      </ul>
    </div>
  );
}
