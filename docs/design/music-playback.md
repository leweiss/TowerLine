# Music Playback Plan

The converted music lives in `assets/music` as AAC `.m4a` files for mobile-web compatibility.

## Assets

- `track-1.m4a`: The Last Gate Holds, 159.24 seconds.
- `track-2.m4a`: Under the Broken Standard, 147.70 seconds.
- `track-3.m4a`: Sovereign of the Iron Gate, 157.08 seconds.
- `manifest.json`: playback order, titles, durations, and the default 2 second crossfade.

## Loading Flow

1. Show the splash screen with the hero graphic.
2. Wait for the player to tap or click start.
3. Create the first `Audio` element inside that user gesture and start track one.
4. Fetch the manifest after playback has been unlocked, using built-in fallback paths if the manifest is delayed.
5. When the current track is within 2 seconds of ending, create the next `Audio` element.
6. Fade the next track up while fading the previous track down over 2 seconds.
7. Keep looping through the manifest while the player stays in the app.

## End State

When the match ends, the result overlay shows `You Win` or `Vanquished`, a `Play Again` action, and a stats panel for units produced and killed by type for each side.
