
import React, { useState } from "react";

const CartMessage = ({
	title = "Send a Message",
	nameLabel = "Name",
	emailLabel = "Email",
	messageLabel = "Message",
	namePlaceholder = "Your name",
	emailPlaceholder = "your.email@example.com",
	messagePlaceholder = "Tell me about your project or just say hello...",
	buttonLabel = "Send Message",
}) => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Ajoutez ici la logique d'envoi (API, email, etc.)
		alert("Message sent!");
		setForm({ name: "", email: "", message: "" });
	};

	return (
		<form
			className="bg-[#23262b] rounded-xl p-6 w-full max-w-xl mx-auto mt-6 border border-[#23232b] text-left shadow flex flex-col gap-4"
			onSubmit={handleSubmit}
		>
			<h2 className="text-2xl font-bold text-[#f6f3d7] mb-2">{title}</h2>
			<div>
				<label className="block text-[#f6f3d7] font-semibold mb-1">{nameLabel}</label>
				<input
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder={namePlaceholder}
					className="w-full px-4 py-2 rounded border border-[#23232b] bg-[#23262b] text-[#f6f3d7] focus:outline-none focus:border-[#ffc72c]"
					required
				/>
			</div>
			<div>
				<label className="block text-[#f6f3d7] font-semibold mb-1">{emailLabel}</label>
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder={emailPlaceholder}
					className="w-full px-4 py-2 rounded border border-[#23232b] bg-[#23262b] text-[#f6f3d7] focus:outline-none focus:border-[#ffc72c]"
					required
				/>
			</div>
			<div>
				<label className="block text-[#f6f3d7] font-semibold mb-1">{messageLabel}</label>
				<textarea
					name="message"
					value={form.message}
					onChange={handleChange}
					placeholder={messagePlaceholder}
					className="w-full px-4 py-2 rounded border border-[#23232b] bg-[#23262b] text-[#f6f3d7] focus:outline-none focus:border-[#ffc72c] min-h-[100px]"
					required
				/>
			</div>
			<button
				type="submit"
				className="bg-[#ffc72c] text-[#191a1d] font-semibold py-3 rounded mt-2 flex items-center justify-center gap-2 hover:bg-[#ffd966] transition text-lg"
			>
				<svg width="22" height="22" fill="none" stroke="#191a1d" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2z"/></svg>
				{buttonLabel}
			</button>
		</form>
	);
};

export default CartMessage;
