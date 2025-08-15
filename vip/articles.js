
export default function VIPArticles() {
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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Exclusive Articles</h1>
      <p style={{ marginBottom: "2rem" }}>Insights and words reserved for you.</p>
      <article>
        <h2>The Jaguar Philosophy</h2>
        <p>Power, calmness, and exclusivity — this is the KING_S_BALFX way.</p>
      </article>
      <article>
        <h2>Staying Grounded</h2>
        <p>True power is in you. Remember to move calmly and with intention.</p>
      </article>
    </div>
  );
}
