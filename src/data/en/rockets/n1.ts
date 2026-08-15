import type { RocketOverlay } from "@/i18n/localize";

export const n1En: RocketOverlay = {
  displayName: "N1",
  country: "Soviet Union",
  agency: ["OKB-1", "Kuznetsov Design Bureau"],
  description:
    "The Soviet Moon rocket: 45% more thrust than Saturn V, four launches and four failures, then erased from the official record for fifteen years.",

  history: `N1 did not begin as a Moon rocket. Approved in 1959, it was meant to launch heavy military satellites and Mars craft; only in August 1964 did the USSR formally commit it to a crewed lunar landing — **more than three years after Apollo started, against the same deadline.**

It lost on organisation before it lost on engineering.

**Split one: there was no single lunar programme.** Two competing crewed lunar efforts ran in parallel — Korolev's N1/L3 (landing) and Chelomei's UR-500/LK-1 (circumlunar) — fighting over the same budget, factories and people. America put everything under Apollo.

**Split two: there were no engines.** Glushko was the Soviet Union's foremost engine designer, but he insisted on storable hypergolics; Korolev insisted on kerolox, arguing that toxic propellants had no place on a crewed vehicle. The two broke irrevocably in 1961 and Glushko refused to supply engines for N1. Korolev turned to an **aero-engine bureau**: Kuznetsov had never built a rocket engine, and the largest he could produce was 1,500 kN. **Hence thirty of them.**

**Split three: there was no money for ground testing.** Saturn V had a dedicated S-IC test stand where the whole first stage, all five F-1s, was fired repeatedly as a unit. N1 never once static-fired a complete first stage — there was no stand and no budget to build one. **The coupling, resonance and water-hammer behaviour of thirty engines was first encountered in flight.**

Korolev died during surgery in January 1966, and the programme lost the only person who could hold the pieces together.

Four launches, four failures:

1. **21 Feb 1969**: at T+68.7 s a high-pressure oxygen line ruptured from vibration and caught fire; KORD shut down every engine.
2. **3 Jul 1969**: at T+0.25 s the No. 8 oxidiser pump disintegrated; the vehicle rose 200 m and fell back on the pad. **The largest non-nuclear explosion in history**, destroying Pad 110 — thirteen days before Apollo 11 launched.
3. **27 Jun 1971**: roll control was lost at T+50.1 s; the vehicle had rotated nearly 200° before breaking up.
4. **23 Nov 1972**: at T+107 s, a programmed throttle-down shut six engines and the resulting propellant line hammer burst an oxidiser pump. **Seven seconds short of normal first-stage cutoff.**

In May 1974 Glushko took over Korolev's bureau, **cancelled N1 as his first act**, and ordered all hardware destroyed. Two nearly complete vehicles were scrapped and the tooling was broken up.

**The Soviet Union denied N1 had ever existed for the next fifteen years**, admitting it only in 1989.

There is one twist at the end: Kuznetsov defied the destruction order and hid about 150 improved NK-33 engines in a warehouse. Americans found and bought them in the 1990s and flew them on Antares — **an engine built for a Moon programme that never worked flew thirty years later.**`,

  designPhilosophy: `N1 can be summarised in one line: **every technical decision was a locally optimal answer under resource scarcity, and the sum of those local optima was a global catastrophe.**

Taken separately, nearly every choice is defensible:

| Decision | Local rationale | Global consequence |
|---|---|---|
| Thirty small engines | No large engine available | System complexity, coupled vibration, single-point control |
| Spherical tanks | Best pressure-vessel efficiency, lightest structure | Conical outer shell, unshippable by rail, on-site assembly only |
| On-site assembly | Because it could not be shipped | No factory-level testing of a complete vehicle |
| Non-gimballed engines | Gimbals on thirty engines were impractical | Attitude control by differential throttling, wholly dependent on KORD |
| No full-stage static fire | No budget for a test stand | Coupling problems could only appear in flight |
| Single-use engines | Oxidiser-rich staged combustion contaminates on test | **Every engine that flew had never been lit** |

That last row is decisive. NK-15's design meant **a tested engine could not subsequently fly** — only a few units per batch were fired, and the batch quality was inferred statistically. So on 21 February 1969, all thirty engines were lighting for the first time.

Compare Saturn V: every F-1 was individually test fired before installation, and the assembled first stage was then fired as a unit at Stennis. **The reason AS-501's “all-up” first flight succeeded is that every component had already been thoroughly proven on the ground.**

There is a recurring lesson here: **rocket development is not primarily about building the thing, it is about eliminating uncertainty before flight.** N1 did not fail because Soviet engineers were not good — NK-15's oxidiser-rich staged combustion cycle was the most advanced in the world, thirty years ahead of the US — **it failed because the system had no way of verifying the machine on the ground.**`,

  tradeoffs: [
    {
      question: "Were thirty engines really the cause of failure?",
      answer: `It is the most popular explanation and it is half right.

**The number amplified the problems but did not create them.** Look at the four direct causes:

1. High-pressure oxygen line ruptured by vibration → fire → KORD shut everything down
2. Foreign object in an oxidiser pump → pump disintegration → base structure destroyed by debris
3. Roll torque beyond control authority (an unanticipated exhaust swirl from the outer ring)
4. Programmed shutdown caused a water-hammer transient → oxidiser pump explosion

Causes 1, 2 and 4 are **single-engine or plumbing quality and coupling issues.** With five engines the same defects would still have caused failures, just less often. Only cause 3 is directly attributable to the thirty-engine layout.

The real causal chain runs:

**“Cannot obtain a large engine” → “must use thirty” → “thirty brings complex coupling and control” → “verifying that coupling needs a full-stage static fire” → “there is no test stand” → “it can only be tested in flight.”**

The count is a link in the middle, neither the start nor the end. **The start was the Glushko–Korolev rupture; the end was the absence of full-stage testing.**

A strong counterexample: Starship's Super Heavy flies 33 Raptors, more than N1, and works. The difference is that every engine is test fired, can be shut down independently, is structurally isolated, and 33 have been static fired together on the ground. **Same count, entirely different degree of verification.**

Another counterexample is N1's own fourth flight: it reached T+107 s, seven seconds from normal first-stage cutoff. The improved NK-33 was substantially more reliable. **Had the programme not been cancelled in 1974, a fifth or sixth flight would very likely have worked — but by then Apollo 17 had been home for two years and success would have meant nothing.**`,
    },
    {
      question: "Why did the Soviets not do full-stage static firing the way the Americans did?",
      answer: `Because the first stage could not be transported to a test stand, or to the launch site.

The chain starts with the tank shape:

- N1 used **spherical tanks.** A sphere is the most efficient pressure vessel: for a given wall thickness it takes the highest internal pressure at the lowest structural mass. For a 2,750 t vehicle that saving is tempting.
- But spheres do not fill a cylinder, so the outer shell could only be **a cone wrapped around a stack of spheres.** N1 therefore has no constant-diameter cylindrical section anywhere.
- A conical structure 17 m across at the base **cannot travel by rail** (far beyond the Soviet loading gauge) and cannot go by barge either — Baikonur sits in the middle of the Kazakh steppe with no navigable waterway.
- Conclusion: the first stage could only be **welded and assembled at the launch site.**

On-site assembly means there is no test stand there (building one capable of absorbing 45,000 kN is another giant project), and it means every vehicle is a first article — the process stability that comes from repeated factory production simply does not exist.

The American path was the exact opposite:

- Saturn V's S-IC was a **constant-diameter 10.1 m cylinder** with common bulkhead tanks;
- Assembled at Michoud near New Orleans, moved by **barge** along the Mississippi and the Gulf to the Mississippi test stand for full-stage firing, then on to the Cape;
- Every stage had been fired as a unit on the ground.

**“How do you move it,” the least technical-sounding question in the programme, ultimately determined whether it could be verified at all.** The constraint is still live today: Falcon 9's 3.66 m is the US interstate bridge limit, and Starship's 9 m forced SpaceX to build the factory next to the launch site — **Starship moved the factory to the pad, which is fundamentally the same problem N1 could not solve.**`,
    },
    {
      question: "What did KORD get wrong?",
      answer: `KORD (the engine operation control system) was supposed to monitor thirty engines in real time and shut down any anomalous one, together with its symmetric opposite to keep thrust balanced.

The idea is exactly right — it is what modern multi-engine vehicles do. The implementation was the problem:

**1. It had no redundant decision basis.** KORD judged engine health from single sensor channels. On the second flight, when the No. 8 oxidiser pump disintegrated 0.25 s after ignition, the resulting electrical interference and sensor anomalies made KORD shut down **all but one engine** within a fraction of a second. The vehicle rose about 200 m, lost thrust and fell back onto the pad.

**2. Paired shutdown wasted margin.** Killing a perfectly healthy engine to preserve balance means every failure costs double thrust. N1 was designed to tolerate up to six engines out, but the pairing strategy halved that. Modern flight control uses **thrust-vector reallocation** instead: one engine stops, the others gimbal to compensate, and no good engine has to be sacrificed.

**3. It could not handle slow-developing faults.** KORD's logic was binary (nominal / shut down), while real faults are usually gradual — pressure drifting down, temperature drifting up. On the first flight a plumbing fire burned for over sixty seconds before KORD reacted, by which time the fire had reached the control harness.

**4. Most importantly: it was never tested in a real thirty-engine environment.** KORD's logic was validated in simulation and single-engine tests, but the electromagnetic environment, vibration spectrum and sensor cross-talk of thirty simultaneous engines can only be exposed by a full-stage static fire — which never happened.

**Every point leads to the same conclusion: control system complexity must match verification capability.** N1's flight control was in some ways more advanced on paper than its American contemporary (F-1 had no comparable automatic shutdown system), but advanced systems need more verification, and verification was exactly what the programme lacked.`,
    },
  ],

  contemporaries: `**Saturn V** (1967) was its only rival, and the comparison is almost a controlled experiment: N1 had 45% more liftoff thrust (45,400 kN against 34,000 kN) and 30% less payload (95 t against 140 t) — **more thrust and less capability, with the whole gap coming from impulse, structural mass and upper stage efficiency.** Saturn V's S-II and S-IVB burned hydrogen (421 s); N1 was kerosene throughout (353 s at best); Saturn V was fully ground tested and N1 never once.

**Proton** (1965) was the other Soviet route of the period: Chelomei's design, storable propellants, a quarter of N1's liftoff mass. It could not go to the Moon, but it was reliable, mass-producible and rail-transportable — **and it flew into the 2020s, while N1 flew four times.**

**Energia** (1987) was the Soviet redo: Glushko himself in charge, four RD-170s (each 7,900 kN, precisely the large engine he had never delivered) instead of thirty small ones, 100 t of payload. **Two launches, two successes, ended by the collapse of the state.** That outcome argues that N1's problem was never Soviet engineering capability but the specific organisational and resource conditions of its moment.

**Super Heavy** (33 Raptors) exceeds N1's engine count, showing that multi-engine architectures are perfectly viable — **provided each engine can be tested, shut down independently and structurally isolated.**`,

  milestones: [
    { title: "Programme approved", note: "Originally intended for heavy military satellites and Mars craft, not a lunar landing." },
    { title: "Formally redirected to the Moon", note: "Started more than three years after Apollo, against the same deadline." },
    { title: "Korolev dies", note: "The programme loses the only person able to hold its competing parts together." },
    { title: "First launch fails", note: "T+68.7 s, plumbing fire, KORD shuts down all engines." },
    { title: "Second launch fails", note: "Fell back on the pad; among the largest non-nuclear explosions ever, destroying Pad 110." },
    { title: "Fourth launch fails", note: "T+107 s, seven seconds short of normal first-stage cutoff." },
    { title: "Programme cancelled", note: "Glushko terminated it on taking over and ordered the hardware destroyed." },
    { title: "USSR first admits N1 existed", note: "For the preceding fifteen years the existence of a crewed lunar programme was officially denied." },
  ],

  launchesNotable: [
    { name: "3L", note: "Oxygen line ruptured by vibration, fire, all engines shut down by KORD." },
    { name: "5L", note: "Fell back after rising 200 m, destroying Pad 110." },
    { name: "6L", note: "Roll control lost, broke up at T+50.1 s." },
    { name: "7L", note: "Programmed shutdown caused line hammer; explosion at T+107 s." },
  ],

  variants: [
    { name: "N1F", note: "Improved version with NK-33/NK-43; never flew — two nearly complete vehicles were scrapped in 1974." },
    { name: "N1M / N1-MOK", note: "Paper studies for reusable and space-station configurations, never developed." },
  ],

  stages: [
    {
      nameZh: "Block A (first stage)",
      propellantZh: "Kerosene / liquid oxygen",
      note: "Thirty NK-15s, all fixed, with attitude control by differential throttling. No flight ever completed first-stage burn.",
      engines: [
        { cycleZh: "Oxidiser-rich staged combustion", note: "The world's first oxidiser-rich staged combustion kerosene engine, but single-use by design: a tested unit could not fly." },
      ],
    },
    {
      nameZh: "Block B (second stage)",
      propellantZh: "Kerosene / liquid oxygen",
      note: "Eight NK-15Vs, hot-staged: the second stage ignites before the first is pushed away.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "The vacuum variant of NK-15 with a larger expansion ratio." }],
    },
    {
      nameZh: "Block V (third stage)",
      propellantZh: "Kerosene / liquid oxygen",
      note: "Four NK-21s, placing the L3 lunar complex into a parking orbit.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "The upper stage member of the NK family." }],
    },
  ],

  parts: {
    "nk15-outer": {
      name: "NK-15 engines (outer ring, ×24)",
      description:
        "Twenty-four NK-15s around the base. **This remains the highest engine count on a single stage in history** (Super Heavy's 33 came sixty years later). The count was not a preference: Korolev could not get a large engine from Glushko, and Kuznetsov's aero-engine team could only reach the 1,500 kN class, so quantity had to substitute.",
    },
    "nk15-inner": {
      name: "NK-15 engines (inner ring, ×6)",
      description:
        "Six in the inner ring. All thirty were **fixed, non-gimballed** — attitude control came from differential throttling in pairs. That decision made KORD the nervous system of the whole vehicle, and its single greatest point of failure.",
    },
    "block-a": {
      name: "Block A (first stage)",
      description:
        "17 m across at the base — **70% wider than Saturn V's 10.1 m.** Why conical rather than cylindrical? Because the tanks were spheres. N1 used three separate spherical tanks (oxidiser below, kerosene above) hung in a load-bearing frame, rather than Saturn V's common-bulkhead cylinders. Spheres have optimal surface-to-volume and pressure efficiency but terrible packing, so the shell had to be a cone enclosing them. **The result was a vehicle with no constant-diameter section anywhere, unshippable by rail and assembled by welding at Baikonur.**",
    },
    nk15v: {
      name: "NK-15V engines (×8)",
      description:
        "Eight NK-15Vs on the second stage, with enlarged expansion ratios for vacuum. **In four flights N1 never once succeeded in igniting its second stage** — three failed during first-stage burn and one in the final seconds before first-stage cutoff.",
    },
    "block-b": {
      name: "Block B (second stage)",
      description:
        "Spherical tanks inside a conical shell again. Staging was **hot**: the second stage lit first and its exhaust vented through the open lattice interstage, pushing the first stage away by thrust differential. That avoids separation ordnance but demands an interstage able to survive hot gas scrubbing.",
    },
    nk21: {
      name: "NK-21 engines (×4)",
      description: "Four NK-21s on the third stage, inserting the L3 lunar complex into low Earth orbit.",
    },
    "block-v": {
      name: "Block V (third stage)",
      description: "The third stage, leaving the L3 complex in a parking orbit at about 220 km.",
    },
    "block-g": {
      name: "Block G trans-lunar stage",
      description: "The fourth stage, firing from the parking orbit to perform trans-lunar injection. Saturn V used its S-IVB for both orbital insertion and TLI; N1 added a dedicated stage.",
    },
    "block-d": {
      name: "Block D braking stage",
      description:
        "Responsible for lunar orbit insertion and the first part of descent. **Block D is the only part of the N1 programme that survived**: it became Proton's DM upper stage and is still in service.",
    },
    lk: {
      name: "LK lunar lander",
      description:
        "A single-person lander at 5.6 t — one third of the Apollo LM's 15 t. **Single-person** meant one cosmonaut had to land, walk, ascend and rendezvous alone, and there was no docking tunnel: he had to spacewalk from the LK to the outside of the orbiter and climb in. Every one of those extreme simplifications came from N1's shortfall in capability.",
    },
    lok: {
      name: "LOK lunar orbiter",
      description: "A two-person circumlunar spacecraft derived from Soyuz. One goes down, one stays — the same division of labour as Apollo, but with every element one size smaller.",
    },
    shroud: {
      name: "Payload shroud",
      description: "The shroud enclosing the L3 lunar complex. N1 stood 105.3 m tall, 5 m shorter than Saturn V but with 45% more liftoff thrust.",
    },
    les: {
      name: "Launch escape tower",
      description:
        "Solid escape motors. When the vehicle fell back onto the pad seconds after liftoff on 3 July 1969, **the escape tower worked correctly and pulled the (uncrewed) spacecraft clear of the explosion** — one of the few systems on any of the four flights that behaved exactly as designed.",
    },
  },

  modelNote:
    "Reconstructed from the published 105.3 m height, 17 m base diameter and three-stage conical profile; the thirty engines are arranged as 24 outer plus 6 inner. The L3 complex modules are indicative.",

  sources: [
    { title: "Challenge to Apollo: The Soviet Union and the Space Race, 1945–1974", publisher: "Asif A. Siddiqi / NASA SP-2000-4408", note: "The most complete public history of the Soviet lunar programme, including failure analyses of all four flights." },
    { title: "N1 (rocket) — Wikipedia", publisher: "Wikipedia", note: "Dimensions and masses differ between sources; the more commonly cited set is used here." },
    { title: "NK-33 / NK-15 Engine History", publisher: "RussianSpaceWeb", note: "Engine parameters and the story of Kuznetsov's hidden NK-33s." },
  ],

  tags: ["Lunar", "Heavy lift", "Many engines", "Cancelled", "Soviet"],
};
