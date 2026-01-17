import Accordion from "./Accordion";
import { useState } from "react";

const ProductSpecs = ({ product }) => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const whatsInBox = ["Treadmill x1", "Remote", "User Manual", "Warranty Card"];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg">
        <Accordion
          title="What's in the Box"
          isOpen={openAccordion === 0}
          onToggle={() => toggleAccordion(0)}
        >
          <ul className="text-sm text-gray-700 space-y-2 pl-4">
            {whatsInBox.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Accordion>
      </div>

      <div className="bg-white border rounded-lg">
        <Accordion
          title="Product Specification"
          isOpen={openAccordion === 1}
          onToggle={() => toggleAccordion(1)}
        >
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="font-medium py-2 px-2 w-1/3">Brand</td>
                <td className="py-2 px-2">{product?.brand || "N/A"}</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Color</td>
                <td className="py-2 px-2">Body Color</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Model</td>
                <td className="py-2 px-2">Impact Ultra-Manager</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Feature</td>
                <td className="py-2 px-2">Hydraulic</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Frequency</td>
                <td className="py-2 px-2">50 Hz</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Machine Type</td>
                <td className="py-2 px-2">Motorized-Treadmill</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Power Source</td>
                <td className="py-2 px-2">Corded Electric</td>
              </tr>
              <tr className="border-b">
                <td className="font-medium py-2 px-2">Speed</td>
                <td className="py-2 px-2">5 Km. Km/hr</td>
              </tr>
              <tr>
                <td className="font-medium py-2 px-2">Product Dimensions</td>
                <td className="py-2 px-2">180*2.2*1.2M Meters</td>
              </tr>
              <tr>
                <td className="font-medium py-2 px-2">Item Weight</td>
                <td className="py-2 px-2">80 Kilograms</td>
              </tr>
            </tbody>
          </table>
        </Accordion>
      </div>

      <div className="bg-white border rounded-lg">
        <Accordion
          title="Additional Information"
          isOpen={openAccordion === 2}
          onToggle={() => toggleAccordion(2)}
        >
          <p className="text-sm text-gray-700">
            {product?.description || "No description available"}
          </p>
        </Accordion>
      </div>

      <div className="bg-white border rounded-lg">
        <Accordion
          title="Delivery & Returns"
          isOpen={openAccordion === 3}
          onToggle={() => toggleAccordion(3)}
        >
          <p className="text-sm text-gray-700">
            {product?.deliveryText || "Delivery information not available"}
          </p>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductSpecs;
