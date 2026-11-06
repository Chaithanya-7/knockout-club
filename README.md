# Knockout Club

Website for Knockout Club, a student-run cybersecurity & CTF community.

Based on the [Point Blank website](https://github.com/pointblank-club/PB_Website) (Apache-2.0, see `LICENSE.txt`), modified into a static site: the database, admin panel and the OSS/Hustle/Lore/Placements/Talks pages were removed, and all branding, photos and content were replaced.

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
