# AGENTS.md — Portfolio

<!-- BEGIN:nextjs-agent-rules -->
When writing Next.js code, consult the version-matched docs at
`node_modules/next/dist/docs/` BEFORE writing or modifying code.
<!-- END:nextjs-agent-rules -->

## Quick Facts
- Stack: Next.js 16.2.6, TypeScript, Tailwind CSS 4.0, pnpm
- Entry: `src/app/page.tsx`
- Run: `npm run type-check && npm run build`
- Deployment: Vercel

## Project-Specific Rules

**Task Completion (MANDATORY)**
- `npm run type-check` must pass (strict TypeScript)
- `npm run build` must pass
- **Never run git.** Mario runs every `add`, `commit`, and `push` himself —
  these deploy straight to a live customer-facing site.
- **A turn MUST NOT end with a dirty working tree and no commit message.**
  Before replying, run `git status`. If anything is modified, staged, or
  untracked, the reply MUST include the `git add` scope and a complete,
  ready-to-paste commit message. This is a blocking output requirement, not a
  reminder — "commit this when ready" without the message is an incomplete
  turn. If the work spans several concerns, give one message per commit and
  say which files belong to each.

**Content Strategy**
- Lead with business outcomes, not technical details
- Quantify value: percentages, dollars, time saved
- Feature case studies with clear before/after metrics

**Design Guidelines**
- Colors: Professional navy/blue (OKLCH) - see Tailwind config
- Animations: 200ms stagger delays, smooth transitions
- Mobile-first responsive design

**SEO Requirements**
- Metadata on every page (title, description, OG)
- Semantic HTML (proper heading hierarchy)
- Alt text for all images
- Core Web Vitals targets: LCP <2.5s, FID <100ms, CLS <0.1

**Performance Goals**
- Lighthouse scores: >90 all categories
- Build time: <30 seconds
- Static generation where possible

## Pointers
- Status: `.project/STATUS.md`
