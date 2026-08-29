# 01 — Sitemap & Routing

**Status: locked for Phase A.** Reconciles the framework's §4 Information Architecture with
its Appendix A sitemap into one authoritative tree (per the source-document analysis).

## Primary navigation (8 items)

`Home · Learn · Connect · Collaborate · Events · Discover · About · Join / Submit`

`Join / Submit` is one nav item resolving to two routes. `Learn` and `Connect` open
mega-panels on desktop. **`Connect → Sangha` is intentionally omitted** from the nav until
the client defines what that page is (framework never defines it; a hollow page is worse than
none). See `07-client-data-needed.md` item C3.

## Route tree

```
/                                   Home
├── /about                          About Yoga Mandala          (shell + [content pending] blocks)
│   ├── /about/principles           Community Principles         (real, §14 verbatim)
│   ├── /about/governance           Governance & Ownership       (real §15; admin names pending)
│   └── /about/contact              Contact & Moderation         (shell — legal/contact pending)
├── /learn                          Learn — hub
│   ├── /learn/initiatives          Learning Initiatives — index (sample content)
│   │   └── /learn/initiatives/[slug]
│   ├── /learn/bulletin             Curation & Learning Bulletin (sample content)
│   │   └── /learn/bulletin/[slug]
│   ├── /learn/library              Library — index             (REAL public-domain content)
│   │   └── /learn/library/[slug]
│   ├── /learn/reading-circle       Reading Circle              (sample content)
│   └── /learn/teachers-desk        Teacher's Desk — concept    (forthcoming, honest)
├── /connect                        Connect — hub
│   ├── /connect/directory          Teacher Directory + filters (placeholder people)
│   │   └── /connect/directory/[slug]
│   └── /connect/experts            Experts — filtered view
│   (   /connect/sangha             OMITTED until defined — C3 )
├── /collaborate                    Sangha Board (7 categories) (sample content)
│   └── /collaborate/[slug]
├── /events                         Events — index + type filter (sample content)
│   └── /events/[slug]
├── /discover                       Discover — curated feed     (sample content)
│   └── /discover/[slug]
├── /join                           Join the Sangha             (UI only, non-functional)
├── /submit                         Submit — hub                (UI only)
│   ├── /submit/event
│   ├── /submit/learning-opportunity
│   ├── /submit/resource
│   └── /submit/listing
├── /privacy                        Privacy Policy              (shell — legal pending)
├── /terms                          Participation & Terms       (shell — legal pending)
└── /guidelines                     Community Guidelines        (real, from §14)
+ custom 404
```

## Content-type → page map

| Content type | Powers | Badge |
|---|---|---|
| `initiative` | `/learn/initiatives`, home | always `Yoga Mandala Learning Initiative` |
| `bulletin` | `/learn/bulletin`, `/discover`, home | `Curated Community Listing` / `Partner / Guest` |
| `resource` | `/learn/library`, home | — (catalogue record) |
| `event` | `/events`, home | `Yoga Mandala Learning Initiative` / `Partner / Guest` |
| `listing` | `/collaborate`, `/discover` | `Community Listing` |
| `person` | `/connect/directory`, `/connect/experts`, home | `Verified Teacher` flag when applicable |

## Deliberately NOT routed

Knowledge Base (framework labels it "future") · member/account pages · admin panel · search
results · login/register — all Phase B. `/submit/question` is deferred with Teacher's Desk.
