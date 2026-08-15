import type { RocketOverlay } from "@/i18n/localize";

export const hIIAEn: RocketOverlay = {
  displayName: "H-IIA",
  country: "Japan",
  agency: ["JAXA", "Mitsubishi Heavy Industries"],
  description:
    "Twenty-four years and fifty flights to reach 98% reliability; its value lies not in performance but in proving that small production runs can still deliver high reliability.",

  history: `H-IIA was the last step in Japan's move from licensed technology to independence.

In the 1970s Japan acquired Delta technology from the United States and built the N-I and N-II. The critical components were American, and **Japan was not permitted even to modify them** — the agreement barred transfer to third parties and restricted independent changes.

H-II (first flown 1994) was the first entirely Japanese rocket, above all because of the **LE-7 hydrolox first stage engine** — Japan took on fuel-rich staged combustion, which at the time only the US (RS-25) and the USSR (RD-0120) had mastered.

The price appeared immediately. A test stand explosion during LE-7 development killed personnel; H-II F5 failed in 1998 on an LE-5A fault; **and in November 1999 H-II F8 failed when the LE-7 liquid hydrogen pump impeller fractured in fatigue.** To find the cause, Japan recovered the engine wreckage from 3,000 m of ocean — a rare piece of deep-sea forensics in spaceflight history — and did identify the root cause (high-cycle fatigue of the impeller).

H-II flew only seven times before being abandoned. Its replacement, **H-IIA (2001)**, did something counterintuitive: **it deliberately lowered the performance targets.** LE-7A dropped chamber pressure from LE-7's 127 bar to 120 bar, reduced turbopump speed and used a simpler nozzle, cutting cost by about 20%.

The record shows the trade was right: **50 flights, 49 successes, with the only failure in November 2003 (F6, when a booster separation ordnance failed to fire).** From F7 to F50 it flew 44 consecutive successes.

Its missions included the asteroid sample return **Hayabusa2** (2014, which returned material from Ryugu), the lunar orbiter Kaguya, the Venus orbiter Akatsuki, the HTV “Kounotori” ISS cargo vehicle, and the UAE's Mars orbiter **Hope** (2020, Japan's first interplanetary launch for a foreign customer).

**H-IIA flew its 50th and final mission on 29 June 2025**, handing over to H3.`,

  designPhilosophy: `H-IIA's philosophy fits one question: **how do you build reliability in a country that launches very rarely?**

Japan's annual rate sat between two and six for decades, with two consequences:

1. **Volume cannot amortise cost.** H-IIA's unit price stayed in the 85–100 million dollar range, expensive for its performance class.
2. **Each failure is extremely costly.** At three flights a year, one failure means months of stand-down, a wrecked annual manifest and damaged customer confidence.

So every design choice tilts toward reliability:

**Choice one: performance yields to margin.**
LE-7A deliberately reduced chamber pressure and turbopump speed relative to LE-7. In a rocket engine, chamber pressure is the direct source of performance and also the amplifier of every failure mode — pump speed, bearing loads, cooling difficulty and material temperatures all rise with it. **The margin bought by a 6% pressure reduction far outweighs the impulse given up.**

**Choice two: pick a cycle that does not break.**
The second stage uses the expander bleed cycle, one of the most conservative in the world:

- No preburner and no gas generator, therefore no hot gas ducting;
- The turbine working fluid is hydrogen warmed by the nozzle, only a few hundred kelvin, so material stress is minimal;
- Starting needs no igniter and no complex sequence — the propellant's own phase change does it.

**LE-5B has never suffered a single in-flight failure**, an exceptionally rare record among liquid rocket engines.

**Choice three: keep the structure simple.**
H-IIA has two stages, no complicated booster separation sequence (the 202 configuration has only two solids), and reuses the same fairing and interstage separation hardware repeatedly. **The fewer the changes, the more meaningful the accumulated flight data.**

**Its cost was clear: it was never competitive on price.** Japan's share of the international commercial market stayed tiny and most of its missions were domestic government payloads. H-IIA's success was one of engineering reliability, not of business model — **and closing that second half is exactly what H3 was created to do.**`,

  tradeoffs: [
    {
      question: "What is the expander bleed cycle, and why does only Japan use it?",
      answer: `Start with the ordinary **expander cycle** (RL10, Vinci):

Liquid hydrogen flows through the cooling jacket of the chamber and nozzle, absorbing heat and gasifying, drives the turbine, and **then all of it enters the chamber and burns.** Its virtues are no preburner, no hot gas, minimal structure and easy starting.

Its fatal limitation is **heat transfer area**: turbine power comes from the heat absorbed by the hydrogen, which comes from the chamber wall area. Chamber area grows as diameter squared while thrust grows with volume — **so the larger the thrust, the less transfer area is available per unit of thrust.** Pure expander cycles therefore top out around 200–300 kN and are usable only on upper stages.

The **expander bleed cycle** changes one thing: the small hydrogen flow that drives the turbine is **dumped overboard afterwards rather than entering the chamber.**

That single change means:

- Turbine exit pressure no longer has to exceed chamber pressure, so **the available pressure ratio goes from a few to a few tens**, and the same flow produces far more power;
- Consequently much less heat transfer is needed and the thrust ceiling opens up;
- All the benefits of no preburner, no hot gas and simple starting are retained.

The cost is **impulse loss**: the vented hydrogen (2–3% of the fuel flow) produces no thrust. The mechanism is the same as a gas generator cycle, but the magnitude is smaller because only hydrogen is dumped rather than combusted fuel-rich gas.

**Why only Japan?** Partly historical path: since LE-5 (1986) Japan has accumulated continuous experience in heat transfer and turbine matching along this line. Partly requirement fit: Japan wanted reliability rather than peak performance, and expander bleed sits exactly there.

**The strongest proof is LE-9**: H3's first stage engine produces 1,471 kN, **the most powerful expander bleed engine in the world**, taking a cycle previously thought fit only for upper stages down to the first stage. It shows the ceiling on this line is much higher than anyone assumed.`,
    },
    {
      question: "If the first stage burns hydrogen, why does it still need solid boosters?",
      answer: `Because hydrolox engines are “efficient but not powerful” at liftoff, and liftoff is precisely where thrust is needed.

The numbers: H-IIA's LE-7A gives 843 kN at sea level while the vehicle weighs 285 t (2,795 kN). **The stage alone gives a thrust-to-weight of 0.3 — the rocket cannot leave the pad.** Two SRB-A3s add 5,040 kN, bringing the total ratio to 2.1.

Why is hydrolox thrust low? Two reasons:

1. **Hydrogen's density is tiny** (71 kg/m³ against kerosene's 810). For the same mass flow, hydrogen needs far larger pumps and lines, the turbopump power consumption is enormous, and scaling up is hard.
2. **Hydrolox has low density impulse.** Its mass-specific impulse is high (440 s against kerosene's 340), but per unit *volume* the energy is lower. Liftoff thrust demand is essentially a volumetric flow demand.

So every hydrolox-core rocket in the world carries boosters:

| Rocket | Core | Boosters |
|---|---|---|
| Shuttle / SLS | RS-25 | Solid |
| Ariane 5 / 6 | Vulcain | Solid (EAP / P120C) |
| H-IIA / H3 | LE-7A / LE-9 | Solid (SRB-A / SRB-3) |
| Long March 5 | YF-77 | Liquid kerosene (YF-100) |
| Energia | RD-0120 | Liquid kerosene (RD-170) |
| Delta IV Heavy | RS-68A | **None** (triple core) |

Choosing solid versus liquid boosters is another trade:

- **Solid**: simple structure, high thrust density, storable, no loading infrastructure. Cannot be shut down or throttled, lower impulse, and handling risk.
- **Liquid kerosene**: higher impulse, shutdown and throttling possible, better performance. But each booster is a complete rocket, far costlier and more complex.

**Europe, the US and Japan chose solid; China and Russia chose liquid** — largely because of their respective industrial bases: Europe, the US and Japan have mature large solid motor industries (from missiles and the Shuttle), while Russia and China have relatively thin solid heritage and superb liquid kerosene engines.

**Delta IV Heavy is the sole exception, solving the thrust problem with three hydrolox cores — and part of its cost failure traces to that choice.**`,
    },
    {
      question: "49 successes out of 50 — where did that reliability come from?",
      answer: `Not from a single technology, but from a deliberate discipline of suppressing change.

**1. Very few configuration changes.**
In twenty-four years H-IIA had only four configurations (202, 2022, 2024, 204), and the 202 dominated. The great majority of flights used identical hardware. **Every success added statistical confidence to the same configuration** rather than dispersing it across variants.

By contrast, if a rocket changes slightly every flight, then fifty flights are really “fifty different things flown once each,” and the statistical meaning of reliability is greatly diluted.

**2. How the one failure was handled.**
In November 2003 F6 failed: an SRB-A separation ordnance did not fire. Investigation found local nozzle erosion allowed hot gas to leak and burn through the separation signal harness.

JAXA's response was not a patch but a **redesign of the SRB-A nozzle** (becoming SRB-A3), with a 15-month stand-down for a comprehensive review. **The price was more than a year without launches; the return was 44 consecutive successes afterwards.**

**3. Deliberate performance margin.**
LE-7A's reduced chamber pressure is one example. Another is the second stage: LE-5B's 137 kN is slightly below the previous LE-5A, but its burn time is much longer and its restart capability stronger. **Japan chose “sufficient plus margin” over “optimal” at nearly every juncture.**

**4. The precision that small batches allow.**
This is easy to overlook: Japan builds only three or four rockets a year, so every step of every vehicle can be examined carefully. That is the inverse of mass-production quality logic — **high volume controls quality with process and statistics, low volume controls it with people and time.** Both reach high reliability, with completely different cost structures.

**Which is also why H-IIA is expensive.** Part of its reliability was bought by not pursuing efficiency. H3 attempts to break that trade: **keep the reliability and halve the price**, using a new engine with fewer parts and automotive-style production. Whether that works is the most important question in Japanese spaceflight for the next decade.`,
    },
  ],

  contemporaries: `**Ariane 5** (1996) shares its configuration closely (hydrolox core, solid boosters, hydrolox upper stage) with roughly twice the capability and far greater commercial share. Both were extremely reliable, but Ariane amortised cost through dual launch and H-IIA never found an equivalent model.

**Long March 3B** (1996) competed in the same performance class with comparable GTO capability at a much lower price. Japan's failure in the international commercial market was largely about price rather than technology.

**Falcon 9** (2010) redefined the price of this class, pushing H-IIA and Ariane 5 out of the commercial market together.

**H3** (2023) is its successor, targeting half the unit price: LE-9 replaces staged combustion with expander bleed and sharply fewer parts, SRB-3 simplifies separation hardware, and assembly borrows automotive line methods. **H3's maiden flight failed (second stage did not ignite) and its second succeeded — whether that rocket works will decide whether Japan stays on the list of countries with independent launch capability.**`,

  milestones: [
    { title: "H-II first flight", note: "Japan's first fully indigenous rocket, but two failures in seven flights." },
    { title: "H-II F8 failure", note: "LE-7 hydrogen pump impeller fatigue fracture; the wreckage was recovered from 3,000 m of ocean for analysis." },
    { title: "H-IIA first flight", note: "Validating the “trade performance for reliability” redesign embodied in LE-7A." },
    { title: "F6, the only failure", note: "A solid booster failed to separate; a 15-month stand-down and an SRB-A redesign followed." },
    { title: "First HTV Kounotori launch", note: "Japan's first ISS resupply mission." },
    { title: "Hayabusa2 launched", note: "An asteroid sample return mission that delivered material from Ryugu in 2020." },
    { title: "UAE's Hope Mars orbiter launched", note: "Japan's first interplanetary launch for a foreign customer." },
    { title: "50th and final flight", note: "Handing over to H3." },
  ],

  launchesNotable: [
    { name: "H-IIA F6", note: "The only failure; a solid booster did not separate." },
    { name: "Kaguya (SELENE)", note: "Japan's largest lunar exploration mission." },
    { name: "Hayabusa2", note: "Asteroid sample return." },
    { name: "Hope (Al Amal)", note: "The UAE's Mars orbiter." },
  ],

  variants: [
    { name: "H-IIA 202", note: "Two SRB-A3 boosters, the most-flown configuration, 4.1 t to GTO." },
    { name: "H-IIA 204", note: "Four SRB-A3 boosters, 6.0 t to GTO, for large GEO satellites and HTV." },
    { name: "H-IIB", note: "An enlarged variant with two LE-7As and four SRB-As, dedicated to the HTV cargo vehicle; 9 flights, 9 successes, 2009–2020." },
  ],

  stages: [
    {
      nameZh: "First stage + two solid boosters",
      propellantZh: "Liquid hydrogen / liquid oxygen · HTPB composite solid",
      note: "The two solids burn for 100 s and supply 82% of liftoff thrust; the first stage LE-7A burns to about T+390 s.",
      engines: [
        { cycleZh: "Fuel-rich staged combustion", note: "120 bar chamber pressure; simplified from the trouble-prone LE-7, trading performance for reliability." },
        { cycleZh: "Solid", note: "Filament-wound carbon case with 66 t of propellant." },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Restartable with long coast capability, able to perform direct GEO injection and interplanetary transfers.",
      engines: [{ cycleZh: "Expander bleed", note: "The expander bleed cycle, a uniquely Japanese line, with no in-flight failures to date." }],
    },
  ],

  parts: {
    le7a: {
      name: "LE-7A engine",
      description:
        "Japan's indigenous hydrolox first stage engine, using **fuel-rich staged combustion** — the same class as RS-25 — at 120 bar. It is a simplified LE-7: LE-7 caused two launch failures and a test stand explosion in the 1990s, and after the F8 failure of November 1999 Japan recovered the engine wreckage from 3,000 m of ocean for analysis, a rare piece of deep-sea forensics. **LE-7A's design direction was to lower performance slightly and raise reliability a great deal.**",
    },
    "s1-body": {
      name: "First stage",
      description:
        "A 4 m hydrolox first stage; the orange is sprayed insulation. **Japan is the only country that went the “hydrolox first stage” route from the beginning** — not because it is optimal, but because when Japan imported technology from the US in the 1970s it took the Delta path and built indigenous all-hydrogen propulsion on top of it.",
    },
    "srb-a3": {
      name: "SRB-A3 solid boosters (×2)",
      description:
        "**The case is a filament-wound carbon composite**, the most important improvement over the previous generation: much lighter than steel with a better propellant mass fraction. They supply 82% of liftoff thrust — a hydrolox first stage has low thrust and a poor thrust-to-weight ratio, so the boosters must carry the ascent. The 202 configuration has two and the 204 has four.",
    },
    "srb-nose": {
      name: "Booster nose cones",
      description: "The boosters separate 100 s after liftoff. Early H-IIA configurations could also carry two smaller SSB strap-on solid boosters.",
    },
    interstage: {
      name: "Interstage",
      description: "The interstage housing the second stage's LE-5B nozzle.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "One LE-5B, using the **expander bleed cycle** — Japan's most distinctive contribution to rocket engine technology. An ordinary expander cycle sends all the heated hydrogen into the chamber and is therefore limited by heat transfer area, capping thrust; expander bleed dumps the turbine drive flow **overboard instead of into the chamber**. That decouples the turbine from the chamber conditions and opens the thrust ceiling while keeping all the benefits of “no preburner, simple start, extremely reliable.” **LE-5B has never had an in-flight failure.**",
    },
    fairing: {
      name: "Payload fairing",
      description: "Available in 4 m and 5 m diameters and several lengths; the 5S fairing is used for large GEO satellites and probes.",
    },
  },

  modelNote:
    "Reconstructed in the H-IIA 202 configuration: 53 m tall, 4 m first stage, two SRB-A3 solid boosters.",

  sources: [
    { title: "H-IIA Launch Vehicle User's Manual", publisher: "Mitsubishi Heavy Industries", note: "Dimensions, masses, per-configuration performance and fairing envelopes." },
    { title: "H-IIA — JAXA", publisher: "JAXA", note: "Engine parameters, launch record and the F6 failure investigation conclusions." },
    { title: "LE-5B and the Expander Bleed Cycle", publisher: "IHI Aerospace", note: "The principles and design trade-offs of the expander bleed cycle." },
  ],

  tags: ["Medium lift", "All-hydrolox", "Solid boosters", "High reliability", "Retired"],
};
