"use client";

import { useState } from "react";

const defaultData = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

export default function Home() {
  const [dominoes, setDominoes] = useState(defaultData);
  const [removeNumber, setRemoveNumber] = useState("");

  const doubleCount = dominoes.filter(([a, b]) => a === b).length;

 
  const handleSortAsc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];

      if (sumA === sumB) {
        if (a[0] === b[0]) {
          return a[1] - b[1];
        }
        return a[0] - b[0];
      }
      return sumA - sumB;
    });
    setDominoes(sorted);
  };

  
  const handleSortDesc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];

      if (sumA === sumB) {
        if (a[0] === b[0]) {
          return b[1] - a[1];
        }
        return b[0] - a[0];
      }
      return sumB - sumA;
    });
    setDominoes(sorted);
  };

  const handleRemoveDuplicates = () => {
    const map = new Map();
    dominoes.forEach(([a, b]) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      map.set(key, (map.get(key) || 0) + 1);
    });
    const filtered = dominoes.filter(([a, b]) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      return map.get(key) === 1;
    });
    setDominoes(filtered);
  };

  const handleFlip = () => {
    const flipped = dominoes.map(([a, b]) => [b, a]);
    setDominoes(flipped);
  };

  const handleRemove = () => {
    const numToRemove = parseInt(removeNumber, 10);
    if (!isNaN(numToRemove)) {
      const filtered = dominoes.filter(([a, b]) => a + b !== numToRemove);
      setDominoes(filtered);
    }
    setRemoveNumber("");
  };

  const handleReset = () => {
    setDominoes(defaultData);
    setRemoveNumber("");
  };

  return (
    <center>
      <div className="bg-white w-full h-full flex flex-col">
        <div className="w-full">
          <span className="font-bold text-[24px]">Dominoes</span>

          <div className="border rounded-md w-[350px] h-[60px] bg-[#FAFAFA] flex flex-col px-4">
            <span className="font-bold flex justify-start">Source</span>
            <span className="flex justify-start">
             [ [6,1]
, [4,3]
, [5,1]
, [3,4]
, [1,1]
, [3,4]
, [1,2]]
            </span>
          </div>

          <div className="border rounded-md w-[300px] h-[60px] bg-[#FAFAFA] flex flex-col mt-[10px] px-4">
            <span className="font-bold flex justify-start">Double Numbers</span>
            <span className="flex justify-start">{doubleCount}</span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="flex gap-4">
            {dominoes.map(([a, b], idx) => (
              <div
                key={idx}
                className="border rounded-sm h-[80px] w-[20px] flex flex-col gap-2 justify-center items-center"
              >
                <span>{a}</span>
                <span>-</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex text-white justify-center mt-4 gap-2">
          <button
            className="p-2 border rounded-md w-auto h-auto bg-[#3182CE]"
            onClick={handleSortAsc}
          >
            Sort (ASC)
          </button>
          <button
            className="p-2 border rounded-md w-auto h-auto bg-[#3182CE]"
            onClick={handleSortDesc}
          >
            Sort (DESC)
          </button>
          <button
            className="p-2 border rounded-md w-auto h-auto bg-[#3182CE]"
            onClick={handleFlip}
          >
            Flip
          </button>
          <button
            className="p-2 border rounded-md w-auto h-auto bg-[#3182CE]"
            onClick={handleRemoveDuplicates}
          >
            Remove Dup
          </button>
          <button
            className="p-2 border rounded-md w-auto h-auto bg-[#3182CE]"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <input
            type="text"
            className="border rounded-md"
            value={removeNumber}
            onChange={(e) => setRemoveNumber(e.target.value)}
          />
          <button
            className="p-2 border rounded-md w-auto h-auto bg-[#3182CE] text-white"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </center>
  );
}


