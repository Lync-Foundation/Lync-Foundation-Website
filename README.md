# Lync Foundation Website

The official website for [Lync Foundation](https://lync-foundation.org) — building trustless infrastructure that makes traditional finance verifiable on-chain.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Mono

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts & metadata
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles & Tailwind imports
│
└── components/
    ├── Header.tsx      # Navigation header
    ├── Hero.tsx        # Hero section
    ├── Mission.tsx     # Mission section
    ├── Products.tsx    # Products section
    ├── Footer.tsx      # Footer
    └── index.ts        # Component exports
```

## Deployment

This site is deployed on [Vercel](https://vercel.com). Push to `main` triggers automatic deployment.

### Environment Variables

No environment variables required for the base site.

## Links

- **Live Site:** https://lync-foundation.org
- **LyncZ Product:** https://lync-z.xyz
- **Twitter:** [@LyncFoundation](https://x.com/LyncFoundation)

## License

© 2026 Lync Foundation. All rights reserved.
