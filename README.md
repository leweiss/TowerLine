# TowerLine

TowerLine is a mobile-first realtime strategy prototype about drawing magical walls and chess-piece soldiers to defend a wizard and time a counterattack.

Target test URL:

```text
towerline.buildmeateam.com
```

## Local Check

```sh
npm run check
```

The game is a static web app. The playable files are:

- `index.html`
- `src/app.js`
- `src/styles.css`
- `assets/`

Raw source videos are intentionally ignored; compressed audio tracks live in `assets/music/`.

## Deployment Notes

This project is ready for static hosting on Vercel or GitHub Pages.

For Vercel, connect the GitHub repo and add `towerline.buildmeateam.com` as a custom domain. Point the DNS record for `towerline.buildmeateam.com` to Vercel as instructed by the Vercel dashboard.

For GitHub Pages, the included `CNAME` file sets the custom domain to `towerline.buildmeateam.com`.
