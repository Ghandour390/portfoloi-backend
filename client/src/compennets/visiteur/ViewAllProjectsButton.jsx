
import React from "react";
import { useNavigate } from "react-router-dom";


export default function ViewAllProjectsButton({ name }) {

  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/project')}
      className="mx-auto flex items-center gap-3 px-8 py-3 border border-[#ffc72c] text-[#f5eec5] font-bold text-color-transparent rounded transition hover:bg-[#23232b] hover:border-[#ffd966] text-lg mt-8"
      style={{ minWidth: 240 }}
    >
      {name}
      <span className="text-2xl ml-2">&#8594;</span>
    </button>
  );
}