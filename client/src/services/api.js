const API_BASE_URL = "http://localhost:5000/api/v1";

// Fetch all products
export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE_URL}/products?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const response = await res.json();
  return response.data;
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const response = await res.json();
  return response.data;
};
