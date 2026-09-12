# Hero Booking Search Upgrade

## What will change
- Replace the existing small booking box with a wide search bar inspired by the reference image.
- Add destination/property, check-in, check-out, guests, and rooms controls.
- Keep the House499 headline, room image, and trust benefits prominent.
- Make the search action open the Rooms page with the selected booking details.
- Stack the controls cleanly on mobile while keeping the horizontal layout on larger screens.

## Technical details
- Update the homepage hero and its local form state in `src/routes/index.tsx`.
- Use the existing House499 semantic color tokens and icon set.
- Preserve the current image asset and public-page content integrations.
- Verify desktop and mobile layouts, interaction, and current build status.