"use client";

import { cn } from "@/lib/utils";

interface IMCChartProps {
  imc: number;
}

export function IMCChart({ imc }: IMCChartProps) {
  const getImcStatus = (value: number) => {
    if (value < 18.5) return { label: "Abaixo do peso", color: "bg-blue-400" };
    if (value < 25) return { label: "Normal", color: "bg-green-400" };
    if (value < 30) return { label: "Zona de Alerta / Sobrepeso", color: "bg-yellow-400" };
    return { label: "Obesidade", color: "bg-red-500" };
  };

  const status = getImcStatus(imc);
  
  // Clamp position between 5% and 95% to keep marker inside the bar
  const position = Math.min(Math.max(((imc - 15) / (40 - 15)) * 100, 5), 95);

  return (
    <div className="w-full max-w-lg mx-auto p-4 rounded-lg bg-card shadow-lg">
      <h3 className="text-lg font-bold text-center mb-2 text-card-foreground">Índice de Massa Corporal (IMC)</h3>
      <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden flex">
        <div className="w-[11.67%] bg-blue-400" title="Abaixo do peso (< 18.5)"></div>
        <div className="w-[26.67%] bg-green-400" title="Normal (18.5 - 24.9)"></div>
        <div className="w-[20%] bg-yellow-400" title="Sobrepeso (25 - 29.9)"></div>
        <div className="w-[41.66%] bg-red-500" title="Obesidade (30+)"></div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1 px-2">
        <span>15</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40+</span>
      </div>
      
      <div className="relative h-10 mt-2">
         <div 
          className="absolute top-0 transition-all duration-500"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="relative flex flex-col items-center">
            <span className="px-3 py-1 text-sm font-bold text-white rounded-md shadow-md" style={{ backgroundColor: status.color.replace('bg-', '').replace('-400', '').replace('-500', '') }}>
              Seu IMC: {imc.toFixed(2)}
            </span>
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8" style={{ borderTopColor: status.color.replace('bg-', '').replace('-400', '').replace('-500', '') }}></div>
          </div>
        </div>
      </div>
      
      {imc >= 25 && imc < 30 && (
         <p className="text-center font-semibold text-yellow-600 mt-4 animate-pulse">
            ⚠️ Zona de Alerta — Você está aqui
         </p>
      )}
    </div>
  );
}
