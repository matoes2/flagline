# Flagline, GitHub Pages edition

A no-equipment calisthenics app that takes you from a first push-up to the human flag: seven levels, set checklists, hold timers and milestones. It runs entirely in the browser. There is no account, no server and no tracking, and once it has loaded it works offline. On a phone it installs to the Home Screen and opens full screen like an app.

## Put it online (about 5 minutes, no command line)

1. **Create a repository.** On github.com choose **New repository**. Name it `flagline` (any name works), set it to **Public**, and create it. GitHub Pages is free for public repositories.
2. **Upload the files.** In the empty repository choose **uploading an existing file** (or **Add file, Upload files**). Select **every file from this folder** and drop them in. Keep them together at the top level with no subfolders, then choose **Commit changes**.
3. **Turn on Pages.** Go to **Settings, Pages**. Under *Build and deployment* set **Source** to **Deploy from a branch**, set **Branch** to `main` and the folder to `/ (root)`, then **Save**.
4. **Open your site.** After a minute or two it is live at `https://YOUR-USERNAME.github.io/flagline/`. The Pages settings screen shows the exact address once it is ready.
5. **Install it on your phone.** On an iPhone open the address in **Safari**, tap **Share**, then **Add to Home Screen**. On Android open the browser menu and tap **Install app**. The app also offers to walk you through this on the Today tab.

### Prefer the command line?

```
cd path/to/this/folder
git init
git add .
git commit -m "Flagline"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/flagline.git
git push -u origin main
```

Then do step 3 above.

## What is in this folder

| File | What it is |
| --- | --- |
| `index.html` | The whole app: code, styles and fonts in one file |
| `sw.js` | Service worker that makes the app open instantly and work offline |
| `manifest.json` | Tells phones how to install it (name, colours, icons) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | App icons for Android and desktop |
| `apple-touch-icon.png` | Home Screen icon for iPhone and iPad |
| `favicon.svg`, `favicon-32.png`, `favicon-48.png` | Browser tab icons |
| `.nojekyll` | Tells GitHub to publish the files exactly as they are (see below) |
| `FONTS-LICENSE.txt` | Licence for the two bundled fonts |
| `README.md` | This file |

Every link inside the app is relative, so it works under any repository name, at a custom domain, or on a `YOUR-USERNAME.github.io` site without editing anything.

## Updating later

Upload the new files over the old ones (same names replace the old ones) and commit. The next time the app is opened while online it picks up the new version by itself within a few seconds. If you are in the middle of a workout it shows a "New version ready" note instead, and you can reload whenever you like. The version number is at the bottom of **Progress, Settings**. Tap it to see the screen and safe-area numbers the app is working with, which helps if something ever looks off on a particular phone.

## Good to know

- **Your progress lives in the browser on each device.** A phone and a laptop do not share it, and the app installed on the Home Screen keeps its own copy, separate from Safari. Use **Progress, Settings, Copy backup** and **Restore** to move your progress between them. Clearing website data, or deleting the Home Screen app, erases it, so copy a backup now and then.
- **Offline.** After the first visit the whole app is stored on the device. Workouts, timers and exercise guides all work with no signal.
- **`.nojekyll`.** Files whose names start with a dot are hidden in most file pickers, so you may not see this one. The site works without it, so skip it if your uploader cannot pick it up.
- **HTTPS.** Leave **Enforce HTTPS** ticked in the Pages settings (it is on by default). Phones only allow installing and offline mode on secure sites.
- **Private repositories** need a paid GitHub plan to use Pages.
- **Fonts.** Barlow Condensed and Manrope are embedded in `index.html` under the SIL Open Font License. Keep `FONTS-LICENSE.txt` with the app if you share or copy it.

## If something looks wrong

- **404 page:** Pages is not switched on yet (step 3), it is still deploying (wait a minute and refresh), or `index.html` is inside a folder instead of at the top level of the repository.
- **App opens unstyled or blank:** a file did not upload. Check that `index.html` in the repository is about 300 KB, and upload it again.
- **An old version keeps showing:** fully close the app and open it again. It checks for updates each time it opens online.
- **Installed app is missing your progress:** it has separate storage from the browser (see above). Restore from a backup.
