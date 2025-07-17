# 🛠️ SkinForge – Minecraft Skin Customizer

**SkinForge** is a modern web-based tool that lets you upload, preview, and customize Minecraft skins with additional cosmetic layers like hats, outfits, and other accessories — without modifying the base skin file or core gameplay.

---

## ✨ Features

- 🧍‍♂️ **Real-time 3D skin preview** powered by [skinview3d](https://github.com/bs-community/skinview3d)
- 🎨 **Upload your own skin** via PNG or load directly from a NameMC username
- 🎩 **Cosmetic layers**: Add or remove visual accessories like hats and outfits
- 📷 **Camera control**: Switch between front, back, left, and right perspectives
- 💾 **Export** final skin as a `.png` image with cosmetics layered on top

---

## 🧰 Built With

- **React + Next.js** – frontend framework (App Router with client-side rendering)
- **Tailwind CSS** – utility-first CSS framework for fast UI styling
- **React Icons** – icon set for modern and accessible UI components
- **skinview3d** – live 3D renderer for Minecraft skins in the browser
- **React Modal** – lightweight modal windows for UX interactions

---

## 📦 Dependencies

Here are the main dependencies used in the project:

```json
"dependencies": {
  "next": "^14.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-icons": "^4.x",
  "skinview3d": "^1.x",
  "react-modal": "^3.x",
  "tailwindcss": "^3.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x"
}
```

You can install them automatically using:

```bash
npm install
```

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SuperYang12/Minecraft-Skin-Customizer.git
cd Minecraft-Skin-Customizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app in your browser

```
http://localhost:3000
```

---

## 📁 Project Structure

```
/components
  └── SkinViewerCanvas.tsx      # skinview3d wrapper component
/pages
  └── index.tsx                 # Main page (SkinForge UI)
/public/cosmetics               # Cosmetic assets (e.g. hats)
/styles
  └── globals.css               # Tailwind + base styles
/tailwind.config.js             # Tailwind configuration
/postcss.config.js              # PostCSS setup
/README.md                      # You are here!
```

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full details.

---

## 🌞 Summer of Making

This project was built as part of [**Summer of Making**](https://summer.hackclub.com/projects/6799), a community-driven initiative by Hack Club to encourage young builders to create amazing things.
