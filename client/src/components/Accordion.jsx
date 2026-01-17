import { Plus, Minus } from "lucide-react";

const Accordion = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b p-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left font-medium"
      >
        {title}
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>

      {isOpen && <div className="mt-4 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

export default Accordion;
