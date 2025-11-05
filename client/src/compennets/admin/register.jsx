import React, { useState } from "react";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister) onRegister(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#231942]">
      <div className="bg-[#0f1729] rounded-2xl shadow-2xl w-[600px] p-8 border-2 border-[#9f86c0] relative top-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#5e548e]">Créer un compte</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 flex-wrap">
            <label className="flex flex-col text-[#e0b1cb]">
              Nom:
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]"
                required
              />
            </label>
            <label className="flex flex-col text-[#e0b1cb]">
              Prénom:
              <input
                type="text"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]"
                required
              />
            </label>
          </div>
          <label className="flex flex-col text-[#e0b1cb]">
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]"
              required
            />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Mot de passe:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]"
              required
            />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Confirmer le mot de passe:
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]"
              required
            />
          </label>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#5e548e] text-[#e0b1cb] px-6 py-2 rounded-lg font-semibold hover:bg-[#9f86c0] transition"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
