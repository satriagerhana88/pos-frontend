import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopbarContent from "../components/TopbarContent";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // ✅ Ganti URL ini sesuai backend kamu
        const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="p-6 text-gray-500">Memuat hasil...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!results.length)
    return (
      <div className="p-6 text-gray-500">
        Tidak ada hasil untuk <strong>{query}</strong>
      </div>
    );

  return (
    <div className="p-6">
        <TopbarContent />
      <h2 className="text-2xl font-semibold mb-4">
        Hasil pencarian: <span className="text-blue-600">{query}</span>
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {results.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.category_name}</p>
            <p className="text-sm text-gray-500">Stok: {item.stock}</p>
            <p className="text-sm text-gray-500">Harga: Rp {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
