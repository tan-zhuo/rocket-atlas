import type { RocketOverlay } from "@/i18n/localize";

export const zhuque2En: RocketOverlay = {
  displayName: "Zhuque-2 (ZQ-2)",
  country: "China",
  agency: ["LandSpace"],
  description:
    "The first methalox launch vehicle in the world to reach orbit, and the first time a Chinese private space company got ahead of the international field on a key technology.",

  history: `LandSpace was founded in 2015, among the first wave of Chinese private launch companies. Its first vehicle, the solid-fuelled Zhuque-1 (2018), lost attitude control on the third stage and failed to reach orbit. The company then made a decision that looked aggressive at the time: **skip kerosene entirely and develop methalox engines.**

The reasoning was that methane is the future of reusable launch — it burns clean without coking, it is denser than hydrogen, it can be stored deeply cryogenic, and its temperature is close enough to liquid oxygen to allow a common bulkhead. That judgement lines up with SpaceX's Raptor, Blue Origin's BE-4 and Rocket Lab's Archimedes.

Zhuque-2's maiden flight on 14 December 2022 failed when a second-stage vernier engine feed line gave way. The second flight, on 12 July 2023, succeeded — **making Zhuque-2 the first methalox rocket in the world to reach orbit**, ahead of SpaceX's Starship, Blue Origin's New Glenn, ULA's Vulcan and Relativity's Terran 1.

It is a “first” that deserves careful reading: Zhuque-2's capability (6 t to LEO) is far below the other methalox vehicles in development, and its technical route (a gas-generator cycle) is more conservative. **What it won was the date, not the technology.**

The company has since introduced the improved ZQ-2E (larger fairing, more capability) and is developing the reusable ZQ-3 — stainless steel, 3.8 m diameter, targeting 21 t to LEO (18.3 t in recovery configuration).`,

  designPhilosophy: `Zhuque-2's design logic is **be aggressive on exactly one thing and conservative on everything else.**

There is only one aggressive choice: methane. In 2018 no Chinese company had validated that direction, and it required building engines, tanks, loading systems and test stands from nothing.

Everything else is deliberately safe:

- **3.35 m airframe** — the mature Long March dimension, so tooling, transport and pad infrastructure can reuse the existing industrial base;
- **Gas-generator cycle** — not staged combustion; give up the impulse to take the simplest, lowest-risk cycle;
- **Two stages in series with vernier attitude control** — straight out of the Long March 2 playbook;
- **No recovery** — the first vehicle only has to reach orbit; recovery is the next generation's problem.

The judgement behind that combination is clear: **a start-up's development budget only stretches to one gamble.** Put the risk on the item with the most long-term value (methane propulsion) and stand everything else on validated ground.

Compare Relativity Space's Terran 1, which took on methane propulsion **and** whole-vehicle 3D printing at once, failed on its maiden flight and abandoned the vehicle outright for Terran R. **Taking two bets at the same time is usually fatal in this industry.**`,

  tradeoffs: [
    {
      question: "Why skip kerosene and go straight to methane?",
      answer: `In 2018 the mainstream choice for Chinese commercial launch companies was kerolox: mature technology, complete supply chain, and the YF-100 as an industrial reference. LandSpace chose methane instead, on three judgements about the **future**:

1. **Coking.** Kerosene combustion leaves carbon deposits on injectors, gas generators and turbines, which have to be cleaned or inspected before reflight. Methane is the simplest hydrocarbon (CH₄) and burns clean, which in principle allows “land it, fly it”. For a company whose long-term goal is reuse, that is decisive.
2. **Common bulkhead.** Liquid oxygen boils at −183 °C and liquid methane at −162 °C — 21 °C apart. Kerosene is ambient and hydrogen is −253 °C. A small temperature difference means a simple common bulkhead instead of heavy insulation, and a shorter, lighter vehicle.
3. **Density and impulse balance.** Methane's density is 423 kg/m³ (six times hydrogen's) and its vacuum impulse can exceed 360 s (about 20 s better than kerosene). That position between the two is exactly right for a reusable vehicle: recovery means holding propellant back, and higher density means the tanks do not have to grow.

The cost was **starting from zero**: no engine to reference, no methane loading infrastructure, no experience storing and transporting cryogenic methane, and not even a qualified liquid methane supplier at first. The maiden flight slipped by more than two years, much of it spent on precisely that unglamorous groundwork.

In hindsight the bet was right: almost every new reusable vehicle now in development worldwide uses methane.`,
    },
    {
      question: "How much does “first methalox rocket to orbit” actually mean?",
      answer: `It needs unpacking.

**The first is real**: orbit on 12 July 2023, ahead of Vulcan (January 2024), Terran 1 (failed, March 2023), Starship (still no completed orbital mission) and New Glenn (January 2025).

**But the comparison is not like for like**:

| Vehicle | LEO capability | Engine cycle | Reuse |
|---|---|---|---|
| Zhuque-2 | 6 t | Gas generator | None |
| Vulcan | 27.2 t | Oxidiser-rich staged combustion | None |
| New Glenn | 45 t | Oxidiser-rich staged combustion | First stage |
| Starship | 100 t+ | Full-flow staged combustion | Both stages (target) |

Zhuque-2 is markedly less technically demanding than the others. It chose the easiest tier of methalox rocket: modest thrust, a simple cycle, no recovery.

So where does the first count? In demonstrating that **the engineering path to methane propulsion closes**, and that a company founded seven years earlier with about a thousand employees could close it. For Chinese commercial spaceflight the value is largely industrial: it proved a private company could develop a new engine independently, obtain launch licences and pad slots, and complete the whole chain from test stand to orbit.

**Being first technically and being first industrially are different things, and Zhuque-2 mostly won the second.**`,
    },
    {
      question: "What does a maiden flight failure in the vernier engines tell you?",
      answer: `On the December 2022 flight both stages worked, but after the second stage's main engine shut down, **the vernier engines' propellant feed line failed** and the terminal velocity trim was never completed, so the payload did not reach orbit.

Vernier engines are a classic Chinese design pattern: a fixed main engine that only produces thrust, with attitude control handed to four small gimballed engines. The advantage is a simpler main engine (no gimbal ring, no flexible lines) and clean control decoupling; the cost is **four complete additional propulsion systems**, each with its own lines, valves and igniters.

That the failure happened there is not accidental: vernier feed lines are thin, their duty cycle varies violently (frequent start-stop and gimballing), and their flow behaviour in cryogenic methane was entirely new. **They are the part of the vehicle with the most components and the least validation.**

The general lesson is broader: the failures of a new-technology programme rarely occur in the headline technology. They occur in **the supporting system everyone assumed was already solved.** The core TQ-12 engine, extensively hot-fired, worked correctly; what failed was an inherited design in an unfamiliar propellant environment. Ariane 5's maiden flight (reused Ariane 4 software) and Vega-C's failure (an inherited nozzle material) follow exactly the same pattern.`,
    },
  ],

  contemporaries: `Chinese commercial contemporaries include **Tianlong-3** (Space Pioneer, kerosene, 17 t to LEO, recoverable), **Gravity-2** (Orienspace, hybrid solid/liquid), **Hyperbola-3** (i-Space, methalox and recoverable) and **Kinetica-1** (CAS Space, solid). Almost every Chinese commercial vehicle initiated after 2023 points at the same target configuration: **methalox or kerolox, first stage propulsive recovery, 3.8–4.2 m diameter, 15–20 t to LEO** — which is to say, a Falcon 9 analogue.

The driver is clear enough: China's two megaconstellations (Guowang and Qianfan/G60) together plan more than 26,000 satellites, far beyond what the existing Long March fleet can launch. **This is an industrial window opened by certainty of demand, not by a technological breakthrough.**`,

  tags: ["Methalox", "Commercial spaceflight", "First methalox to orbit", "Chinese private", "Medium lift"],

  milestones: [
    { title: "Zhuque-1 launch failure", note: "The solid third stage lost attitude control; the company pivoted to liquid propulsion." },
    { title: "First full-system TQ-12 hot fire", note: "China's first large methalox engine fired successfully." },
    { title: "Zhuque-2 maiden flight failure", note: "A second-stage vernier engine feed line failed." },
    { title: "Y2 flight succeeds", note: "The first methalox launch vehicle in the world to reach orbit." },
    { title: "Y3 launches three satellites", note: "The first operational commercial payload mission." },
  ],

  variants: [
    { name: "Zhuque-2 (standard)", note: "3.35 m fairing, 6 t to LEO." },
    { name: "Zhuque-2E", note: "A 4.2 m fairing and increased capability, aimed at constellation deployment." },
    { name: "Zhuque-3 (ZQ-3)", note: "In development: a stainless steel reusable vehicle, 3.8 m diameter, 21 t to LEO expendable." },
  ],

  stages: [
    {
      nameZh: "First stage",
      propellantZh: "Liquid methane / liquid oxygen",
      note: "The improved version is planned for propulsive recovery; the baseline is expendable.",
      engines: [
        { cycleZh: "Gas-generator cycle", note: "China's first large methalox engine to fly." },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Liquid methane / liquid oxygen",
      engines: [
        { cycleZh: "Gas-generator cycle" },
        { cycleZh: "Gas-generator cycle", note: "Verniers for attitude control and terminal velocity trim." },
      ],
    },
  ],

  launchesNotable: [
    { name: "Y1", note: "Maiden flight failure." },
    { name: "Y2", note: "The first methalox rocket in the world to reach orbit." },
    { name: "Y3", note: "The first successful operational commercial mission." },
  ],

  parts: {
    "tq12-cluster": {
      name: "TQ-12 engines (×4)",
      description:
        "Four methalox engines producing 657 kN each at sea level. The Tianque series is China's first large methane engine to fly, and it uses a gas-generator cycle rather than staged combustion — a characteristic commercial trade between development time and technical risk: **build something that flies first, then build something better.**",
    },
    "s1-body": {
      name: "First stage airframe",
      description:
        "A 3.35 m airframe — the same dimension as the Long March 2, 3 and 4 families. China has complete tooling, transport and launch infrastructure for that size, so a commercial company adopting it cuts infrastructure cost enormously. **Innovate on propellant and engines, follow the existing industrial base on dimensions: the general strategy of Chinese commercial launch vehicles.**",
    },
    interstage: {
      name: "Interstage",
      description:
        "The interstage. The improved Zhuque-2E and the follow-on ZQ-3 are designed for first stage propulsive recovery, which will replace this section with a recoverable structure carrying grid fins.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "One vacuum TQ-12 (785 kN) plus four TQ-11 verniers (98 kN each). The maiden flight failed exactly here: **the vernier engines' propellant feed line failed**, so the stage could not complete terminal velocity trim after main engine cutoff and the payload did not reach orbit. The second flight succeeded after targeted fixes.",
    },
    fairing: {
      name: "Fairing",
      description:
        "A 3.35 m fairing. The improved ZQ-2E adopts a 4.2 m fairing to suit batch deployment of constellation satellites.",
    },
  },

  modelNote:
    "A schematic reconstruction from LandSpace's published figures: 49.5 m overall, 3.35 m diameter (baseline configuration). Section length distribution is indicative.",

  sources: [
    { note: "Official source for overall parameters, engines and configuration." },
    {
      note: "Launch record and mission outcomes; some parameters are compiled from public reporting, as the company has not released complete mass data.",
    },
    { note: "Reporting on the maiden flight failure and the industry background." },
  ],
};
