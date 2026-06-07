import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [basket, setBasket] = useState([]);
  const searchProducts = async () => {
    if (!query) return;

    setLoading(true);

    const res = await fetch(
      `http://127.0.0.1:5000/search?query=${query}`
    );

    const data = await res.json();

    setResults(data.data || []);
    setLoading(false);
  };
  const amazonTotal = basket.reduce(
    (sum, item) => sum + item.amazon,
    0
  );
  
  const flipkartTotal = basket.reduce(
    (sum, item) => sum + item.flipkart,
    0
  );
  
  const bestPlatform =
    amazonTotal < flipkartTotal
      ? "Amazon"
      : "Flipkart";
  
  const savings = Math.abs(
    amazonTotal - flipkartTotal
  );
  return (
    <div style={styles.page}>

      {/* MAIN CARD */}
      <div style={styles.container}>

        <h1 style={styles.title}>🛒 Grocery Price Finder</h1>
        <p style={styles.subtitle}>
          Compare prices across platforms and find the best deal instantly
        </p>

        {/* SEARCH BOX */}
        <div style={styles.searchBox}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rice, milk, sugar..."
            style={styles.input}
          />

          <button onClick={searchProducts} style={styles.button}>
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading && <p style={styles.loading}>Finding best deals...</p>}
        <div style={styles.basketBox}>
  <h3>🛒 Smart Grocery Basket</h3>

  <p>Items Selected: {basket.length}</p>

  <p>Amazon Total: ₹{amazonTotal}</p>

  <p>Flipkart Total: ₹{flipkartTotal}</p>

  <p>Best Platform: {bestPlatform}</p>

  <p>You Save: ₹{savings}</p>
</div>
        {/* RESULTS */}
        <div style={styles.grid}>
          {!loading && results.length === 0 && (
            <p style={styles.empty}>
              Start searching products like rice, milk, sugar...
            </p>
          )}

          {results.map((item) => (
            <div key={item.id} style={styles.card}>

              <h2 style={styles.productName}>{item.name}</h2>

              {/* FIXED ALIGNMENT */}
              <div style={styles.priceColumn}>
                <p>🛒 Amazon: ₹{item.amazon}</p>
                <p>🛍️ Flipkart: ₹{item.flipkart}</p>
              </div>

              <div style={styles.badge}>
  🏆 Best: {item.amazon < item.flipkart ? "Amazon" : "Flipkart"}
</div>

<div style={styles.save}>
  💰 Save ₹{Math.abs(item.amazon - item.flipkart)}
</div>

<button
  style={styles.addButton}
  onClick={() => setBasket([...basket, item])}
>
  Add to Basket
</button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  /* NEW CLEAN BACKGROUND */
  page: {
    minHeight: "100vh",
    fontFamily: "Arial",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f2fe, #f1f5f9)",
    padding: "20px"
  },

  container: {
    width: "90%",
    maxWidth: "800px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  title: {
    fontSize: "32px",
    color: "#111827",
    marginBottom: "8px"
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "25px"
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "25px"
  },

  input: {
    width: "60%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none"
  },

  button: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  loading: {
    color: "#374151"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  },

  card: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    textAlign: "left"
  },

  productName: {
    marginBottom: "10px",
    color: "#111827"
  },

  /* FIXED ALIGNMENT */
  priceColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "14px",
    color: "#374151"
  },

  badge: {
    marginTop: "10px",
    background: "#dcfce7",
    padding: "6px 10px",
    borderRadius: "8px",
    color: "#166534",
    fontWeight: "bold",
    display: "inline-block"
  },

  save: {
    marginTop: "8px",
    color: "#b91c1c",
    fontWeight: "bold"
  },
  
  addButton: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  
  basketBox: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
    textAlign: "left"
  },
  
  empty: {
    color: "#6b7280",
    gridColumn: "1 / -1"
  }
};

export default App;