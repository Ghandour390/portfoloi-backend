import React, { useState } from "react";
import {  gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        nom
        prenom
        email
        image
        biographie
      }
    }
  }
`;

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ variables: { input: { email, password } } });
      if (result.data.login) {
        localStorage.setItem('accessToken', result.data.login.accessToken);
        localStorage.setItem('refreshToken', result.data.login.refreshToken);
        
        if (onLogin) onLogin(result.data.login);
      }
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#231942]">
      <div className="bg-[#5e548e] rounded-2xl shadow-2xl w-full max-w-sm p-8 border-2 border-[#9f86c0]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#e0b1cb]">Connexion</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col text-[#e0b1cb]">
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 rounded-lg px-3 py-2 bg-[#3e2c56] text-white focus:outline-none focus:ring-2 focus:ring-[#be95c4]"
              required
            />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Mot de passe
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 rounded-lg px-3 py-2 bg-[#3e2c56] text-white focus:outline-none focus:ring-2 focus:ring-[#be95c4]"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-[#e0b1cb] text-[#5e548e] px-6 py-2 rounded-lg font-semibold hover:bg-[#be95c4] transition mt-4"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          {error && <p className="text-red-400 text-center mt-2">Erreur : {error.message}</p>}
        </form>
        {data && (
          <div className="text-green-400 text-center mt-4">
            Bienvenue, {data.login.user.nom} !
          </div>
        )}
      </div>
    </div>
  );
}
