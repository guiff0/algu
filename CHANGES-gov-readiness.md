# Government-readiness update for ALGU Co.

## Fixed (these would have hurt you with a contracting officer)
- Home screen and header showed **another company's** name, email, and phone (MTechZilla). Removed; the home screen also had a duplicate header and a blank "Real Estate" card.
- Logo mark said "ALGU EDGEX" on every inner page and the footer; now "ALGU CO." to match your legal name.
- Browser tab title was "Quantum" with no description. Each page now sets a proper title and description.

## Added
- **Government page** (`/Government` in nav + footer): company data, 9 technology opportunity areas (AI/ML, cybersecurity and zero trust, post-quantum cryptography, quantum R&D, software/mobile/DevSecOps, cloud/data/HPC, infrastructure, hardware, consulting), 9 NAICS codes, contract pathways, compliance, how to engage.
- **Home page rebuilt** for government buyers: vendor quick-facts panel, capabilities-statement download, opportunity cards, trust section.
- **One-page capabilities statement**: `public/algu-capabilities-statement.pdf` (regenerate with `python3 scripts/make_capabilities_statement.py`).
- `GOV_PROFILE` in `app/content/alguContent.ts`: UEI, CAGE, SAM status, size, certifications. Blank values are hidden everywhere.

## You must do before bidding
1. Fill UEI, CAGE, and size/socioeconomic status from SAM.gov in `GOV_PROFILE` and at the top of the PDF script, then regenerate the PDF.
2. Make sure the 9 NAICS codes match your SAM.gov registration (add the missing ones in SAM, or trim the list).
3. Add a business phone (`GOV_PROFILE.phone`) and any past performance (even commercial) to the PDF script. Contracting officers look for both.
4. Rotate the Google service-account key and review `.env.local`; they were inside the zip you shared.
5. Run `npm run bundle:web` and confirm `dist/algu-capabilities-statement.pdf` exists (Expo copies `public/`).

## Round 2: pages, contact form, component fix
- **Critical fix:** components were named in lowercase (`<alguScreenShell>`), which JSX compiles to plain HTML tags, so the shared header/footer/drawer were not rendering in the deployed bundle. All components are now PascalCase (`<AlguScreenShell>`); file names are unchanged.
- **41 new detail pages** (58 total), one per menu link, all on the same layout: 9 government opportunity areas, 7 services, 5 products, 6 industries, 11 technologies, 3 contracting pages. Generated from `app/content/alguDetailPages.ts`, so edits to existing content flow into the pages.
- **Android drawer** now lists every page under "ALL PAGES" (grouped, expandable).
- **Contact form** on the Contact page saves to Supabase table `contact_submissions`.
  Run `supabase/migrations/20261005000000_contact_submissions.sql` (SQL editor or `supabase db push`). Visitors can insert only; read submissions in the Supabase dashboard.
- Add a test: `npm test` runs `test/vendor-readiness.test.ts` (checks 30+ pages).
