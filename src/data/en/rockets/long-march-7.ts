import type { RocketOverlay } from "@/i18n/localize";

export const longMarch7En: RocketOverlay = {
  displayName: "Long March 7",
  country: "China",
  agency: ["China Aerospace Science and Technology Corporation", "China Academy of Launch Vehicle Technology"],
  description:
    "The freight service for China's space station: a medium launcher designed to be non-toxic, frequent and exactly big enough — its capability is precisely one Tianzhou cargo ship.",

  history: `Long March 7 is the middle sibling of China's new generation: Long March 5 handles heavy lift (25 t to LEO), Long March 6 handles small (1 t to SSO), and Long March 7 handles medium (13.5 t to LEO).

Its design task was unambiguous: **launch the Tianzhou cargo spacecraft.**

Operating the Chinese space station (Tiangong) requires regular resupply. A fully loaded Tianzhou masses about 13.5 t, and that number defines Long March 7's capability directly. Put another way, **Long March 7 is not a rocket designed for a general market; it is a tool built for a specific job.**

It also replaces the older Long March 2/3/4 families. In the 2000s Chinese spaceflight made a strategic judgement: the hypergolic propellants of the old generation had reached their ceiling in environmental terms, drop zone evacuation and achievable flight rate, and a complete generational change was required. The technical foundation is two engines — **YF-100 (kerolox, oxidiser-rich staged combustion) and YF-77 (hydrolox).**

- Long March 6 = one YF-100
- Long March 7 = six YF-100
- Long March 5 = eight YF-100 (boosters) plus two YF-77 (core)
- Long March 8 = three YF-100

**Long March 7 first flew successfully from Wenchang on 25 June 2016**, among the site's inaugural missions.

Since then almost all its flights have carried Tianzhou; every Chinese cargo spacecraft to date has launched on it. The derivative **Long March 7A** adds a hydrolox third stage for GTO missions at 7 t, taking over part of Long March 3B's role.

**After Long March 5's launch failure in July 2017, Long March 7 was for a time the only usable vehicle in the new generation**, absorbing several missions originally assigned to Long March 5.`,

  designPhilosophy: `Long March 7 shares one premise with its two siblings: **build the entire new-generation family around two engines.**

That is an explicit modular strategy, but it differs from Angara's — **Angara shares “modules” (whole airframe sections), the Long March family shares “engines.”**

| | Angara | New-generation Long March |
|---|---|---|
| Unit of commonality | URM whole-vehicle module | YF-100 / YF-77 engines |
| Airframe diameter | All 2.9 m | 2.25 / 3.35 / 5 m |
| Configuration freedom | Low (only module count varies) | High (diameter and stage count set per mission) |
| What volume amortises | The module | The engine |

**Sharing engines rather than airframes is the more flexible choice.** The engine is the longest-lead, highest-cost and most reliability-critical part of a rocket; airframes (tanks and structure) are comparatively easy to tailor. This captures the scale effect (YF-100's annual production is the sum across all types) while preserving the freedom to optimise diameter and staging for each vehicle.

**Long March 7's own specific choices:**

**1. Keep the 3.35 m diameter.**
Not a technical limit (Wenchang can receive wider airframes by sea) but so that it can also launch from **Jiuquan**, which can only be reached by rail. Some space station and crewed missions run from Jiuquan, and Long March 7 needs to be compatible with both sites.

**2. Four small engines on the second stage instead of one large one.**
Four YF-115s each gimbal, so together they synthesise pitch, yaw and roll torque directly. The traditional approach (Long March 3B) is one fixed main engine plus four vernier engines that exist only for attitude control, produce poor impulse and are pure overhead. **Four gimballing main engines merge “thrust” and “control” into the same hardware** — the most tangible control system improvement in the new generation.

**3. Only two stages.**
LEO missions do not need a third. Fewer stages mean fewer separation events and higher reliability. When GTO is required, Long March 7A adds a hydrolox third stage.

**Its cost is limited generality.** 13.5 t to LEO is exactly right for Tianzhou and slightly awkward for the commercial market — much smaller than Falcon 9 yet more expensive than a small launcher. **Long March 7's economics rest on a steady base of national missions.**`,

  tradeoffs: [
    {
      question: "Why did China replace hypergolic propellants wholesale in the 2000s?",
      answer: `Because the old generation hit three ceilings simultaneously, and none of them could be lifted by improvement.

**Ceiling one: drop zones.**
The first stages and boosters of Long March 2/3/4 fall on inland mountains, requiring tens of thousands of people to be evacuated before each launch, and the residues contain UDMH (a potent carcinogen) and nitrogen tetroxide. **That cost grows linearly with flight rate** — going from a dozen launches a year to fifty or more would make evacuation alone unbearable.

**Ceiling two: performance.**
Hypergolic impulse has a physical limit: UDMH with nitrogen tetroxide gives about 290–320 s in vacuum, kerolox reaches 335 s and hydrolox 460 s. Raising capability meant growing the vehicle, and growth was blocked by diameter.

**Ceiling three: diameter.**
3.35 m is the railway loading gauge, and every old-generation rocket was locked to it.

**The new generation removes all three together:**

- Change propellants (kerolox, hydrolox) → combustion products are only carbon dioxide and water, and impulse rises;
- Change engines (YF-100, oxidiser-rich staged combustion at 180 bar) → a large performance step;
- Build a coastal launch site (Wenchang) → sea transport releases the diameter limit and the drop zone becomes the South China Sea.

**All three had to be done together; none works alone.** Changing propellants without changing sites solves contamination but not evacuation; building the site without new engines does not raise capability.

**This was a genuine generational change rather than a model upgrade.** The cost was a long development (YF-100 took sixteen years from 2000 approval to 2016 first flight) and a long overlap period (Long March 3B is still flying).

The comparable case is Russia's Angara: the same objective (replace a toxic Proton), the same timescale, the same new-engine route. **The difference is that China's domestic demand was large enough to run two generations at once, while Russia's was not large enough to amortise Angara at all.**`,
    },
    {
      question: "What makes four small second stage engines better than one big one?",
      answer: `They solve thrust and attitude control with the same hardware.

**The traditional approach (Long March 3B):** one large fixed main engine plus four small **vernier engines** that gimbal for attitude control.

The problems with verniers:

- Their propellant goes entirely to attitude control and contributes almost nothing to acceleration;
- Their impulse is poor (small nozzles, small expansion ratios);
- They are extra hardware — four chambers, four feed systems, four gimbal mechanisms.

**That approach was inevitable in the 1960s**: gimbal mechanisms for a large engine (moving a multi-tonne engine quickly and precisely while keeping high-pressure propellant lines flexible) could not be built, so the main engine stayed fixed. The R-7 and all of its descendants share this architecture.

**The new approach (Long March 7):** four YF-115s each gimbal and all produce useful thrust.

How four engines synthesise three-axis torque:

- **Pitch and yaw**: all four deflect together, producing a lateral force and a moment about the centre of mass;
- **Roll**: the engines deflect differentially in the tangential direction (adjacent pairs in opposite senses), producing a couple about the axis.

**That is why it must be four rather than three or two.** Two engines cannot produce roll torque (their deflection planes are collinear); three can but with awkward control coupling; four is the simplest orthogonal arrangement.

The gains are concrete:

- All the vernier hardware and propellant disappear;
- Every kilogram of propellant produces useful thrust, so impulse improves;
- Redundancy improves — with one engine out, the remaining three still have trim authority in the thrust vector.

**This also explains why many modern upper stages use several small engines** (Ariane 6's Vinci is a single engine but with a separate attitude control system; Falcon 9's second stage has one MVac plus cold gas thrusters). **There is no unique answer; it depends on whether gimbal mechanisms or a separate attitude control system is cheaper.**`,
    },
  ],

  contemporaries: `**Falcon 9** (2010) sits in the same performance band (13.5 t against 17.5 t recoverable) but in an entirely different league on price and cadence. Long March 7 never aimed at commercial competition.

**Soyuz-2.1a** (Russia) is the closest analogue: kerolox, responsible for national space station resupply (Progress), and sustained by government missions rather than commercial demand.

**H3** (Japan, 2023) is close in capability, but H3 explicitly targets commercial competition and Long March 7 does not.

**Long March 5B** (2020) is its partner inside the Chinese programme: 5B carries station modules (22 t class), Long March 7 carries cargo ships (13.5 t class), and Long March 2F carries crew (8 t class). **The Chinese space station was built by three rockets dividing the work, each operating at its own most economical point** — the exact opposite of the Shuttle's “one vehicle does everything.”`,

  milestones: [
    { title: "Successful maiden flight", note: "One of the early missions from Wenchang, validating the combination of a non-toxic new-generation rocket with a coastal launch site." },
    { title: "Tianzhou 1 launched", note: "China's first cargo spacecraft, demonstrating on-orbit propellant transfer." },
    { title: "Tianzhou 2 launched", note: "The first resupply flight of the Chinese space station construction phase." },
    { title: "Long March 7A flies a GTO mission", note: "The variant with a hydrolox third stage begins taking on GTO launches." },
  ],

  launchesNotable: [
    { name: "Maiden flight", note: "Carried a scaled re-entry capsule for a multipurpose crew vehicle." },
    { name: "Tianzhou 1", note: "Demonstrated cargo spacecraft operations and on-orbit propellant transfer." },
    { name: "Tianzhou 2", note: "The first resupply of the Chinese space station." },
  ],

  variants: [
    { name: "Long March 7", note: "Two-stage configuration, 13.5 t to LEO, dedicated to Tianzhou cargo spacecraft." },
    { name: "Long March 7A", note: "With a hydrolox third stage, 7 t to GTO, taking over some Long March 3B missions." },
    { name: "Long March 8", note: "A medium vehicle derived from Long March 7, 5 t to SSO, aimed at the commercial market and at demonstrating recovery." },
  ],

  stages: [
    {
      nameZh: "First stage + four boosters",
      propellantZh: "Kerosene / liquid oxygen",
      note: "Six YF-100s ignite together; boosters separate at T+175 s and the first stage burns to about T+180 s.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "China's first oxidiser-rich staged combustion kerosene engine at 180 bar, the common powerplant of the new-generation Long March family." }],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Kerosene / liquid oxygen",
      note: "Four YF-115s gimbal to provide three-axis control with no separate vernier engines.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "A small oxidiser-rich staged combustion engine; four together generate three-axis control torque directly." }],
    },
  ],

  parts: {
    "s1-engines": {
      name: "YF-100 engines (×2)",
      description:
        "Two YF-100s, **China's first oxidiser-rich staged combustion kerosene engine**, at 180 bar and 1,200 kN at sea level. Its technical lineage traces back to RD-120 hardware and documentation obtained from Ukraine in the 1990s, though the engine itself is indigenous. **This engine is the common denominator of the new-generation Long March family**: Long March 5's boosters, Long March 6, Long March 7 and Long March 8 all use it.",
    },
    "s1-body": {
      name: "First stage",
      description:
        "A 3.35 m kerolox first stage. The diameter matches the old generation but nothing inside does: cryogenic tanks, a new pressurisation system, a new engine. **Keeping 3.35 m allows it to still travel by rail** — Long March 7 can launch from both Jiuquan and Wenchang, and only the former requires overland shipment.",
    },
    "booster-engines": {
      name: "Booster YF-100 engines (×4)",
      description: "One YF-100 per booster. Six YF-100s run at liftoff for 7,200 kN at sea level.",
    },
    "booster-body": {
      name: "Liquid strap-on boosters (×4)",
      description:
        "2.25 m across and 26.9 m long, burning kerosene and liquid oxygen. **Note that they are fully 11 m longer than Long March 3B's boosters** — kerosene is less dense than hypergolic propellants, so the same mass needs more volume, and with diameter fixed the only option is length.",
    },
    "booster-nose": {
      name: "Booster nose cones",
      description: "The boosters separate around T+175 s and fall into uninhabited waters of the South China Sea.",
    },
    "s2-engines": {
      name: "YF-115 engines (×4)",
      description:
        "Four YF-115s, also oxidiser-rich staged combustion, at 180 kN and 341.5 s in vacuum each. Using four small engines rather than one large one **allows three-axis attitude control by gimballing alone** — the four engines together produce pitch, yaw and roll torque directly, with no separate vernier engines required.",
    },
    "s2-body": {
      name: "Second stage",
      description: "A kerolox second stage. **Long March 7 is China's first medium launcher with non-toxic propellants on both first and second stages**, and the dedicated launch vehicle for the Tianzhou cargo spacecraft.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 4.2 m fairing. In the Tianzhou configuration the envelope is tailored to the spacecraft's shape.",
    },
  },

  modelNote:
    "Reconstructed from the published configuration: 53.1 m tall, 3.35 m core diameter, four 2.25 m liquid strap-on boosters.",

  sources: [
    { title: "Long March 7 — CALT", publisher: "China Academy of Launch Vehicle Technology", note: "Configuration, stage parameters and mission record." },
    { title: "YF-100 LOX/Kerosene Engine", publisher: "China Aerospace Science and Technology Corporation", note: "Thrust, impulse and chamber pressure; some values are from public reporting." },
    { title: "Long March 7 — Wikipedia", publisher: "Wikipedia", note: "Launch statistics vary with cut-off date." },
  ],

  tags: ["Medium lift", "Kerolox", "Station resupply", "Non-toxic propellant", "China"],
};
