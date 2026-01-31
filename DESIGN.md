# Lync Foundation Website Design Plan

## Vision Statement

Create a website that **feels** like discovering a secret imperial research institution through visual design language—not explicit text. The aesthetic should evoke the mystery of the Forbidden City meeting cutting-edge cryptographic research, all while maintaining the elegant simplicity of the Lync logo.

---

## Core Design Pillars

### 1. Imperial Mystery (Feel, Don't Tell)

**What we're evoking:**
- The first time you see photos of the Forbidden City at dusk
- Ancient scrolls with secrets written in cipher
- Imperial seals and vermillion stamps
- Lacquered surfaces, deep shadows, geometric precision
- The weight of centuries of accumulated knowledge

**How to achieve this visually:**
- **Color palette derived from imperial China:**
  - Deep vermillion red (#8B2323) as accent, never dominant
  - Aged gold/bronze (#B8860B, #CD853F) for subtle highlights
  - Ink black (#0A0A0A) and parchment cream (#F5F0E6)
  - Your logo's blue-purple gradient as the "modern" contrast

- **Geometric patterns (not obvious Chinese motifs):**
  - Abstract lattice patterns inspired by imperial window screens
  - Subtle cloud/wave patterns at very low opacity
  - Precise grid systems echoing architectural precision

- **Texture and depth:**
  - Subtle paper/silk texture overlays
  - Layered shadows suggesting depth
  - Glassmorphism with warm tints

### 2. Frontier Research Aesthetic

**What we're evoking:**
- CERN control rooms
- Cryptographic diagrams
- Zero-knowledge proof visualizations
- Data flowing through circuits
- The moment of discovery

**How to achieve this visually:**
- **Technical elements:**
  - Thin precise lines
  - Monospace typography for technical content
  - Subtle animated particle systems
  - Circuit-like connecting lines

- **Contrast with imperial:**
  - The logo gradient represents "the future"
  - Imperial elements = "ancient wisdom"
  - Together = "timeless trust infrastructure"

### 3. Logo-Driven Elegance

**The Lync logo characteristics:**
- Clean, sharp silhouette
- Blue → Indigo → Purple gradient
- Organic curves within geometric bounds
- Suggests growth, connection, flight

**Extend this throughout:**
- Use the exact gradient (#7DD3FC → #6366F1 → #A855F7) as accent
- Thin elegant lines
- Generous whitespace
- Typography: light weights, wide tracking
- No clutter, no noise

---

## Hero Section: The Gateway

### Current Problem
A static logo with text is not immersive. It doesn't pull visitors in.

### Proposed Solution: Animated Visual Experience

**Option A: Generative Animation (Recommended)**

Create a custom WebGL/Canvas animation that combines:
1. **Imperial lattice patterns** slowly rotating/morphing
2. **Particle systems** that suggest data/light flowing through the lattice
3. **The Lync logo** emerging from or floating within this space
4. **Depth layers** creating parallax on mouse movement

**Technical Implementation:**
```
Tools: Three.js or React Three Fiber
Complexity: Medium-High
Performance: Optimized with proper LOD and frame limiting
```

**Step-by-step plan:**
1. Design the visual concept in Figma/After Effects first
2. Implement base Three.js scene
3. Create custom shaders for the gradient effects
4. Add mouse/scroll interactivity
5. Optimize for mobile (fallback to simpler version)

---

**Option B: Pre-rendered Video Background**

Create a looping video that embodies the aesthetic.

**Video Concept:**
- Abstract visualization of "trust verification"
- Imperial geometric patterns morphing into circuit-like structures
- Particles coalescing into the logo
- Deep blacks, vermillion accents, logo gradient highlights
- 10-15 second seamless loop

**Creation Process:**

1. **Generate with AI tools:**
   - Runway ML Gen-3 Alpha (best for abstract/conceptual)
   - Pika Labs (good for stylized motion)
   - Midjourney → video workflow

2. **Professional approach:**
   - After Effects + Particular/Form plugins
   - Cinema 4D / Blender for 3D elements
   - DaVinci Resolve for color grading

3. **Integration into Next.js:**

```tsx
// components/HeroVideo.tsx
export default function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.webm" type="video/webm" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
    </div>
  );
}
```

**Video specifications:**
- Resolution: 1920x1080 minimum, 4K preferred
- Format: WebM (VP9) primary, MP4 (H.264) fallback
- File size: Under 5MB for fast loading
- Duration: 10-15 seconds, seamless loop

---

**Option C: Hybrid Approach (Best Balance)**

Combine a subtle video background with interactive overlay elements:
1. **Background layer:** Slow-moving abstract video (very subtle)
2. **Middle layer:** CSS/SVG animated geometric patterns
3. **Top layer:** Interactive logo with mouse parallax
4. **Scroll trigger:** Elements reveal/transform as user scrolls

---

## Step-by-Step Execution Plan

### Phase 1: Visual Concept Development (Day 1-2)

1. **Create mood board** with references:
   - Forbidden City architecture details
   - Imperial Chinese patterns (lattice, clouds, waves)
   - Cryptographic visualizations
   - CERN/research lab aesthetics
   - Existing sites with similar vibes

2. **Design static mockups in Figma:**
   - Hero section with animation placeholders
   - Section transitions
   - Color system refinement
   - Typography scale

### Phase 2: Animation Asset Creation (Day 3-5)

**For Video Background:**

1. **Generate concept frames with Midjourney:**
   ```
   Prompt examples:
   - "abstract imperial Chinese lattice pattern, deep black background, 
     subtle vermillion red accents, data particles flowing, cinematic, 
     8k, architectural --ar 16:9"
   
   - "geometric pattern morphing from ancient oriental design to 
     circuit board, dark moody, blue purple gradient highlights, 
     mysterious, volumetric lighting --ar 16:9"
   ```

2. **Animate in Runway ML:**
   - Upload Midjourney frames as reference
   - Generate 4-second clips
   - Stitch and loop in video editor

3. **Alternative: After Effects workflow:**
   - Create vector patterns in Illustrator
   - Animate in After Effects
   - Add particle systems
   - Export as optimized video

**For WebGL Animation:**

1. Set up Three.js boilerplate in Next.js
2. Create custom geometry for lattice patterns
3. Write GLSL shaders for gradient effects
4. Add OrbitControls for subtle mouse interaction
5. Implement scroll-based transformations

### Phase 3: Implementation (Day 5-7)

1. **Update Hero component** with new animation
2. **Refine color system** in globals.css
3. **Add scroll-triggered reveals** for content sections
4. **Implement parallax layers**
5. **Optimize performance:**
   - Lazy load video/WebGL
   - Reduce motion for accessibility
   - Mobile fallbacks

### Phase 4: Polish & Deploy (Day 7-8)

1. Cross-browser testing
2. Performance audit (Lighthouse)
3. A/B test with users if possible
4. Deploy to production

---

## Specific Design Elements

### Navigation
- Keep minimal and transparent
- Remove "LYNC FOUNDATION" text, use logo only
- On scroll: subtle backdrop blur

### Hero (Post-Animation)
- NO text initially
- After 3-5 seconds OR on scroll:
  - Subtle tagline fades in (small, elegant)
  - Scroll indicator appears

### Content Sections
- Full-width backgrounds with texture
- Content in elegant cards with subtle borders
- Gradient accents from logo colors
- Generous padding (py-32 minimum)

### Transitions Between Sections
- Subtle parallax on scroll
- Elements fade/slide in when in viewport
- Color temperature shifts (warmer → cooler)

### Footer
- Minimal, elegant
- Imperial pattern as subtle background
- Contact info without labels (icon + text only)

---

## Color System Update

```css
:root {
  /* Imperial palette */
  --imperial-black: #0A0A0A;
  --imperial-vermillion: #8B2323;
  --imperial-gold: #B8860B;
  --imperial-bronze: #CD853F;
  --imperial-cream: #F5F0E6;
  
  /* Logo gradient */
  --lync-blue: #7DD3FC;
  --lync-indigo: #6366F1;
  --lync-purple: #A855F7;
  
  /* Functional */
  --background-dark: #080808;
  --background-light: var(--imperial-cream);
  --text-dark: #FAFAFA;
  --text-light: #1A1A1A;
}
```

---

## Typography System

```css
/* Display - Hero elements */
.display {
  font-family: 'Geist', sans-serif;
  font-weight: 200;
  letter-spacing: 0.05em;
}

/* Body - Content */
.body {
  font-family: 'Geist', sans-serif;
  font-weight: 300;
  line-height: 1.7;
}

/* Technical - Code, data */
.technical {
  font-family: 'Geist Mono', monospace;
  font-weight: 400;
  letter-spacing: 0.02em;
}

/* Label - Small caps */
.label {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
```

---

## Animation Resources & Tools

### AI Video Generation
1. **Runway ML** (https://runway.ml) - Best for abstract/artistic
2. **Pika Labs** (https://pika.art) - Good for stylized motion
3. **Luma AI** (https://lumalabs.ai) - 3D-aware generation

### Traditional Animation
1. **After Effects** - Industry standard
2. **Cavalry** (https://cavalry.scenegroup.co) - Procedural motion
3. **Rive** (https://rive.app) - Web-native interactive animations

### WebGL/3D
1. **Three.js** - Core 3D library
2. **React Three Fiber** - React wrapper for Three.js
3. **Spline** (https://spline.design) - Visual 3D design tool
4. **Shader Toy** - GLSL shader inspiration

### Integration in Next.js

**For video:**
```bash
# Optimize video for web
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an hero.webm
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -an hero.mp4
```

**For Three.js:**
```bash
npm install three @react-three/fiber @react-three/drei
```

---

## Immediate Next Steps

1. **Remove explicit "imperial" text** from current site
2. **Refine color palette** to match this document
3. **Create Midjourney concept frames** for video
4. **Prototype hero animation** (start with CSS/SVG if faster)
5. **Test with 3-5 users** for "feel" feedback

---

## Success Metrics

The design succeeds when visitors:
- ✓ Feel intrigued before reading any text
- ✓ Sense "something important happens here"
- ✓ Notice the quality and attention to detail
- ✓ Remember the visual identity days later
- ✓ Don't consciously think "Chinese" but feel "ancient + advanced"

---

## References for Inspiration

- https://stripe.com (elegant tech)
- https://linear.app (minimal precision)
- https://www.apple.com (premium reveal)
- CERN website dark mode
- Forbidden City photography (Rong Rong, Fan Ho)
- Ming Dynasty furniture photography
