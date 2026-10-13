# Fatima Hameed portfolio

## Run the portfolio

```sh
npm install
npm run dev
```

The development site runs on Vite's default port, `http://localhost:5173/`.
The dev command allows request headers up to 64 KB to avoid HTTP 431 errors
when the browser sends a large localhost cookie header.
The portfolio includes project previews, experience, education, skills, and
contact sections based on the supplied CV. The CV is served as
`/Fatima-Hameed-CV.pdf`. Project cards load each live website in a scaled,
lazy-loaded preview; your own images in `public/screenshots/` show instantly
and remain as a fallback while each site loads. PowerBrix uses its screenshot
only because its embedded live page is not suitable for a preview.

## Hero animation

The hero plays `public/charater.mp4` as a muted, looping, inline background
video. Its crop is positioned to keep the character on the right, and it does
not respond to mouse movement. Replace that file to update the hero video.
