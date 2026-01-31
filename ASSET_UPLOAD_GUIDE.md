# How to Add Your Video Assets

## Quick Start

Once you have your video files ready, follow these steps:

### 1. Place Files in Public Folder

Copy your video files to:
```
/Users/yinuo/Desktop/Lync Foundation/lync-foundation-website/public/
```

Required files:
- `hero-video.webm` (primary, smaller size)
- `hero-video.mp4` (fallback for Safari)
- `hero-poster.jpg` (first frame, shows while video loads)

### 2. Switch to Video Hero

Edit `src/app/page.tsx`:

```tsx
// Change this:
import { Header, Hero, Mission, Footer } from "@/components";

// To this:
import { Header, HeroVideo, Mission, Footer } from "@/components";

// And in the JSX, change:
<Hero />

// To:
<HeroVideo />
```

### 3. Test Locally

```bash
cd "/Users/yinuo/Desktop/Lync Foundation/lync-foundation-website"
npm run dev
```

Visit http://localhost:3000 to see the video hero.

### 4. Deploy

```bash
vercel --prod
```

---

## Video Specifications

| Property | Recommended |
|----------|-------------|
| Resolution | 1920x1080 (1080p) |
| Frame Rate | 24 or 30 fps |
| Duration | 10-15 seconds (seamless loop) |
| WebM Size | Under 2MB |
| MP4 Size | Under 3MB |
| Audio | None (muted) |

---

## Creating the Poster Image

The poster shows while the video loads. Create it by:

1. Take a screenshot of the first frame of your video
2. Or use one of your Midjourney images
3. Save as `hero-poster.jpg` (JPEG, quality 80)
4. Optimize: should be under 100KB

---

## Troubleshooting

**Video not playing?**
- Check file is in `/public/` folder
- Ensure video has no audio track (or is muted)
- Check browser console for errors

**Video too large?**
- Re-encode with higher CRF value (35-40)
- Reduce resolution to 1280x720
- Shorten the loop duration

**Safari not working?**
- Ensure you have the `.mp4` fallback
- MP4 must use H.264 codec

---

## FFmpeg Commands Reference

```bash
# Create WebM from MP4
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an hero-video.webm

# Create MP4 fallback
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart hero-video.mp4

# Create poster from first frame
ffmpeg -i input.mp4 -vframes 1 -q:v 2 hero-poster.jpg

# Check file size
ls -lh hero-video.*
```
