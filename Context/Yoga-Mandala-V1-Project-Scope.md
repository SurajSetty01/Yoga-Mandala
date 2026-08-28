# Yoga Mandala Portal — V1 Project Scope Document

**Source of truth:** *Yoga Mandala — Portal & Community Framework V1* (17 pp.) + client covering note
**Status:** Draft for kickoff approval
**Prepared:** 11 August 2026

> **How to read this document.** Everything marked **[F]** is taken directly from the client framework. Everything marked **[P]** is a proposal by us — it fills a gap the framework leaves open and needs client sign-off. Everything marked **[?]** is a live contradiction or unknown in the framework and is listed as a decision in the companion *Kickoff Meeting Prep* document.

---

## 1. Product summary

**[F]** Yoga Mandala is a community and learning ecosystem for Yoga teachers and serious practitioners. The portal is the **digital home of the community** — the structured, searchable, permanent layer that sits underneath WhatsApp, which remains the fast conversation and announcement layer.

**Promise:** Learn. Connect. Collaborate. Serve.

| Pillar | Meaning |
|---|---|
| LEARN | Structured learning, resources, study and teacher development |
| CONNECT | Find fellow teachers, practitioners, experts and community members |
| COLLABORATE | Share opportunities, spaces, projects, referrals and professional needs |
| SERVE | Contribute knowledge, volunteer, mentor, strengthen the wider ecosystem |

### What it IS **[F]**
Community-led network · learning ecosystem · teacher-to-teacher connection platform · curated discovery space · home for meetups, study circles and expert conversations.

### What it is NOT **[F]**
Personal-brand website · disguised advertising channel for one organisation · social-media clone · unrestricted promotional posting · repository for unauthorised copyrighted material.

### Pranava boundary **[F]**
Pranava may contribute, organise initiatives and submit offerings, but Yoga Mandala retains an **independent community identity**. Pranava programmes must be **clearly labelled as Pranava offerings** unless formally organised by Yoga Mandala. The same rule applies to every other organisation. This is a hard product rule, enforced in the **data model** — not just in copy.

---

## 2. V1 objectives and success criteria

**[F]** V1 is successful when:

1. A teacher understands what Yoga Mandala is **within 30 seconds** of landing.
2. A teacher can **find another relevant teacher quickly**.
3. A member can **submit an event or offering without admin intervention**.
4. An admin can **approve or reject submissions easily**.
5. **Yoga Mandala Initiatives and external offerings are clearly distinguishable** at a glance.
6. WhatsApp can **point members to the portal** rather than remaining the only information store.

**[P]** Proposed measurable launch targets (to confirm): 25+ published teacher profiles, 5+ live events/initiatives, 15+ curated bulletin entries, 100+ registered members within 60 days, median submission-to-decision time under 72 hours.

---

## 3. User roles and permissions

**[F]** Seven roles are defined in the framework:

| Role | Framework definition |
|---|---|
| Visitor | Browse public information, events and *selected* listings **[?]** — "selected" is undefined |
| Member | Profile, participation, submissions, event registration |
| Verified Teacher | Teacher directory profile after verification |
| Contributor | Approved articles / resources / learning content |
| Curator / Moderator | Review submissions, moderate community content |
| Administrator | Full community and platform administration |
| Technical Administrator | Technical maintenance; **does not** automatically hold governance authority |

**[F]** "Verified Teacher" must be governed by **published criteria**, means only that submitted information was reviewed against those criteria, and **must not imply blanket endorsement**. The same transparency rule applies to the Expert Network.

### **[P]** Proposed V1 permission matrix

Recommendation: build **all seven roles in the database** (cheap, and the framework's governance model depends on the Technical Administrator separation), but only actively use five at launch — Contributor and Expert are better modelled as **flags on a Member/Teacher record** than as separate account types.

| Capability | Visitor | Member | Verified Teacher | Curator/Mod | Admin | Tech Admin |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Browse public pages | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| View full teacher directory | **[?]** | ✔ | ✔ | ✔ | ✔ | ✔ |
| Contact a teacher via enquiry form | **[?]** | ✔ | ✔ | ✔ | ✔ | ✔ |
| Create/edit own member profile | – | ✔ | ✔ | ✔ | ✔ | ✔ |
| Apply for a directory (teacher) profile | – | ✔ | ✔ | ✔ | ✔ | ✔ |
| Publish a directory profile | – | – | after verification | – | ✔ | – |
| Submit event / listing / resource / question | – | ✔ | ✔ | ✔ | ✔ | ✔ |
| Review + approve/reject submissions | – | – | – | ✔ | ✔ | – |
| Verify teachers | – | – | – | **[?]** | ✔ | – |
| Manage roles / users | – | – | – | – | ✔ | – |
| Publish site pages / edit content | – | – | – | partial | ✔ | – |
| Deploy, backups, infra, credentials | – | – | – | – | – | ✔ |
| Change governance policy | – | – | – | – | ✔ | ✘ (explicitly) |

**[F]** At least **two trusted continuity administrators** must exist. Roles and permissions must be implemented **before** member registration opens.

---

## 4. Modules in scope for V1

> **⚠ Critical scope conflict in the source document [?]**
> The framework's **Information Architecture (§4)** and **Sitemap (Appendix A)** present Library, Reading Circle, Experts, Sangha Board and Teacher's Desk as V1 navigation. But the framework's own **Technical Requirements "Must" list (§18)**, the **Master Builder Prompt "V1 must include" list (§23)**, and the **Development Roadmap (§21)** all place those items in **Phase 2 and Phase 3**. Two of three lists — plus the roadmap — agree they are *not* MVP.
> **This must be resolved in the kickoff meeting.** The scope below reflects our recommended resolution.

### 4.1 Core V1 — build in full (agreed by all three lists in the framework)

| # | Module | Contents | Notes |
|---|---|---|---|
| M1 | **Public homepage** | Hero + Join CTA · four pillars · featured Learning Initiative · upcoming event · featured teacher · latest curated opportunities · featured library resource · "share something with the Sangha" invitation · footer with governance/contact/submission links **[F, §5]** | Nine defined sections. Homepage is the 30-second comprehension test. |
| M2 | **Membership: registration, login, account** | Join the Sangha form, authentication, profile edit, profile deletion, privacy controls over which fields are public **[F, §12/§13/§16]** | Auth method undefined **[?]** — see meeting doc Q4. |
| M3 | **Teacher Directory + profiles** | Profile fields: name, photo (optional), location, experience, tradition/approach, qualifications, areas of interest, languages, teaching format, 100–150 word bio, links, contact via **enquiry form not public personal details**. Filters: city/region, tradition, area of teaching, experience, online/offline, language, role type **[F, §7.1]** | The framework calls this "one of Yoga Mandala's core long-term assets." Treat as the flagship module. |
| M4 | **Teacher verification workflow** | Application → review against published criteria → verified badge or changes requested/rejected **[F, §12]** | Criteria not yet written **[?]** — client deliverable. |
| M5 | **Events** | Event card: title, date, time, location/online, host, audience, free/paid, description, registration, category/badge. Event types: Sangha Meetups, Learning Initiatives, Study Circles, Expert Conversations, Community Workshops, Reading Circles, Partner/external events **[F, §9]** | Registration = **link out** in V1. Attendee check-in is explicitly a "future option" **[F]**. |
| M6 | **Yoga Mandala Learning Initiatives** | Title, type (workshop/study circle/lecture/series/mentorship/other), facilitator + short profile, schedule with timezone, format (online/offline/hybrid), fee (free/paid/contribution), audience level, description, registration, **Yoga Mandala Learning Initiative badge** **[F, §6.1]** | Fee is *displayed*; no payment processing in V1. |
| M7 | **Curation & Learning Bulletin** | External programmes, workshops, retreats, teacher trainings, books, research and events — submitted by members or found by the curation team, published under a **"Curated Community Listing" / "External Offering"** label **[F, §6.2]** | The Initiative-vs-External distinction is a **hard data-model requirement [F, handover item 30]**. |
| M8 | **Submission system** | Seven forms: Join the Sangha · Create Teacher Profile · Submit an Event · Submit Learning Opportunity · Submit Community Listing · Submit Resource · Ask the Sangha · Suggest Meetup/Initiative. Common fields: name/email, member status, submission type, title, description, links, location/online, date/expiry, **accuracy declaration, publication consent**, moderator notes **[F, §13]** | Build as **one submission engine with typed forms**, not eight bespoke forms. |
| M9 | **Moderation queue + lifecycle** | Draft → Submitted → Under Review → Approved / Changes Requested / Rejected → Published → Expired/Archived **[F, §14]** | Must exist **before** public submissions open **[F, handover item 29]**. |
| M10 | **Badge / labelling system** | Yoga Mandala Learning Initiative · Curated Community Listing · Community Listing · Partner/Guest **[F, §10]** | Applied consistently across events, initiatives, bulletin and listings. |
| M11 | **Admin dashboard** | New member requests · teacher profiles awaiting verification · event submissions · learning/bulletin submissions · resource submissions · Sangha Board posts · questions needing moderation · reports/flags · upcoming events · expiring listings · basic community health indicators **[F, §20]** | Two dashboard items (reports/flags, health indicators) have **no defined source feature** — see §11 gaps. |
| M12 | **Static / governance content pages** | About, Community Principles, Community Guidelines, Privacy Policy, Participation & Terms, Contact/moderation contact, plus intro pages for Directory, Library, Bulletin, Sangha Board and "how to submit" guides **[F, §22]** | **[F]** Privacy, terms and guidelines must be **published before substantial member data is collected**. |
| M13 | **Role-based access control** | Server-side authorisation on every protected route and action **[F, §23 security]** | |
| M14 | **Search & filtering** | Directory search/filter is a **Must [F, §18]** | **[P]** Scope V1 search to directory + events + listings; no global full-text search. |

### 4.2 V1-lite — build the shell cheaply, fill later **[P]**

These are Phase 2 in the roadmap but appear in the V1 sitemap. Recommendation: include them at low cost because they **reuse the M8/M9 submission-and-moderation engine already being built** — the marginal effort is small, and shipping the navigation the framework promises avoids dead links.

| Module | V1-lite build | Why this is cheap |
|---|---|---|
| **Sangha Board** (Collaborate) | Categories: Looking for · Offering · Space · Project · Volunteer · Referral · Teacher exchange. Each post: title, category, description, location/online, poster, contact method, expiry **[F, §8]** | Structurally identical to a Bulletin Listing. Same entity, same moderation, same expiry job — only the category vocabulary differs. |
| **Library** | Link-and-metadata catalogue only: title, author, subject, context/tradition, description, recommended level, source/rights info, access method, across the 11 defined subjects **[F, §6.3]** | No file uploads, no hosting of protected material **[F copyright rule]**. It is a listing type with a different field set. |
| **Experts** | A **filterable flag on verified teacher profiles**, plus one landing page — not a separate module or separate profile type **[P]** | Avoids duplicating the whole directory. **[F]** requires transparent verification and no implied blanket endorsement. |
| **Reading Circle** | One page: selected text, reading period, facilitator, discussion prompts, meeting date **[F, §6.4]** | An Event subtype + a content page. "Community reflections" (user-generated) deferred — that's a comment system. |

### 4.3 Explicitly OUT of V1

**[F] The framework's own "Do not overbuild V1" list (§18):**
- ✘ Complex social feed
- ✘ Custom chat system
- ✘ Gamification
- ✘ Complex payment engine without a clear use case
- ✘ AI chatbot as the centre of the product
- ✘ Large custom app before workflows are tested

**Additionally out of scope for V1 [P, derived from the roadmap and effort risk]:**

| Deferred item | Reason |
|---|---|
| **Teacher's Desk discussion forum & Ask the Sangha threads** | Roadmap Phase 2 **[F]**. A threaded Q&A with pre-moderation on every post is the single largest ongoing **human moderation cost** in the whole framework and the largest build item outside the directory. Ship the portal, prove moderation capacity, then add it. |
| Curated knowledge base (converting discussions into articles) | Roadmap Phase 3 **[F]** — depends on Teacher's Desk existing first. |
| Deeper library (full taxonomy, reviews, reading paths) | Roadmap Phase 3 **[F]** |
| Payments / fee collection / ticketing | Roadmap Phase 4 **[F]**; V1 displays fees and links out |
| Event attendee registration, check-in, capacity, waitlists | **[F]** explicitly "future option" |
| Advanced profiles, collaboration tools, member-facing dashboards | Roadmap Phase 4 **[F]** |
| Native mobile app | Not in framework; mobile-first responsive web only **[F]** |
| Multilingual UI | Not in framework. Directory records *languages taught*; the interface itself is English-only unless stated otherwise **[?]** |
| Member-to-member direct messaging | Would be a "custom chat system" **[F ✘]**; contact happens via enquiry form |
| Comments/reactions on any content | Would be a "social feed" **[F ✘]** |
| WhatsApp Business API integration / automated broadcasting | Framework lists only "WhatsApp sharing" as a *Should* **[F]** — read as share links, not API integration **[?]** |
| Public analytics / engagement leaderboards | **[F]** "without turning the community into an engagement-metrics platform" |

---

## 5. Information architecture

**[F] V1 navigation:** Home | Learn | Connect | Collaborate | Events | Discover | About | Join / Submit

```
Home
├── About Yoga Mandala
├── Community Principles
├── Learn
│   ├── Yoga Mandala Learning Initiatives
│   ├── Curation & Learning Bulletin
│   ├── Library                          (V1-lite)
│   └── Reading Circle                   (V1-lite)
├── Connect
│   ├── Teacher Directory
│   ├── Experts                          (V1-lite: filtered view)
│   └── Sangha
├── Collaborate
│   └── Sangha Board                     (V1-lite)
├── Events
├── Discover
│   └── Community Listings
├── Teacher's Desk                       (DEFERRED to Phase 2)
│   ├── Ask the Sangha                   (DEFERRED)
│   └── Knowledge Base                   (marked "future" in framework)
├── Join the Sangha
└── Submit
    ├── Event
    ├── Learning Opportunity
    ├── Resource
    ├── Community Listing
    └── Question                          (DEFERRED with Teacher's Desk)
```

**[?] Terminology to resolve:** "Sangha" appears as a page under Connect, as "Sangha Board" under Collaborate, and as "Sangha Meetups" under Events, with no definition of what the standalone **Sangha page** contains. Needs a one-line definition or removal.

---

## 6. Core workflows

### 6.1 Submission and moderation lifecycle **[F, §14 + §10]**
```
Member submits (any type)
   └─> Submitted  ──> Under Review  ──┬─> Approved ──> category + badge assigned
                                      │                  └─> Published (with expiry/review date)
                                      │                        └─> Expired ──> Archived
                                      ├─> Changes Requested ──> returned to contributor ──> resubmit
                                      └─> Rejected (with reason, logged)
```
**[F]** Approved items may be summarised into WhatsApp. Moderators must act consistently and **document significant decisions**.
**[P]** Every state change notifies the submitter by email. This makes transactional email a **Must**, even though the framework lists email notifications only as a *Should* — "Changes Requested → returned to contributor" is impossible without it.

### 6.2 Join the Sangha **[F, §13]**
Visitor → Join form → account created → member profile → *(optional)* apply for teacher directory profile.
**[?]** Is registration open self-service or admin-approved? The admin dashboard lists "New member requests", implying approval. Decide at kickoff — it changes the funnel and the moderation load.

### 6.3 Teacher verification **[F, §12]**
Member applies → submits qualifications/experience per **published criteria** → curator/admin reviews → Verified Teacher badge + directory profile published, or changes requested/rejected.
Open: who verifies, what evidence is accepted, turnaround time, appeal route, re-verification interval. **[?]**

### 6.4 Curation (external offerings) **[F, §10]**
Member submits or curation team discovers → moderation queue → checked for relevance, accuracy, presentation, community fit → correct **category and badge** assigned → published with expiry/review date → optionally summarised to WhatsApp → expired items archived.
**[F]** Unsolicited self-promotion, repeated advertising, referral spam, unrelated commercial posts and anything bypassing the submission process must **not** be published.

### 6.5 Find a teacher (primary member journey) **[P, from success criterion 2]**
Land → Connect → filter (city / tradition / area / experience / online-offline / language / role) → open profile → send enquiry via form → teacher receives it by email → they take the conversation off-platform.

### 6.6 Expiry and archival **[F]**
Every listing carries an expiry/review date; expired items are archived automatically and surfaced to admins under "Expiring listings".

---

## 7. Admin requirements

**[F]** A CMS/admin panel is a **Must**. It must support:

- Member management (view, edit, suspend, delete, role assignment)
- Teacher verification queue with approve / request-changes / reject + reason
- Event, learning-opportunity, bulletin, resource, listing and question approval queues
- Full submission lifecycle transitions with moderator notes
- Expiry and archive management
- Role management
- Reports/flags queue
- Upcoming events and expiring listings views
- Basic community health indicators
- **[F]** Documented moderator decisions (an audit trail)

**[P] Additions required to make the above actually work** — these are implied by the framework but never specified:
- A **content flagging feature** for members (the dashboard has a "Reports/flags" queue but nothing in the product creates a report)
- **Definition of "community health indicators"** — proposed: new members/month, published profiles, active listings, pending queue size, median moderation turnaround
- **Moderator audit log** entity
- Transactional email templates for every lifecycle transition
- Bulk actions on the queue (approve/reject multiple), or moderation becomes painful at volume

---

## 8. Data model

**[F] Entities defined in the framework:**

| Entity | Core fields **[F]** |
|---|---|
| Member | ID, name, email, role, status, location, joined date, privacy |
| Teacher Profile | Member ID, bio, qualifications, tradition, expertise, languages, links, verification |
| Event | Title, host, category, date, time, location, description, registration, status |
| Learning Initiative | Title, facilitator, format, schedule, audience, fee, registration, status |
| Bulletin Listing | Title, submitter, category, source, description, expiry, approval |
| Resource | Title, author, category, description, rights/source, access |
| Sangha Board Post | Title, category, author, location, description, expiry, status |
| Question | Title, category, author, question, answers, moderation |
| Submission | Type, submitter, content, status, moderator notes, timestamps |

**[P] Required additions and structural recommendations:**

1. **Unify the listing types.** Bulletin Listing, Sangha Board Post and Community Listing share an identical shape (title · category · submitter · description · location · expiry · status · badge). Model them as one `Listing` entity with a `listing_type` discriminator. This is the single biggest effort saving available and makes the V1-lite Sangha Board nearly free.
2. **`origin` field on every publishable entity** — `yoga_mandala_initiative | curated_external | community_submission | partner_guest` — driving the badge. **[F handover item 30]** requires the Initiative-vs-External distinction to live in the data model, not the UI copy.
3. **`Organisation` entity** (Pranava, partner studios, external providers) so attribution and neutrality labelling are structural.
4. **`Verification` record** — criteria version, evidence, reviewer, date, outcome, expiry.
5. **`Report` / flag entity** — feeds the admin queue that the framework already assumes exists.
6. **`AuditLog`** — satisfies "moderators document significant decisions" **[F]**.
7. **`Enquiry`** — messages sent through teacher contact forms (needed for spam control and abuse investigation).
8. **`Taxonomy`** — traditions, subjects, areas of interest, languages, cities. These vocabularies appear in five places and must not be free text if filtering is to work.
9. **Media asset** handling for profile photos (storage, resize, moderation).
10. **Soft delete + data-retention policy** to satisfy **[F]** "profile editing and deletion mechanisms" without orphaning published submissions.

---

## 9. Technical requirements

### 9.1 Framework priorities **[F, §18]**

| Feature | Priority |
|---|---|
| Responsive website | **Must** |
| CMS / admin panel | **Must** |
| Member registration / login | **Must** |
| Teacher profiles | **Must** |
| Directory search / filter | **Must** |
| Event listings | **Must** |
| Learning Bulletin | **Must** |
| Submission forms | **Must** |
| Moderation queue | **Must** |
| Role permissions | **Must** |
| Secure database + backups | **Must** |
| SEO basics | **Must** |
| Analytics | Should |
| Email notifications | Should → **[P] treat as Must** (moderation loop depends on it) |
| WhatsApp sharing | Should |

### 9.2 Security and privacy **[F, §16 + §23]**
- Server-side authorisation on every protected action; input validation and sanitisation
- Secure authentication; role-based permissions
- **Do not expose private phone numbers or emails by default**; teacher contact goes through an enquiry form
- Collect only data with a clear purpose; no sensitive personal information published
- Members control which profile fields are public
- Profile editing and deletion mechanisms
- Database backups with a **documented recovery procedure**
- Document who can access member data
- Privacy policy, terms and community guidelines **published before substantial data collection**

**[P]** Add: HTTPS everywhere, rate limiting and anti-spam on all public forms (submission spam is the predictable failure mode of an open-submission portal), password/OTP security policy, cookie consent if analytics is used, and a named data jurisdiction — India's DPDP Act applies if members are Indian residents **[?] jurisdiction not stated in the framework**.

### 9.3 UX requirements **[F, §17]**
Mobile-first · fast loading · clear navigation · search/filter where useful · accessible typography and contrast · minimal clicks for common actions.

**Design direction [F]:** calm, scholarly, human, warm, Indian without stereotypical decoration, contemporary but not corporate, trustworthy, community-led.
**Avoid [F]:** aggressive sales language, course-marketplace aesthetics, banners/pop-ups, excessive animation, spiritual clichés, generic wellness stock imagery, gamification.

### 9.4 Platform, hosting and stack
**[F] Constraints only:** the framework mandates ownership and security, not a technology. Domain, hosting, database and repository must all sit under Yoga Mandala-controlled accounts. A **staging environment** must exist before public launch. Documentation must allow **another developer** to maintain the platform.

**[P] Stack decision is open** and is a kickoff agenda item. The framework's real constraints on the choice are: a genuine admin/moderation UI, role-based permissions, SEO-indexable public pages, cheap hosting the community can own and pay for long-term, and handover to an unknown future developer. Any stack that satisfies those is acceptable; the deciding factor should be **who maintains this in year two**, not what is fastest to build in month one.

### 9.5 AI usage **[F]**
AI may assist with **code, tagging, search, summaries and administrative workflows**. **Human community administrators retain final authority** over moderation, verification and factual/credential claims. No AI chatbot at the centre of the product.
**[?]** Whether any AI feature ships in V1 — and who pays for API usage — is undecided.

---

## 10. Content requirements

**[F] Launch content checklist (§22):**

| # | Item | Owner **[?]** |
|---|---|---|
| 1 | About Yoga Mandala | Client |
| 2 | Community principles | Client |
| 3 | Community guidelines | Client |
| 4 | Privacy policy | **Legal review needed** |
| 5 | Participation / terms policy | **Legal review needed** |
| 6 | Teacher Directory introduction | Client |
| 7 | How to submit an event | Us / client |
| 8 | How to submit a learning opportunity | Us / client |
| 9 | Learning Initiative page | Client |
| 10 | Curation & Learning Bulletin page | Client |
| 11 | Library introduction | Client |
| 12 | Sangha Board introduction | Client |
| 13 | Contact / moderation contact | Client |

**[F]** *"Launch with a small number of high-quality entries rather than dozens of empty sections."*

**Additional content the framework requires but does not list [P]:**
- **Published Verified Teacher criteria** (explicitly mandated by §12, not in the launch list)
- Expert Network inclusion criteria and its non-endorsement disclaimer
- Badge definitions displayed publicly so members understand the labels
- Moderation appeal/dispute process text
- Brand assets: logo, colour palette, typography, and a **photography policy** — the framework bans generic wellness stock imagery, so real community photography must be sourced
- Seed data: teacher profiles, events, bulletin entries, library resources, and starter Sangha Board posts
- Email template copy for every lifecycle transition

---

## 11. Governance, ownership and handover

**[F] Non-negotiable ownership rules (§15):**
- Domain under a Yoga Mandala-controlled account
- Hosting under a Yoga Mandala-controlled account
- Database and member data under Yoga Mandala control
- Source code in a repository accessible to authorised Yoga Mandala administrators
- Role-based admin access with **at least two trusted continuity administrators**
- Privacy, terms and guidelines published before substantial member data collection
- **The builder may be credited as founding technology contributor/partner but must not personally own the domain, database, brand or community identity**
- Yoga Mandala is **community-led, not developer-led**; the Technical Administrator role carries no governance authority

**[F] Handover checklist (§24):** accept framework as product brief · confirm sitemap and scope · confirm ownership of domain/hosting/repo/database · create data model before large-scale UI work · staging before public launch · roles and permissions before registration · moderation before public submissions · Initiative-vs-External distinction in the data model · mobile-first · test every form and permission state · backups and recovery · credentials and documentation to Yoga Mandala administrators · document how another developer maintains the platform.

**[?] Not addressed anywhere in the framework and must be settled commercially:** who pays for domain/hosting/email/AI usage, what happens after launch (support/maintenance/SLA), IP assignment terms, and what the two named continuity administrators' actual accounts are.

---

## 12. Key deliverables

### 12.1 Pre-build deliverables **[F, §23 "Before coding"]** — approval gate before any UI work
1. Sitemap
2. User journeys
3. Database schema
4. Role/permission matrix
5. Component architecture
6. Page-by-page wireframe / content structure
7. V1 development plan
8. Hosting / deployment recommendation
9. Security and privacy checklist

### 12.2 Build deliverables
10. Design system + homepage and key page designs (mobile-first)
11. Public site: Home, About, Community Principles, Learn hub, Initiatives, Bulletin, Library (lite), Reading Circle (lite), Connect hub, Teacher Directory + profiles, Experts view, Events, Discover/Community Listings, Sangha Board (lite), Join, Submit hub + forms, policy pages
12. Authentication, member accounts and privacy controls
13. Teacher directory with search and filters
14. Unified submission engine + typed forms
15. Moderation queue, lifecycle states, badges, expiry/archival
16. Admin dashboard with all queues listed in §7
17. Transactional email system
18. RBAC enforced server-side
19. SEO basics, analytics, WhatsApp share
20. Backups + documented recovery

### 12.3 Handover deliverables
21. Staging + production environments under Yoga Mandala accounts
22. Repository access + credential handover to two continuity administrators
23. Admin/moderator user manual
24. Developer maintenance documentation
25. Security & privacy checklist, signed off
26. Post-launch 90-day review plan **[F, Appendix B Q10]**

---

## 13. Assumptions and dependencies

**Assumptions [P] — invalid unless confirmed:**
- V1 is a responsive web application only; no native app
- English-only interface
- No money moves through the portal in V1
- Event registration links out to external systems
- The Library links to material; it never hosts protected files
- Membership is free
- Expected scale at launch is in the low hundreds of members, not tens of thousands
- Moderation is performed by humans, and the client can staff it

**Dependencies on the client — the build stalls without these:**
1. Written Verified Teacher criteria
2. All 13 launch content pieces + privacy/terms with legal sign-off
3. Brand assets and real photography
4. Seed data (profiles, events, listings)
5. Named moderators and two continuity administrators
6. Domain, hosting and email accounts created under Yoga Mandala ownership
7. Answers to the blocking decisions in the companion meeting document

---

## 14. Where V1 sits in the roadmap **[F, §21]**

> **V1 is NOT all the phases.** The framework defines five phases (0–4). **V1 = Phase 0 + Phase 1**, plus four cheap items pulled forward from Phase 2. Phases 3 and 4 are explicitly later releases.
>
> Do not confuse the **five phases** (delivery sequence) with the **four pillars** — Learn, Connect, Collaborate, Serve. The pillars are the permanent value framing and all four are present in V1 navigation from day one. The phases are how much of each pillar gets built when.

| Phase | Framework text **[F]** | V1? | Notes |
|---|---|---|---|
| **0 — Foundation** | "Brand, governance, content rules, ownership, privacy, sitemap" | ✅ **In V1** | Prerequisite work, mostly client-side |
| **1 — MVP** | "Home, About, Learn, Events, Directory, submissions, admin moderation" | ✅ **In V1** | This *is* V1 |
| **2 — Community** | "Sangha Board, Teacher's Desk, experts, reading circle" | ⚠️ **Partly** | Sangha Board, Experts, Reading Circle in as "lite" (they reuse the V1 engine). **Teacher's Desk deferred.** |
| **3 — Knowledge** | "Curated knowledge base and deeper library" | ❌ Later | Depends on Teacher's Desk existing first |
| **4 — Ecosystem** | "Advanced profiles, collaboration tools, dashboards, optional payments" | ❌ Later | Includes all payment handling |

**Pillar coverage in V1** — every pillar is visibly present, none is fully built out:

| Pillar | V1 delivers | Deferred |
|---|---|---|
| LEARN | Learning Initiatives, Curation & Learning Bulletin, Library (link catalogue), Reading Circle page | Knowledge base, deeper library, courses |
| CONNECT | Teacher Directory + profiles + verification, Experts view, enquiry contact | Messaging, advanced profiles |
| COLLABORATE | Sangha Board (lite), submissions | Collaboration tools, project workspaces |
| SERVE | Volunteer/Referral/Teacher-exchange categories on the Sangha Board, contribution via submissions | Teacher's Desk, mentoring programmes, curated knowledge contribution |

**[F] Final product principle:** *"The long-term asset is not the website itself. It is the network of teachers, the quality of learning, the relationships formed, the knowledge curated and the culture created. Build the simplest useful version first. Let the community reveal what needs to exist next."*

---

*Companion document: **Yoga-Mandala-Kickoff-Meeting-Prep.md** — the decisions that must be made before this scope can be locked.*
