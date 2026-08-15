import type { RocketOverlay } from "@/i18n/localize";

export const ariane5En: RocketOverlay = {
  displayName: "Ariane 5 ECA",
  country: "Europe",
  agency: ["ESA", "ArianeGroup", "Arianespace"],
  description:
    "The backbone of Europe's commercial launch business for two decades, defined by its dual-payload GTO business model and a near-flawless later reliability record — and ultimately made obsolete by not being reusable.",

  history: `One of Ariane 5's founding purposes has been largely forgotten: it was designed to launch **Hermes**, Europe's own crewed spaceplane. That explains a lot about it — the low ascent acceleration limits, the hydrolox core, the very high reliability requirement. Hermes was cancelled in 1992 with the rocket half built, so it became a commercial satellite launcher instead.

The maiden flight on 4 June 1996 (Flight 501) destroyed itself 37 seconds after liftoff. The cause was reused Ariane 4 inertial navigation software: a routine used for ground alignment kept running after liftoff and, at Ariane 5's much higher horizontal velocity, overflowed a 64-bit float to 16-bit integer conversion, triggering a hardware exception — **now one of the most-cited case studies in software engineering: reusing validated code does not reuse the domain it was validated in.**

The ECA version, which raised GTO capacity into the 10 t class, also failed on its 2002 debut when the Vulcain 2 nozzle deformed under heating in flight. After corrective work it returned to flight in February 2005 and then flew 82 consecutive successful missions until retirement in July 2023.

Its final act was a fitting one: on 25 December 2021 it launched the **James Webb Space Telescope** with injection accuracy good enough that the propellant saved extended the observatory's design life from 10 years to more than 20.`,

  designPhilosophy: `Ariane 5's design logic was **extreme optimisation for one commercial niche: dual-payload geostationary transfer launches.**

Commercial communications satellites in the 1990s clustered between 3 and 6 t, and Ariane 5's GTO capability was in the 10 t class. That number was not accidental — it was chosen to be **exactly enough for two typical satellites**. The SYLDA dual-launch structure, the 17 m fairing and the extremely low injection error all served one business model: **split the fixed cost of a large rocket between two customers and undercut the competition per satellite.**

The second thread was **buying down development risk with solid boosters**. Solids are structurally simple, thrust-dense and storable, which let Europe reach 1,400 t of liftoff thrust without developing a large liquid booster engine. The cost is low specific impulse (275 s), no shutdown once lit, and no recovery.

The third was **reliability ahead of cost**. Ariane 5's later record — 82 consecutive successes — is almost unmatched among large vehicles, but its price stayed at 150–180 million dollars a launch. When Falcon 9 used reuse to reach 67 million and could put 60 Starlink satellites up at once, Ariane 5's carefully optimised dual-launch model became a liability instead: **it had to wait until two compatible satellites were ready before it could fly at all.**`,

  tradeoffs: [
    {
      question: "Why solid boosters instead of liquid ones?",
      answer: `92% of Ariane 5's liftoff thrust comes from its two solid boosters. That was a realistic judgement made in the 1980s: **Europe had neither the experience nor the budget to develop a 7,000 kN class liquid engine.**

Solids bring concrete advantages:

- **High thrust density**: solid propellant is 25 times denser than liquid hydrogen, so the same volume produces far more thrust.
- **Structural simplicity**: no turbopump, no valves, no cryogenic insulation — a steel case full of propellant with a nozzle.
- **Storability**: a cast booster keeps for years, and launch preparation is short.
- **Transferable technology**: France already had a solid ballistic missile industrial base (M4/M45) that could be applied directly.

And equally concrete costs:

- **Low specific impulse** (275 s versus 300 s for kerosene and 430 s for hydrolox) — the fundamental penalty;
- **Ignition is irreversible**: no shutdown, no throttling, so any anomaly can only be handled by the flight termination system — which is exactly why the crewed Hermes configuration was so hard to make a safety case for;
- **Not recoverable** in practice (Shuttle-style sea recovery is possible in principle, but refurbishment costs are high);
- **Hazardous ground handling**: several hundred tonnes of solid propellant in an assembly building is a very large bomb.

Japan's H-IIA, the American Shuttle and SLS, and India's GSLV Mk III all made the same choice for the same reasons. **A solid booster is fundamentally a trade of specific impulse and flexibility for development difficulty and liftoff thrust.**`,
    },
    {
      question: "Why is a non-restartable upper stage such a problem?",
      answer: `The ESC-A's HM7B can only be lit once. That means Ariane 5 has exactly one way to reach orbit: a single continuous burn straight into GTO.

Three consequences follow:

1. **No direct GEO insertion.** Modern communications satellites increasingly want to be dropped closer to GEO (or into a supersynchronous transfer orbit) to save their own propellant and extend life. That requires the upper stage to coast half an orbit and relight.
2. **No multi-plane deployment.** Constellation satellites need different orbital planes, which needs multiple burns. Ariane 5 can only leave everything in one place.
3. **No disposal burn.** The spent stage cannot lower its own orbit and simply stays up as debris.

Ariane 5 accepted this because when it was designed, dual GTO launches *were* the market. Once constellation launches took off after 2015 the gap could not be closed — and **restart capability has to be designed in from the start** (ullage settling systems, multiple igniters, longer cryogenic hold times); it cannot be retrofitted.

Ariane 6's Vinci engine, restartable up to four times, is the direct answer to that lesson.`,
    },
    {
      question: "What does the Flight 501 software failure actually teach?",
      answer: `On 4 June 1996 Ariane 5 broke up 37 seconds after launch. The causal chain the inquiry found runs like this:

1. A routine in the inertial reference system (SRI) used for **pre-launch alignment** continued to run after liftoff — harmless redundancy on Ariane 4.
2. That routine converted horizontal velocity from a 64-bit float to a 16-bit signed integer. On Ariane 4 the velocity never got large enough to overflow.
3. Ariane 5's flatter trajectory built horizontal velocity much faster; the conversion overflowed at 36.7 s and raised a hardware exception.
4. The SRI's design treated an exception as a **hardware fault**, so it shut down and put diagnostic data on the data bus.
5. The backup SRI ran **exactly the same software** and had already shut down 72 milliseconds earlier for the same reason.
6. The main computer interpreted the diagnostic data as attitude information, commanded extreme nozzle deflections, and the vehicle broke up under aerodynamic load.

Every link is individually defensible. The three lessons that matter:

- **Reusing validated software requires re-validating its input domain.** That code had no bug. It was simply used on a trajectory it was never designed to see.
- **Identical redundancy is not redundancy.** Two copies of the same software given the same input fail at the same moment; that only protects against random hardware faults, never against design errors.
- **Exception behaviour must be designed.** Treating an arithmetic overflow as “the hardware is broken” and shutting down is about the worst possible response aboard a flying rocket.

The failure delayed Ariane 5 by seventeen months and caused the entire aerospace software industry to rewrite its verification standards.`,
    },
    {
      question: "Why retire it? Does 82 consecutive successes count for nothing?",
      answer: `Ariane 5's reliability at retirement was among the best in the world, but it had lost competitiveness on three axes at once:

- **Price**: 150–180 million dollars a launch against Falcon 9's reused price of 67 million. Even split between two satellites at 75 million each, still expensive.
- **Schedule flexibility**: dual launch requires two satellites ready at the same time with compatible orbits. If one slips, the other customer waits — a large hidden cost in an industry where satellites routinely slip.
- **Market structure**: annual GTO communications satellite launches fell from more than twenty in 2015 to under ten by 2022 (electric propulsion made satellites smaller, and constellations displaced some transponder demand). The market Ariane 5 was optimised for shrank.

The important point is that **Ariane 5 did not do anything wrong; the thing it did well stopped mattering.** A product optimised hard for one market has nowhere to turn when that market's structure changes — the textbook contrast with Falcon 9's approach of building a general platform first and then driving cost down through cadence and reuse.

Ariane 6's difficulty is that its design goals (lower cost, restartable upper stage) were fixed in 2014, answering the market of 2014; by its 2024 debut the market had moved again. **That is the structural problem with long development cycles: you have to predict the market a decade out, and the market is now changing faster than rockets can be built.**`,
    },
  ],

  contemporaries: `Ariane 5's contemporaries were **Atlas V** (comparably reliable, similarly priced, sustained by US government orders), **Proton-M** (cheaper but less reliable, and burning highly toxic UDMH), **H-IIA/B** (technically similar but almost entirely serving Japanese domestic needs) and, later, **Falcon 9**.

Before 2010 the commercial GTO market was split largely between Ariane 5 and Proton — the former winning on reliability, the latter on price. After 2013 Falcon 9 beat both on both axes at once, in the most complete reshuffling the commercial launch market has seen in twenty years.`,

  tags: ["Dual launch", "Solid boosters", "Hydrolox core", "Commercial launch", "Retired"],

  milestones: [
    { title: "Flight 501 maiden flight failure", note: "An integer overflow in reused software destroyed the vehicle 37 s after liftoff." },
    { title: "ECA debut failure", note: "Thermal deformation of the Vulcain 2 nozzle." },
    { title: "ECA returns to flight", note: "The start of a long period of stability." },
    { title: "First ATV cargo vehicle launched", note: "A 20 t payload delivered to the International Space Station." },
    { title: "Four Galileo satellites on one launch", note: "Deployment of Europe's navigation constellation." },
    { title: "James Webb Space Telescope launched", note: "Injection accuracy so good it saved enough propellant to roughly double the telescope's life." },
    { title: "Final flight", note: "Retired after 117 launches." },
  ],

  variants: [
    { name: "Ariane 5G / G+ / GS", note: "The original configurations, 6.9 t to GTO, phased out after 2003." },
    { name: "Ariane 5 ECA", note: "The main commercial configuration, 10.865 t to GTO." },
    { name: "Ariane 5 ES", note: "Used the restartable EPS upper stage for ATV and Galileo missions." },
  ],

  stages: [
    {
      nameZh: "EAP solid boosters (×2)",
      propellantZh: "HTPB composite solid propellant",
      note: "Together they supply 92% of liftoff thrust.",
      engines: [{ cycleZh: "Solid" }],
    },
    {
      nameZh: "EPC core stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
    {
      nameZh: "ESC-A upper stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Not restartable: a single burn straight into GTO.",
      engines: [
        {
          cycleZh: "Gas-generator cycle",
          note: "Inherited from Ariane 4; one of the longest-serving hydrolox upper stage engines.",
        },
      ],
    },
  ],

  launchesNotable: [
    { name: "Flight 501", note: "A software failure that became a classic case study in aerospace software engineering." },
    { name: "Flight 157 (ECA debut)", note: "Vulcain 2 nozzle failure." },
    {
      name: "Flight VA241",
      note: "An incorrectly entered launch azimuth produced a badly off-target orbit; the satellites recovered using their own propulsion.",
    },
    { name: "JWST", note: "One of the most valuable payloads ever flown; injection accuracy roughly doubled the telescope's life." },
  ],

  parts: {
    "eap-nozzles": {
      name: "EAP solid booster nozzles (×2)",
      description:
        "One large nozzle per booster, gimballed hydraulically for thrust vector control. A solid booster nozzle must survive 130 s of continuous erosion, so it is made of ablative carbon phenolic — deliberately consumed in a controlled way, an entirely different thermal philosophy from a regeneratively cooled liquid engine.",
    },
    "eap-body": {
      name: "EAP solid boosters (×2)",
      description:
        "Each holds 240 t of HTPB composite propellant and produces 7,080 kN at sea level — together more than 90% of liftoff thrust. The grain is cast in three segments and mated at the launch site, and its star-shaped channel keeps thrust high for the first 30 s and then lets it taper, holding acceleration down through maximum dynamic pressure. **A solid motor's thrust curve is written into the grain geometry at casting and cannot be changed in flight.**",
    },
    "eap-nose": {
      name: "EAP nose cone",
      description:
        "Booster nose cones housing the separation motors. The EAPs separate at T+130 s and fall into the Atlantic; sea recovery was trialled early on but never became routine.",
    },
    vulcain: {
      name: "Vulcain 2 engine",
      description:
        "A single hydrolox engine, 1,390 kN and 431 s in vacuum, burning from the pad to T+540 s. At liftoff it contributes only about 8% of thrust — Ariane 5's core is really a second stage that starts on the ground. Film cooling of the lower nozzle by gas-generator exhaust is the main improvement over Vulcain 1.",
    },
    epc: {
      name: "EPC core stage",
      description:
        "A 5.4 m hydrolox core holding 175 t of propellant, with the oxygen tank above the hydrogen tank and a common bulkhead between them. The hydrogen tank is more than three times the volume of the oxygen tank — hydrogen's density penalty made structural. The orange exterior is sprayed polyurethane foam insulation, left unpainted to save a few hundred kilograms.",
    },
    "esc-a": {
      name: "ESC-A upper stage and equipment bay",
      description:
        "One HM7B hydrolox engine (67 kN, 446 s in vacuum), inherited from Ariane 4. It **cannot restart** — a single burn straight into GTO — which ruled out missions needing multiple burns, such as direct GEO insertion or complex constellation deployment. The equipment bay above holds the guidance computer and the structural support for dual launches.",
    },
    fairing: {
      name: "Fairing (with SYLDA dual-launch structure)",
      description:
        "A 5.4 m fairing up to 17 m long, which can contain a SYLDA load-bearing cylinder: one satellite below, another above, **two commercial communications satellites to GTO on a single launch**. That dual-launch capability was the core of Ariane 5's business model — splitting the fixed cost of a large rocket between two customers to stay price-competitive even with surplus single-satellite capacity.",
    },
  },

  modelNote:
    "A schematic reconstruction of the ECA configuration with the long fairing (about 53 m overall, 5.4 m core, 3.05 m boosters). Fairing length varied between 12.7 and 17 m by configuration; this model uses the long version.",

  sources: [
    { note: "Primary source for dimensions, masses, performance envelopes and the SYLDA structure." },
    { note: "The full official inquiry report into the maiden flight failure." },
    { note: "General vehicle description and launch record." },
  ],
};
