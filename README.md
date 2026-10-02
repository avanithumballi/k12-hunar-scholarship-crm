# K12 Hunar — Scholarship Management CRM

A focused React + Vite frontend demo for the K12 Hunar Frontend Developer Assessment.

## Included assessment functionality

- Four summary cards: Total Scholarships, Published, Draft, Expired
- State filtering for Bihar, Haryana and Jharkhand
- Scholarship records in a responsive table
- Status changes between Published, Draft and Expired
- Add Scholarship form
- Edit Scholarship form
- Student-facing Preview
- Required workflow: Choose State → View Scholarships → Edit Status → Save Changes → Preview Card
- Basic form validation and URL validation
- Responsive layout for desktop, tablet and mobile
- LocalStorage persistence for the frontend-only demo

## Tech

- React 18
- Vite
- Lucide React
- CSS
- Browser localStorage

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Design approach

The interface intentionally stays focused on the assessment instead of adding unrelated CRM modules. The visual language uses a restrained navy, blue, green, amber and red status system, clear hierarchy, accessible controls and responsive behavior.

## AI / references

AI assistance was used for UI planning, implementation scaffolding, CSS refinement, validation ideas and documentation. The final implementation was reviewed and adapted to the assessment requirements. No production backend, authentication, payments or email automation was added.
