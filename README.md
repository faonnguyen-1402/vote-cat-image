🐱 Cat Image Voting App

A simple cat voting app built with Next.js + TypeScript + Tailwind CSS, powered by TheCatAPI
.
Users can browse random cat images, vote them Up/Down, and track their own votes with a persistent identity.

Getting Started

1. Clone repo & install dependencies
   git clone https://github.com/your-username/cat-voting-app.git
   cd cat-voting-app
   npm install

2. Setup environment variables

Copy .env.example into .env.local:

cp .env.example .env.local

Inside .env.local, add your TheCatAPI key
:

# TheCatAPI Key (get it from https://thecatapi.com/)

NEXT_PUBLIC_CAT_API_KEY=your_api_key_here

3. Run the development server
   npm run dev

# or

yarn dev

# or

pnpm dev

Open http://localhost:3000
with your browser 🚀

Features

✅ Browse random cat photos
✅ Vote Up / Down with instant feedback
✅ Persistent sub_id (saved in localStorage)
✅ Refresh button to load more cats
✅ Error toast notifications
✅ Dark mode toggle 🌙
✅ "My Votes" tab to view past votes

Scripts

dev → Run Next.js dev server

build → Build production bundle

start → Run production server

lint → Check code style with ESLint
