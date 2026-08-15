import type { RocketOverlay } from "@/i18n/localize";

export const protonMEn: RocketOverlay = {
  displayName: "Proton-M",
  country: "Russia",
  agency: ["Khrunichev State Research and Production Space Center"],
  description:
    "The longest-serving Soviet and Russian heavy launcher: it carried nearly every Soviet planetary probe and space station module for sixty years, and spilled hundreds of tonnes of toxic propellant on the Kazakh steppe doing it.",

  history: `Proton's design number is **UR-500** — “UR” for Chelomei's universal rocket series, “500” for the 500-tonne class. Its original purpose was to deliver a **100-megatonne thermonuclear warhead**, the delivery system for the Khrushchev-era Tsar Bomba concept.

The ICBM role was dropped quickly (too large, too expensive, too slow to fuel) and it became the Soviet heavy launcher, first flying on 16 July 1965. The name came from its first payload, the Proton 1 science satellite.

It went on to carry essentially every large Soviet space object:

- All **Salyut** station modules;
- All **Mir** modules;
- The Zarya functional cargo block and Zvezda service module of the **ISS**;
- The great majority of Venus, Mars and Moon probes;
- Every Soviet and Russian geostationary communications satellite.

After 1991 Proton became one of Russia's most important sources of **hard currency**. International Launch Services took it to the commercial market and in the 2000s it briefly held about a third of global commercial GEO launch — **at roughly half of Ariane 5's price.**

Then came the long slide. In the first half of the 2010s Proton failed repeatedly: Briz-M in 2011, twice in 2012, the spectacular tumbling crash of July 2013 (sensors installed backwards), then 2014, 2015 and 2016. **Nine failures in seven years** drove commercial customers away and insurance rates through the roof.

Falcon 9 entered the same market at a lower price, and post-2014 geopolitics cut off Western customers entirely.

**Proton flew its final mission in March 2025**, replaced by Angara A5. It ended with more than 400 flights, the most-launched heavy rocket in history.`,

  designPhilosophy: `Proton's design was shaped completely by two constraints: **the railway** and **storable propellants.**

**Constraint one: everything had to fit on a train.**

Baikonur is deep in the Kazakh steppe, with no navigable water and no road capable of oversized components. Every part had to travel by rail from the Khrunichev plant near Moscow, and the Soviet loading gauge limited diameter to roughly **4.1 m.**

That constraint produced Proton's unmistakable shape: a 4.1 m central oxidiser tank with six 1.6 m fuel tanks hung around it. **It looks like a strap-on rocket but is actually a single stage disassembled for shipping and reassembled on site.** The six “boosters” do not separate, because they are fuel tanks.

It also explains why the fuel is outside and the oxidiser inside: nitrogen tetroxide has a density of 1.44 t/m³ against UDMH's 0.79, so for a given mass the fuel occupies nearly twice the volume. **Putting the bulky component outside is what keeps the central tank inside the rail gauge.**

**Constraint two: the propellant had to be storable.**

Proton used hypergolics (UDMH/N₂O₄) from the start. As a rocket derived from an ICBM this was inevitable: once loaded it can stand on the pad for months, needs no cryogenic infrastructure, and ignites simply by bringing the two liquids together.

As a launch vehicle this gave it a distinctive capability: **the upper stage can coast for hours or days and relight**, with no boil-off concerns. That is why Proton could inject satellites directly into GEO, and it was its main commercial selling point.

The price came in three parts:

1. **Low impulse.** 288 s at sea level, below contemporary kerosene engines and far below hydrolox. Delivering 23 t to LEO took a 705 t vehicle.
2. **Extreme toxicity.** UDMH is a potent carcinogen and nitrogen tetroxide forms nitric acid with water. **Every launch scattered tens of tonnes of residual propellant across the Kazakh steppe**, and the resulting environmental damage and compensation were a persistent diplomatic issue; Kazakhstan suspended Proton launches several times.
3. **Never crew-rated.** The USSR planned to launch a crewed circumlunar spacecraft on Proton (the Zond programme) but never flew people on it — **the toxicity and its poor early reliability meant crew certification never came.**

**Proton was optimised for “can be shipped, can be stored.” Performance and environmental cost were the things it gave up.**`,

  tradeoffs: [
    {
      question: "Why use UDMH despite knowing it is toxic?",
      answer: `Because in the era and setting where Proton was born, hypergolics solved more urgent problems than they created.

**The core advantage of hypergolic propellants is that they need no ignition system**: UDMH and nitrogen tetroxide ignite on contact within milliseconds. That simplifies a chain of things:

- **Engines can restart any number of times** without carrying igniter fluid (contrast Falcon 9's TEA-TEB, which is finite — the maiden Falcon Heavy core was lost at sea precisely because it ran out);
- **Ambient storage**: no insulation, no boil-off, no need to load just before launch (a missile must be able to stand ready);
- **Simple feed systems**: pressure-fed designs work fine, no turbopump required (this is still true of most upper stages and spacecraft propulsion).

Those advantages remain unbeatable in **upper stages and spacecraft**: ISS propulsion, station-keeping on virtually every GEO satellite, and the orbital manoeuvring and deorbit burns of crewed spacecraft all use hypergolics. **They need tens of kilograms to a few tonnes, and the toxicity is manageable.**

The problem is using it in a **first stage**, where you load 419 t and the drop-zone contamination is measured in tonnes.

Different countries diverged:

- **United States**: Titan II/III/IV used hypergolic first stages, all phased out after the 1990s in favour of kerosene and hydrogen;
- **China**: Long March 2/3/4 still fly hypergolic first stages, but the new generation (5/6/7) is entirely kerosene and hydrogen, with **“non-toxic and non-polluting” written into the programme objectives**;
- **Russia**: Proton flew until 2025, and its successor Angara switched to kerosene.

**This is a classic case of “technically adequate but socially unaffordable.”** What forced the change was not inadequate performance but the people living under the drop zones, environmental regulation and international agreements.`,
    },
    {
      question: "Why did Proton suddenly become unreliable in the 2010s?",
      answer: `Because its reliability had never rested on redundant design but on **process discipline** — and that discipline eroded over the two decades after the Soviet collapse.

Take the most famous failure: **2 July 2013.** A Proton-M began tumbling immediately after liftoff and crashed 17 seconds later, burning 600 t of toxic propellant at Baikonur.

The finding: three angular rate sensors had been installed rotated 180°. The sensors had anti-mistake features (they should not fit backwards); an assembly worker had **hammered them into place** and signed the assembly record.

That is not a design flaw; it is a quality system failure. Similar causes recur:

- 2011 Briz-M failure: foreign object blocking a propellant line;
- 2014 first stage failure: inadequate turbopump bearing lubrication;
- 2015 third stage failure: turbopump shaft imbalance, traced to out-of-spec material composition;
- 2016 second stage: unapproved substitution of engine mounting bolt material.

**Almost all manufacturing and quality management, not design.**

The background is industrial hollowing-out: Khrunichev cut staff heavily in the 1990s, skilled workers left, many small suppliers closed or were replaced, and inspection regimes were weakened under cost pressure. After 2014 Roscosmos recalled entire batches of delivered engines for reinspection — **and found a significant proportion carrying the same material problem.**

**This points at something easy to overlook: a large part of a rocket's reliability is not in the drawings. It is in the workers' hands, in the suppliers' certificates, in whether the inspection records are true.** A product whose design has been mature for forty years can become unreliable with the design entirely unchanged, simply because the organisation decayed.

Contrast Soyuz: same country, same period, far better reliability maintained — because its production rate was far higher (a dozen or more flights a year rather than a few), so the line never went cold and process memory survived. **Volume is itself a part of quality control.**`,
    },
    {
      question: "Six “boosters” that never separate — isn't that wasteful?",
      answer: `It is wasteful, but by less than it looks, and the return is real.

Standard design says: **stage away what you have finished with.** Carrying six empty fuel tanks after the propellant is gone is dead mass in principle. But note that they empty and separate **simultaneously with the central oxidiser tank** — the whole first stage is jettisoned as one unit at T+119 s. So the actual waste is only what you would gain by dropping some of them earlier as separable boosters.

Making them separable would require:

- Six sets of separation ordnance and mechanisms;
- Independent load-bearing structure for each tank (today they are thin-walled cylinders hung on the central tank);
- Separation sequencing and aerodynamic interaction analysis;
- Individual propellant management and pressurisation for each tank.

The structural mass added by all of that **roughly cancels** the mass saved by dropping empties early, at this scale.

Not separating also buys something concrete: **the six engines share one oxidiser supply.** The central tank feeds all six, so any variation in oxidiser consumption is absorbed by the system as a whole and no “booster” can run dry early. A strap-on configuration requires each booster to carry its own oxidiser and fuel and burn independently, and any asynchrony leaves unusable residuals.

**What really determined the configuration was transport.** If the railway could carry a 7 m tank, Proton would be an ordinary single-body rocket; because it could not, hanging the fuel outside was the way through. **It is not a simplified strap-on rocket; it is a single stage sliced apart by shipping constraints.**`,
    },
  ],

  contemporaries: `**Ariane 5** (1996) was its main rival for commercial GEO. Ariane amortised cost via dual-satellite launches; Proton competed on price and on direct GEO injection. They split the market through the 2000s and were both squeezed out by Falcon 9 after 2015.

**Titan III/IV** (US, 1965–2005) is the closest technical analogue: derived from an ICBM, hypergolic first stage, national security heavy lift. It retired earlier, also on cost and toxicity.

**Long March 3B** (1996) shares Proton's configuration logic almost exactly — hypergolic propellants, rail transport constraints, direct GEO injection capability. China likewise chose to eliminate hypergolics entirely in its new generation.

**Angara A5** (2014) is the official successor: kerolox, modular, non-toxic. But Angara costs considerably more than Proton (lacking the volume to amortise), **and the transition dragged on for more than a decade — Proton flew until 2025 before it truly retired.**`,

  milestones: [
    { title: "UR-500 first flight", note: "Launched the Proton 1 science satellite, which gave the rocket its name." },
    { title: "Salyut 1 launched", note: "The first space station." },
    { title: "Mir core module launched", note: "All subsequent Mir modules also flew on Proton." },
    { title: "Zarya functional cargo block launched", note: "The first module of the International Space Station." },
    { title: "Proton-M first flight", note: "New digital control system and the Briz-M upper stage." },
    { title: "Backwards sensors cause a crash", note: "Tumbled immediately after liftoff; 600 t of toxic propellant burned at the launch site." },
    { title: "Final flight", note: "Sixty years of service end, with Angara A5 taking over." },
  ],

  launchesNotable: [
    { name: "Salyut 1", note: "The first space station." },
    { name: "Phobos 1 and 2", note: "The last Soviet attempts at planetary exploration." },
    { name: "Zarya", note: "The first ISS module." },
    { name: "GLONASS-M ×3", note: "Angular rate sensors installed backwards; crashed immediately after liftoff." },
  ],

  variants: [
    { name: "UR-500 / Proton-K", note: "The early and main-line variants from 1965 to 2012, with more than 300 flights." },
    { name: "Proton-M / Briz-M", note: "The commercial workhorse from 2001, capable of direct GEO injection." },
    { name: "Proton Medium / Light", note: "Reduced configurations proposed to counter Falcon 9, cancelled after 2018." },
  ],

  stages: [
    {
      nameZh: "First stage",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "Six engines each mounted under a fuel tank; the whole stage separates together — these are not strap-on boosters.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "A hypergolic staged combustion engine at 165 bar, gimballing ±7.5°." }],
    },
    {
      nameZh: "Second stage",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "Hot staging: the second stage ignites first and its exhaust vents through the lattice interstage.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "One of the four is an RD-0211 with a tank pressurisation bleed." }],
    },
    {
      nameZh: "Third stage",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "A main engine plus a four-nozzle vernier engine that handles attitude control.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "Used together with the RD-0214 vernier engine." }],
    },
  ],

  parts: {
    "rd275-engines": {
      name: "RD-275M engines (×6)",
      description:
        "Six single-chamber RD-275Ms, each mounted at the base of one fuel tank. They use **oxidiser-rich staged combustion** at 165 bar, world-leading in the 1960s. Each gimbals ±7.5° and together they are the vehicle's only means of attitude control.",
    },
    "fuel-tanks": {
      name: "External fuel tanks (×6)",
      description:
        "**These six cylinders are not boosters, they are fuel tanks, and they do not separate.** Proton's first stage looks like a strap-on configuration but is actually one integrated stage: the central tank holds the oxidiser (nitrogen tetroxide), the six outer ones hold the fuel (UDMH). The only reason for this arrangement is **rail transport**: the 4.1 m central tank is already at the Soviet loading gauge limit, so the fuel had to go outside.",
    },
    "oxidizer-tank": {
      name: "Central oxidiser tank",
      description:
        "The 4.1 m central tank holds 419 t of nitrogen tetroxide. **It is the primary load-bearing structure**: the six fuel tanks hang off it and thrust is transmitted upward through it. The whole first stage separates as one unit at T+119 s.",
    },
    stage2: {
      name: "Second stage",
      description:
        "Four RD-0210/0211 engines, again hypergolic. Staging is **hot**: the second stage lights first and its exhaust vents through the lattice interstage truss. That open latticework is Proton's most recognisable external feature.",
    },
    stage3: {
      name: "Third stage",
      description:
        "One RD-0213 main engine plus a four-nozzle RD-0214 vernier. **The third stage's guidance was long Proton's weakest link** — the famous failure of 2 July 2013, in which the vehicle tumbled immediately after liftoff and crashed, was caused by three angular rate sensors installed 180° backwards, hammered into position by an assembly worker.",
    },
    "briz-m": {
      name: "Briz-M upper stage",
      description:
        "A restartable hypergolic upper stage with a jettisonable toroidal auxiliary tank. It can inject payloads directly into GEO and coast on orbit for extended periods. **Briz-M was also Proton's principal source of late-life failures**: several missions between 2007 and 2015 failed in its propellant management or engine restart sequence.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 4.35 m fairing in several lengths. In commercial service the payload envelope was one of its main competitive parameters against Ariane 5.",
    },
  },

  modelNote:
    "Reconstructed from the published 58.2 m height, 4.1 m central tank diameter and 7.4 m base span; the six external fuel tanks do not separate and belong to the same stage as the central tank.",

  sources: [
    { title: "Proton Launch System Mission Planner's Guide", publisher: "International Launch Services", note: "Dimensions, masses, performance and fairing envelopes." },
    { title: "Proton — RussianSpaceWeb", publisher: "Anatoly Zak", note: "Development history, failure analyses and the retirement process." },
    { title: "Proton-M — Wikipedia", publisher: "Wikipedia", note: "Launch statistics cover the whole Proton family; sources classify partial failures slightly differently." },
  ],

  tags: ["Heavy lift", "Hypergolic", "Station modules", "Commercial launch", "Retired"],
};
