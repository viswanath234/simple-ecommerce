import { Star } from "lucide-react";

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  const {
    brand,
    title,
    price,
    mrp,
    discount,
    rating,
    reviewsCount,
    images,
    flags,
    deliveryText,
  } = product;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg p-4 hover:shadow-md transition flex flex-col h-full"
    >
      <div className="h-40 flex items-center justify-center mb-3">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${images?.[0]}`}
          alt={title}
          className="max-h-full object-contain"
        />
      </div>

      {flags?.sponsored && (
        <p className="text-xs text-gray-500 mb-1">Fitzdo Sponsored</p>
      )}

      <p className="text-xs text-gray-500 uppercase mb-1">{brand}</p>

      <h3 className="text-sm font-medium line-clamp-2 mb-2">{title}</h3>

      <div className="flex items-center gap-1 text-sm mb-2">
        <span className="flex items-center gap-1 text-yellow-500">
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          {rating || 0}
        </span>
        <span className="text-gray-500 text-xs">({reviewsCount || 0})</span>
        {discount && (
          <span className="text-white bg-blue-600 px-2 py-1 rounded-full text-xs ml-1">
            -{discount}%
          </span>
        )}
      </div>

      {deliveryText && (
        <p className="text-xs text-green-600 font-medium mb-2">
          {deliveryText}
        </p>
      )}

      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base">₹{price}</span>
          {mrp && (
            <span className="text-xs text-gray-400 line-through">₹{mrp}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
