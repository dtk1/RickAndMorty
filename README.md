# 🧪 Rick and Morty Universe Explorer

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/AI-Gemini_3_Flash-orange?style=for-the-badge&logo=google-gemini)

**Rick and Morty Universe Explorer** is a high-performance Fullstack application built for fans of the iconic animated series. This project showcases modern web development patterns, integrating real-time data from the Rick and Morty API with the cutting-edge **Gemini 3 Flash** model to create an interactive, AI-enriched experience.

**🔗 Live Demo:** https://rick-and-morty-woad-ten.vercel.app/

---

## ✨ Key Features

- 🔍 **Advanced Search & Discovery:** Instant character filtering by name, status, species, and gender with debounced input.
- 🧠 **Next-Gen AI Insights:** Powered by **Google Gemini 3 Flash** (2026 Edition), providing ultra-low latency character lore, "Rick-style" snarky bios, and multiverse threat analysis.
- 🌓 **Dynamic Theming:** Seamless transition between Light and Dark modes with persistent user preference storage using `next-themes`.
- ⚡ **Optimized UX:** Smooth navigation with Shimmer Skeletons for data fetching and AI content streaming.
- 📱 **Mobile-First Design:** A fully responsive interface crafted with Tailwind CSS and Radix UI primitives.

---

## 🛠 Technical Stack

### Frontend & UI
- **Next.js 14 (App Router)**: Utilizing Server Components for fast initial paint and Client Components for interactivity.
- **Tailwind CSS**: Utility-first styling for a custom, modern aesthetic.
- **Shadcn UI**: Accessible, high-quality UI component library.
- **Lucide React**: Scalable iconography.

### Backend & AI Architecture (BFF Pattern)
- **Gemini 3 Flash**: The latest 2026 generative model, chosen for its near-instant inference and native JSON schema support.
- **Server-Side Proxy Layer**: To comply with security best practices, all external API calls are routed through internal Next.js API endpoints (`/api/proxy`). This ensures API keys are never exposed to the client.
- **TypeScript**: End-to-end type safety across the entire application.

---

## 🏗 Architectural Design

The application follows the **Backend-for-Frontend (BFF)** pattern:
1. **Security:** Zero client-side API leakage. The browser only talks to our own server.
2. **State Management:** URL-based state synchronization for filters and pagination, allowing users to share specific search results via links.
3. **AI Stability:** Leveraging Gemini 3's native JSON mode to ensure reliable and structured content delivery to the UI.

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/rick-and-morty-explorer.git](https://github.com/YOUR_USERNAME/rick-and-morty-explorer.git)


2. **Install dependencies:**
   ```bash
   npm install



3. **Configure Environment Variables:**
Create a `.env.local` file in the root directory:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3-flash

```


4. **Run the development server:**
```bash
npm run dev

```


5. **Open the app:** Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

---
## 📁 Project Structure

```text
/app/api/proxy      # Server-side API Proxy Layer
/app/character/[id] # SSR Character Detail Pages
/components/ui      # Reusable Shadcn Components
/hooks              # Custom hooks (e.g., useDebounce)
/lib                # TypeScript types and utility functions

```
