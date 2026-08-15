import type { RocketOverlay } from "@/i18n/localize";

export const r7En: RocketOverlay = {
  displayName: "R-7 / Sputnik (8K71PS)",
  country: "Soviet Union",
  agency: ["OKB-1 (Korolev)"],
  description:
    "The world's first intercontinental ballistic missile, and the vehicle that put the first artificial satellite in orbit. Its basic configuration still flies on Soyuz today — the starting point of the longest-lived rocket family in history.",

  history: `The R-7 (NATO designation SS-6 Sapwood) had nothing to do with spaceflight at first: it was meant to deliver a 5.4 t thermonuclear warhead 8,000 km. That mass figure came from early hydrogen bomb designs, and it forced the vehicle to a 267 t liftoff mass — which made it a militarily clumsy weapon, taking hours to fuel, unable to move, and launchable only from fixed sites. The Soviet military never deployed more than about ten of them.

That military failure is exactly what created the space age. The R-7 completed its first full-range flight on 21 August 1957; less than two months later, on 4 October, a simplified variant designated 8K71PS placed the 83.6 kg Sputnik 1 in orbit. Sputnik 2 carried Laika a month after that, and in April 1961 an improved version (Vostok-K) took Gagarin into orbit.

The family has never stopped: Vostok, Voskhod, Molniya, Soyuz, Soyuz-U, Soyuz-FG, Soyuz-2 — more than 1,900 launches, the most-flown lineage humanity has produced.`,

  designPhilosophy: `The R-7's design was shaped by one specific gap in 1950s technology: **nobody could reliably ignite a rocket engine in flight.**

An ideal ICBM stages in series — burn the first stage, drop it, light the second at altitude. But igniting a liquid engine in vacuum, in free fall, at cryogenic temperatures was an unsolved problem (propellant floats, pumps cavitate). Korolev's answer was to avoid it entirely: **light all twenty combustion chambers on the ground**, and in flight only shut engines down and drop hardware — never ignite anything.

That is where the “packet” (пакет) configuration comes from: four boosters clustered around a longer core, all lit on the pad. At T+118 s the boosters burn out and fall away while the core keeps running, producing the famous “Korolev cross”. Strictly it is not a two-stage rocket but a **stage-and-a-half**: boosters and core are in parallel, not in series.

The second thread is **many small chambers instead of one large one**. Glushko kept running into high-frequency combustion instability as he scaled chambers up, so he simply stopped scaling: one turbopump drives four proven small chambers. The descendants of the RD-107/108 still work that way — seventy years on, the Soviet and Russian industry has never built a genuinely large single-chamber kerosene engine.

The third is **sacrificing elegance for reliability**: the simplest possible gas-generator cycle, conservative pressure-stabilised tanks, radio-assisted guidance from the ground. The result was a rocket that was militarily bloated and extraordinarily durable in space.`,

  tradeoffs: [
    {
      question: "What does the stage-and-a-half layout cost?",
      answer: `Lighting everything on the ground means **the core engines must work across both sea-level and high-altitude conditions**. The RD-108's nozzle expansion ratio can only be a compromise: under-expanded at sea level, over-expanded at altitude, optimal at neither. A true second stage could carry a large vacuum nozzle and gain 40–60 s of specific impulse.

The second cost is a **diluted liftoff thrust-to-weight ratio**. The core burns from the pad, so by the time the boosters separate it has already spent a large fraction of its propellant while carrying the whole upper structure — propellant doing very inefficient work.

The third is that **thrust cannot be modulated**. Twenty chambers all run at full power from liftoff, which fixes the maximum dynamic pressure and acceleration profile with no throttling margin.

What it bought was this: **no engine has to be ignited in flight.** In the 1950s that “does not have to” was equivalent to deleting an entire class of failure mode from the reliability diagram. Once in-flight ignition matured in the 1960s the justification evaporated — which is why no new vehicle has ever copied the configuration.`,
    },
    {
      question: "Why does one engine have four combustion chambers?",
      answer: `Thrust is roughly proportional to chamber cross-sectional area, so the obvious way to more thrust is a bigger chamber. But bigger chambers are prone to **high-frequency combustion instability**: pressure waves from combustion couple with the chamber's acoustic modes into a self-sustaining oscillation that can burn through an injector face in tens of milliseconds.

The Americans attacked that problem head-on with the F-1, spending four years, two thousand test firings and a long series of injector baffle designs. Glushko took the other road: **keep the chamber at a size already proven safe, and feed four of them from one turbopump.** The turbopump is the most expensive and difficult component, so sharing it spreads the cost; the chambers stay in known territory.

The costs are complicated plumbing, higher structural mass, and the requirement that all four chambers be closely matched in thrust or they generate parasitic moments. But in risk terms it converted an unsolved problem into a solved one.

That decision shaped the entire Soviet and Russian engine tradition: the RD-170 (four chambers, the most powerful liquid engine ever built), the RD-180 (two) and the RD-191 (one) are all continuations of the same line.`,
    },
    {
      question: "Why is a 1950s design still in service?",
      answer: `Compare today's Soyuz-2 with the 1957 R-7: identical configuration (four tapered boosters, core, upper stage), the same engines in improved form (RD-107A/108A), unchanged tank layout and diameter. What changed is the control system (analogue to digital), the upper stage (Blok-I now with RD-0110/0124) and manufacturing.

Three reasons it has lasted seventy years:

1. **The configuration is extensible.** The R-7 came with a natural “add a stage on top” interface. Vostok added one, Molniya two, Soyuz swapped in better ones — none of which required touching the proven lower half.
2. **Volume produces reliability.** More than 1,900 flights means every failure mode has appeared, been analysed and been designed out. No clean-sheet vehicle can accumulate that density of experience quickly.
3. **The requirement stayed still.** Crewed spacecraft have remained in the same 7 t class throughout, so no crewed mission ever outgrew the R-7.

But it has reached its end. The R-7 cannot be recovered, its unit price cannot fall much further, and 7 t is plainly insufficient in an era of constellation launches. Russia has spent thirty years trying to replace it with Angara and has not finished — which itself shows that **replacing a system that is merely good enough and extremely mature is never a purely technical problem.**`,
    },
  ],

  contemporaries: `The contemporary American counterpart was **Atlas**, which used an equally strange dodge around the same problem — “stage-and-a-half”, where three engines light on the ground and two of them are jettisoned with their skirt in flight while the tanks continue. Atlas's tanks were even more extreme: stainless steel balloon structures that collapse under their own weight without internal pressure.

Two countries facing the same technological gap arrived at two inelegant workarounds — which tells you how hard the constraint was. Only once in-flight ignition (and particularly cryogenic settling and restart) matured in the 1960s did genuinely series-staged vehicles such as Titan II, Saturn and Proton become the norm.`,

  tags: ["Historic milestone", "First satellite", "Stage-and-a-half", "Kerolox", "ICBM derivative"],

  milestones: [
    { title: "R-7 completes its first full-range flight", note: "The world's first intercontinental ballistic missile." },
    { title: "Sputnik 1 launched", note: "The first artificial satellite: 83.6 kg." },
    { title: "Sputnik 2 launched", note: "The first animal (Laika) in orbit." },
    { title: "Vostok-K launches Gagarin", note: "The first human in space." },
  ],

  variants: [
    { name: "R-7A (8K74)", note: "The version actually deployed as an ICBM, with range extended to 12,000 km." },
    { name: "Vostok (8K72K)", note: "With a Blok-E upper stage, used for the first crewed flight." },
    { name: "Molniya (8K78)", note: "A four-stage version for highly elliptical orbits and deep space." },
    { name: "Soyuz / Soyuz-U / Soyuz-2", note: "The crewed and general-purpose line that continues to this day." },
  ],

  stages: [
    {
      nameZh: "Boosters (Blocks B/V/G/D)",
      propellantZh: "T-1 kerosene / liquid oxygen",
      note: "Lit on the ground together with the core and jettisoned in pairs after 118 s — the separation that produces the famous “Korolev cross”.",
      engines: [
        { cycleZh: "Gas-generator cycle", note: "Four chambers on one turbopump, plus two vernier nozzles." },
      ],
    },
    {
      nameZh: "Core (Blok A)",
      propellantZh: "T-1 kerosene / liquid oxygen",
      note: "Burns from liftoff all the way to orbit — the heart of the stage-and-a-half configuration.",
      engines: [{ cycleZh: "Gas-generator cycle", note: "Four chambers plus four vernier nozzles." }],
    },
  ],

  launchesNotable: [
    { name: "Sputnik 1", note: "Humanity's first orbital launch." },
    { name: "Sputnik 3 (first attempt)", note: "Broke up at T+88 s from longitudinal oscillation — the only 8K71PS failure." },
    { name: "Sputnik 3", note: "The final flight of the 8K71PS configuration." },
  ],

  parts: {
    boosters: {
      name: "Strap-on boosters (×4, Blocks B/V/G/D)",
      description:
        "Four tapered boosters, wider at the top than the bottom because of how the “packet” configuration carries load: each booster attaches to the core at its **head** and pushes upward, so the upper end must be strong and the lower end can taper. The taper also improves the overall aerodynamic shape. All four light on the ground with the core.",
    },
    rd107: {
      name: "RD-107 engines (×4, four chambers each)",
      description:
        "One RD-107 per booster — but a single RD-107 has **four combustion chambers sharing one turbopump**, plus two small vernier nozzles for attitude control. This was Glushko's answer to the unsolved problem of large-chamber instability: don't build a big chamber, build four proven small ones in parallel. The vehicle therefore fires twenty main chambers and twelve verniers simultaneously.",
    },
    rd108: {
      name: "RD-108 engine (core)",
      description:
        "The core engine, of the same lineage as the RD-107 but with four verniers instead of two, because after booster separation it must hold three-axis attitude alone. It burns from the pad to about T+300 s — the characteristic stage-and-a-half duty cycle.",
    },
    "core-body": {
      name: "Core stage (Blok A)",
      description:
        "A 2.95 m kerolox core. The R-7's tanks are pressure-stabilised: the skin itself is the structure, held rigid by internal pressure. That keeps dry mass very low, but an unpressurised empty tank cannot carry axial load — ground handling must keep it pressurised at all times.",
    },
    nose: {
      name: "Nose cone / satellite bay",
      description:
        "The conical nose of the 8K71PS held the 83.6 kg Sputnik 1. To beat the Americans, the originally planned heavy science satellite (Object D, 1.3 t) was swapped at short notice for this simplified sphere carrying two radio transmitters and batteries — **the space age began with schedule beating capability.**",
    },
  },

  modelNote:
    "A schematic reconstruction of the 8K71PS (Sputnik launcher) from published dimensions: 29.167 m overall, 2.95 m core, 10.3 m maximum span. The booster taper and vernier nozzles are simplified.",

  sources: [
    { note: "Sputnik 1's mass, launch date and background." },
    { note: "First-hand account of the R-7's design decisions, the origin of the packet layout and the test campaign." },
    { note: "Thrust, specific impulse and variant parameters; sources differ by about ±5% on RD-107 thrust." },
  ],
};
