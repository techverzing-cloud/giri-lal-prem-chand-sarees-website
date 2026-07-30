# Giri Lal Prem Chand Sarees — Luxury Fashion Website

A premium luxury fashion showcase website for **Giri Lal Prem Chand Sarees Pvt. Ltd.** featuring two heritage brands:
- **Giri Lal Prem Chand Sarees** — Luxury sarees since 1946
- **Arunima Fashions** — Designer lehengas

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6.0 | Type safety |
| Vite | 8.1 | Build tool |
| Tailwind CSS | 4.3 | Styling |
| Framer Motion | 11.18 | Animations |
| GSAP | 3.15 | Advanced animations |
| Lenis | 1.3 | Smooth scrolling |
| React Router | 7.18 | Routing |
| React Helmet Async | 2.0 | SEO/head management |
| React Hook Form | 7.83 | Form handling |
| Zod | 3.25 | Form validation |
| EmailJS | 4.4 | Email delivery |
| Lucide React | 0.460 | Icons |
| Embla Carousel | 8.6 | Carousels |

## Architecture

### Project Structure

```
src/
├── components/
│   ├── about/          # About page sections
│   ├── admin/          # Admin portal (layout, common, forms)
│   ├── animations/     # Motion components (FadeIn, ScrollReveal, etc.)
│   ├── enquiry/        # Enquiry/consultation forms
│   ├── journal/        # Blog/journal display
│   ├── layout/         # Navbar, Footer, Breadcrumb
│   ├── product/        # Product detail components
│   ├── sections/       # Homepage sections
│   ├── seo/            # SEO head management
│   ├── shop/           # Collection/product listing
│   └── ui/             # Reusable primitives
├── config/             # Site configuration
├── constants/          # Static content data
├── contexts/           # React contexts
├── data/               # Mock data layer
│   ├── admin/          # Admin mock data
│   ├── journal/        # Articles, authors
│   └── products/       # Product catalog
├── hooks/              # Custom React hooks
├── pages/              # Route page components
├── routes/             # Route definitions
├── services/           # Service layer (analytics, email, enquiry)
├── state/              # State management (AdminContext)
├── styles/             # Tailwind CSS + custom theme
├── types/              # TypeScript definitions
└── utils/              # Utilities (SEO, animations, helpers)
```

### Routing Groups
- **Public**: `/`, `/about`, `/our-story`, `/craftsmanship`, `/collections`, `/collections/sarees`, `/collections/lehengas`, `/collections/sarees/:category`, `/collections/lehengas/:category`, `/product/:slug`, `/enquiry`, `/book-consultation`, `/contact`, `/enquiry-success`, `/thank-you`, `/search`, `/privacy`, `/terms`, `/journal/*`
- **Admin Preview** (legacy): `/admin-preview/*` → redirects to `/admin/*`
- **Admin Portal**: `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/:id/edit`, `/admin/collections`, `/admin/collections/new`, `/admin/homepage`, `/admin/about`, `/admin/journal`, `/admin/journal/new`, `/admin/journal/:id/edit`, `/admin/media`, `/admin/navigation`, `/admin/seo`, `/admin/settings`, `/admin/enquiries`, `/admin/users`, `/admin/profile`
- **Error**: `/500`, `/offline`, `*` (404)

### Key Features
- **No ecommerce** — Enquiry-only flow with CRM-ready architecture
- **Two brands** — Shared design system with distinct color palettes
- **Premium animations** — Framer Motion + GSAP + Lenis smooth scroll
- **SEO-optimized** — Structured data (JSON-LD), OG/Twitter meta, sitemap
- **Accessible** — WCAG 2.1 AA compliant, keyboard navigation, ARIA
- **Admin Portal** — Full content management with 18 routes
- **Responsive** — Mobile-first, all breakpoints supported

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev        # Start dev server on port 5173
```

### Build
```bash
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

### Lint
```bash
npm run lint       # Run oxlint (Rust-based linter)
```

## Environment Variables

Create `.env` in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Admin Portal

Access at `/admin` after starting the dev server.

Available sections:
- **Dashboard** — Overview with stats, recent activity, enquiries
- **Products** — CRUD management (list, new, edit)
- **Collections** — Collection management (list, new)
- **Journal** — Article management (list, new, edit)
- **Homepage** — Section visibility management
- **About** — About page section management
- **Media** — Media library
- **Navigation** — Menu manager
- **SEO** — SEO metadata, sitemap, robots.txt, redirects
- **Settings** — Site settings, feature flags, theme, analytics
- **Enquiries** — Lead management
- **Users** — User management with role-based permissions
- **Profile** — Account settings

## CMS Integration Points

The project is designed for future backend integration:

### Data Layer
- All data is fetched via accessor functions (`get*()`, `query*()`)
- Mock data lives in `src/data/` and `src/data/admin/`
- Replace with API calls by modifying service files in `src/services/`

### Services
- `src/services/admin/` — CRUD operations for admin modules
- `src/services/enquiry/` — Enquiry submission with EmailJS fallback
- `src/services/analytics/` — Analytics event tracking
- `src/services/tracking/` — Lead source detection (UTM, referrer)

### State
- `AdminContext` — Shared state for admin UI (currentUser, notifications)
- `NotificationContext` — Toast notification system

## Performance Targets
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100

## Browser Support
- Chrome (latest 2 versions)
- Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Chrome/Safari

## License
Private — Giri Lal Prem Chand Sarees Pvt. Ltd.
