
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/project', label: 'Project' },
    { to: '/skills', label: 'Skills' },
    { to: '/experience', label: 'Experience' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
  <nav className="navbar-animated px-8 py-3 text-white w-full z-20 border-b border-[#232323] fixed top-0 left-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#ffc72c] mr-12 cursor-pointer">Portfolio</span>
        </div>
        <ul className="flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 px-2 pb-1 ${
                    isActive
                      ? 'text-[#ffc72c] border-b-2 border-[#ffc72c]'
                      : 'text-[#f5eec5] hover:text-[#ffc72c]'
                  }`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>

  );
}