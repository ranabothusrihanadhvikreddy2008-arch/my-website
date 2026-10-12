# SRI GANESH BANGLE WORKS (SGBW)
### Tradition Crafted in Gold • Purity Certified 916 • Established 1978

A luxury, full-stack prototype website for **Sri Ganesh Bangle Works**, South India's sovereign temple jewellery house with sanctums in Secunderabad/Hyderabad (Pot Market) and Bengaluru (Commercial Street).

Built directly from Google Stitch visual design exports as the **Single Source of Truth** (`screen 1.png` and `screen 2.png`).

---

## 🏛️ Quick Start & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in your browser
http://localhost:3000/
```

### Production Build
```bash
npm run build
# Outputs optimized production bundle in /dist
```

---

## 🔑 Demo Credentials

A handy **"Demo Controls"** banner is pinned at the top of the app for quick switching and data resets.

### 1. Customer Portal
- **URL**: [`/portal`](http://localhost:3000/portal) or [`/login`](http://localhost:3000/login)
- **Email / Phone**: `ananya@example.com` or `+91 98860 34125`
- **Password**: `customer123`
- **Mock OTP**: `123456`
- **Quick Action**: Click **"1-Click Customer"** on the login screen.
- **Features to try**:
  - View **4/11 and 7/11 progress rings** for the *Swarna Sanchay 11+1 Yojana*.
  - Click **"Pay Now"** to test the **Mock Razorpay Checkout modal** with UPI, Card, NetBanking, and Wallet tabs, 2-second gateway processing loader, tick animation, and golden confetti.
  - View & print GST-compliant **Downloadable Deposit Receipts**.
  - Open **"Join New Scheme"** to enroll a new passbook with nominee details.

### 2. Admin Bullion Terminal
- **URL**: [`/admin`](http://localhost:3000/admin) or [`/login`](http://localhost:3000/login)
- **Email**: `admin@sgbw.com`
- **Password**: `admin123`
- **Quick Action**: Click **"1-Click Admin"** on the login screen.
- **Features to try**:
  - **KPI Dashboard**: Recharts monthly collections bar chart, category split pie chart, IBJA bullion rates, and recent activity log.
  - **Live Notifications Center**: Bell icon with unread count, dropdown feed, and simulated real-time events (`setInterval`).
  - **Product Management** (`/admin/products`): Add, edit, archive products, image preview, featured toggle, and in-stock toggles that reflect instantly across the public catalog.
  - **Live Gold Rate Management** (`/admin/gold-rates`): Calibrate 22K, 24K, and Silver board rates with one click to update all prices across the website.
  - **Scheme Members Registry** (`/admin/members`): Search, status filters, subscriber dossier drawer, "Send WhatsApp Reminder" link, and "Mark Cash Payment".
  - **Payments & CSV Export** (`/admin/payments`): 40+ transactions with method/status filters, printable receipts, and instant **CSV file export**.
  - **Customer Enquiries** (`/admin/enquiries`): Inbound consultations with click-to-call and prefilled WhatsApp replies.
  - **Showroom Settings** (`/admin/settings`): Flagship addresses, phone numbers, and WhatsApp numbers.

---

## 🗺️ Route Architecture & Screen Mapping

| Route | Page | Purpose & Visual Design Mapping |
|---|---|---|
| `/` | **Home** | **Screen 1 Source of Truth**: Hero section, live gold rate ticker, royal categories grid, trending signature masterpieces, Swarna Sanchay 11+1 scheme with interactive calculator, why choose us, testimonials, showroom contact map, consultation concierge, and luxury footer. |
| `/catalog` | **Catalog** | **Screen 2 Source of Truth**: 24+ hallmarked items, live bullion banner, faceted filter sidebar (Purity, Net weight, Price range, Occasion, Craftsmanship), sort options, and bespoke craftsmanship banner. |
| `/product/:id` | **Product Detail** | High-res gallery, full specs (Gross weight, Net gold, Purity, Hallmark), price breakup (Gold + Making + 3% GST), hallmark info, "Call to Enquire", and "Enquire on WhatsApp". |
| `/schemes` | **Gold Scheme Public** | Public Swarna Sanchay 11+1 landing page, returns calculator, step-by-step guide, terms, and interactive FAQ accordion. |
| `/custom-bridal` | **Heritage Atelier** | Bespoke bridal trousseau consultation process (CAD blueprint, nakshi carving, HUID engraving). |
| `/showrooms` | **Showrooms** | Flagship details for Secunderabad (Pot Market) and Bengaluru (Commercial Street) with Google Maps embeds. |
| `/login` | **Auth** | Sign in with demo credentials hint box, OTP simulation, and 1-click test buttons. |
| `/portal` | **Customer Passbook** | Swarna Sanchay dashboard with circular progress ring, deposit passbook, Pay Now with Mock Razorpay modal, and join flow. |
| `/portal/payments` | **Receipts History** | List of all paid instalments with printable tax receipts. |
| `/portal/redeem` | **Redemption Desk** | Scheme maturity voucher claim with 100% making charge waiver and 12th month bonus. |
| `/portal/profile` | **KYC & Nominee** | Aadhaar and PAN verification compliance. |
| `/admin` | **Admin Dashboard** | Collections KPIs, Recharts charts, and bullion desk indicators. |
| `/admin/products` | **Admin Products** | Full CRUD for catalog inventory with real-time sync. |
| `/admin/gold-rates` | **Admin Gold Rates** | Board rate calibration (22K, 24K, Silver) with valuation sandbox. |
| `/admin/members` | **Admin Members** | Subscriber registry, progress bars, dossier drawer, cash payments, and WhatsApp due reminders. |
| `/admin/payments` | **Admin Payments** | Transaction register with instant CSV export and printable receipts. |
| `/admin/enquiries` | **Admin Enquiries** | Concierge consultations with direct click-to-call and WhatsApp reply. |
| `/admin/notifications` | **Admin Alerts** | Dispatch center with filterable alerts and real-time simulator. |
| `/admin/settings` | **Admin Settings** | Flagship sanctum details, phone numbers, and timings. |

---

## 🎨 Design System & Tokens (`/src/theme/tokens.ts`)

- **Primary Canvas**: Obsidian bronze `#0C0A09`
- **Surface / Cards**: Warm ebony `#14110E`, `#1A1612`, `#231D17`
- **Royal Gold**:
  - Brand Primary / BIS 916: `#D4AF37`
  - High-visibility CTA Button: `#E5B544`
  - Subtle Gold Border: `rgba(212, 175, 55, 0.22)`
  - Active / Engraved Gold: `#5E4A28` / `#6E5325`
- **Typography**:
  - Headings: Serif (`Cinzel`, `Playfair Display`, `Cormorant Garamond`)
  - Body & Numbers: Modern Sans (`Plus Jakarta Sans`, `Inter`, font-mono for weights and prices)
- **Accents**:
  - Market gain ticker: `#10B981` (Emerald)
  - Badges: `#881337` (Bridal Signature), `#B45309` (Sacred Wedding), `#065F46` (Bestseller)

---

## 🔌 Transitioning from Mock to Production Backend

To replace the client-side mock layer with a live backend (e.g. Node/Express, NestJS, or Supabase/PostgreSQL):

```
┌────────────────────────┐         ┌──────────────────────────────┐
│  React + Vite Frontend │ <-----> │  Node / Supabase Backend API │
│  (State & LocalStorage)│         │  (PostgreSQL Bullion DB)     │
└───────────┬────────────┘         └──────────────┬───────────────┘
            │                                     │
            ▼                                     ▼
 ┌──────────────────────┐             ┌─────────────────────────┐
 │ Mock Razorpay Modal  │  Replaced   │ Real Razorpay Orders    │
 │ (Marked in code)     │    with     │ API + Webhook Receiver  │
 └──────────────────────┘             └─────────────────────────┘
```

1. **Razorpay Payments**:
   - Location marked in [`src/components/portal/MockRazorpayModal.tsx`](file:///src/components/portal/MockRazorpayModal.tsx#L38-L71).
   - In production, the client calls `POST /api/payments/create-order` with `{ subscriptionId, amount }`.
   - Backend calls Razorpay Orders API: `razorpay.orders.create({ amount: amount * 100, currency: "INR" })`.
   - Client opens `new window.Razorpay(options)`.
   - Upon completion, Razorpay server webhook `payment.captured` securely validates signatures, updates the subscriber passbook in PostgreSQL, and generates a GST tax invoice.

2. **Gold Rates & Live IBJA Sync**:
   - Replace `initialGoldRates` with a cron worker running every 15 minutes fetching the official Indian Bullion and Jewellers Association (IBJA) rates or MCX bullion spot feed.
   - Broadcast updates via WebSocket / Supabase Realtime to update active clients in real time.

3. **WhatsApp & SMS Due Alerts**:
   - Replace client-side `wa.me` links with official WhatsApp Business Cloud API (e.g. via Twilio or Meta Graph API) to dispatch automated reminder templates on the 1st of each month.
