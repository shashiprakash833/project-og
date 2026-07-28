# OG Streetwear Component React Project

Fresh component-based React/Vite project.

## Run

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Setup
- Copy `server/.env.example` to `server/.env`
- Set your MySQL values and `JWT_SECRET`
- Ensure `VITE_API_BASE=http://localhost:4000` is present in `.env.local`

## Structure

```text
src/App.jsx
src/data/storeData.js
src/pages/HomePage.jsx
src/pages/RoutePage.jsx
src/components/layout/Header.jsx
src/components/layout/Footer.jsx
src/components/ui/SplashScreen.jsx
src/components/ui/ProductCard.jsx
src/components/ui/PageHero.jsx
src/components/sections/HeroSection.jsx
src/components/sections/PromiseStrip.jsx
src/components/sections/CollectionsSection.jsx
src/components/sections/ProductsSection.jsx
src/components/sections/LookbookSection.jsx
src/components/sections/CommunitySection.jsx
src/components/sections/NewsletterSection.jsx
```

## Add Hero Video Later

The video tag is intentionally empty in:

```text
src/components/sections/HeroSection.jsx
```

When your video is ready, put it in:

```text
public/og-vid.mp4
```

Then replace:

```jsx
<source src="" type="video/mp4" />
```

with:

```jsx
<source src="/og-vid.mp4" type="video/mp4" />
```
