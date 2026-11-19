# Videos einbauen (Testimonials und Hero)

Die Seite ist vorbereitet: Sobald Videos eingetragen sind, erscheinen sie automatisch – ohne
Drittanbieter (kein YouTube/Vimeo, keine Cookies). Jedes Video lädt erst, wenn jemand auf „Play“ klickt.

## 1. Dateien vorbereiten

- Format **MP4 (H.264 + AAC)**, 1080p reicht, Ziel **unter 20 MB** pro Video
  (z. B. `ffmpeg -i roh.mov -vf scale=-2:1080 -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k -movflags +faststart name.mp4`).
- Ein **Vorschaubild** (JPG, gleiches Seitenverhältnis), z. B. ein guter Moment aus dem Video:
  `ffmpeg -ss 3 -i name.mp4 -frames:v 1 -q:v 3 name.jpg`
- Beides nach `public/videos/` legen.

Mit Einverständnis der gezeigten Personen (schriftlich, inkl. Nutzung auf der Website).

## 2. Eintragen in `src/content/kayco.ts`

Testimonials (Bereich „Das sagen unsere Kunden.“ unter den Ergebnissen):

```ts
testimonials: {
  title: "Das sagen unsere Kunden.",
  items: [
    { name: "Vorname Nachname", role: "Finanzberater, Stadt", video: { src: "/videos/name.mp4", poster: "/videos/name.jpg", title: "Vorname über KAYCO" } },
  ],
},
```

Optional ein Video rechts im Hero (ersetzt dort die Kalender-Ansicht):

```ts
hero: {
  // …
  video: { src: "/videos/kayco-intro.mp4", poster: "/videos/kayco-intro.jpg", title: "KAYCO in 60 Sekunden" },
},
```

Die Videos werden im Format 16:9 gezeigt; Hochkant-Videos werden mittig beschnitten.
