import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";

const ITEMS_PER_PAGE = 8;

const ProductList = () => {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({
          search: searchQuery,
          sort: sortBy,
          page,
          limit: ITEMS_PER_PAGE,
        });

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, sortBy, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const resultsLabel = searchQuery ? `Search "${searchQuery}"` : "All Products";

  return (
    <>
      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded-md text-sm bg-white"
        >
          <option value="latest">Most Recent</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Results for <span className="font-bold">“{resultsLabel}”</span>
        </h2>
        <p className="text-sm text-gray-600">{total} Results</p>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNo = i + 1;
            return (
              <button
                key={pageNo}
                onClick={() => setPage(pageNo)}
                className={`px-3 py-1 border rounded ${
                  pageNo === page ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                {pageNo}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
