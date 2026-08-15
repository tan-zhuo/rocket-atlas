import type { RocketOverlay } from "@/i18n/localize";

export const newGlennEn: RocketOverlay = {
  displayName: "New Glenn",
  country: "United States",
  agency: ["Blue Origin"],
  description:
    "Blue Origin's reusable heavy-lift vehicle, twenty years in the making, distinguished from every competitor by a 7 m fairing and a split methane-first-stage, hydrogen-second-stage architecture.",

  history: `Blue Origin was founded in 2000, two years before SpaceX, and took an entirely different pace — the company motto *Gradatim Ferociter* (step by step, ferociously) reads almost as a direct answer to SpaceX's rapid iteration. For two decades it built the suborbital New Shepard (flying crew from 2015), and only reached orbital class in 2025.

New Glenn was announced in 2016, named after John Glenn, the first American to orbit the Earth. Development slipped repeatedly, and the principal bottleneck was the **BE-4 engine** — an oxidiser-rich staged-combustion methane engine that is simultaneously the first stage powerplant for ULA's Vulcan, so its schedule held up two vehicle families at once.

The maiden flight (NG-1) on 16 January 2025 reached orbit successfully; the booster's sea landing failed. The second flight (NG-2, November 2025) launched NASA's ESCAPADE Mars probes and **completed a successful booster recovery at sea**, making New Glenn the second launch vehicle after Falcon 9 to recover an orbital-class first stage.

Its manifest includes Amazon's Kuiper constellation, several NASA science missions, and Blue Origin's own Blue Moon lunar lander.`,

  designPhilosophy: `New Glenn's design logic is **taking the route Falcon 9 already validated and pushing every parameter up one notch.**

It invents no new recovery method (still vertical landing) and challenges no new reuse limit (still first stage only). What it does is add in three specific dimensions:

1. **Diameter.** 7 m rather than 3.7 m. That one number changes a great deal — the fairing has 2.4 times the volume of Falcon 9's, so it can take optical telescopes and large antennas that are **too big rather than too heavy**; and it escapes the trap Falcon 9 fell into, of being limited by road transport and able to grow only longer.
2. **Propellants by stage.** Methane in the first stage (reuse-friendly, reasonably dense) and hydrogen in the second (445 s). That is better on paper than Falcon 9's all-kerosene arrangement, at the price of maintaining two entirely different cryogenic systems.
3. **Reuse life.** A design target of 25 flights, 2.5 times Falcon 9 Block 5's initial goal of ten, which required more conservative structural margins and a gentler entry trajectory.

The price is **time to market**: nine years from announcement to first flight, during which Falcon 9 flew more than three hundred times. In this industry the flight data and customer trust a first mover accumulates are very hard to catch with better parameters. **New Glenn's problem is not technical; it is how much value there is in being the better second.**`,

  tradeoffs: [
    {
      question: "Why methane in the first stage and hydrogen in the second — isn't that two of everything?",
      answer: `Most rockets use one propellant combination across both stages (Falcon 9 all kerosene, Starship all methane, Delta IV all hydrogen), because sharing propellant means sharing ground loading systems, pressurisation schemes and operating procedures. New Glenn runs two.

The reason is that **the optimum genuinely differs by stage**:

- A first stage must produce large thrust in dense air. What matters is **density** (so tanks stay reasonable) and **reuse-friendliness** (clean burning, no coking, quick inspection). Methane's 423 kg/m³ is six times hydrogen's, and unlike kerosene it leaves no carbon deposits.
- A second stage works in vacuum with a high share of the total velocity increment, where every 1% of specific impulse becomes payload. Hydrolox's 445 s is about 65 s better than methane — an enormous margin on an upper stage.

The costs are concrete:

- Two cryogenic loading systems (methane at −162 °C, hydrogen at −253 °C), which raises pad complexity substantially;
- Hydrogen storage and leak management is among the most troublesome problems in the industry (small molecule, leaks easily, burns with an invisible flame);
- Two independent engine production lines (BE-4 and BE-3U).

Blue Origin can absorb that complexity because it is simultaneously building New Shepard (the BE-3's origin) and a lunar lander (also hydrolox) — **the two propellant systems are shared at company level, not stood up for this rocket alone.**`,
    },
    {
      question: "Is 7 m worth it?",
      answer: `Falcon 9's 3.7 m is set by highway bridges and culverts; New Glenn's factory sits beside the launch site, which removes that constraint entirely. What 7 m buys:

- **2.4 times the fairing volume.** A ⌀6.35 × 21.9 m envelope holds things Falcon 9 cannot.
- **No transition section.** The whole vehicle is one diameter, which simplifies both structure and aerodynamics.
- **Better lateral stiffness at the same fineness ratio**, making transonic buffet and bending modes easier to manage.

The costs:

- **The airframe can only be built where it flies.** Factory, pad and integration building must be co-located, so the two-coast flexibility Falcon 9 enjoys (built in California, flown from Florida and California) is not available.
- **A larger base area** means more total heating during entry, and more severe ground effect and plume scouring at landing.
- **Diseconomy risk**: if the market does not actually contain enough payloads needing a 7 m envelope, the capability is pure cost.

So far demand for large fairings does appear to be growing — large-aperture space telescopes, constellations like Kuiper that want to deploy many satellites at once, and future station modules are constrained by volume rather than mass. **This may be New Glenn's least copyable advantage over Falcon 9.**`,
    },
    {
      question: "Twenty years to first flight — what does “step by step” cost?",
      answer: `Blue Origin and SpaceX started at nearly the same time (2000 and 2002), and Blue Origin was the better funded of the two for most of that period (roughly a billion dollars a year from Bezos). Yet by New Glenn's first flight in 2025, Falcon 9 had flown more than four hundred times.

The difference is not effort but **how each acquires information**:

- SpaceX put an early, imperfect product into the market, took data from real flights, funded itself from customer payments, and iterated in flight (Falcon 1 succeeded on its fourth attempt; Falcon 9 took eight years to get from v1.0 to Block 5).
- Blue Origin accumulated on the ground and in suborbital flight for a long time, aiming for a first flight close to the final configuration. New Shepard flew more than twenty times, but as suborbital hops its contribution to an orbital vehicle was mostly engine and operations experience.

The cost is clear: **without flights there is no real data, and without real data you cannot tell which conservative choices were necessary and which were waste.** Over twenty years New Glenn's design went through several revisions (first stage engines from six to seven, second stage from BE-4U to BE-3U), every one of them a judgement made on paper.

The return is equally clear: New Glenn reached orbit on its first flight and recovered its booster on its second — where Falcon 9 needed twenty launches before its first successful landing. **Slow buys first-flight success; fast buys iteration speed. Which is worth more depends on who you are competing with, and how much time the market is still giving you.**`,
    },
  ],

  contemporaries: `Its direct competitors are **Falcon Heavy** (63.8 t to LEO) and **Vulcan Centaur** (27.2 t). New Glenn's 45 t sits between them, but its fairing volume exceeds both by a wide margin — its pitch is not capability but envelope and reuse.

The real uncertainty is **Starship**: if full reuse drives cost per kilogram down by an order of magnitude, New Glenn's architecture — reusable first stage, expendable second — will find itself in the position Ariane 5 occupied against Falcon 9. Blue Origin's answer is to make the second stage as cheap as possible (**Project Jarvis** studied a reusable stainless second stage), but no mature public plan exists yet.`,

  tags: ["Reusable", "Methalox", "Large fairing", "Commercial spaceflight", "Heavy lift"],

  milestones: [
    { title: "New Glenn programme announced", note: "Named after the first American to orbit the Earth." },
    { title: "First full-thrust BE-4 test firing", note: "A key milestone for a domestic US large methane engine." },
    { title: "NG-1 maiden flight", note: "The second stage reached orbit; the booster landing failed." },
    { title: "NG-2 recovers the booster", note: "The second vehicle after Falcon 9 to recover an orbital-class first stage." },
  ],

  variants: [
    { name: "New Glenn two-stage", note: "The standard configuration, 45 t to LEO." },
    { name: "Three-stage configuration", note: "Early proposals added a hydrolox third stage for high-energy missions; not implemented." },
  ],

  stages: [
    {
      nameZh: "GS1 first stage",
      propellantZh: "Liquid methane / liquid oxygen",
      note: "Designed for 25 flights, landing on a sea platform.",
      engines: [
        {
          cycleZh: "Oxidiser-rich staged combustion",
          note: "America's answer to the loss of the RD-180, also supplied to ULA's Vulcan.",
        },
      ],
    },
    {
      nameZh: "GS2 second stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Restartable, supporting direct GEO insertion and translunar injections.",
      engines: [
        {
          cycleZh: "Bleed expander cycle",
          note: "The vacuum derivative of the BE-3 that powers the suborbital New Shepard.",
        },
      ],
    },
  ],

  launchesNotable: [
    { name: "NG-1 (Blue Ring Pathfinder)", note: "Reached orbit on the maiden flight; the booster landing failed." },
    { name: "NG-2 (ESCAPADE)", note: "Launched NASA's Mars probes and recovered the booster successfully." },
  ],

  parts: {
    "be4-cluster": {
      name: "BE-4 engines (×7)",
      description:
        "Seven oxidiser-rich staged-combustion methane engines, 2,400 kN each at sea level. The BE-4 is also the first stage engine for ULA's Vulcan — **a company supplying its own rocket and its largest competitor's from the same production line** is rare in this industry, and follows from the fact that after 2014 the United States urgently needed a domestic replacement for the RD-180 and only two candidates existed.",
    },
    "landing-legs": {
      name: "Landing legs (×6)",
      description:
        "Six legs, two more than Falcon 9. New Glenn's booster lands on a **moving sea platform** rather than an anchored barge, so it must tolerate greater deck motion and tilt — hence a wider support base and longer stroke.",
    },
    "s1-body": {
      name: "First stage airframe",
      description:
        "A 7 m aluminium tank — a diameter chosen free of road transport limits, since the factory sits beside Cape Canaveral and the airframe travels a few kilometres by road to the pad. Seven metres is also the fairing diameter, so the whole vehicle is one diameter with no transition section and its attendant structural and aerodynamic complexity. The design target is **25 flights per booster.**",
    },
    strakes: {
      name: "Aerodynamic strakes (×4)",
      description:
        "Four fixed aerodynamic surfaces on the upper first stage. They are not grid fins — New Glenn controls entry mainly through the stability these fixed surfaces provide combined with engine gimballing, rather than movable control surfaces. One fewer actuator is one fewer moving part that has to work inside an entry heating environment.",
    },
    interstage: {
      name: "Interstage",
      description: "The interstage, which stays with the first stage and returns with it.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "Two BE-3U hydrolox engines, 445 s in vacuum, restartable. The two stages use **different propellant combinations** — methane below, hydrogen above: the first stage wants thrust density and reuse-friendliness, the second wants maximum impulse. It is the most thoroughgoing application of propellant-by-layer thinking in a vehicle flying today.",
    },
    fairing: {
      name: "Fairing",
      description:
        "A 7 m diameter, 22 m fairing with roughly 2.4 times the internal volume of Falcon 9's — **the largest in service anywhere**, and New Glenn's clearest differentiator: some payloads are constrained not by mass but by size (large-aperture telescopes, large antennas, station modules).",
    },
  },

  modelNote:
    "A schematic reconstruction from Blue Origin's published figures: 98 m overall, 7 m diameter, seven BE-4 engines. Section length distribution, landing leg and strake shapes are indicative.",

  sources: [
    { note: "Dimensions, capability, payload envelope and reuse targets." },
    { note: "Engine thrust and cycle." },
    {
      note: "Liftoff mass and stage parameters are public estimates; Blue Origin has not released complete mass data. Flight record current to the end of 2025.",
    },
  ],
};
