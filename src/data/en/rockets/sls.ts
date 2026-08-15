import type { RocketOverlay } from "@/i18n/localize";

export const slsEn: RocketOverlay = {
  displayName: "Space Launch System",
  country: "United States",
  agency: ["NASA", "Boeing", "Aerojet Rocketdyne", "Northrop Grumman"],
  description:
    "A Moon rocket reassembled from the Shuttle's parts, factories and suppliers: the performance is real, and so is the cost — about 2.2 billion dollars a launch.",

  history: `SLS did not begin with a technical proposal. It began with a statute.

In 2010 the Obama administration cancelled the Bush-era **Constellation** programme (including the Ares I and Ares V rockets). Congress responded by legislating, in the **NASA Authorization Act of 2010**, that NASA shall build a heavy-lift vehicle and shall **“to the extent practicable utilize existing contracts, investments, workforce, industrial base and capabilities from the Space Shuttle and Orion and Ares 1 projects.”**

That one clause fixed the vehicle's entire technical form:

- 8.4 m diameter — the Shuttle External Tank diameter, with the Michoud tooling already in place;
- RS-25 core engines — Shuttle main engines, sixteen in inventory;
- Solid boosters — Shuttle boosters with a fifth segment added;
- Upper stage — DCSS, an off-the-shelf Delta IV product.

**Almost nothing was newly designed for SLS, and it still took twelve years and more than 23 billion dollars of development to fly.** Reusing old parts is not the same as not redesigning: a propellant tank had to become a powered stage, the five-segment booster had to be recertified, and the whole vehicle's loads and dynamics had to be reanalysed.

**Artemis I** flew uncrewed around the Moon on 16 November 2022 after repeated delays from hydrogen leaks, hurricanes and sensor faults. The flight itself was remarkably clean — **insertion accuracy, Orion's performance and the heat shield all beat expectations.**

The problem was never whether it can fly, but how often and at what price. NASA's Office of Inspector General puts it at **about 4.1 billion dollars per launch** including Orion and ground systems, of which the rocket is roughly 2.2 billion. Production capacity is one vehicle a year.

Artemis II (crewed lunar flyby) is planned for 2026, with Artemis III to follow.`,

  designPhilosophy: `SLS has to be read on two levels or the conclusions contradict each other.

**Technically it is a correct rocket.**

Given the requirement “put 27 t on a trans-lunar trajectory, in one launch, with crew,” SLS's configuration choices are essentially all textbook answers:

- **Hydrolox core**: for a high-energy mission like TLI, impulse matters more than thrust. RS-25's 452 s vacuum Isp is unreachable with any kerosene solution.
- **Liftoff thrust from solids**: hydrogen engines have poor thrust-to-weight and poor sea-level efficiency, so supplementing them with solid boosters is the economical answer (Ariane 5/6, H-IIA and Long March 5 all do the same).
- **One launch, no orbital operations**: no refuelling, no rendezvous, the shortest possible mission chain and the fewest risk nodes.

**As a programme it is a rocket defined by its constraints.**

The legal requirement to reuse the Shuttle supply chain produces a strange property — **cost is decoupled from performance.** SLS costs about 2.5 billion dollars a year whether or not it flies, because what that money maintains is an industrial system spread across several states. So:

$$\\text{cost per flight} = \\frac{\\text{fixed cost}}{N},\\quad N \\leq 1\\ \\text{per year}$$

**This is the same disease the Shuttle had**: high fixed cost and low flight rate locking each other in place. The difference is that the Shuttle at least flew four or five times a year.

**The sharpest illustration:** RS-25 reached 452 s and 207 bar *because* it was meant to be reused, at the cost of a very high unit price and heavy maintenance. SLS throws it away — **paying the price of reusability without collecting the benefit.** Likewise the five-segment booster abandoned recovery while keeping the segmented architecture (O-ring joints included) that recovery had motivated.

**The conclusion is that SLS made no wrong choices in rocket engineering; all of its problems come from choices it was never allowed to make.**`,

  tradeoffs: [
    {
      question: "With Falcon Heavy and Starship, why is SLS still needed?",
      answer: `After Artemis I succeeded in 2022 the question got sharper, because half the answer is expiring.

**The half that still holds: high-energy performance.**

| | LEO | Trans-lunar injection | Upper stage Isp |
|---|---|---|---|
| SLS Block 1 | 95 t | **27 t** | 462 s (hydrolox) |
| Falcon Heavy (expendable) | 63.8 t | ≈ 16–18 t | 348 s (kerosene) |
| Starship (no refuelling) | ≈ 100–150 t | **≈ 0** | 380 s (methane) |

Note the last row: without **orbital refuelling**, Starship can send essentially nothing useful beyond Earth orbit — the ship's dry mass alone (about 100 t) consumes the residual propellant. Starship's lunar architecture needs **more than ten propellant transfers** in low Earth orbit, and cryogenic transfer on orbit has never been fully demonstrated.

**SLS's real value is “one launch, no orbital operations”** — for a crewed mission, removing critical nodes from the mission chain is itself safety.

**The half that is expiring: cost and cadence.**

At 4.1 billion dollars and one flight a year, the pace of Artemis is set by the rocket rather than by the mission. And NASA's own Artemis III architecture uses **Starship as the lander** — the same mission depends simultaneously on SLS and Starship, with SLS delivering four astronauts to lunar orbit and Starship taking two of them to the surface.

That combination is technically coherent (each does what it does best) and budgetarily hard to sustain. **If Starship makes orbital refuelling work, SLS's technical justification narrows to “the crewed segment is more mature.”**`,
    },
    {
      question: "Why expend a reusable RS-25?",
      answer: `Because converting it to expendable is cheaper than designing a new expendable engine — **under an accounting convention that counts development cost and ignores unit cost.**

RS-25's specifications exist because of reuse: 55 rated starts, wide throttling, all critical components accessible for inspection. None of that is needed on SLS (it works for 480 s and then falls into the Atlantic), but the capabilities are already in the design and removing them would require recertification.

So the path is:

1. **Artemis I–IV** use the sixteen engines left from the Shuttle, four per flight. Many have flown before — **one unit on Artemis I had flown on 25 Shuttle missions.**
2. **After that**, RS-25E (Expendable) takes over, dropping the reuse-specific features in favour of additive manufacturing and simplified processes, targeting roughly 30% lower unit cost. The actual quoted price is still on the order of **100 million dollars per engine.**

For comparison, a BE-4 or a Raptor costs roughly 1–2% of that.

**Underneath is a fundamental disagreement about what “cheap” means.**

RS-25 is expensive not because of materials but because of **very low production volume plus very high process complexity.** Each unit is close to hand-built with an enormous inspection burden. The only way to make it cheap is to build more of them — and SLS flies at most once a year and needs four.

$$\\text{unit cost} \\propto \\frac{1}{\\text{annual volume}^{\\alpha}}$$

**Learning curves need volume to operate.** The low cost of Merlin, Raptor and BE-4 comes first from building hundreds a year and only second from design. SLS's architecture rules that route out entirely.`,
    },
    {
      question: "Where did the 8.4 m diameter come from?",
      answer: `Not from aerodynamics and not from performance — **from the welding tooling at Michoud in the 1970s and the width of a barge.**

The chain runs:

1. In the 1970s the Shuttle External Tank was set at 8.4 m because that size could be built at the Michoud Assembly Facility near New Orleans and barged along the Mississippi and the Gulf to the Cape.
2. The 2010 authorisation act required SLS to reuse the existing industrial base, of which Michoud and its tooling were the largest single asset.
3. SLS therefore adopted 8.4 m.

**The choice is not itself bad** — 8.4 m is reasonable for a 95 t class vehicle. But it brings two consequences:

- **The upper stage can only be 5 m class.** Above the 8.4 m core there must be a conical adapter (LVSA) down to the 5 m ICPS, which is several tonnes of dead mass and constrains the fairing envelope. Block 1B's EUS will be 8.4 m constant-diameter, but that requires rebuilding the mobile launcher.
- **The payload envelope is limited.** Block 1 offers 5 m × 19.1 m. For comparison, Starship plans 9 m × 17 m and Long March 5 offers 5.2 m × 12.3 m. **For telescopes and station modules, where volume rather than mass is the binding constraint, envelope often matters more than capability.**

There is a general rule worth recording: **launch vehicle diameter is almost never set by aerodynamics; it is set by how you build it and how you move it.** Falcon 9's 3.66 m is the US highway bridge limit, N1's 17 m forced on-site welding at the launch site, and Starship's 9 m forced SpaceX to build the factory at the pad. **Manufacturing and transport are the most underrated constraints in rocket design.**`,
    },
  ],

  contemporaries: `**The Space Shuttle** (1981–2011) is its direct parent: same diameter, same engines, same boosters, same factory, same cost disease. The difference is that the payload returned to the top of the stack, so an escape tower fits again — **SLS corrected the Shuttle's most lethal configuration error while inheriting its economics.**

**Saturn V** (1967) still leads on trans-lunar performance (48.6 t against 27 t) and took only six years to develop. The gap is not technology but the national will and budget of the time.

**Starship** (in development) takes the opposite route: rather than optimising a single mission, it optimises flight rate and per-flight cost, splitting “one launch” into “many launches” via orbital refuelling. **If cryogenic transfer on orbit works, the case for expendable heavy-lift narrows sharply; if it does not, SLS remains the only vehicle that can send people around the Moon in a single launch.**

**Long March 5** (2016) is closely analogous in configuration (hydrolox core, strap-on boosters, hydrolox upper stage) at half the scale, confirming that the architecture is sound. China's crewed lunar plan uses a different rocket (Long March 10) but the same propellant logic.`,

  milestones: [
    { title: "NASA Authorization Act of 2010 signed", note: "Legislating a heavy-lift vehicle that reuses the Shuttle and Constellation industrial base." },
    { title: "Core stage Green Run hot fire", note: "All four RS-25s fired for the full 499 s duration at Stennis." },
    { title: "Artemis I flies successfully", note: "Orion spent 25 days on an uncrewed lunar mission and re-entered at 11 km/s." },
    { title: "Artemis II (planned)", note: "A four-person lunar flyby, SLS's first crewed flight." },
  ],

  launchesNotable: [
    { name: "Artemis I", note: "A complete lunar mission on the maiden flight, with all systems performing better than predicted." },
  ],

  variants: [
    { name: "Block 1", note: "ICPS upper stage, 27 t to TLI, used for Artemis I–III." },
    { name: "Block 1B", note: "Four-engine Exploration Upper Stage, 42 t to TLI; requires a new mobile launcher." },
    { name: "Block 2", note: "Planned advanced boosters, 46 t to TLI; not yet started." },
    { name: "Cargo configuration", note: "A fairing in place of Orion, 8.4 m × 19.1 m envelope, for large telescopes or planetary spacecraft." },
  ],

  stages: [
    {
      nameZh: "Core stage + two five-segment boosters",
      propellantZh: "Liquid hydrogen / liquid oxygen · PBAN composite solid",
      note: "The boosters separate at T+126 s; the four RS-25s burn to about T+480 s, almost exactly the Shuttle timeline.",
      engines: [
        { cycleZh: "Solid", note: "The most powerful solid rocket motor ever built, derived from the Shuttle's four-segment booster." },
        { cycleZh: "Fuel-rich staged combustion", note: "Inventory engines left from the Shuttle, used expendably." },
      ],
    },
    {
      nameZh: "Interim Cryogenic Propulsion Stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Derived from Delta IV's DCSS, responsible for trans-lunar injection; Block 1B replaces it with the four-engine EUS.",
      engines: [{ cycleZh: "Expander", note: "Deployable carbon composite nozzle extension, expansion ratio 285." }],
    },
  ],

  parts: {
    "core-engines": {
      name: "RS-25 engines (×4)",
      description:
        "Four engines taken off the Shuttle — **some have flown more than a dozen times, and now four are discarded per flight.** The sixteen in inventory cover Artemis I–IV; after that come newly built RS-25Es (a simplified expendable version, targeting roughly half the price and still on the order of 100 million dollars each). It is the programme's most emblematic detail: **an engine built to be reused, ultimately used once.**",
    },
    "srb-nozzle": {
      name: "Five-segment booster nozzles (×2)",
      description: "The nozzles gimbal ±8°, sharing ascent attitude control with the four core engines.",
    },
    "srb-body": {
      name: "Five-segment solid boosters (×2)",
      description:
        "The Shuttle's four-segment booster with one segment added, raising thrust about 25% to 16,000 kN each — **the most powerful solid rocket motor ever built.** They supply 75% of liftoff thrust and are jettisoned at 126 s. Unlike the Shuttle, they are **not recovered**: the parachutes and recovery ships were judged not worth their cost, and the boosters simply fall into the sea.",
    },
    "srb-nose": {
      name: "Booster nose cones",
      description: "The Shuttle-era recovery parachute system is deleted; the nose contains only separation ordnance and ballast.",
    },
    "core-lh2": {
      name: "Core stage liquid hydrogen tank",
      description:
        "8.4 m across — inherited directly from the Shuttle External Tank diameter and the Michoud tooling. The orange is not paint but exposed spray-on foam insulation, the same material as the tank. **The entire size of SLS was determined by a factory built thirty years earlier.**",
    },
    "core-intertank": {
      name: "Intertank",
      description: "The boosters' forward attachments are here, so 32,000 kN of solid thrust passes into the core through this section. It is painted white to distinguish it from the foam-covered sections.",
    },
    "core-lox": {
      name: "Core stage liquid oxygen tank",
      description:
        "The biggest difference from the Shuttle External Tank lives here: the tank was purely a tank, whereas **the SLS core is a complete stage** — with its own four engines, avionics, power and thrust structure, and a length grown to 64.6 m. That conversion is one of the main reasons the programme overran: turning a tank into a powered stage is far more than bolting engines on.",
    },
    lvsa: {
      name: "Launch Vehicle Stage Adapter",
      description: "The cone that steps down from the 8.4 m core to the 5 m upper stage, splitting longitudinally at separation.",
    },
    icps: {
      name: "Interim Cryogenic Propulsion Stage",
      description:
        "Derived from Delta IV's DCSS with a single RL10B-2, performing trans-lunar injection. The word “interim” is honest: with only 27 t of propellant it is the weakest link in the vehicle. Block 1B replaces it with the four-RL10 **Exploration Upper Stage**, taking TLI capability from 27 t to 42 t — **but that requires a new mobile launcher, another several billion dollars.**",
    },
    osa: {
      name: "Orion stage adapter",
      description: "The adapter can carry secondary payloads such as cubesats; Artemis I carried ten.",
    },
    orion: {
      name: "Orion spacecraft",
      description:
        "A four-person deep-space craft including the ESA-supplied service module. The capsule is 5.02 m across, 1.3 times the Apollo command module, and re-enters at close to 11 km/s — **the first crewed vehicle since Apollo to return to Earth at escape velocity.**",
    },
    las: {
      name: "Launch Abort System",
      description:
        "A solid escape tower producing 1,760 kN, able to pull the spacecraft 1.6 km clear within 2 s. **Its existence is the most direct repudiation of the Shuttle**: put the payload back on top and there is somewhere to mount an escape tower again.",
    },
  },

  modelNote:
    "Reconstructed in the Block 1 crewed configuration: 98.1 m tall, 8.4 m core, two 54 m five-segment boosters, ICPS and Orion.",

  sources: [
    { title: "SLS Reference Guide", publisher: "NASA", note: "Primary source for dimensions, thrust, performance and block configurations." },
    { title: "NASA's Management of the Space Launch System Program", publisher: "NASA Office of Inspector General", note: "The official audit basis for per-launch cost (about 4.1 billion dollars including Orion and ground systems)." },
    { title: "NASA Authorization Act of 2010", publisher: "U.S. Congress", note: "Section 302 explicitly requires reuse of Shuttle and Constellation contracts and industrial base." },
  ],

  tags: ["Heavy lift", "Crewed", "Lunar", "Hydrolox core", "Solid boosters"],
};
