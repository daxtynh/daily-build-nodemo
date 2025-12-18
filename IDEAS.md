# Ideas for December 17, 2025

## Problem Research

### What are people paying for that's overpriced?
- SaaS discovery tools charge $100+/mo for market research
- Existing directories (G2, Capterra) are pay-to-play and biased
- Price comparison tools focus on e-commerce, not SaaS

### What are people doing manually?
- Opening 20+ tabs to compare SaaS pricing
- Filling out "Request Demo" forms just to see prices
- Maintaining spreadsheets of tools and their costs
- Asking on Twitter/Reddit "what's a good X under $50/mo?"

### What do specific communities complain about?
**From X/Twitter research (Dec 2025):**
- @GregorSey: "searching SaaS → no pricing, just 'Request Demo' → closes tab" (482 likes)
- @mainframed767: "Click pricing → 'Ask for quote' → bye product" (1.8K likes)
- @brucefenton: "No price = never buy. Ever." (231 likes)
- @jscheel: "5 tiers but all 'contact us'" (352 likes)

**Who complains (from bio analysis):**
- 45% Developers/Engineers - hate gatekept pricing
- 30% Indie Hackers/SaaS Founders - cite it as #1 churn reason
- 15% Small Business Owners - cash/time poor, hate vagueness
- 5% Marketers/Designers - spot design flaws
- 5% Enterprise - tolerate but rage at hidden costs

**Subreddits:**
- r/SaaS - constant pricing transparency threads
- r/Entrepreneur - "what tools do you use under $X"
- r/webdev - "alternatives to expensive tool X"

### What would I pay for?
A directory that only lists SaaS with PUBLIC pricing. No "Contact Sales" garbage.
Filter by category, price range, features. Save hours of research.

---

## Candidates

### 1. NoDemo - SaaS Directory with Transparent Pricing Only
- **The problem**: People waste 2+ hours/week finding SaaS tools with public pricing
- **The customer**: Developers, indie hackers, small business owners (specific: r/SaaS, r/Entrepreneur, Indie Hackers community)
- **Current solutions**: G2/Capterra (biased, pay-to-play), manual research, Twitter questions
- **My angle**: ONLY list tools with public pricing. Quality over quantity. Community-driven.
- **Pricing**:
  - Free to browse
  - $49/mo for featured listing (SaaS companies want visibility)
  - Affiliate links on listings (5-20% commission)
- **Revenue potential**: 100 featured listings × $49 = $4,900 MRR + affiliate
- **Buildability**: Easy - database + search + simple UI
- **Requires**: Database (Vercel Postgres), auth for submissions, Stripe for featured

### 2. Pricing Page Auditor
- **The problem**: SaaS companies don't know their pricing page sucks
- **The customer**: SaaS founders, marketing teams
- **My angle**: Automated audit + score + recommendations
- **Pricing**: $29/audit or $99/mo for monitoring
- **Issues**: Harder to build, smaller market, needs AI
- **Buildability**: Medium-Hard

### 3. Client Dashboard for Freelancers
- **The problem**: Freelancers juggle 5+ tools
- **The customer**: Freelance designers, developers, marketers
- **My angle**: All-in-one: projects, invoices, comms
- **Pricing**: $29/mo
- **Issues**: Crowded market (Notion, Basecamp, many competitors)
- **Buildability**: Hard - many features needed

---

## Decision

**Building**: NoDemo - The Transparent Pricing SaaS Directory

**Target customer**: Developers and indie hackers searching for SaaS tools who instantly close tabs when they see "Request Demo"

**Day 1 price**:
- Free to browse/submit
- $49/mo for featured listings

**Why this one**:
1. **Validated pain** - 1000s of complaints on Twitter, high engagement
2. **Clear revenue** - SaaS companies pay for visibility, affiliate commissions
3. **Buildable today** - Simple CRUD + search + Stripe
4. **Viral potential** - "Only lists transparent pricing" is shareable
5. **Compounding value** - More listings = more valuable
6. **I'd use it** - Personally hate hidden pricing

**Tagline**: "Every tool listed has public pricing. No demos. No sales calls. Just prices."
