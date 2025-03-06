# 🚀 PhotoForge AI - Full Stack AI SaaS Application

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![ShadCN UI](https://img.shields.io/badge/ShadCN%20UI-Design%20System-green)](https://ui.shadcn.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20&%20DB-green?logo=supabase)](https://supabase.io/)
[![Replicate](https://img.shields.io/badge/Replicate-AI%20Modeling-blue?logo=ai)](https://replicate.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-purple?logo=stripe)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

---

## 🌍 **Live Demo**
🔗 **Live Site:** [PhotoForge AI](https://photo-forge-ai.vercel.app/)  

---

## 📸 **About PhotoForge AI**
Transform your photos with the power of AI! 🤖✨  
**PhotoForge AI** is the ultimate solution for generating professional AI-powered photos. Train your AI model using personal images and generate stunning, high-quality AI-generated photos in minutes.

---

## ✨ **Features**
✅ **AI-Powered Image Generation** – Generate high-quality, lifelike images.  
✅ **Train Custom AI Models** – Upload personal images for personalized results.  
✅ **Secure User Authentication** – Powered by Supabase Auth.  
✅ **Payments & Subscriptions** – Seamless Stripe integration for Pro plans.  
✅ **Modern UI & UX** – Built with Next.js and ShadCN UI for a smooth experience.  
✅ **Lightning-Fast Processing** – Get AI-enhanced images in seconds.  
✅ **Private & Secure** – Data encryption and user-controlled storage.  

---

## 🛠 **Tech Stack**
- **Frontend**: ![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js) | ![React](https://img.shields.io/badge/React-18-blue?logo=react) | ![TypeScript](https://img.shields.io/badge/TypeScript-4-blue?logo=typescript)
- **Styling**: ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css) | ![ShadCN UI](https://img.shields.io/badge/ShadCN%20UI-Design%20System-green)
- **Backend**: ![Supabase](https://img.shields.io/badge/Supabase-Auth%20&%20DB-green?logo=supabase) | ![Replicate](https://img.shields.io/badge/Replicate-AI%20Modeling-blue?logo=ai)
- **Payments**: ![Stripe](https://img.shields.io/badge/Stripe-Payments-purple?logo=stripe)
- **Deployment**: ![Vercel](https://img.shields.io/badge/Vercel-Hosting-black?logo=vercel)

## 🔧 Setup & Run Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/PhotoForge-AI.git
cd PhotoForge-AI
```

### **2️⃣ Install Dependencies**
```sh
npm install
# or
yarn install
```
### **3️⃣ Set Up Environment Variables**
```sh
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Replicate AI API
REPLICATE_API_TOKEN=your_replicate_api_token

# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Webhook Secret (for AI Training)
NEXT_PUBLIC_WEBHOOK_SECRET=your_webhook_secret
```
### **4️⃣ Start the Development Server**
```sh
npm run dev
# or
yarn dev
Your app will be available at http://localhost:3000.
```
---

## 🔌 API Routes

| Endpoint                      | Method | Description                   |
|--------------------------------|--------|--------------------------------|
| `/api/webhooks/training`       | `POST` | Handles AI model training.    |
| `/api/auth/signin`             | `POST` | User authentication.         |
| `/api/auth/signup`             | `POST` | New user registration.       |
| `/api/payment/subscribe`       | `POST` | Handles Stripe subscriptions.|

---

## 🔒 Security & Privacy

- **🔹 User Data Encryption** – All photos and user data are securely encrypted.
- **🔹 Private AI Model Training** – No data sharing with third parties.
- **🔹 Users Control Their Data** – Users can delete their data anytime.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📩 Contact

📧 **Email:** shikhar3@ualberta.ca 
🌐 **Website:** [PhotoForge AI](https://photo-forge-ai.vercel.app/)  

