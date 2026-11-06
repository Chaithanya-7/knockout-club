# Knockout Club

Website for Knockout Club, a student-run cybersecurity & CTF community.

## Run

```bash
pnpm install
pnpm dev
```

## Edit content

- Events: `data/events.json`
- Members: `data/members.json`
- Achievements: `data/achievements.json`
- Founders: `components/homepage/FoundingMembersSection.tsx`
- Event reviews: `components/events/ReviewMarquee.tsx`
- Photos: replace the placeholder images in `public/images/`
- Social links: `components/ui/Footer.tsx`, `components/homepage/StayConnectedSection.tsx` (currently `#`)
- Domain: `lib/seo/constants.ts`
