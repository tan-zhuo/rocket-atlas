import type { RocketOverlay } from "@/i18n/localize";

export const energiaEn: RocketOverlay = {
  displayName: "Energia",
  country: "Soviet Union",
  agency: ["NPO Energia", "NPO Energomash"],
  description:
    "The Soviet answer thirteen years after N1 failed: two launches, two successes, 100 t of payload — and then it disappeared along with the country that built it.",

  history: `Energia began because of the Space Shuttle.

In 1976 Soviet intelligence assessed the American Shuttle and concluded that **it was a military platform capable of carrying nuclear weapons, manoeuvring in orbit and re-entering to attack the USSR from any direction.** (The judgement was wrong; the Shuttle never served that role.) The leadership ordered an equivalent system.

But Soviet engineers did not build a copy. Having analysed the Shuttle's configuration, they made one decisive change: **move the main engines from the orbiter onto the core.**

That single change produced every difference that followed:

- **Energia could fly without Buran.** It was an independent heavy launcher whose payload could be a spaceplane or anything else in the 100 t class.
- **The payload no longer had to carry engines through re-entry.** Buran carried only orbital manoeuvring engines and did not have to protect three high-pressure turbopumps during entry.
- **Hydrolox core, kerosene boosters.** This is the optimal propellant split: kerosene delivers high thrust in the dense atmosphere, hydrogen delivers high impulse in vacuum.

**The maiden flight on 15 May 1987** carried Polyus, an 80 t military orbital platform believed to carry a laser weapon experiment. Energia worked perfectly, but Polyus' own attitude control programme fired it in the wrong direction and it fell into the Pacific. **The rocket succeeded; the payload failed.**

**On 15 November 1988 Energia launched Buran.** After two orbits Buran re-entered automatically and landed itself on the runway at Baikonur — **uncrewed, fully automatic, in a 17 m/s crosswind, touching down 3 m from the centreline.** The Shuttle never had that capability. It was Buran's only flight.

Three years later the Soviet Union dissolved. Energia–Buran had cost roughly 20 billion roubles and was suspended indefinitely, formally cancelled in 1993.

In 2002 the roof of the hangar storing Buran collapsed from neglect, crushing the vehicle and killing eight workers.

The lasting legacy is **RD-170**, which spawned RD-171 (Zenit), RD-180 (Atlas V) and RD-191 (Angara). **Energia's greatest value turned out to be that its engines went somewhere else.**`,

  designPhilosophy: `Energia's logic can be stated as: **build a heavy launcher first, decide what to hang on it later.**

It is a complete mirror image of the Shuttle:

| | Space Shuttle | Energia |
|---|---|---|
| Main engine location | On the orbiter | On the core |
| Can it fly without the orbiter | No | Yes |
| What the payload can be | Only the orbiter's bay | Anything in the 100 t class |
| Main engines reused | Yes (refurbished each flight) | No |
| Payload position | Side-mounted | Side-mounted |
| Escape system | None | None (Buran had ejection seats) |

**Putting the engines on the core means giving up main engine reuse.** Four RD-0120s fell into the Pacific with the core on every flight, which on paper is enormous waste — four high-performance hydrogen engines are most of the core's cost.

But the USSR bought three things with that:

1. **Generality.** Energia could launch anything. The first flight carried a military platform, the second a spaceplane, and planned missions included lunar landers, Mars vehicles and large station modules. **It is a rocket, not a transport system.**
2. **A simpler payload.** Buran carried no main engines, no huge propellant feed lines, and did not have to protect high-pressure turbopumps through entry. Its manoeuvring system used simple, reliable hypergolics. That made Buran lighter than the Shuttle orbiter with the same bay size.
3. **Separated risk.** Every Shuttle launch bet the entire crewed system and the main propulsion together; Energia could fly a cargo configuration first to prove the rocket. **That is exactly what the 1987 debut did — fly the rocket, then fly the people.**

There is a further point often overlooked: **Energia's propellant allocation is a textbook example.** Four kerosene boosters give 29,000 kN at liftoff (kerosene is dense with high thrust-to-weight) while the hydrolox core burns from the ground to orbit at 455 s. That “kerosene boosters plus hydrolox core” arrangement was later adopted by Ariane 5, Long March 5 and SLS — **Energia was its first large-scale implementation.**

**Its failure had nothing to do with technology. Two launches, two successes is a rare record for a heavy launcher. It died with the state.**`,

  tradeoffs: [
    {
      question: "Was giving up engine reuse to put them on the core the right call?",
      answer: `Seen from thirty years later: **yes, and it is Energia's single most correct decision relative to the Shuttle.**

The Shuttle put three RS-25s on the orbiter because “they are too expensive to throw away.” The premise was true — an RS-25 costs tens of millions. But the benefit of reuse was consumed by three things:

1. **Every return required removal and teardown.** Not “refuel and go,” but disassemble the turbopumps, inspect, reassemble, hot fire. The ground workload was enormous.
2. **The engines had to survive re-entry.** All three had to endure heat, vibration and aerodynamic loads on every entry, and the protective structure and inspection requirements added for that were themselves a cost.
3. **They were dead mass during ascent.** The main engines drew propellant from the tank, but their own mass had to be carried to orbit — and then brought home again.

Energia's choice was to **accept expendability in exchange for radical simplification of the payload.**

Buran was therefore lighter and structurally simpler than a Shuttle orbiter, with more usable payload (30 t against 27.5 t) and the same bay dimensions. It could also land fully automatically, precisely because it did not have to manage a complex main propulsion system during entry.

**More fundamentally: Energia retained the ability to fly without an orbiter, which is what heavy lift is actually worth.** Planned Energia missions included lunar landers, Mars vehicles and large telescopes — none of which needs wings, and none of which needs a returnable cargo bay.

**The Shuttle welded “transport” and “return” together; Energia pulled them apart.** Every heavy launcher today follows Energia's logic: the rocket handles the ride up, and the payload decides for itself whether it comes back.`,
    },
    {
      question: "Why does RD-170 have four chambers instead of one big one?",
      answer: `Because a single chamber at 7,900 kN runs into the wall of **combustion instability**, and going around it was much cheaper than going over it.

Combustion instability is the most dangerous problem in large liquid engines: pressure waves in the chamber couple with heat release to form a self-sustaining oscillation. High-frequency modes (a few kilohertz) can burn through an injector face in tens of milliseconds. **F-1 fought this for four years across more than 2,000 test firings**, ultimately suppressing it with radial and circumferential injector baffles.

Instability severity worsens roughly with chamber diameter — larger diameters admit more acoustic modes and couple more readily with combustion.

The Soviet answer was **not to challenge the scale**:

- Split 7,900 kN into four chambers of 1,975 kN each, keeping each chamber diameter in a well-proven range;
- Feed all four from **one turbopump** (190 MW, itself an extreme engineering problem);
- Distribute the preburner's oxidiser-rich gas to the four chambers through manifolds.

**The cost is structural complexity:** four injectors, four cooling circuits and a complicated gas distribution system, giving a heavier engine than a single-chamber design. RD-170 weighs 9.75 t dry with a thrust-to-weight of about 79; F-1 weighs 8.4 t at about 82 — **so the Soviet mass penalty is small, because staged combustion's higher performance pays it back.**

This is the norm across Soviet and Russian engines: RD-107/108 (Soyuz) four chambers, RD-0124 four chambers. **Multiple chambers are the most recognisable Soviet engine signature.**

The Americans went the other way, building big single chambers: F-1 (6,770 kN in one chamber), RS-25, BE-4, Raptor. **Both work; the difference is where the risk sits — the US put it in solving combustion instability, the USSR in the complexity of multiple chambers.**

Interestingly, RD-170's modular descendants vindicate the choice: cut to two chambers it is RD-180, cut to one it is RD-191. **Designing around several standard chambers from the beginning is exactly what made later scaling easy.**`,
    },
    {
      question: "Buran flew once. What did that flight prove?",
      answer: `It proved something the Shuttle never demonstrated in thirty years and 135 flights: **a winged orbital vehicle can fly itself from orbit to a runway with nobody aboard.**

The details of 15 November 1988 are worth listing:

- Uncrewed. Nobody in the cabin and no provision for manual takeover.
- Two orbits (206 minutes), then an autonomous deorbit burn.
- A series of S-turns during entry to dissipate energy, flown autonomously.
- On approach it met a 17 m/s crosswind and **decided on its own to fly around and approach from the opposite end of the runway** — a manoeuvre that had not been pre-programmed.
- Touchdown 3 m from the centreline and 10 m from the aim point.

The Shuttle by design required the crew to fly the final approach and landing manually (even the landing gear could only be deployed by hand). **That was not a capability gap but a philosophical difference:** NASA held that a critical action like landing should be a human responsibility, while the Soviet programme required Buran to fly without crew (an uncrewed first flight was mandatory, itself a lesson learned from N1 and Soyuz 1).

The price of autonomous landing was the most capable Soviet airborne computers of the day plus a complete ground guidance system. **That technology did not vanish**: it fed into the Russian automatic rendezvous and docking system (Kurs) and influenced every subsequent autonomous return vehicle design.

**But the flight is also a warning: one flawless technical demonstration cannot save a programme that has lost its purpose.** By the time Buran was finished, the USSR could no longer answer the question of what to use it for — the military assessment of the Shuttle had been wrong, Soyuz and Progress were servicing the stations, and Energia had no queue of heavy payloads.

**It was a work completed after the need for it had gone.**`,
    },
  ],

  contemporaries: `**The Space Shuttle** (1981) is the direct comparison. Similar silhouette and similar payload capability, but one difference in engine placement made Energia a general-purpose heavy launcher and the Shuttle only a transport system. **Energia flew twice and succeeded twice; the Shuttle flew 135 times and lost two orbiters — yet the Shuttle survived, because it had continuing missions.**

**N1** (1969) was the previous Soviet heavy-lift attempt, four flights and four failures. Energia inverted almost every one of its failure causes: large unit engines rather than thirty small ones, complete ground testing, a constant-diameter transportable core, and Glushko personally in charge. **It demonstrates that N1's failure was not the ceiling of Soviet engineering.**

**Saturn V** (1967) still exceeded Energia to LEO (140 t against 100 t), but Energia could carry arbitrary payloads and its boosters were designed for recovery. **Twenty years apart, the progress shows up mainly in generality and propellant allocation.**

**Long March 5, Ariane 5 and SLS** all use the kerosene-or-solid boosters plus hydrolox core arrangement Energia pioneered. **That configuration, and the RD-170 family, are its two principal legacies to the world.**`,

  milestones: [
    { title: "Programme approved", note: "A response to the American Shuttle, but with a completely different configuration." },
    { title: "First flight", note: "The Polyus payload failed to reach orbit through its own guidance error; the rocket performed correctly." },
    { title: "Buran launched", note: "Uncrewed fully automatic re-entry and landing, 17 m/s crosswind, 3 m from the centreline." },
    { title: "Programme formally cancelled", note: "Unsustainable after the Soviet collapse; two vehicles in production were mothballed." },
    { title: "Buran destroyed by hangar collapse", note: "Eight workers were killed." },
  ],

  launchesNotable: [
    { name: "Polyus", note: "The rocket succeeded; the payload's own programming error dropped it into the Pacific." },
    { name: "Buran", note: "The only spaceplane-configuration flight, with a successful fully automatic landing." },
  ],

  variants: [
    { name: "Energia-M", note: "Two boosters and a single RD-0120, 34 t to LEO; a full-scale mock-up was built before it lost a 1993 competition." },
    { name: "Vulkan / Hercules", note: "An eight-booster configuration, 175 t to LEO, on paper only." },
    { name: "Zenit", note: "The booster module used independently as a medium launch vehicle, 1985–2017." },
  ],

  stages: [
    {
      nameZh: "Four boosters",
      propellantZh: "RG-1 kerosene / liquid oxygen",
      note: "Each carries one four-chamber RD-170 — the first stage of the Zenit launch vehicle; designed for parachute recovery, never executed.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "The most powerful liquid rocket engine ever built: one pump, four chambers, 245 bar." }],
    },
    {
      nameZh: "Core stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Four RD-0120s ignite on the ground and burn to orbital insertion; the core itself does not reach orbit and falls into the Pacific.",
      engines: [{ cycleZh: "Fuel-rich staged combustion", note: "The only large Soviet hydrogen engine ever flown, comparable in performance to RS-25." }],
    },
  ],

  parts: {
    rd0120: {
      name: "RD-0120 engines (×4)",
      description:
        "The only large Soviet hydrolox engine ever flown: 1,961 kN in vacuum, 455 s, 218 bar. It is the same class of machine as America's RS-25 (fuel-rich staged combustion) with comparable performance, developed ten years later. **It flew twice.** The production line stopped after the Soviet collapse and the remaining units sit in storage to this day.",
    },
    "core-lh2": {
      name: "Core stage liquid hydrogen tank",
      description:
        "A 7.75 m hydrogen tank. **The core is not a first stage; it burns from liftoff to orbital insertion** — the four RD-0120s light on the ground and run for 480 s. This is unlike the Shuttle's External Tank: Energia's core is a complete stage with its engines on itself, not on the payload.",
    },
    "core-lox": {
      name: "Core stage liquid oxygen tank",
      description: "Oxygen above, hydrogen below, the same reasoning as the Shuttle tank: put the dense fluid high to move the centre of mass forward.",
    },
    "core-nose": {
      name: "Core nose cone",
      description: "The aerodynamic fairing at the top of the core. Energia stood 58.8 m tall, 2.7 m taller than the Shuttle stack.",
    },
    "booster-rd170": {
      name: "RD-170 engines (×4)",
      description:
        "**The most powerful liquid rocket engine ever built, and still unmatched: 7,257 kN at sea level, 7,904 kN in vacuum.** One turbopump (190 MW) drives four combustion chambers, oxidiser-rich staged combustion at 245 bar. Why four chambers rather than one? Because a single chamber at 7,900 kN meets combustion instability — the problem that cost F-1 four years. **The Soviet answer was not to fight it: split the thrust four ways and feed it from one pump.**",
    },
    "booster-body": {
      name: "Boosters (×4, Zenit first stages)",
      description:
        "Each booster is **the first stage of the Zenit launch vehicle** — the same module serves as an Energia booster and as an independent medium-lift rocket. This is the Soviet version of modularity, a decade before Angara, and it runs the other way: **the big rocket's booster was taken out and flown on its own.**",
    },
    "booster-nose": {
      name: "Booster nose cones",
      description:
        "The boosters were designed with parachutes and solid retro motors for recovery and reuse — **the USSR planned booster recovery in the 1980s** — but neither flight actually attempted it.",
    },
    "payload-body": {
      name: "Side-mounted payload (Buran or cargo bay)",
      description:
        "**This is the essential difference from the Shuttle: what hangs here is pure payload, not engines.** It can be the Buran spaceplane or a 100 t cargo container (the 1987 debut carried the Polyus military platform). **Energia is a genuine heavy launcher; Buran was one kind of payload for it.** The Shuttle could not do this — its main engines lived on the orbiter, so no orbiter meant no propulsion.",
    },
    "payload-nose": {
      name: "Payload nose",
      description: "In the Buran configuration this is the orbiter's nose and crew compartment; in cargo configuration it is a fairing.",
    },
    "buran-wing-port": {
      name: "Buran wing (port)",
      description:
        "Buran's 23.9 m wingspan is almost identical to the Shuttle's, because it faced the same re-entry aerodynamics and arrived at a similar answer. **But it had something extra: fully automatic landing.** On 15 November 1988 Buran flew re-entry, approach and landing uncrewed in a 17 m/s crosswind, touching down 3 m from the centreline. The Shuttle never had that capability.",
    },
    "buran-wing-stbd": {
      name: "Buran wing (starboard)",
      description: "The underside and leading edges likewise used thermal tiles and carbon-carbon, 38,000 pieces in all, more than the Shuttle.",
    },
  },

  modelNote:
    "Reconstructed from the published 58.8 m height, 7.75 m core diameter and 20 m span, with the payload shown in the Buran configuration; wings are approximated by two swept surfaces.",

  sources: [
    { title: "Energia-Buran: The Soviet Space Shuttle", publisher: "Bart Hendrickx & Bert Vis, Springer/Praxis", note: "Development history, configuration decisions and a full account of both flights." },
    { title: "Energia — RussianSpaceWeb", publisher: "Anatoly Zak", note: "Dimensions, masses and derived configurations." },
    { title: "RD-170 Engine", publisher: "NPO Energomash", note: "Thrust, impulse, chamber pressure and the derived engine family." },
  ],

  tags: ["Heavy lift", "Hydrolox core", "Parallel stage", "Cancelled", "Soviet"],
};
