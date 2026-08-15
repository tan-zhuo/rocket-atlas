import type { RocketOverlay } from "@/i18n/localize";

export const longMarch2FEn: RocketOverlay = {
  displayName: "Long March 2F",
  country: "China",
  agency: ["CALT", "CASC"],
  description:
    "China's only human-rated launch vehicle, which carries the principle “not advanced, but predictable” about as far as it can go — and still holds a 100% success record.",

  history: `China's human spaceflight programme (Project 921) was approved on 21 September 1992. The launch vehicle choice was barely a decision: adapt the existing Long March 2E (“CZ-2 bundled”) for crew rather than develop something new. CZ-2E itself descended from the Long March 2C, which descended from the DF-5 ICBM — **every link in that chain had already flown extensively.**

The human-rating work was not about performance but **reliability and crew safety**: the vehicle reliability target was set at 0.97 and crew safety at 0.997. That drove the fault detection system (FDS), the escape tower, redundant control and telemetry, and extensive redundancy in critical units on the first two stages.

Shenzhou 1 flew uncrewed on 19 November 1999. On 15 October 2003 Shenzhou 5 carried Yang Liwei into orbit, making China the third nation with independent human spaceflight. Every Shenzhou mission since has flown on Long March 2F, with no substitution.

From 2011 the CZ-2F/G variant (no escape tower, 4.2 m fairing) launched the Tiangong 1 and 2 space laboratories.

By 2025 Long March 2F has flown more than twenty times, **all of them successful** — one of the best records of any crewed launch vehicle.`,

  designPhilosophy: `Long March 2F's design logic fits in a sentence: **for a crewed rocket, the first-order requirement is not performance but predictability.**

Its technical choices look dated: toxic nitrogen tetroxide and UDMH, 289 s of specific impulse, no reuse, 8.6 t of capability, a diameter constrained by rail tunnels. Every one of those “dated” choices rests on the same argument — **these things have flown dozens of times and their failure modes are known.**

The second thread is **layered redundancy and escape**. A crewed rocket cannot drive failure probability to zero, so the design centre of gravity shifts from “do not fail” to “survive failure”:

- 0–39 km: the escape tower (solid motors, 10 g, usable from zero altitude on the pad);
- 39–120 km: after fairing separation, abort is performed by the spacecraft's own service module;
- After insertion: the spacecraft can return on an emergency trajectory.

The supporting fault detection system watches a dozen or so parameters in real time (chamber pressures, attitude rates, tank pressures) and triggers abort automatically when it judges the crew at risk — **at that point the rocket's own computer is given authority to overrule the mission.**

The third is **extreme conservatism in launch operations**. Each vehicle goes through tens of thousands of checks during assembly and test, and since Shenzhou 12 a backup vehicle stands ready for rescue whenever crew are in orbit.`,

  tradeoffs: [
    {
      question: "Why is a crewed rocket still burning toxic UDMH?",
      answer: `Nitrogen tetroxide and UDMH have obvious drawbacks: acutely toxic, carcinogenic, corrosive, requiring specialist handling after any leak; and specific impulse of only 289 s against kerosene's 335 s and hydrolox's 430 s.

But they have two properties that are extremely hard to replace in a crewed context:

1. **They are hypergolic.** The two ignite on contact, with no ignition system of any kind. That deletes an entire failure mode from an ascent — and for a crewed rocket, one fewer system that can fail is one fewer way to kill people.
2. **They store at room temperature.** No cryogenic loading, no insulation, no boil-off venting. The vehicle can sit fully fuelled for extended periods, which matters enormously for **launch window flexibility**: if weather or the spacecraft forces a few hours' delay, a cryogenic vehicle may have to detank and reload, while a storable one simply waits.

A third reason is more practical: **changing propellant means changing the whole rocket.** Tank volumes, engines, pressurisation, ground facilities and emergency procedures would all have to be redone, and then dozens of flights' worth of reliability data re-accumulated. For a system with twenty-plus consecutive successes, that is a bad trade on risk.

China's answer is to **build a new vehicle rather than convert this one**: the next-generation crewed Long March 10 uses kerolox and is developed in parallel, taking over once it has enough flight experience.`,
    },
    {
      question: "Does the escape tower actually help — and what risk does it add?",
      answer: `An escape tower is itself a solid rocket full of propellant, mounted directly above a crewed spacecraft, and it stays there for the first 120 s of every ascent. Its presence is a hazard in its own right: an inadvertent ignition would kill the crew outright.

So the design is saturated with anti-spurious-activation measures: multiple independent criteria, several sensors that must agree, and dual authorisation from ground and vehicle.

Its value lies in covering **a scenario nothing else can**: an explosion on the pad or in early ascent. At that point altitude and velocity are zero, there is no time margin, and the only way out is to drag the spacecraft hundreds of metres clear in a second or two. A solid escape motor reaches full thrust in about 0.1 s, which no liquid engine can.

Real cases prove the point:

- **Soyuz T-10-1, 1983**: the rocket caught fire on the pad and the escape tower fired two seconds before the explosion; two cosmonauts survived 14–17 g;
- **Soyuz MS-10, 2018**: a booster separation anomaly during ascent, after tower jettison — backup systems still recovered the crew.

Note that **the Space Shuttle and Starship have no escape system at all**. The Shuttle's design assumed the system would be reliable enough not to need one, and the cost of that assumption being wrong was fourteen lives. Which is why China, Russia and SpaceX's Crew Dragon all retain abort capability (Dragon integrates SuperDraco engines into the capsule wall, covering the entire ascent).`,
    },
    {
      question: "What does keeping a rescue vehicle on standby cost?",
      answer: `Since Shenzhou 12, whenever crew are in orbit a Long March 2F and a Shenzhou spacecraft must be held in **emergency standby**: assembled, tested and launchable within 8.5 days, in case the station suffers a serious failure.

The cost is real:

- **Double the vehicle and spacecraft inventory.** Every mission effectively ties up two sets of hardware.
- **Life consumption on standby hardware.** A vehicle standing vertical in the assembly building for months has units — batteries and pyrotechnics especially — with shelf-life limits that must be replaced when exceeded.
- **Facility and staffing load.** Extra buildings, test equipment and people on long-term standby.

What it buys is **no gap in the chain that keeps people in orbit alive**. The logic is the same as the escape tower's: in the cost model of human spaceflight, a life is not a variable you convert into payload or budget.

In practice it has settled into a rolling arrangement — the standby vehicle becomes the next mission's launcher while a new one takes its place — so it is less pure waste than a staggered inventory schedule.`,
    },
  ],

  contemporaries: `There are only three and a half crewed launch vehicles in service: **Long March 2F** (8.6 t to LEO), **Soyuz-2.1a** (7.02 t) and **Falcon 9** (22.8 t), with SLS and New Glenn still in testing.

Their design philosophies differ sharply. Soyuz-2 is the product of seventy years of evolution; Long March 2F is a human-rated adaptation of mature technology; Falcon 9 **flew commercially more than seventy times before being certified for crew** — a path with no precedent in human spaceflight, which moves the reliability argument from the design phase into operational statistics.

What they share is that all three retain a full abort capability, and none of them chases peak single-mission performance. **Carrying people is itself a rejection of performance-first design.**`,

  tags: ["Crewed", "Escape tower", "Hypergolic", "Perfect record", "Shenzhou"],

  milestones: [
    { title: "Project 921 approved", note: "A crewed vehicle to be derived from the CZ-2E." },
    { title: "Shenzhou 1 launched", note: "A successful uncrewed maiden flight." },
    { title: "Shenzhou 5 — first crewed flight", note: "Yang Liwei became China's first astronaut." },
    { title: "Shenzhou 7 — first spacewalk", note: "Zhai Zhigang performed China's first EVA." },
    { title: "CZ-2F/G launches Tiangong 1", note: "The cargo configuration without an escape tower." },
    { title: "Shenzhou 12", note: "The first long-duration crew aboard China's space station, and the start of the standby-vehicle policy." },
  ],

  variants: [
    { name: "CZ-2F/Y", note: "The standard crewed configuration with escape tower." },
    { name: "CZ-2F/G", note: "No escape tower, 4.2 m fairing, for space laboratory modules." },
    { name: "CZ-2E", note: "The predecessor, a commercial launcher first flown in 1990." },
  ],

  stages: [
    {
      nameZh: "Boosters (×4)",
      propellantZh: "Nitrogen tetroxide / UDMH",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
    {
      nameZh: "First stage",
      propellantZh: "Nitrogen tetroxide / UDMH",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Nitrogen tetroxide / UDMH",
      engines: [
        { cycleZh: "Gas-generator cycle", note: "The fixed main engine." },
        { cycleZh: "Gas-generator cycle", note: "Gimballed verniers for attitude control and terminal velocity trim." },
      ],
    },
  ],

  launchesNotable: [
    { name: "Shenzhou 1", note: "Maiden flight." },
    { name: "Shenzhou 5", note: "The first crewed flight." },
    { name: "Tiangong 2", note: "The CZ-2F/G configuration with the 4.2 m fairing." },
    { name: "Shenzhou 13", note: "The first six-month expedition." },
  ],

  parts: {
    "booster-body": {
      name: "Boosters (×4)",
      description:
        "Four 2.25 m liquid boosters, one YF-20B each, burning the same nitrogen tetroxide and UDMH as the core. The whole vehicle uses a single propellant combination, so loading, storage and emergency procedures are uniform — which has real value on a crewed rocket: **the simpler the procedure, the fewer the opportunities for human error.**",
    },
    "booster-engines": {
      name: "Booster engines (4 × YF-20B)",
      description: "740.4 kN each at sea level, fixed, taking no part in attitude control.",
    },
    "booster-nose": {
      name: "Booster nose cone",
      description:
        "The boosters separate at T+128 s and fall in Inner Mongolia and Shaanxi — the unavoidable price of an inland launch site, requiring the drop zones to be evacuated before each launch.",
    },
    "core-engines": {
      name: "YF-21C engine cluster (4 × YF-20B)",
      description:
        "Four YF-20Bs clustered as the YF-21C, 2,961.6 kN total at sea level. All four **gimbal in two axes** for thrust vector control — a mature arrangement inherited from the DF-5 ICBM with decades of flight validation behind it.",
    },
    "core-stage1": {
      name: "First stage",
      description:
        "A 3.35 m airframe — a dimension set by Chinese rail tunnel clearances and unchanged since the Long March 2 of the 1970s. The biggest change for the crewed version was not structural but **more than 300 additional telemetry measurements and the fault detection system (FDS)**, which monitors a dozen critical parameters in real time and triggers abort within milliseconds if it judges the crew at risk.",
    },
    stage2: {
      name: "Second stage",
      description:
        "One fixed YF-22B main engine (738 kN in vacuum) plus four gimballed YF-23B verniers (47.1 kN each). Keeping the main engine fixed and steering with small verniers is structurally simple and reliable; the cost is the propellant the verniers consume and the extra plumbing they require.",
    },
    "fairing-transition": {
      name: "Fairing transition",
      description: "The transition from the 3.35 m airframe to the 3.8 m fairing.",
    },
    fairing: {
      name: "Fairing / Shenzhou spacecraft",
      description:
        "A 3.8 m fairing enclosing the Shenzhou orbital and descent modules (the service module sits outside it). The upper fairing forms part of the escape assembly: in an abort, **the upper fairing section is pulled away carrying both the orbital and descent modules**, not just the capsule.",
    },
    "fairing-cone": {
      name: "Fairing nose section",
      description: "The conical upper fairing, connected to the escape tower.",
    },
    les: {
      name: "Launch escape system",
      description:
        "The solid escape tower covers aborts from the pad to about 39 km at up to 10 g. It carries four sets of motors in different directions: a main escape motor to pull clear, separation motors to part the escape vehicle from the fairing, and dedicated attitude control motors to keep it stable during the escape. **In a normal flight it is jettisoned at T+120 s, after which abort is performed by the spacecraft's own service module.**",
    },
  },

  modelNote:
    "A schematic reconstruction of the crewed CZ-2F: 58.34 m overall, 3.35 m core, 2.25 m boosters, 3.8 m fairing. The escape tower's truss structure is indicative.",

  sources: [
    { note: "Official source for overall parameters and the reliability and safety targets." },
    { note: "Stage parameters and payload interfaces." },
    { note: "Launch record; sources give liftoff mass between 464 and 497 t." },
  ],
};
