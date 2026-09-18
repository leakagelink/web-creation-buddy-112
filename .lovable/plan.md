# Fix Android in-app loading

## Changes
- Set the packaged app URL exclusively to `https://home.socilet.one`.
- Remove all `lovable.app` hosts from Android navigation settings.
- Add a native Android WebView safeguard so every `home.socilet.one` page stays inside the app instead of launching Chrome.
- Keep external services such as WhatsApp, phone, and map links opening in their appropriate apps.
- Include the Android project files so the fix is delivered by Git rather than regenerated from stale local settings.

## Verification
- Confirm the Android package contains only the custom domain.
- Compile the Android debug app and inspect the generated configuration.
- Confirm the website build remains healthy.

## Installation requirement
The existing Android folder and old app must be removed once before pulling and installing this corrected build, because they contain previously generated settings.
