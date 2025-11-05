import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-[#0f1729] p-4 text-white fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">mon portfolio</h1>
        </div>
         <ul className="flex ml-8">
            <li className="mr-4">
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li className="mr-4">
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li className="mr-4">
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            </li>
          </ul>
        <div>
          <Link to="/login" className="bg-[#55828b] text-[#e0b1cb] px-4 py-2 rounded hover:bg-[#fc892c]">Login</Link>
        </div>
      </div>
    </nav>
  );
}