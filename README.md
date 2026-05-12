# Hephzibah Technologies — Frontend

The public-facing marketing website for Hephzibah Technologies, built with Next.js 16, React 19, and Tailwind CSS 4. Covers the full site: home, services, industries, approach, careers, contact, and scheduling.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.1 (App Router) |
| UI Library | React 19.2.4 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5 |
| Icons | lucide-react 0.577.0 |
| Utilities | clsx, md5 |
| Linting | ESLint 9 |

---

## Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout — fonts, metadata
│   │   ├── globals.css                         # Tailwind + global styles
│   │   ├── (marketing)/                        # Route group: main site pages
│   │   │   ├── layout.tsx                      # Navbar + Footer wrapper
│   │   │   ├── page.tsx                        # Home (/)
│   │   │   ├── about/page.tsx                  # About (/about)
│   │   │   ├── contact/page.tsx                # Contact (/contact)
│   │   │   ├── approach/page.tsx               # Approach (/approach)
│   │   │   ├── industries/page.tsx             # Industries (/industries)
│   │   │   ├── products/page.tsx               # Products (/products)
│   │   │   ├── resources/page.tsx              # Resources (/resources)
│   │   │   ├── compliance/page.tsx             # Compliance (/compliance)
│   │   │   ├── careers/
│   │   │   │   ├── page.tsx                    # Careers listing (/careers)
│   │   │   │   └── apply/
│   │   │   │       ├── page.tsx                # Apply page shell (/careers/apply)
│   │   │   │       └── ApplyPageContent.tsx    # Apply page logic (client component)
│   │   │   ├── schedule/page.tsx               # Token-gated scheduling (/schedule)
│   │   │   └── services/
│   │   │       ├── page.tsx                    # Services overview (/services)
│   │   │       ├── staff-augmentation/page.tsx
│   │   │       ├── ai-product-development/page.tsx
│   │   │       └── managed-services/page.tsx
│   │   └── enquiry/page.tsx                    # Enquiry form (/enquiry)
│   ├── components/
│   │   ├── Navbar.tsx                          # Site navigation header
│   │   ├── Footer.tsx                          # Site footer
│   │   ├── PageHero.tsx                        # Reusable hero section
│   │   ├── CTABanner.tsx                       # Call-to-action banner
│   │   ├── SectionHeader.tsx                   # Section title component
│   │   ├── SectionWrapper.tsx                  # Section layout wrapper
│   │   ├── CheckList.tsx                       # Styled checklist
│   │   ├── HideOnRoutes.tsx                    # Conditionally hides children on specified routes
│   │   ├── ContactForm.tsx                     # Multi-step contact + calendar form
│   │   ├── JobApplicationForm.tsx              # Job application form with resume upload
│   │   ├── OpenRolesSection.tsx                # Careers page — job roles grid + open roles list
│   │   └── ScheduleManager.tsx                 # Token-gated calendar booking widget
│   ├── hooks/
│   │   └── useJobRoles.ts                      # Fetches active job roles from backend
│   ├── services/
│   │   ├── careerInquiry.ts                    # Career inquiry API calls (Frappe)
│   │   └── jobApplicant.ts                     # Job applicant submission API calls (Frappe)
│   └── config.ts                               # Reads NEXT_PUBLIC_BACKEND_URL
├── .env.local                                  # Environment variables (not committed)
├── next.config.ts                              # Next.js configuration
├── tailwind.config.ts                          # Tailwind configuration
├── tsconfig.json                               # TypeScript configuration
└── package.json
```

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `(marketing)/page.tsx` | Home page |
| `/about` | `about/page.tsx` | About the company |
| `/services` | `services/page.tsx` | Services overview |
| `/services/staff-augmentation` | `services/staff-augmentation/page.tsx` | Staff augmentation detail |
| `/services/ai-product-development` | `services/ai-product-development/page.tsx` | AI product development detail |
| `/services/managed-services` | `services/managed-services/page.tsx` | Managed services detail |
| `/industries` | `industries/page.tsx` | Industries served |
| `/approach` | `approach/page.tsx` | Company approach |
| `/products` | `products/page.tsx` | Products |
| `/resources` | `resources/page.tsx` | Resources |
| `/compliance` | `compliance/page.tsx` | Compliance information |
| `/contact` | `contact/page.tsx` | Contact form + calendar picker |
| `/careers` | `careers/page.tsx` | Job listings |
| `/careers/apply` | `careers/apply/page.tsx` | Job application form |
| `/schedule` | `schedule/page.tsx` | Token-gated meeting scheduler |
| `/enquiry` | `enquiry/page.tsx` | General enquiry form |

---

## Key Components

### `ContactForm`
Multi-step form (Step 1: calendar + time slot, Step 2: personal details). Fetches available slots from the backend. Blocks same-day and past-date booking. Submits to `POST /create-lead`.

### `ScheduleManager`
Token-gated scheduling widget embedded in `/schedule?t=<token>`. Validates the token, fetches available slots, and books via `POST /api/schedule/book`. Only reachable through emailed invite links.

### `OpenRolesSection`
Renders two sections on the careers page:
- **Roles We Typically Hire For** — cards with expandable HTML job descriptions (50-word truncation with Read more / Show less).
- **Open Roles** — expandable rows with salary, tags, and Apply links.

### `JobApplicationForm`
Handles resume upload (via `POST /erpnext/upload-file`) and application submission (via `POST /erpnext/job-applicant` or `POST /erpnext/career-inquiry`).

---

## Backend API Calls

All requests go to `NEXT_PUBLIC_BACKEND_URL`. The hook and services consume these endpoints:

| Method | Endpoint | Used By |
|---|---|---|
| `GET` | `/job-roles` | `useJobRoles` hook — careers page, apply page |
| `POST` | `/create-lead` | `ContactForm` — contact page submission |
| `POST` | `/api/schedule/book` | `ScheduleManager` — book a meeting |
| `GET` | `/api/schedule/available?date=YYYY-MM-DD` | `ContactForm`, `ScheduleManager` — available time slots |
| `GET` | `/api/schedule/token-info?token=<t>` | `ScheduleManager` — validate invite token |
| `POST` | `/erpnext/upload-file` | `JobApplicationForm` — resume upload |
| `POST` | `/erpnext/career-inquiry` | `JobApplicationForm` — speculative application |
| `POST` | `/erpnext/job-applicant` | `JobApplicationForm` — role-specific application |

---

## Environment Variables

Set in `.env.local` (not committed to version control):

```env
# Development
NEXT_PUBLIC_BACKEND_URL=http://localhost:5010

# Staging
# NEXT_PUBLIC_BACKEND_URL=https://qa.htmft.com/vtiger_backend_staging

# Production
# NEXT_PUBLIC_BACKEND_URL=https://qa.htmft.com/vtiger_backend
```

Uncomment the appropriate line for your target environment. Only one should be active at a time.

---

## Getting Started

### Prerequisites
- Node.js 20+
- Backend server running (see Backend README)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Runs on **http://localhost:3010**

### Build for production

```bash
npm run build
npm start
```

---

## NPM Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev -p 3010` | Start dev server with HMR on port 3010 |
| `build` | `next build` | Build optimised production bundle |
| `start` | `next start -p 3010` | Start production server on port 3010 |
| `lint` | `eslint` | Run ESLint across the project |

---

## Calendar Booking Rules

Both `ContactForm` and `ScheduleManager` enforce:

- **No same-day booking** — today is disabled on the calendar and rejected by the backend.
- **No past dates** — dates before today are greyed out and unclickable.
- **No weekends** — Saturday and Sunday are disabled.
- **Eastern Time (ET)** — all slots are displayed and processed in `America/New_York`.
- **Fallback** — if the backend is unreachable, no slots are shown rather than false availability.
