import type { RocketOverlay } from "@/i18n/localize";

export const deltaIVHeavyEn: RocketOverlay = {
  displayName: "Delta IV Heavy",
  country: "United States",
  agency: ["United Launch Alliance (ULA)", "Boeing"],
  description:
    "For two decades America's only heavy-lift vehicle: all-hydrogen, three cores in parallel, built for national security space launch — and therefore never obliged to compete on price.",

  history: `Delta IV came out of the 1990s **EELV programme**, in which the US Air Force hoped that two competing commercialised rocket families — Boeing's Delta IV and Lockheed Martin's Atlas V — would replace Titan IV and bring launch costs down.

The opposite happened. The commercial market the Air Force expected never materialised, both companies had capacity far above demand, and prices rose rather than fell. In 2006 the two simply merged their launch businesses into **ULA** — competition disappeared and prices set. Delta IV Medium retired in 2019 on cost, leaving only the irreplaceable Heavy in service until 2024.

Its missions were the ones that could not be allowed to fail: large NRO optical and signals intelligence satellites, **Parker Solar Probe** (2018, the closest any spacecraft has come to the Sun) and **Orion EFT-1** (2014, the uncrewed debut of the Orion spacecraft).

On 9 April 2024, after NROL-70, Delta IV Heavy retired — ending a family line traceable to Thor-Delta in 1960. **A lineage of 64 years and more than 380 launches closed.**`,

  designPhilosophy: `Delta IV Heavy's design logic is **all-hydrogen plus modular clustering — theoretically elegant, economically fatal.**

The case for hydrogen was specific impulse: the RS-68A's 412 s in vacuum is about 70 s above a kerosene engine. Looking only at mass ratio, this is the optimal chemical solution. The case for modularity was volume: one Common Booster Core would serve the Medium, Medium+ and Heavy configurations, spreading fixed costs.

Neither premise held.

- **Hydrogen is not dense.** To hold the same propellant mass Delta IV's airframe is far larger than a kerosene rocket's, which raises structural mass, drag and insulation cost. Worse, hydrolox engines are inefficient at **sea level** (the RS-68A manages only 362 s there) — and a first stage works precisely in dense air. The most expensive propellant is deployed where it pays least.
- **The volume never came.** The commercial market EELV assumed did not appear; the whole Delta IV family flew 45 times in twenty years, the Heavy just 16. Amortised over that, a Heavy launch cost 350–440 million dollars.

**The vehicle ended up a pure technical specimen: unimpeachable on performance, unviable economically.** It retired not because it was technically behind, but because something cheaper appeared (Falcon Heavy at 150 million) and something cheaper still was coming (Vulcan).`,

  tradeoffs: [
    {
      question: "Why is hydrogen an expensive choice for a first stage?",
      answer: `Hydrolox has about 25% more vacuum specific impulse than kerolox, so an all-hydrogen first stage sounds better. But three characteristics of first stage operation cancel most of that advantage:

1. **Sea-level nozzle efficiency is poor.** A first stage nozzle's expansion ratio must accommodate sea-level pressure and cannot be large. The RS-68A manages only 362 s at sea level against a kerosene engine's ~300 s, so the advantage shrinks from 25% to about 20%.
2. **Density sets structural mass.** Liquid hydrogen is 71 kg/m³ against kerosene's 810 — eleven times less. Holding the same propellant mass needs eleven times the tank volume. Delta IV's first stage therefore had to be 5.1 m across, and surface area, insulation and structure all grew with it. Every kilogram of added structure cancels part of the impulse gain.
3. **A first stage needs thrust more than efficiency.** What a first stage fights is gravity loss, which wants **thrust**; the value of specific impulse rises with altitude, and is lowest exactly where the first stage works.

The net benefit is therefore far smaller than the paper calculation. Which is why nearly every other vehicle uses a kerosene or solid first stage with a hydrolox upper stage — Ariane 5, Long March 5, H-IIA and SLS all do. Delta IV alone burned hydrogen throughout.

Conversely, hydrolox is unarguably optimal for an **upper stage**: vacuum operation, large expansion ratios, and a high share of the total velocity increment. The DCSS's RL10B-2 reaches 462 s, still the record.`,
    },
    {
      question: "Why isn't three identical cores better than one large one?",
      answer: `Falcon Heavy and Delta IV Heavy share the idea: rather than developing a large new core, strap three existing ones together. On paper that is free capability.

It is not free:

- **Structure does not simply add.** The cores need load paths between them, and the centre core must carry thrust transmitted from both sides — reinforcement that is dead weight in the single-core configuration.
- **Aerodynamic interference is complex.** The flow field around three bodies is far harder than around one, and transonic buffet, local shocks and base heating all require extra wind tunnel and CFD work.
- **More separation events, and dangerous ones.** Both side cores must separate simultaneously and symmetrically without touching the centre. Before Falcon Heavy's first flight Musk said publicly it might blow up on the pad, and that concern came mostly from the structural and separation complexity of clustering.
- **Throttling losses.** The centre core must throttle during the boost phase (Delta IV Heavy throttles to 57%) so it still has propellant after the side cores drop. Engines run below their design point are less efficient.

The alternative — developing an 8–9 m single core — needs new factories, new transport and new pads, at a cost in the billions. **Clustering is a trade of operational complexity for development cost**, which pays for a low-rate vehicle and may not for a high-rate one.`,
    },
  ],

  contemporaries: `Its direct competitor was **Falcon Heavy** (first flown 2018, 63.8 t to LEO, about 150 million dollars expendable). Nearly double the capability at less than half the price — a comparison that effectively ended the debate about whether an expendable heavy-lift vehicle still had a role.

The other reference point is **Atlas V 551** (18.85 t to LEO): also a ULA product, using the Russian RD-180 kerosene engine on its first stage, and extraordinarily reliable (one partial failure in 89 launches). After the 2014 Crimea crisis, US Congress barred the military from buying launches on vehicles using Russian engines, which is what drove Vulcan's development and, indirectly, set Delta IV Heavy's retirement date. **Here geopolitics was more decisive than either technology or cost.**`,

  tags: ["Heavy lift", "All-hydrogen", "Three-core", "National security launch", "Retired"],

  milestones: [
    { title: "Maiden flight (partial failure)", note: "Cavitation in a propellant sensor shut down all three engines early and the payload missed its orbit." },
    { title: "Orion EFT-1 launched", note: "The first uncrewed orbital test of the Orion spacecraft." },
    { title: "Parker Solar Probe launched", note: "With an added Star 48BV third stage, setting the speed record for a man-made object." },
    { title: "NROL-70, the final flight", note: "The end of 64 years of Delta history." },
  ],

  variants: [
    { name: "Delta IV Medium / Medium+", note: "Single-core versions with 2 or 4 solid boosters, retired in 2019." },
    { name: "Delta IV Heavy", note: "The three-core configuration." },
  ],

  stages: [
    {
      nameZh: "3 × Common Booster Core",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "The two side cores run at full thrust while the centre core throttles to 57%, extending its own burn to about 328 s.",
      engines: [
        {
          cycleZh: "Gas-generator cycle",
          note: "The most powerful hydrolox engine ever built, with an ablatively cooled nozzle.",
        },
      ],
    },
    {
      nameZh: "DCSS upper stage (5 m)",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Restartable, supporting direct GEO insertion and deep-space injections.",
      engines: [
        {
          cycleZh: "Expander cycle",
          note: "With a deployable carbon composite nozzle extension (expansion ratio 285), the highest specific impulse of any chemical engine.",
        },
      ],
    },
  ],

  launchesNotable: [
    { name: "Demo Flight", note: "The only mission that fell short of its target." },
    { name: "Parker Solar Probe", note: "Required an enormous velocity change simply to fall toward the Sun." },
    { name: "NROL-70", note: "The final flight." },
  ],

  parts: {
    "core-engine": {
      name: "RS-68A engine (centre core)",
      description:
        "The most powerful hydrolox engine ever built: 3,137 kN at sea level. To cut cost it deliberately abandoned SSME-style perfectionism — the nozzle is **ablatively cooled** rather than regenerative, the part count is a fifth of the SSME's, and chamber pressure is far lower (97 bar against 207). The price is 412 s in vacuum against the SSME's 452. **A deliberate trade of performance for cost.**",
    },
    "core-body": {
      name: "Common Booster Core",
      description:
        "A 5.1 m hydrolox core. The whole Delta IV family (Medium, Medium+, Heavy) uses the same CBC, differing only in how many are clustered and whether solids are added — the 1990s EELV idea of modularity as a cost strategy. During the side-core burn the centre core throttles to 57% to preserve propellant for the phase after separation.",
    },
    "booster-engines": {
      name: "RS-68A engines (side cores, ×2)",
      description: "One RS-68A per side core, running at full thrust until separation at T+242 s.",
    },
    "booster-body": {
      name: "Side cores (×2)",
      description:
        "Structurally identical to the centre core, topped with conical nose cones instead. The famous orange fireball at Delta IV Heavy liftoff comes from hydrogen vented before ignition catching light — hydrogen is lighter than air and rises along the airframe, charring the orange foam insulation. **This is accepted behaviour, not a malfunction.**",
    },
    "booster-nose": {
      name: "Side core nose cone",
      description: "Conical fairings on the side cores that improve the aerodynamics of the clustered configuration.",
    },
    interstage: {
      name: "Interstage",
      description: "The interstage between core and upper stage, housing the DCSS engine and its ullage settling system.",
    },
    dcss: {
      name: "DCSS upper stage",
      description:
        "Carries a single RL10B-2 — at 462 s in vacuum, among the **highest specific impulse of any production chemical rocket engine**. It uses an expander cycle and a carbon composite nozzle extension that stows for launch and deploys before ignition to reach an expansion ratio of 285. The DCSS restarts and can loiter for hours, which allows direct GEO insertion and deep-space injections.",
    },
    fairing: {
      name: "Payload fairing",
      description:
        "A 5 m composite fairing up to 19.8 m long — at retirement still among the largest payload envelopes in America, and the reason Delta IV Heavy long monopolised large reconnaissance satellite launches: some optical payload tubes fit nothing else.",
    },
  },

  modelNote:
    "A schematic reconstruction from the ULA user's guide: 72 m overall, 5.1 m CBC diameter, with the 19.8 m long fairing.",

  sources: [
    { note: "Primary source for dimensions, mass, performance and payload envelopes." },
    { note: "Engine thrust and specific impulse." },
    { note: "Launch record and price estimates; unit price varies widely by mission and year." },
  ],
};
