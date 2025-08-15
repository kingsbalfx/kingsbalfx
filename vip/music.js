
export default function VIPMusic() {
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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Exclusive Music</h1>
      <p style={{ marginBottom: "2rem" }}>Stay grounded. Stay exclusive.</p>
      <ul>
        <li>Track 1 - Calm Flow Mix</li>
        <li>Track 2 - Jaguar Energy Beat</li>
        <li>Track 3 - Midnight Exclusive</li>
      </ul>
    </div>
  );
}
