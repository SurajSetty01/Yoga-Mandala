# Yoga Mandala — Kickoff Meeting Preparation

**Companion to:** *Yoga-Mandala-V1-Project-Scope.md*
**Format:** every question below gives you (a) **what they wrote, quoted verbatim** with the section number, (b) **what's missing from it**, (c) **the exact words to say**, and (d) **what each possible answer means for the build**.
**Read time: ~15 minutes.**

---

## 0. Before you walk in — three facts to hold

**Fact 1 — V1 is Phase 0 + Phase 1, not all five phases.** Their §21 roadmap reads:

> **Phase 0 — Foundation:** "Brand, governance, content rules, ownership, privacy, sitemap"
> **Phase 1 — MVP:** "Home, About, Learn, Events, Directory, submissions, admin moderation"
> **Phase 2 — Community:** "Sangha Board, Teacher's Desk, experts, reading circle"
> **Phase 3 — Knowledge:** "Curated knowledge base and deeper library"
> **Phase 4 — Ecosystem:** "Advanced profiles, collaboration tools, dashboards, optional payments"

V1 = Phases 0 and 1. Phases 2–4 come after. Don't confuse the **five phases** with the **four pillars** (Learn / Connect / Collaborate / Serve) — the pillars all appear in V1 navigation; the phases decide how deeply each is built. If the client believes V1 covers all five phases, correct that in the first ten minutes or the whole meeting is built on a false premise.

**Fact 2 — they already asked themselves the right questions and left them unanswered.** Their Appendix B is literally titled *"Questions for the First Build Meeting"* and lists ten. Your job is to arrive with those ten answered-or-forced, plus the ones they didn't think to ask.

**Fact 3 — their own instruction is to specify before building.** §23: *"The AI should first produce an architecture/specification for approval before generating the complete website."* And handover item 26: *"Create the data model before large-scale UI work."* That's your approval gate. Use it.

---

## 1. Their Appendix B, mapped to your questions

They wrote these ten. Show them this table — it proves you read the document and it turns their own list into your agenda.

| Their question (Appendix B, verbatim) | Covered by |
|---|---|
| "What is the smallest V1 that genuinely helps the community?" | **§2 — the V1 line** |
| "Which information should be public and which should require membership?" | **Q1** |
| "What qualifies someone as a Verified Teacher?" | **Q2** |
| "Who are the first moderators/curators?" | **Q5** |
| "Which submissions require approval?" | **Q5b** |
| "How are moderation disputes handled?" | **Q5c** |
| "Who owns and controls the technical infrastructure?" | **Q6** |
| "What launch content is already available?" | **Q9** |
| "What should remain on WhatsApp rather than move to the portal?" | **Q8** |
| "What should be reviewed after the first 90 days?" | **Q22** |
| *(not asked by them)* How do people log in? | **Q4** |
| *(not asked by them)* Open or approved registration? | **Q3** |
| *(not asked by them)* Does money move through the portal? | **Q7** |
| *(not asked by them)* Budget, launch date, who pays to run it? | **Q6b, Q21** |

---

## 2. The one contradiction to resolve first: what is actually in V1

**They wrote, in §4:**
> "Recommended V1 navigation: Home | Learn | Connect | Collaborate | Events | Discover | About | Join / Submit"

and their Appendix A sitemap lists under those headings: *Library, Reading Circle, Experts, Sangha, Sangha Board, Teacher's Desk, Ask the Sangha, Knowledge Base (future)*.

**But §18 "Technical Requirements" lists as Must:**
> "Responsive website · CMS/admin panel · Member registration/login · Teacher profiles · Directory search/filter · Event listings · Learning Bulletin · Submission forms · Moderation queue · Role permissions · Secure database + backups · SEO basics"

— no Library, no Reading Circle, no Experts, no Sangha Board, no Teacher's Desk.

**And §23 "V1 MUST INCLUDE" lists:**
> "Public homepage · Member registration/login · Teacher directory with search/filter · Teacher profiles · Event listings · Yoga Mandala Learning Initiatives · Yoga Mandala Curation & Learning Bulletin · Submission forms · Admin moderation queue · Role-based permissions · Privacy controls · Responsive/mobile-first UX · Secure database and backups · SEO-friendly public pages"

— again, none of them.

**And §21 puts them in Phase 2:**
> "Phase 2 — Community: Sangha Board, Teacher's Desk, experts, reading circle"

### ⚠ First, disarm the likely misunderstanding

**There is a strong chance the client believes V1 means "all five phases".** The document is *titled* "Framework **V1**" — which is version 1 of the *document* — while "V1" inside the document means the *first release of the website*. Same two letters, two meanings. Clear this up before you ask anything else, or you'll be negotiating scope against different definitions.

**Say this first:**
> "One quick thing so we're using the same words. Your document is called Framework V1 — that's version one of the document. Inside it, 'V1' means the first release of the site. And your roadmap has five phases, 0 through 4. So when I say V1, I mean Phase 0 and Phase 1 — Phases 2, 3 and 4 are releases that come after launch. Is that how you meant it?"

**If they say "no, I meant everything ships together"**, use this — it's their own contradiction and it settles the point without argument:
> "Here's the difficulty with that. Phase 4 is 'optional payments'. But your 'Do not overbuild V1' list says 'no complex payment engine without a clear use case'. If all five phases were V1, the document would be putting payments in V1 and banning them from V1 at the same time. And your sitemap has a line that says 'Knowledge Base (future)' right in it — so the sitemap is already telling us it's the long-term structure, not the launch build."

### Then ask exactly this:
> "So with that settled — your sitemap shows Teacher's Desk, Sangha Board, Library and Reading Circle in the navigation. But your Must-have list in §18, your builder prompt's 'V1 must include' list in §23, and your Phase 1 MVP line all leave them out, and Phase 2 names them explicitly: 'Sangha Board, Teacher's Desk, experts, reading circle'. Three lists say later, the sitemap says now. Which did you actually mean — is the sitemap the launch target, or the eventual shape of the site?"

### Then propose this, in these words:
> "Here's what I'd suggest. Sangha Board, Library, Experts and Reading Circle all reuse the exact same submission-and-moderation machinery we're already building for the Bulletin — a Sangha Board post and a Bulletin listing have identical fields: title, category, description, location, poster, contact, expiry. So we can ship those in V1 for very little extra cost. Teacher's Desk is different, and I'd hold it for Phase 2 exactly as your roadmap says."

### The argument for deferring Teacher's Desk — say it this way:
> "Teacher's Desk isn't expensive to code, it's expensive to *run*. Your §14 workflow pre-moderates everything — Draft, Submitted, Under Review, Approved. That means a moderator reads every question and every answer before it appears. That's the single biggest ongoing human cost in this entire framework, and it lands on your volunteers, not on us. If we launch it day one with no traffic, it looks dead. Let's prove the moderation habit works on submissions first, then open the forum — which is what your roadmap already says."

**What each answer means:**
- *"Sitemap is the V1 target, build everything"* → add roughly 40% to the build, and flag the moderation staffing risk in writing.
- *"Follow the roadmap"* → clean Phase 1 build; sitemap needs pruning so there are no dead links.
- *"Core + lite, defer Teacher's Desk"* (recommended) → the scope document as written.

---

## 3. Blocking decisions — nine questions, nothing can be built without them

---

### Q1 · Public vs member-only

**They wrote (§12, Roles table):**
> "Visitor — Browse public information, events and **selected listings**"

**They also wrote (§18):** "SEO basics — **Must**"
**And (§7.1):** "The directory should become one of Yoga Mandala's core long-term assets."
**And their own Appendix B asks:** *"Which information should be public and which should require membership?"*

**What's missing:** "selected listings" is never defined anywhere in 17 pages. This single undefined word determines the entire permission model.

**Ask exactly this:**
> "Your roles table says a Visitor can browse 'public information, events and selected listings'. Which listings are the selected ones? And specifically — can someone who is not a member see the Teacher Directory? Can they see an individual teacher's profile? Can they contact that teacher?"

**Then surface the tension:**
> "There's a trade-off to name here. You've marked SEO as a Must. If the directory is behind a login, Google can't index it, and the main way a new teacher discovers Yoga Mandala disappears. But if it's fully open, teacher profiles are public documents. Where do you want to sit?"

| If they say | It means |
|---|---|
| Everything public, login only to submit | Simplest build, best SEO, weakest privacy posture |
| **Directory public, contact details member-only** *(recommend)* | Satisfies "find another teacher quickly" + §16's "do not publicly expose private phone numbers or emails by default", keeps SEO real |
| Profile summaries public, full profile member-only | Middle ground; needs two rendering states per profile — noticeable extra work |
| Members only | Kills the SEO Must; growth depends entirely on WhatsApp; say so plainly |

---

### Q2 · What makes someone a "Verified Teacher"

**They wrote (§12):**
> "Verification should have published criteria. 'Verified Teacher' means the submitted information has been reviewed against those criteria; it should not imply blanket endorsement."

**And (§7.2, Expert Network):**
> "Verification must be transparent and must not imply blanket endorsement."

**And (§14, guidelines):**
> "No misleading claims about qualifications, outcomes or therapeutic benefits."

**Their own Appendix B asks:** *"What qualifies someone as a Verified Teacher?"*

**What's missing:** the criteria themselves. The document mandates that published criteria exist, and then never writes them. This is a Must-have module with no rules.

**Ask exactly this:**
> "Your document says verification must have published criteria, but the criteria aren't in the document. So: what specifically will you accept as evidence? A 200 or 500-hour teacher training certificate? Years of teaching? A reference from an existing member? A conversation? And do people upload documents, or do they just declare it and you spot-check?"

**Then the follow-ups — ask all five:**
> 1. "Who does the reviewing — is it the same people as the moderators, or a separate group?"
> 2. "What's a realistic turnaround? A day, a week?"
> 3. "If you reject someone, do they get a reason, and can they appeal?"
> 4. "Does verification expire, or is it permanent once granted?"
> 5. "You have therapists and researchers in the community too — the directory has a 'Teacher / therapist / researcher / other role' filter. Do they get verified against different criteria?"

**Then protect them and you:**
> "One thing worth being deliberate about: your own wording is that 'verified' means the information was *reviewed*, not that you're endorsing the person. That sentence needs to appear on the directory page itself, not just in the framework. Otherwise a bad experience with a verified teacher becomes Yoga Mandala's problem."

**Build impact:** document upload → file storage, private-document access control, retention policy. Declaration-only → a simple form. That's the difference.

---

### Q3 · Open registration or approved registration?

**They wrote (§13, Submission System):**
> "Join the Sangha — Membership/basic profile"

**But they also wrote (§20, Admin Dashboard):**
> "New member requests"

**And (§21, success criteria):**
> "A member can submit an event or offering **without admin intervention**."

**What's missing:** these three don't agree. "New member requests" implies someone approves each join. A "Join the Sangha" form implies self-service.

**Ask exactly this:**
> "Your admin dashboard has a queue called 'New member requests', which sounds like every signup needs approving. But your success criteria say a member should be able to submit things 'without admin intervention'. Do you want to approve every person who joins, or should anyone be able to create a basic account and only the *teacher directory profile* requires review?"

| If they say | It means |
|---|---|
| **Open signup, verify email; approval only for teacher profiles** *(recommend)* | Lowest admin load, matches the success criterion, still gates the thing that matters |
| Approve every member | Every signup blocks on a human; expect this to be abandoned by month two — say so kindly |
| Invite-only from the WhatsApp group | Needs an invite/token system; ask how many people and whether there's a list |

---

### Q4 · How do people log in?

**They wrote (§18):** "Member registration/login — **Must**"
**And (§23, Security):** "Use server-side authorization, input validation/sanitisation, secure authentication and database backups."

**What's missing:** the *method*. Authentication is never described in 17 pages. It is one of the most expensive things to change later.

**Ask exactly this:**
> "This community lives on WhatsApp, so people are used to being identified by their phone number. Do you want them signing in with a phone number and a one-time SMS code, or with an email address and password? Or Google sign-in?"

**Give them the trade-off in one breath:**
> "Phone-OTP matches how the community already behaves and fewer people drop off. But every SMS costs money, and your moderation workflow needs email anyway — when a submission comes back as 'Changes Requested', we have to reach the person somehow. Email plus optional Google sign-in is cheaper and pairs naturally with that. I'd suggest email as primary, and we collect phone as an optional private field."

---

### Q5 · Moderation — who, how many, how fast, and who arbitrates

**They wrote (§14):**
> "Moderators act consistently and document significant decisions."

**And the full lifecycle (§14):**
> "Draft → Submitted → Under Review → Approved / Changes Requested / Rejected → Published → Expired/Archived"

**And (§10):**
> "Admin/curator checks relevance, accuracy, presentation and community fit."

**And (§18):** "AI can assist with coding, tagging, search, summaries and admin workflows. **Human moderators retain final authority.**"

**Their own Appendix B asks three of these:** *"Who are the first moderators/curators?"* · *"Which submissions require approval?"* · *"How are moderation disputes handled?"*

**What's missing:** names, capacity, turnaround, alerting, and arbitration. The entire product is a moderation queue; if nobody staffs it, the design fails on day one no matter how well it's built.

**Q5a — Ask exactly this:**
> "Every single piece of content in this product goes through a moderation queue before it's visible. Who are the actual people doing that? Name them. And realistically, how many hours a week can each of them give this?"

**Q5b — Ask exactly this:**
> "You have eight submission forms. Does every one of them need a human approval, or are some safe to auto-publish? For example — does a member editing their own bio need re-approval every time?"
> *(Recommend: teacher profiles, events, bulletin listings, resources and Sangha Board posts all reviewed; minor edits by an already-verified teacher auto-publish with a change log.)*

**Q5c — Ask exactly this:**
> "You ask in your own appendix how moderation disputes are handled, and the document doesn't answer it. If a member's listing is rejected and they push back — publicly, in the WhatsApp group — who has the final say, and do you want a written appeal process on the site before launch?"

**Q5d — the uncomfortable but necessary one:**
> "Your §2 says Pranava can submit offerings but Yoga Mandala must stay independent, and that the distinction 'protects neutrality, trust and long-term credibility'. If a Pranava programme is in the queue, and a moderator is also connected to Pranava — how does that get handled so it's visibly the same rules as everyone else? I'd rather build that in than retrofit it after someone complains."

**Q5e — how do they get told there's work?**
> "When something lands in the queue, how do your moderators find out — email, a WhatsApp ping, or do they just check the dashboard?"

---

### Q6 · Ownership, accounts and money to run it

**They wrote (§15) — read this one aloud, it's the clearest section in the document:**
> "Yoga Mandala should be community-led rather than developer-led. A technical contributor builds and maintains the platform; that does not automatically confer control over community policy."
> "Domain under a Yoga Mandala-controlled account. Hosting under a Yoga Mandala-controlled account. Database and member data remain under Yoga Mandala control. Source code in a repository accessible to authorised Yoga Mandala administrators. Role-based admin access with **at least two trusted continuity administrators**."
> "The builder can be acknowledged as a founding technology contributor/partner if desired, but should not personally own the domain, database, brand or community identity."

**And (§12):** "Technical Administrator — Technical maintenance; **does not automatically have governance authority**."

**Their own Appendix B asks:** *"Who owns and controls the technical infrastructure?"*

**What's missing:** who the accounts belong to in practice, who pays the bills, who the two continuity administrators are, and what happens after launch. The document states the principle and never operationalises it.

**Open by agreeing — this defuses the whole topic:**
> "Section 15 is completely reasonable and I want to say up front that I agree with all of it. Domain, hosting, database and repository under Yoga Mandala accounts, not mine. I'm happy to be credited as a technology contributor and I don't want to own the community's identity. So let's make it concrete."

**Then ask, in order:**
> 1. "Is there an existing domain, or do we register one? Under whose name and card?"
> 2. "What's the legal or organisational entity behind Yoga Mandala — a registered body, a trust, or an informal collective?" *(This determines who can even hold the accounts.)*
> 3. "Who are the **two trusted continuity administrators** your document requires? I need two names and two email addresses."
> 4. "Who pays the running costs — hosting, domain, email, and AI usage if we use any? Roughly what annual budget are you thinking?"
> 5. "And after launch — is there a maintenance arrangement, or is this handed over completely? Your handover checklist says we must 'document how another developer can maintain the platform', which sounds like you're planning for the possibility of someone else taking over."

---

### Q7 · Does money move through the portal?

**They wrote (§6.1, Learning Initiative fields):**
> "Fee — Free / paid / contribution"
> "Registration — **Portal or external registration**"

**And (§9):**
> "Future option: optional attendee check-in/registration, without turning the community into an engagement-metrics platform."

**And (§18, Do not overbuild V1):**
> "No complex payment engine without a clear use case"

**And (§21):** "Phase 4 — Ecosystem: Advanced profiles, collaboration tools, dashboards, **optional payments**"

**What's missing:** "Portal or external registration" is a fork with no decision. Portal registration means attendee lists, capacity, cancellations, reminders — a whole subsystem.

**Ask exactly this:**
> "Your initiative fields say registration can be 'portal or external'. For V1 I want to confirm: when someone clicks Register on an event, do they leave the site to a Google Form or the organiser's page — or does Yoga Mandala collect their name and hold the attendee list?"

**Then close it:**
> "My recommendation for V1 is that we display the fee and link out. No payment gateway, no attendee lists, no capacity limits. Your own roadmap puts payments in Phase 4 and calls attendee check-in a 'future option', so that's consistent. But I want to hear you say it, because 'registration' means different things to different people and it's a real chunk of work."

---

### Q8 · What "WhatsApp sharing" actually means

**They wrote (§18):** "WhatsApp sharing — **Should**"
**And (§10, curation workflow):** "Approved items **may be summarised in WhatsApp**."
**And (§1):** "WhatsApp can remain the conversation and announcement layer."
**And (§3, WhatsApp vs Portal table):** WhatsApp "Drives traffic" · Portal is the "Permanent information home"

**Their own Appendix B asks:** *"What should remain on WhatsApp rather than move to the portal?"*

**What's missing:** whether this is a share button or a system integration. The two readings differ by days of work and an ongoing per-message cost.

**Ask exactly this:**
> "When you say WhatsApp sharing, do you mean a share button that opens WhatsApp with a link ready to send — or do you want the portal to automatically post approved listings into the group? Those are very different: the second one needs WhatsApp Business API access, a registered number, template approval from Meta, and a cost per message."

**Recommend, in these words:**
> "Your document says 'approved items may be summarised in WhatsApp', which reads to me like a human copying a summary into the group. So I'd suggest: share buttons on every public page, plus a 'copy summary for WhatsApp' button in the admin panel that formats an approved item as clean pasteable text with the link. That's about 90% of the value for about 2% of the cost, and no dependency on Meta."

**Also ask their Appendix B question directly:**
> "And the flip side — what do you want to *stay* on WhatsApp? I'd argue day-to-day chat and quick questions stay there, and the portal takes anything that should still be findable in six months."

---

### Q9 · Content and seed data — who writes it, by when

**They wrote (§22, Launch Content) — thirteen items:**
> "About Yoga Mandala · Community principles · Community guidelines · Privacy policy · Participation/terms policy · Teacher Directory introduction · How to submit an event · How to submit a learning opportunity · Learning Initiative page · Curation & Learning Bulletin page · Library introduction · Sangha Board introduction · Contact/moderation contact"

**And crucially:**
> "Launch with a small number of high-quality entries rather than dozens of empty sections."

**And (§15):** "Privacy, terms and community guidelines **published before collecting substantial member data**."

**And (§17, Avoid):** "Generic wellness stock imagery"

**Their own Appendix B asks:** *"What launch content is already available?"*

**What's missing:** owners and dates. Content is the most common reason a project like this slips past its launch date.

**Ask exactly this:**
> "You've listed thirteen pieces of launch content. Which of these already exist in some form, even as a draft? And for the rest — who's writing them, and by when? I'd like a name and a date against each one before we finish today."

**Then the ones that need special handling:**
> 1. "Privacy policy and terms — do you have legal support, or are we adapting a template? Your document says these have to be published before we collect member data, so they're on the critical path, not a nice-to-have."
> 2. "The Verified Teacher criteria aren't on this list, but §12 says they have to be published. Add them as a fourteenth item."
> 3. "Is there a logo, a colour palette, and any real photography? You've explicitly ruled out generic wellness stock imagery, which I agree with — but that means we need actual photos of this community, and someone has to gather them."

**Then seed data:**
> "How many people are in the WhatsApp group right now? Is there a list? Can we invite them and pre-fill some profiles with their consent, or does everyone self-register from scratch? A directory with four profiles isn't a directory — I'd want around 25 real profiles, five events and fifteen bulletin entries live on day one."

---

## 4. Second-tier questions — needed in the first two weeks, not necessarily today

| # | What they wrote | Ask them |
|---|---|---|
| 10 | §16: "Document who can access member data." Nothing states a jurisdiction anywhere in the document. | "Are members mainly in India? Any in the EU? That decides whether we're writing this privacy policy against India's DPDP Act or GDPR, and where the data should be hosted." |
| 11 | §16: "Provide profile editing and **deletion** mechanisms." | "When someone deletes their profile, what happens to the events and listings they already published? Do those vanish, or stay up as anonymous?" |
| 12 | §7.1: "Contact — **Prefer enquiry form rather than public private details**." | "When someone sends a teacher an enquiry, does it forward to the teacher's email — which reveals their address as soon as they reply — or do they read it inside the portal?" |
| 13 | §7.1 filters: "City/region · Tradition/approach · Area of teaching · Experience · Online/offline · Language · Teacher/therapist/researcher/other role" | "These filters only work if everyone picks from the same list. Who writes the list of traditions, subjects and cities? If people type them freely, filtering breaks." |
| 14 | §20: "Basic community health indicators" | "What counts as a health indicator for you? I'd propose: new members a month, published profiles, active listings, how many items are waiting in the queue, and how fast you're clearing them." |
| 15 | §20: "**Reports/flags**" is a dashboard queue | "Your admin dashboard has a reports and flags queue, but nowhere in the document can a member actually report anything. Do you want a 'report this' link on listings and profiles, or should I drop that queue?" |
| 16 | §7.1: "Languages — Languages taught" | "The directory records what languages teachers *teach in*. Is the website itself English-only? Retrofitting a second interface language is expensive, so I want to rule it in or out now." |
| 17 | §6.3: "Do not upload or redistribute protected books, recordings or documents without permission. Where rights are unclear, use legitimate links, bibliographic information or approved access methods." | "So the Library never hosts files — it's titles, authors, descriptions and links out. Confirming, because file hosting changes storage, moderation and your legal exposure." |
| 18 | Appendix A sitemap: "Connect → Teacher Directory / Experts / **Sangha**" | "There's a page called 'Sangha' under Connect, separate from Sangha Board and Sangha Meetups. What goes on it? If we can't answer that in one sentence, I'd drop it." |
| 19 | §18: "AI can assist with coding, tagging, search, summaries and admin workflows. Human moderators retain final authority." §23: "No AI chatbot as the centre of the product." | "Do you want any AI in V1 itself, or just in how we build it? The two useful, low-risk ones are auto-suggesting tags on submissions and drafting the WhatsApp summary for an approved listing — both with a human approving. Anything beyond that, and who pays for the usage?" |
| 20 | §21 success criteria are all qualitative; no numbers anywhere in the document | "How many members do you expect in year one — two hundred, or two thousand? It changes the hosting choices." |
| 21 | No launch date, budget or timeline appears anywhere in 17 pages | "When do you want this live, and what's the budget? Everything we've discussed is theoretical until those two exist." |
| 22 | Appendix B: "What should be reviewed after the first 90 days?" | "You asked this yourself. I'd suggest we agree the 90-day review criteria now — profiles published, submissions received, moderation turnaround, and whether the WhatsApp group is actually pointing people here." |

---

## 5. Contradictions and gaps — your credibility list

Bring this table. Each row converts into a decision, and it demonstrates you read all 17 pages.

| # | The issue, with their words | Impact |
|---|---|---|
| 0 | **"V1" is used for two different things** — the document title "Framework V1" (version of the document) and "V1" inside it (first release of the site). Easy to read as "everything in this document is V1" | Settle the vocabulary in the first ten minutes → §2 |
| 1 | Sitemap and IA list Teacher's Desk / Sangha Board / Library / Reading Circle in V1; §18 Must list, §23 "V1 must include" and §21 roadmap all exclude them. Appendix A even labels one item "Knowledge Base **(future)**", proving the sitemap mixes launch and later | **Biggest scope risk** → §2 |
| 2 | Email notifications are only a "**Should**" (§18) — but §14 requires "Changes Requested — Returned to contributor" | You cannot return a submission to someone without emailing them. **Email is a Must.** |
| 3 | §20 dashboard has "Reports/flags" — no reporting feature exists anywhere in the product | Missing requirement → Q15 |
| 4 | §20 "New member requests" vs §21 "submit... **without admin intervention**" | Contradiction → Q3 |
| 5 | §12 "Verification should have published criteria" — the criteria are not in the document | Blocked deliverable → Q2 |
| 6 | §12 "Browse public information, events and **selected listings**" — "selected" never defined | Blocks the permission model → Q1 |
| 7 | §18 "SEO basics — Must" vs any significant login wall | Tension to resolve → Q1 |
| 8 | Authentication method appears nowhere in 17 pages | Architecture gap → Q4 |
| 9 | §20 "Basic community health indicators" — undefined | Undefined deliverable → Q14 |
| 10 | Bulletin Listing (§19), Sangha Board Post (§19) and Community Listing (§10) have near-identical fields — "title, category, description, location/online, poster, contact method and expiry date" | **Opportunity, not a problem** — one listing engine makes the Sangha Board nearly free |
| 11 | "Experts" (§7.2) is described as "a curated list of experienced members" — that's a flag on a teacher profile, not a second profile system | Simplification worth naming |
| 12 | §19 data model has no entity for reports, verification records, moderator audit logs, enquiries, organisations, or the filter vocabularies | Schema gaps to close before build |
| 13 | Appendix B asks "How are moderation disputes handled?" — never answered in the document | Policy gap → Q5c |
| 14 | No launch date, budget, team size or running-cost owner anywhere | Commercial gap → Q6, Q21 |
| 15 | §9 event registration + §6.1 "Portal or external registration" vs §18 "No complex payment engine" | Needs an explicit V1 answer → Q7 |
| 16 | Numbering restarts oddly across the document (10–16, 17–22, 23–35, 36–45) and "Do not overbuild V1" sits inside Technical Requirements | Cosmetic artefact of drafting — **ignore it, don't raise it** |

---

## 6. What to pay real attention to in their document

1. **§2, the Pranava rule.** *"Pranava may contribute, organise initiatives and submit offerings, but Yoga Mandala must retain an independent community identity... The same principle should apply to every other organisation. This distinction protects neutrality, trust and long-term credibility."* Combined with handover item 30 — *"Build the Initiative vs External Offering distinction into the data model"* — this is a **schema requirement**, not a copy requirement. It is the thing most likely to be quietly violated by a rushed build.
2. **§10, the badge system.** Four badges: *"Yoga Mandala Learning Initiative"* (formally organised/endorsed), *"Curated Community Listing"* (external, selected for relevance), *"Community Listing"* (member-submitted, meets rules), *"Partner / Guest"*. This is the visible mechanism that makes the neutrality promise real. §23 says *"Never blur these categories."*
3. **§14, the eight lifecycle states.** Draft · Submitted · Under Review · Approved · Changes Requested · Published · Expired/Archived · Rejected. One state machine drives every content type. Build it once, reuse everywhere.
4. **§7.1, the Teacher Directory.** *"The directory should become one of Yoga Mandala's core long-term assets."* Two of the six V1 success criteria are about it. Give it disproportionate design attention.
5. **§15, governance.** Read it twice; agree to it early and warmly. It removes an entire category of future conflict — and it means creating the accounts and naming the administrators is *their* job, on the critical path.
6. **§16, privacy.** *"Do not publicly expose private phone numbers or emails by default"* — this is why the enquiry form exists, and it's a design constraint on every profile page.
7. **§17, the Avoid list.** *"Aggressive sales language · Course-marketplace aesthetics · Too many banners/pop-ups · Excessive animation · Spiritual clichés · Generic wellness stock imagery · Gamification for shallow engagement."* An unusually clear design brief. You'll be held to it at review — quote it back when approving designs.
8. **§11, the claims rule.** *"Distinguish personal experience, professional opinion, traditional interpretation and evidence-supported information. Therapeutic/medical claims require appropriate care and should not be presented as diagnosis or medical advice."* Relevant the moment Teacher's Desk or yoga-therapy profiles exist. Needs to be in the community guidelines at launch.
9. **§25, the closing principle.** *"Build the simplest useful version first. Let the community reveal what needs to exist next."* Your best defence against scope growth, in their own words.

---

## 7. What NOT to spend time on yet

| Don't touch | Their own words justify it |
|---|---|
| **Teacher's Desk / Ask the Sangha design** | §21: Phase 2. Also the biggest ongoing moderation cost in the product. |
| **Knowledge base, "deeper library"** | §21: Phase 3. Appendix A even labels it "Knowledge Base (future)". |
| **Payments, ticketing, capacity, attendee check-in** | §21: Phase 4 "optional payments"; §9 "Future option: optional attendee check-in". |
| **AI features beyond admin assistance** | §18: "No AI chatbot as the centre of the product." |
| **Choosing the tech stack in this meeting** | Q1, Q4 and Q6 determine the stack. Decide after, not during. |
| **Visual design before the data model** | Handover item 26: "Create the data model before large-scale UI work." |
| **Gamification, engagement metrics, leaderboards** | §17 "Gamification for shallow engagement" and §9 "without turning the community into an engagement-metrics platform". |
| **A native mobile app** | §17 UX priorities: "Mobile-first". Responsive web is what's asked for. |
| **Designing eight separate submission forms** | §13's forms share the same "common fields" — build one engine with typed variants. |
| **Debating whether WhatsApp gets replaced** | §1: "WhatsApp can remain the conversation and announcement layer." Settled. |
| **The document's numbering glitches** | Drafting artefacts. Nothing turns on them, and raising them costs you goodwill. |

---

## 8. Decision log — fill this in live, email it the same day

| # | Decision | Outcome | Owner | Due |
|---|---|---|---|---|
| 1 | V1 line: sitemap vs roadmap (and Teacher's Desk in or out) | | | |
| 2 | Public vs member-only access model | | | |
| 3 | Verified Teacher criteria + who reviews + turnaround + appeals | | | |
| 4 | Registration: open, email-verified, or approved | | | |
| 5 | Authentication method | | | |
| 6 | Named moderators, hours available, turnaround target, alerting | | | |
| 7 | Moderation dispute/appeal process + Pranava conflict handling | | | |
| 8 | Domain / hosting / billing owner + two named continuity administrators | | | |
| 9 | Event registration and payments approach for V1 | | | |
| 10 | WhatsApp integration depth | | | |
| 11 | All 14 launch content pieces: owner + date each | | | |
| 12 | Privacy policy and terms: who writes, who reviews legally | | | |
| 13 | Brand assets and photography: who supplies, by when | | | |
| 14 | Seed data: how many profiles/events/listings at launch, sourced how | | | |
| 15 | Launch date, budget, and post-launch maintenance arrangement | | | |

---

## 9. Suggested 90-minute agenda

| Time | Item |
|---|---|
| 0:00–0:08 | Play back the framework: four pillars, the Pranava neutrality rule, WhatsApp stays as the conversation layer. Confirm you understood their intent. |
| 0:08–0:12 | **Correct the phases misunderstanding if it exists.** V1 = Phase 0 + Phase 1, not all five. |
| 0:12–0:30 | **The V1 line.** Show the sitemap-vs-roadmap conflict, propose core + lite, defer Teacher's Desk. Get a decision. |
| 0:30–1:00 | Blocking decisions Q1–Q5: access model, verification criteria, registration, authentication, moderators. |
| 1:00–1:20 | Ownership, money and content: Q6–Q9, plus launch date and budget. |
| 1:20–1:30 | Agree the next deliverable and a review date. Read the decision log back aloud. |

**Close with this:**
> "Next from us: the nine things your own document asks for before coding — sitemap, user journeys, database schema, role and permission matrix, component architecture, page-by-page structure, development plan, hosting recommendation, and the security and privacy checklist. Next from you: the Verified Teacher criteria, the launch content with owners and dates, the domain and hosting accounts in Yoga Mandala's name, and the two continuity administrators. Nothing gets built until we've both signed off that first set."
