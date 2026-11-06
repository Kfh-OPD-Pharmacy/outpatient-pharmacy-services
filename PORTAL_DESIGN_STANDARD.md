# Portal Design Standard

## Official visual reference

`pages/index.html` (MAIN PORTAL) is the official visual reference for all portal pages. Existing production files are the source of truth for values that are page-specific; do not replace approved values with estimates.

## Global identity

- Default language: English (`lang="en"`, `dir="ltr"`). Arabic is enabled only through the existing language switch.
- Preserve the official header, hospital/organization text, logo source, blue identity color `#168fb3`, vertical identity rule, horizontal separator, employee card, spacing, typography, and responsive behavior from MAIN PORTAL.
- Preserve page-specific content, permissions, sessions, APIs, forms, tables, and functional behavior.

## Service-card geometry

- Use the service-card grid and central-logo implementation from MAIN PORTAL for service navigation.
- The approved desktop grid uses two equal columns, a 4px row/column gap, a centered grid container, and the existing card dimensions, masks, shadows, radii, padding, typography, and hover behavior from `pages/index.html`.
- The approved MAIN PORTAL values currently include: card height `116px`, desktop grid width up to `760px`, central logo `54px × 54px`, and inner cutout `30px`; the mobile rules use the existing reduced values (`104px` row height, `44px` logo, `26px` cutout) defined in the reference file.
- Two-card service pages use the approved diagonal positions from the existing reference implementation: first card upper-right, second card lower-left, with the central logo at the original grid intersection and the same masks. Do not create a one-row replacement layout.
- Do not add placeholder cards, extra columns, arbitrary margins, negative offsets, transforms, or approximate dimensions.

## Language and direction invariants

- Changing language may change translated text and the direction of text inside a card only.
- The service-card grid must remain geometrically stable when switching between English and Arabic: card order, grid areas, row/column positions, logo center, masks, gaps, dimensions, and responsive breakpoints must not mirror or reorder because of `rtl`.
- Keep the grid container and its placement rules explicitly left-to-right/stable where required; apply RTL/LTR to text content and inline text alignment within cards and controls.
- English remains the initial language after a fresh load unless the existing, explicit language preference mechanism restores Arabic.

## Responsive behavior

- Reuse the responsive rules in `pages/index.html` for desktop and mobile widths.
- Prevent horizontal overflow, overlap, accidental row reordering, or logo displacement during language changes.
- Validate the reference geometry at the project’s supported mobile widths before changing any approved value.

## Scope

This standard applies to service-navigation cards and their central logo. It does not require a central logo or service-card grid in ordinary forms, tables, dashboards, or reports that do not contain service-navigation cards.

## Current MAIN PORTAL structure

The current MAIN PORTAL uses four stable entry cards around the central logo:

- **Pharmacy Medications** → `pharmacy-medications.html`
- **Medication Booking** → `medication-booking.html`
- **Mail Pharmacy** → `prescriptions/index.html`
- **Control Panel** → `control-panel.html`

The two intermediate portals reuse existing service pages and permissions. They must not create new backend permissions or bypass server-side authorization:

- Pharmacy Medications: orders use `kidneyOrderAccess`, `diabetesOrderAccess`, or `outpatientOrderAccess`; expiry uses `kidneyExpiryDashboardAccess`/`kidneyExpiryRegisterAccess`; labels use `kidneyLabelsAccess`.
- Medication Booking: management uses `opdAppointmentManageAccess`; dashboard uses `opdAppointmentIndicatorAccess`; the public booking link remains the existing `medication/index.html` link and is not an administrative permission.
- Mail Pharmacy remains governed by `opdMailRxAccess`, `opdMailDailyListAccess`, and `opdMailIndicatorAccess` inside its existing portal.
- Control Panel remains governed by `userManagementAccess` and `medicationManagementAccess`.
