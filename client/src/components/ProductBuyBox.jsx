import { useState } from "react";

const ProductBuyBox = ({ product }) => {
  // Provide fallback values for missing fields
  const colors = product?.colors || [];
  const models = product?.models || [];
  const sizes = product?.sizes || [];

  console.log("Product data:", product);
  console.log("Colors:", colors);
  console.log("Models:", models);
  console.log("Sizes:", sizes);

  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedModel, setSelectedModel] = useState(
    models.find((m) => m?.available) || null
  );

  return (
    <div className="bg-white p-6 rounded-lg border sticky top-24 text-sm">
      {/* Brand */}
      <p className="text-gray-500 text-xs uppercase tracking-wide">
        {product?.brand}
      </p>

      {/* Title */}
      <h1 className="text-lg font-semibold mt-2 leading-tight">
        {product?.title}
      </h1>

      {/* Rating */}
      <p className="mt-3 text-xs text-gray-600 flex items-center gap-2">
        <span className="text-yellow-500">
          ⭐⭐⭐⭐⭐ {product?.rating?.value || product?.rating || 0}
        </span>
        <span>({product?.reviewsCount || 0} reviews)</span>
        <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
          Limited
        </span>
      </p>

      {/* Price */}
      <div className="mt-4 flex items-end gap-3">
        <span className="text-3xl font-bold text-black">₹{product?.price}</span>
        {product?.mrp && (
          <>
            <span className="text-sm text-gray-400 line-through">
              ₹{product.mrp}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {product?.discount}% off
            </span>
          </>
        )}
      </div>

      {/* Colour */}
      <div className="mt-5">
        <p className="text-xs font-semibold mb-2 text-gray-900">
          Colour:{" "}
          <span className="font-normal">{selectedColor?.name || "Select"}</span>
        </p>

        {colors.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.name}
                disabled={!color.available}
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-2 px-3 py-1.5 border rounded text-xs font-medium transition
                  ${
                    selectedColor?.name === color.name
                      ? "border-gray-900 ring-1 ring-gray-300 bg-gray-50"
                      : "border-gray-300"
                  }
                  ${
                    !color.available
                      ? "opacity-40 cursor-not-allowed line-through"
                      : "hover:border-gray-500"
                  }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No color options available</p>
        )}
      </div>

      {/* MODEL */}
      <div className="mt-4">
        <p className="text-xs font-semibold mb-2 text-gray-900">
          Model:{" "}
          <span className="font-normal">{selectedModel?.name || "Select"}</span>
        </p>

        {models.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {models.map((model) => (
              <button
                key={model.name}
                disabled={!model.available}
                onClick={() => setSelectedModel(model)}
                className={`px-3 py-1.5 border rounded text-xs font-medium transition
              ${
                selectedModel?.name === model.name
                  ? "border-gray-900 ring-1 ring-gray-300 bg-gray-50"
                  : "border-gray-300"
              }
              ${
                !model.available
                  ? "opacity-40 cursor-not-allowed line-through"
                  : "hover:border-gray-500"
              }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No model options available</p>
        )}
      </div>

      {/* Size */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold text-gray-900">Size</p>
          <button className="text-xs text-blue-600 font-medium hover:underline">
            Size Guide
          </button>
        </div>

        {sizes.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size.name}
                disabled={!size.available}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 border rounded text-xs font-semibold flex items-center justify-center transition
                  ${
                    selectedSize?.name === size.name
                      ? "border-gray-900 ring-1 ring-gray-300 bg-gray-900 text-white"
                      : "border-gray-300 hover:border-gray-500"
                  }
                  ${
                    !size.available
                      ? "opacity-40 cursor-not-allowed line-through"
                      : ""
                  }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No size options available</p>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          disabled={sizes.length > 0 && !selectedSize}
          className={`h-12 rounded font-semibold transition text-sm
            ${
              sizes.length === 0 || selectedSize
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Add to Cart
        </button>

        <button className="h-12 border-2 border-gray-300 rounded font-semibold text-sm hover:border-gray-400 transition">
          Buy Now
        </button>
      </div>
      {/* PIN Code Check */}
      <div className="mt-5">
        <p className="text-xs text-gray-600 mb-2">
          Please enter PIN code to check delivery time
        </p>

        <div className="flex border rounded overflow-hidden">
          <input
            type="text"
            placeholder="Enter PIN code"
            className="flex-1 px-3 py-2.5 text-sm outline-none"
          />
          <button className="px-4 bg-black text-white text-sm font-medium hover:bg-gray-900">
            Check
          </button>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mt-4 space-y-2 text-xs">
        <p className="flex items-center gap-2 text-green-600 font-medium">
          🚚{" "}
          <span>
            FREE delivery by <strong>Tomorrow 11am</strong>
          </span>
        </p>
        <p className="flex items-center gap-2 text-gray-700">
          ⏱️ <span>Hassle-Free 10-day replacement guarantee</span>
        </p>
      </div>

      {/* Offers */}
      <div className="mt-5 border rounded-lg p-4 bg-red-50 border-red-200">
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm font-semibold text-gray-900">
            Offers & Discounts
          </p>
          <button className="text-xs text-blue-600 font-medium hover:underline">
            See All
          </button>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
            ⓘ
          </div>
          <div className="text-xs text-gray-800">
            <p className="font-semibold text-red-600 mb-1">Flat ₹2000 off</p>
            <p className="text-gray-700 leading-relaxed">
              Additional Flat ₹2000 Instant Discount on ICICI Bank Credit Card.
              Min purchase value ₹20,000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBuyBox;
