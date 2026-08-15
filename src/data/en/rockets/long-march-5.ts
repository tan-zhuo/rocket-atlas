import type { RocketOverlay } from "@/i18n/localize";

export const longMarch5En: RocketOverlay = {
  displayName: "Long March 5",
  country: "China",
  agency: ["CALT", "CASC"],
  description:
    "The flagship of China's new-generation launch vehicles, which took the country's low Earth orbit capability from 8.6 t to 25 t and made the space station, lunar exploration and Mars missions materially possible.",

  history: `The case for Long March 5 comes down to one number: before it, China's most capable rocket, the Long March 3B, managed about 12 t to LEO and 5.5 t to GTO — while building a 60 t space station or launching an 8 t lunar sample return vehicle needed at least 20 t of low-orbit capability. The State Council approved the programme in October 2006; development of the two supporting engines, YF-100 and YF-77, had begun earlier, in the late 1990s.

Development ran a decade, and almost every hold-up was in the engines and the new propellants: the entire previous Long March family used storable UDMH and nitrogen tetroxide, while Long March 5 had to master both large kerolox and large hydrolox propulsion — and then combine them in one vehicle.

The maiden flight on 3 November 2016 succeeded (with an anomaly in the core stage along the way). The second flight, on 2 July 2017, failed when a YF-77 turbopump broke up, and the knock-on delays hit Chang'e 5, the Mars mission and the space station together. After more than two years of corrective work it returned to flight on 27 December 2019, and has since launched **Tianwen-1 to Mars (2020), Chang'e 5's lunar sample return (2020), the Tianhe core module (2021, in the CZ-5B configuration) and Chang'e 6's far-side sample return (2024)** — the most consequential missions in Chinese spaceflight.`,

  designPhilosophy: `Long March 5's design logic is **replacing the technical basis of the entire Long March family in one move, through a modular engine system.**

It is not an isolated rocket but the top of the new-generation stack: the same YF-100 kerosene engine powers Long March 5's boosters, the 6's first stage, both stages of the 7 and the 8; the same 3.35 m and 2.25 m modules recur across types. That let China roll non-toxic cryogenic propellants across its whole active fleet within fifteen years, while concentrating development risk in two or three engines.

The second thread is **dividing the propellant work between density and efficiency**: liftoff thrust comes from dense, high-thrust kerosene boosters, while the core burns hydrolox and behaves from the outset like an upper stage (the core burns for 490 s, far beyond a typical first stage's 150–180 s). That is the inverse of the common Western “kerosene first stage, hydrogen upper stage” arrangement, and it creates its own problem — the two YF-77s produce too little sea-level thrust to lift the vehicle, so before booster separation almost everything depends on the strap-on load path.

The third is **a diameter set by transport**: 5 m can go by sea but not by road, and that single decision moved China's new-generation assembly and launch operations to Tianjin and Wenchang.`,

  tradeoffs: [
    {
      question: "Why a hydrolox core rather than all-kerosene like Falcon 9?",
      answer: `Long March 5's core burns for 490 s — three times as long as Falcon 9's first stage (162 s). That tells you it is not a first stage in the usual sense but effectively a **second stage that starts on the ground**: the four kerosene boosters carry the liftoff phase, and the core simply keeps accelerating after they drop away, nearly to orbital velocity.

In that role, specific impulse matters far more than thrust density: the YF-77 delivers 430 s in vacuum against the YF-100's 335 s. Over a 490 s burn, that difference converts directly into payload.

Three costs, all of them real:

1. **Hydrogen is not dense** (71 kg/m³). Holding 165 t of hydrolox forces the core to 5 m, which runs straight into the rail transport limit.
2. **Sea-level thrust is inadequate.** Two YF-77s give roughly 1,020 kN against a liftoff mass of 869 t — the core alone has a thrust-to-weight far below one. The whole thrust structure and aerodynamic load distribution before booster separation had to be designed around that.
3. **Large hydrolox engines are extremely hard.** The YF-77's difficulties caused the 2017 failure and the 908-day stand-down. The YF-100 was far more mature by comparison.

This is a choice that accepted development risk to buy final performance. On single-flight reliability and schedule, an all-kerosene design (like Long March 7) is clearly safer — but it does not reach 25 t.`,
    },
    {
      question: "Why four strap-on boosters instead of a bigger core?",
      answer: `Strap-on configurations are nearly universal among heavy vehicles from China, Europe, Japan and India, because they **decouple “more thrust” from “bigger diameter”.**

Growing a core from 5 m to 8 m is not just a bigger tank: assembly buildings, transport ships, flame trenches, umbilical towers and wind loading all have to be redone, and thrust structure loads grow with the square of diameter. Strap-ons let you add modules to a proven core instead: CZ-5 uses four, CZ-7 uses four smaller ones, CZ-8 uses two, and CZ-8A uses none. One 3.35 m module and one YF-100 support the whole family.

The cost is **more separation events**: four boosters must separate within the same second without touching the core, and any anomaly in one causes loss of attitude control. Long March 5 handles this with a forward-attachment primary load path plus aft supports, releasing the aft supports first and then pushing the boosters outward with head-end thrusters.

A less visible cost is **aerodynamic interference**: flow around a clustered body is far more complex than around a smooth cylinder, and transonic buffet and local heating need extensive wind tunnel calibration.`,
    },
    {
      question: "Why does CZ-5B delete the second stage, and what is the controversy?",
      answer: `CZ-5B is a variant that **keeps the four boosters and hydrolox core and removes the second stage entirely**, replacing it with a 20.5 m fairing. It exists to launch the 20 t modules of the Tiangong space station.

The logic is direct: a station module's target orbit is only about 400 km, and after 490 s the core is already close to orbital velocity, so another stage would be surplus mass and one more separation event. The stage-and-a-half configuration keeps LEO capability at 25 t and simplifies the flight sequence.

But it has a consequence: **the core stage itself goes into orbit.** A 20 t empty stage cannot deorbit itself and simply decays over several days before re-entering uncontrolled. Several CZ-5B launches between 2020 and 2022 produced exactly that, with debris footprints from West Africa to the Indian Ocean, and public criticism from NASA and other agencies.

This is a textbook case of **local optimum versus global responsibility**: viewed as a single mission, the stage-and-a-half configuration is faultless; viewed as orbital stewardship, it hands a 20 t uncontrolled object to the atmosphere. International practice is to reserve deorbit propellant or passivate the stage, which costs payload. Later designs (the Long March 10 family) are designed for controlled disposal.`,
    },
    {
      question: "Ten years of development, one failure, 908 days grounded — was it worth it?",
      answer: `As project management, an expensive lesson: the 2017 failure delayed Chang'e 5 by three years, forced Tianwen-1 to be replanned around a different Mars window, and pushed the whole space station schedule back.

Seen differently: what Long March 5 actually delivered was not a rocket but **two entirely new engine technology lines and a complete cryogenic propellant infrastructure**. Once qualified, the YF-100 propagated to the Long March 6, 7 and 8 and beyond; Wenchang, the Tianjin assembly plant and the sea transport chain became permanent assets. Since returning to flight in 2019 the family's success rate has been very high, and within five years it flew the Mars, lunar sample return and space station missions.

Which suggests a more general judgement: **the development timeline and failure cost of a heavy-lift vehicle are the cost of national infrastructure, not of a single product.** Judging it by a commercial rocket's iteration cadence gives misleading answers — and judging a commercial rocket by a national programme's tolerance for failure is equally wrong.`,
    },
  ],

  contemporaries: `Long March 5 sits in the same class as **Delta IV Heavy** (28 t to LEO), **Ariane 5 ECA** (21 t), **Falcon 9** (22.8 t) and **H3** (about 16 t). Within that group it is the only one using a hydrolox core with four liquid kerosene strap-ons — Ariane 5 and H-IIA use solids, and Delta IV Heavy clusters three hydrolox cores.

Solid boosters give high liftoff thrust with simple structure and long storage life, at the cost of low specific impulse (around 270 s) and no shutdown once lit; liquid kerosene boosters give roughly 30 s more impulse and can be throttled and shut down, at the cost of a far more involved launch campaign. Long March 5's choice of liquid strap-ons is consistent with its overall goal of moving every element to non-toxic cryogenics at once.`,

  tags: ["Heavy lift", "Hydrolox core", "Strap-on boosters", "Deep space", "Space station"],

  milestones: [
    { title: "Programme approved by the State Council", note: "Development of the YF-100 and YF-77 had begun earlier." },
    { title: "Maiden flight succeeds", note: "First flight from Wenchang; China enters the 25 t class." },
    { title: "Y2 failure", note: "A YF-77 turbopump failed, grounding the vehicle for 908 days." },
    { title: "Return to flight", note: "Y3 successfully launched Shijian-20." },
    { title: "Tianwen-1 launch", note: "China's first independent Mars exploration mission." },
    { title: "Chang'e 5 launch", note: "Lunar sample return: an 8.2 t spacecraft sent directly onto a translunar trajectory." },
    { title: "CZ-5B launches the Tianhe core module", note: "Construction of China's space station begins." },
  ],

  variants: [
    { name: "CZ-5", note: "The standard two-and-a-half stage configuration for high-energy and deep-space missions." },
    { name: "CZ-5B", note: "Stage-and-a-half with a 20.5 m fairing, for space station modules." },
    { name: "CZ-5 / YZ-2", note: "With the Yuanzheng-2 upper stage, capable of direct GEO insertion." },
  ],

  stages: [
    {
      nameZh: "Boosters (×4)",
      propellantZh: "Kerosene / liquid oxygen",
      note: "The four boosters supply about 90% of liftoff thrust.",
      engines: [
        { cycleZh: "Oxidiser-rich staged combustion", note: "Two per booster, eight in total." },
      ],
    },
    {
      nameZh: "Core stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "It keeps burning for around 300 s after booster separation, which makes it effectively a second stage that happens to start on the ground.",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Restartable, handling the final injection into GTO or a translunar trajectory.",
      engines: [
        { cycleZh: "Expander cycle", note: "China's first expander-cycle engine, with multiple restarts." },
      ],
    },
  ],

  launchesNotable: [
    { name: "Maiden flight / Shijian-17", note: "A core stage anomaly, but the payload reached orbit." },
    { name: "Y2 / Shijian-18", note: "The only failure." },
    { name: "Chang'e 5", note: "Direct injection onto a translunar trajectory with very small error." },
    { name: "Chang'e 6", note: "The first sample return from the far side of the Moon." },
  ],

  parts: {
    "booster-body": {
      name: "K3 boosters (×4)",
      description:
        "Four 3.35 m kerolox boosters, each with two YF-100 engines. Of the vehicle's 1,060 t of liftoff thrust, 960 t comes from the boosters — the two hydrolox core engines contribute only about 10% at sea level. That is characteristic of the “hydrolox core plus kerosene strap-ons” architecture: the boosters solve liftoff, the core provides efficient sustained acceleration.",
    },
    "booster-engines": {
      name: "YF-100 engines (×8)",
      description:
        "The YF-100 is China's first oxidiser-rich staged-combustion engine: 1,200 kN at sea level from a 18 MPa chamber. Its technical lineage runs back through licensed RD-120 technology, and since qualification in 2012 it has become the common engine of the Long March 5, 6, 7 and 8 and later commercial vehicles — one engine holding up an entire generation.",
    },
    "booster-nose": {
      name: "Booster nose cone",
      description:
        "A slant-cut nose. The boosters transmit load through their **forward attachment**: thrust passes into the core through a ball-and-socket joint at the base of the nose cone, so the core's thrust structure only needs reinforcement on one ring.",
    },
    "core-engines": {
      name: "YF-77 engines (×2)",
      description:
        "China's only large hydrolox engine: gas-generator cycle, 700 kN in vacuum and 430 s vacuum specific impulse. It was also the hardest part of the programme — the 2017 second-flight failure traced directly to a local structural failure in its turbopump at high temperature and rotational speed, after which the vehicle stood down for 908 days.",
    },
    "core-stage1": {
      name: "Core stage",
      description:
        "A 5 m hydrolox core. Five metres is the critical number — it exceeds China's existing rail tunnel gauge, which forced Long March 5 to be assembled in a new plant in Tianjin and shipped by sea to Wenchang, and is part of why Wenchang exists at all. Transport constraints rewriting launch site geography is rare in spaceflight history.",
    },
    stage2: {
      name: "Second stage",
      description:
        "Two gimballed YF-75D expander-cycle hydrolox engines, 442 s in vacuum, restartable twice. An expander cycle has no gas generator: hydrogen vaporising in the thrust chamber jacket drives the turbine. That is the simplest and most reliable arrangement available, but thrust is capped by heat-exchange area, so it suits only upper stages.",
    },
    fairing: {
      name: "Payload fairing",
      description:
        "A 5.2 m diameter, 12.267 m Von Kármán fairing. The CZ-5B configuration uses a 20.5 m stretched fairing to accommodate Tiangong space station modules — among the largest fairings in service anywhere.",
    },
  },

  modelNote:
    "A schematic reconstruction from CASC's published figures: 56.97 m overall, 5 m core, 3.35 m boosters and a 5.2 m fairing. Booster length and nose shape are indicative; the real booster noses are slant-cut.",

  sources: [
    { note: "Official source for overall parameters and configuration." },
    { note: "Performance envelopes, fairing dimensions and payload interfaces." },
    {
      note: "Launch record and mission outcomes; sources give liftoff mass between 867 and 879 t.",
    },
  ],
};
