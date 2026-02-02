'use client'; 
import { useState } from 'react';

export default function Home() {
  // 1. Логика смены цветов
  const colors = ['#f8d7da', '#d4edda', '#d1ecf1']; // Массив цветов
  const [index, setIndex] = useState(0);

  // 2. Логика счетчика 
  const [digit, setDigit] = useState(0);

  const increment = () => setDigit(digit + 2); // Прибавляем 2
  const decrement = () => setDigit(digit - 4); // Отнимаем 4 

  return (
    <main 
      className="flex flex-col items-center justify-center min-h-screen gap-8"
      style={{ backgroundColor: colors[index] }} // Меняем фон
    >
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-black">Счётчик: {digit}</h1>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={increment}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Увеличить (+2)
          </button>
          
          <button 
            onClick={decrement}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Уменьшить (-4)
          </button>
        </div>
      </div>

      <button 
        onClick={() => setIndex((index + 1) % colors.length)}
        className="px-4 py-2 bg-gray-800 text-white rounded-md"
      >
        Сменить цвет фона
      </button>
    </main>
  );
}