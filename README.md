# DogWithHair

This is a static Next.js app that generates a dog profile picture using the OpenAI image generation API. Provide a hairstyle description and an image of a chihuahua will be generated with that hairstyle.

## Setup

1. Create a `.env.local` file (or copy `.env.example`) and set `NEXT_PUBLIC_OPENAI_API_KEY` with your OpenAI API key.
2. Install dependencies and run the development server:

```bash
npm install
npm run dev
```

## Build

To generate the static site use:

```bash
npm run build
```
