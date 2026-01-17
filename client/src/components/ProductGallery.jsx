import { useState } from "react";

const ProductGallery = ({ images = [] }) => {
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const [activeImage, setActiveImage] = useState(
    images[0] ? `${imageUrl}${images[0]}` : null
  );

  if (!images.length) {
    return (
      <div className="bg-white p-12 rounded-lg border text-center text-gray-500">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border rounded-lg flex items-center justify-center h-96 overflow-hidden">
        <img
          src={activeImage}
          alt="Product"
          className="max-h-full max-w-full object-contain p-4"
        />
      </div>

      <div className="flex gap-3 justify-center my-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(`${imageUrl}${img}`)}
            className={`w-20 h-20 border-2 rounded-lg flex items-center justify-center overflow-hidden transition
              ${
                activeImage === `${imageUrl}${img}`
                  ? "border-black ring-2 ring-gray-300"
                  : "border-gray-300 hover:border-gray-500"
              }`}
          >
            <img
              src={`${imageUrl}${img}`}
              alt={`Thumbnail ${i + 1}`}
              className="max-h-full max-w-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

export const WhatsInTheBox = ({ items }) => {
  return (
    <div className="mt-6 bg-white border rounded-lg">
      <div className="px-6 py-4 font-semibold flex justify-between">
        What's in the Box
      </div>

      <ul className="px-6 pb-4 text-sm text-gray-700 space-y-2">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
