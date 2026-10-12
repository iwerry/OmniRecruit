# OmniRecruit — Product Brief

## Mission
Help people improve employability through practical career mentoring, LinkedIn positioning, interview practice and optional visual setup feedback. The product must produce honest, concrete next steps rather than generic encouragement.

## Audience and tone
Job seekers, career changers and people applying locally or internationally. Voice: warm, direct, specific, evidence-based and respectful. Default language: Brazilian Portuguese; interview practice can switch languages.

## Core workspace
1. **Mentoria IA** — Sophia helps with career strategy, CV, positioning and skills.
2. **Simulador de entrevista** — asks one question at a time, adapts to role/company/language and gives structured feedback.
3. **LinkedIn Coach** — improves profile wording without inventing titles, metrics or skills.
4. **Impacto visual** — optional review of observable setup/design elements only; camera permission must be explicit.

## Product rules
- Never promise employment or pretend to know a company's private interview process.
- Never invent professional experience, credentials, metrics or language proficiency.
- Evaluate communication and adjustable presentation choices, not body traits or sensitive personal characteristics.
- Never start camera or microphone automatically. Respect refusal and continue with text.
- Explain session/persistence limits honestly; give the user control over their history.
- AI characters are fictional. Keep feedback constructive, candid and actionable.

## Current implementation notes
- React 18 + Vite; CSS system in `src/styles/globals.css`.
- Puter.js client integration handles sign-in, AI chat and best-effort KV history.
- Web Speech API provides browser speech synthesis; availability varies by browser.
- Camera flow captures a single frame after consent.
- The particle orb is a visual state indicator; it does not claim microphone-volume analysis or audio-synchronized animation unless that capability is implemented.
