import React from 'react';

export default function Header({ left, rigth }:{ left:React.ReactNode, rigth:React.ReactNode }) {
  return (
    <header className="w-full px-8 max-w-7xl py-8 flex justify-between items-center flex-col md:flex-row gap-6">
      {left}
      <nav className="flex justify-center items-center gap-8 text-lg">
        {rigth}
      </nav>
    </header>
  );
}
