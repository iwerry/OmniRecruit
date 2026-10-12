# OmniRecruit — Design System

## Visual direction
A quiet, premium career-intelligence workspace inspired by the supplied Lüne visual reference: one continuous conversation, a living particle orb for Sophia, and a restrained dark-green/mint interface. Keep OmniRecruit's own identity; do not reuse the Lüne name or logo.

## DesignerX rules
- Operate mode: optimize scanability, task completion, accessibility and clear state feedback.
- Replace generic AI-dashboard tropes with deliberate hierarchy and one ownable signature: the responsive particle orb.
- Avoid neon overload, ornamental gradients, glowing card borders, tiny labels, duplicate panels, excessive rounding and decorative elements without meaning.
- Prefer restrained surfaces, strong typography hierarchy, generous spacing, crisp iconography and purposeful motion.
- Keep all important actions discoverable and usable by keyboard and touch.

## Tokens
- Canvas: `#080C0D`; sidebar: `#0B1010`; panel: `#0D1312`; raised surface: `#151E1E`.
- Primary text: `#EDF5F1`; secondary text: `#A7B4AD`; muted: `#788B7F`.
- Primary accent mint: `#A4F0D2`; secondary warm accent: `#E9C98B`.
- Borders: white-green at 12%; stronger divider at 22%.
- Radius: 10px small, 16px medium, 24px large.
- Typography: Manrope for interface and body; DM Mono only for compact technical labels.
- Motion: eased transitions, subtle orb breathing and particles; stop decorative animation for `prefers-reduced-motion`.

## Layout
- Desktop: compact left navigation; primary workspace with the orb/intro and conversation in one shared experience.
- Mobile: compact horizontal navigation, reduced orb, stacked chat, horizontal-scroll suggestion chips, composer controls sized for touch.
- The conversation is the product. The orb is a state indicator and focal signature, not a second dashboard card.

## Orb states
- `loading`: initializing; subdued particles.
- `idle`: calm breathing, stable mint particles.
- `listening`: warm pulse while microphone is active.
- `thinking`: faster particle motion while waiting for AI.
- `speaking`: brighter, rhythmic pulse while Sophia's response is spoken.
- `offline`: subdued/dispersed particles and explicit status label.
- Always display a text label; never communicate state by color alone.

## Accessibility and QA
- Visible focus indicators and keyboard access for every action.
- WCAG AA contrast for body text and control labels.
- Use `aria-live="polite"` for chat updates and clear error feedback.
- Keep consent explicit for camera/microphone; no automatic capture.
- Verify widths at 360px, 768px and 1280px+, no horizontal overflow, and reduced-motion behavior.
