import { useState } from 'react'
export default function Profile() {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    dateNaissance: "",
    telephone: "",
    adresse: "",
    photo: null,
    couverture: null,
    biographie: ""
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
  
      <div className="bg-[#0f1729] rounded-2xl shadow-2xl w-[600px] p-8 border-2 border-[#5e548e] relative top-20 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#5e548e]">Edit Profile</h2>
        <form className="flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
          <label className="flex flex-col text-[#e0b1cb]">
            Nom:
            <input type="text" name="nom" value={user.nom} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Prénom:
            <input type="text" name="prenom" value={user.prenom} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          </div>
          <label className="flex flex-col text-[#e0b1cb]">
            Date de naissance:
            <input type="date" name="dateNaissance" value={user.dateNaissance} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Téléphone:
            <input type="tel" name="telephone" value={user.telephone} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Adresse:
            <input type="text" name="adresse" value={user.adresse} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Image:
            <input type="file" name="image" className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] file:bg-[#be95c4] file:text-[#231942] file:rounded file:px-2 file:py-1 focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Couverture:
            <input type="file" name="cover" className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] file:bg-[#be95c4] file:text-[#231942] file:rounded file:px-2 file:py-1 focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Mot de passe:
            <input type="password" name="password" value={user.password} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <label className="flex flex-col text-[#e0b1cb]">
            Biographie:
            <textarea name="biographie" value={user.biographie} onChange={handleChange} className="mt-1 rounded-lg px-3 py-2 bg-[transparent] text-[#ffffff] border border-[#9f86c0] min-h-[80px] focus:ring-2 focus:ring-[#9f86c0]" />
          </label>
          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-[#5e548e] text-[#e0b1cb] px-6 py-2 rounded-lg font-semibold hover:bg-[#9f86c0] transition">Save</button>
          </div>
        </form>
      </div>
  
  );
}
