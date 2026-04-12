import { useState } from "react";
import { Delete } from "lucide-react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op);
    setDisplay("0");
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + " " + display);
      setDisplay(String(result));
      setEquation("");
    } catch {
      setDisplay("Erro");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const handleDelete = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const Button = ({ children, onClick, className = "", variant = "default" }: any) => {
    const baseClass = "h-20 rounded-2xl font-semibold text-xl transition-all active:scale-95";
    const variants = {
      default: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      operator: "bg-yellow-400 text-white hover:bg-yellow-500",
      equals: "bg-pink-500 text-white hover:bg-pink-600",
      clear: "bg-red-100 text-red-600 hover:bg-red-200",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClass} ${variants[variant as keyof typeof variants]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Display */}
        <div className="bg-gray-800 rounded-3xl p-8 mb-4 shadow-2xl">
          {equation && (
            <div className="text-gray-400 text-right text-lg mb-2 min-h-6">
              {equation}
            </div>
          )}
          <div className="text-white text-right text-5xl font-light break-all">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button variant="clear" onClick={handleClear}>C</Button>
          <Button onClick={() => handleOperator("/")} variant="operator">/</Button>
          <Button onClick={() => handleOperator("*")} variant="operator">×</Button>
          <Button onClick={handleDelete} variant="operator">
            <Delete className="w-6 h-6 mx-auto" />
          </Button>

          <Button onClick={() => handleNumber("7")}>7</Button>
          <Button onClick={() => handleNumber("8")}>8</Button>
          <Button onClick={() => handleNumber("9")}>9</Button>
          <Button onClick={() => handleOperator("-")} variant="operator">-</Button>

          <Button onClick={() => handleNumber("4")}>4</Button>
          <Button onClick={() => handleNumber("5")}>5</Button>
          <Button onClick={() => handleNumber("6")}>6</Button>
          <Button onClick={() => handleOperator("+")} variant="operator">+</Button>

          <Button onClick={() => handleNumber("1")}>1</Button>
          <Button onClick={() => handleNumber("2")}>2</Button>
          <Button onClick={() => handleNumber("3")}>3</Button>
          <Button onClick={handleEquals} variant="equals" className="row-span-2">=</Button>

          <Button onClick={() => handleNumber("0")} className="col-span-2">0</Button>
          <Button onClick={() => handleNumber(".")}>.</Button>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          Calculadora v2.4.1
        </div>
      </div>
    </div>
  );
}
