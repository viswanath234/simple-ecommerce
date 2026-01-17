import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import ProductGallery from "../components/ProductGallery";
import ProductBuyBox from "../components/ProductBuyBox";
import ProductSpecs from "../components/ProductSpecs";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProductById(id);
        setProduct(products); // apiResponse structure
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductGallery images={product?.images || []} />
          <ProductSpecs product={product} />
        </div>

        <ProductBuyBox product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
