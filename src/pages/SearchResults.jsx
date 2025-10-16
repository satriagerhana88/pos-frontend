import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopbarContent from "../components/TopbarContent";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
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
    return <div className="p-6 text-gray-500 text-center">Data tidak tersedia</div>;

  // Tentukan tipe table berdasarkan tipe pertama
  const type = results[0]?.type;

  return (
    <div className="p-6">
      <TopbarContent />
      <h2 className="text-2xl font-semibold mb-4">
        Hasil pencarian: <span className="text-blue-600">{query}</span>
      </h2>

      <div className="overflow-x-auto">
        {type === "product" ? (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Stock Total</th>
                <th className="px-4 py-2 border">Stock Available</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Branch</th>
                <th className="px-4 py-2 border">View</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.category_name}</td>
                  <td className="px-4 py-2 border">{item.stock_total}</td>
                  <td className="px-4 py-2 border">{item.stock_available}</td>
                  <td className="px-4 py-2 border">Rp {item.branch_price}</td>
                  <td className="px-4 py-2 border">{item.branch_name}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setSelectedItem(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Invoice No</th>
                <th className="px-4 py-2 border">Customer Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Start</th>
                <th className="px-4 py-2 border">Return</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">View</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{item.invoice_no}</td>
                  <td className="px-4 py-2 border">{item.customer_name}</td>
                  <td className="px-4 py-2 border">{item.customer_phone}</td>
                  <td className="px-4 py-2 border">{item.rental_date}</td>
                  <td className="px-4 py-2 border">{item.return_date}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">Rp {item.total_amount}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setSelectedItem(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[90%] md:w-96 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>

            {selectedItem.type === "product" ? (
              <>
                <h3 className="text-xl font-semibold mb-2">{selectedItem.name}</h3>
                <p><strong>Product Code:</strong> {selectedItem.product_code}</p>
                <p><strong>Category:</strong> {selectedItem.category_name}</p>
                <p><strong>Description:</strong> {selectedItem.description || '-'}</p>
                <p><strong>Rental Price:</strong> Rp {selectedItem.rental_price}</p>
                <p><strong>Branch:</strong> {selectedItem.branch_name}</p>
                <p><strong>Stock Total:</strong> {selectedItem.stock_total}</p>
                <p><strong>Stock Available:</strong> {selectedItem.stock_available}</p>
                <p><strong>Stock Damaged:</strong> {selectedItem.stock_damaged}</p>
                {selectedItem.image_url && (
                  <img
                    src={selectedItem.image_url}
                    alt={selectedItem.name}
                    className="w-full h-48 object-cover rounded mt-2"
                  />
                )}
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">Invoice: {selectedItem.invoice_no}</h3>
                <p><strong>Customer Name:</strong> {selectedItem.customer_name}</p>
                <p><strong>Phone:</strong> {selectedItem.customer_phone}</p>
                <p><strong>Address:</strong> {selectedItem.customer_address}</p>
                <p><strong>Start:</strong> {selectedItem.rental_date}</p>
                <p><strong>Return:</strong> {selectedItem.return_date}</p>
                <p><strong>Status:</strong> {selectedItem.status}</p>
                <p><strong>Total:</strong> Rp {selectedItem.total_amount}</p>

                <div className="mt-3">
                  <strong>Products:</strong>
                  <ul className="list-disc ml-5">
                    {selectedItem.products?.map((prod, i) => (
                      <li key={i}>{prod.product_name} - Qty: {prod.qty}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;