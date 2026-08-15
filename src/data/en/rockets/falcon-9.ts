import type { RocketOverlay } from "@/i18n/localize";

export const falcon9En: RocketOverlay = {
  displayName: "Falcon 9 Block 5",
  country: "United States",
  description:
    "The first launch vehicle to make orbital-class booster recovery and reflight a routine operation, reshaping the global launch market through flight rate and marginal cost.",

  history: `Falcon 9 did not start from a technical breakthrough but from a cost hypothesis: if a rocket could be reused like an aircraft, launch prices could fall by an order of magnitude. When v1.0 first flew in June 2010 it was an ordinary two-stage kerosene rocket; the actual roadmap came later. v1.1 (2013) stretched the airframe, rearranged the engines into the Octaweb and added landing legs; Full Thrust (2015) introduced **subcooled propellants** to raise density and offset the performance lost to recovery.

On 21 December 2015 the ORBCOMM-2 booster landed back at the Cape — the first orbital-class first stage ever recovered. In March 2017 SES-10 flew on a previously flown booster. In May 2018 Block 5 debuted, the definitive version defined around flying a single booster ten times without major overhaul.

Flight rate then roughly doubled year on year: 26 launches in 2020, 61 in 2022, more than 130 in 2024 — a single vehicle type flying more times per year than any nation has ever managed in total. On the crewed side, Demo-2 in May 2020 restored American domestic crew launch capability nine years after the Shuttle retired.`,

  designPhilosophy: `Falcon 9's design logic is **trading optimal single-flight performance for optimal lifetime economics.**

Every design decision on a conventional launch vehicle pushes more mass to orbit; Falcon 9 deliberately gave up around 30% of its capability — the recovery propellant, the landing legs, the grid fins, the strengthened structure — to reuse the first stage. That trade only closes if **flight rate is high enough**: fly three times a year and the development and refurbishment costs never amortise. Which means Falcon 9's design implicitly assumed a captive high-frequency customer like Starlink.

The second thread is **manufacturing simplicity in place of peak performance**: one engine (Merlin 1D and its vacuum variant), one propellant combination, one airframe diameter. Nine plus one identical engines means the factory builds hundreds of the same object every year, and both unit cost and reliability ride the learning curve. That is the exact opposite of Ariane 5 or Delta IV, where each stage gets the engine best suited to it.

The third is **fly then fix**: between v1.0 and Block 5 the airframe grew 50% longer and 70% more powerful, every step of it validated on real missions carrying paying customers.`,

  tradeoffs: [
    {
      question: "Why nine small engines instead of one or two large ones?",
      answer: `On pure performance this is a bad choice: nine engines means nine turbopumps, nine sets of valves, nine potential failure points, plus the mass of the Octaweb structure and complex plumbing. A conventional reliability model — series failure chains — rejects it outright, and N1's four consecutive failures are the cautionary tale.

Falcon 9 went the other way for three reasons:

1. **Engine-out tolerance.** A nine-engine first stage can lose one and still complete the mission. On CRS-1 in 2012 a Merlin lost pressure and shut down at T+79 s; the other eight burned longer and the primary payload reached orbit normally. That inverts “more engines = less reliable” into “more engines = fault tolerant” — provided the control system can re-plan in real time.
2. **Recovery needs deep throttling.** An empty returning booster has a thrust-to-weight ratio above 1 even on a single engine. The smaller each engine, the lower the minimum achievable thrust and the better the hover margin. With one large engine you simply cannot throttle down far enough to land softly.
3. **Volume drives cost.** The same Merlin flies nine times on the first stage and once on the second, so each vehicle consumes ten. Producing a thousand a year buys a learning curve no single large engine will ever see.

The costs are real: many chambers mean more ground test and inspection work, and multi-engine combustion coupling and resonance risks have to be found and eliminated one at a time.`,
    },
    {
      question: "Why stick with kerosene rather than methane or hydrogen?",
      answer: `When Falcon 9 was conceived, around 2005, kerolox was the one **known quantity**: mature ground infrastructure, cheap propellant, high density (no enormous tanks), storable at ambient temperature (no complex insulation). For a cash-constrained start-up, putting the entire innovation budget on one thing — recovery — and keeping everything else as conservative as possible was a rational allocation of risk.

Kerosene's price showed up quickly in reuse: RP-1 combustion leaves **coking** on the gas generator and injectors that has to be cleaned during refurbishment, and its specific impulse trails methane by about 10 s and hydrogen by about 100 s. That is precisely what drove SpaceX to methane for the next generation (Raptor/Starship) — methane burns clean, allows deep-cryogenic common bulkheads, and can be manufactured on Mars.

Note the workaround Falcon 9 used to claw back some of kerosene's impulse deficit: **subcooled propellant**. Chilling LOX to −207 °C (well below its −183 °C boiling point) and RP-1 to −7 °C raises their densities by roughly 8% and 2.5%, so the same tanks hold about 8% more propellant. The price is that loading must finish within 35 minutes of launch and cannot be held — which is why Falcon 9's crewed missions adopted the contested “crew first, then fuel” procedure.`,
    },
    {
      question: "Does recovering the first stage actually pay?",
      answer: `The arithmetic first: recovery cuts LEO capability from 22.8 t to about 17.5 t (−23%) and GTO from 8.3 t to 5.5 t (−34%). The hardware adds landing legs, grid fins, landing propellant and a strengthened thrust structure, on top of the fixed cost of a recovery fleet and refurbishment facilities.

Whether it pays depends on three variables:

- **What fraction of vehicle cost is the first stage.** For Falcon 9 the booster is roughly 60–70% of airframe cost, with the second stage and fairing making up 30–40%. Recovering the booster in principle recovers the larger share.
- **Refurbishment cost and turnaround.** Block 5's target was routine inspection only between ten flights. In practice the shortest booster turnaround has been under 21 days, and individual boosters have flown more than twenty times.
- **Flight rate.** Every fixed cost — recovery ships, refurbishment facilities, engineering teams — is divided by the number of flights.

The conclusion: given the captive high-frequency demand of Starlink, recovery clearly pays — the great majority of the 130-plus launches in 2024 used flight-proven boosters. But for an operator flying three to eight times a year (Ariane's and ULA's long-standing situation) the same arithmetic comes out negative. **Reusability is not a purely technical judgement; it is a bet on the size of the launch market.**`,
    },
    {
      question: "Why two recovery modes — return to launch site and droneship?",
      answer: `Where a booster can go is set by its state at separation.

- **Return to launch site (RTLS)**: at lower separation velocities (typically below 2 km/s) the booster still has enough propellant for a boostback burn that cancels its horizontal velocity and flies it home. Landing on land is fastest to recover and simplest to refurbish, but three burns (boostback, entry, landing) cost the most propellant and therefore the most payload.
- **Autonomous droneship (ASDS)**: at high separation velocities (2.3–2.6 km/s) there is no margin to fly back, so the booster continues downrange and lands on a ship hundreds of kilometres out. This saves the boostback burn and costs less payload, at the price of fleet operations and sea-state risk.

So mission planning follows a simple rule: **the heavier the payload and the higher the orbit, the faster the booster is going at separation, and the more likely it must go to a ship; only light payloads and return missions get RTLS.** The heaviest GTO missions (above 8 t) simply fly expendable — three different performance curves on one vehicle.`,
    },
  ],

  contemporaries: `Falcon 9's expendable contemporaries — Atlas V, Ariane 5, Delta IV, H-IIA — were not less reliable, and in Atlas V's case were more so (a near-perfect record). What they lost on was **unit cost and cadence**: Ariane 5 flew six or seven times a year, Atlas V five to eight, both above 150 million dollars a launch; after 2023 Falcon 9's commercial price sat near 67 million and it could fly more than a hundred times a year.

Which leads to a counter-intuitive conclusion: **Falcon 9's core advantage is not recovery itself, but the high-rate production and operations system that recovery forces on you.** Almost every follower — New Glenn, Neutron, Terran R, Zhuque-3, the Long March 10 family — has copied that path rather than copying Merlin or kerosene.`,

  tags: ["Reusable", "Commercial spaceflight", "Crewed", "High cadence", "Kerolox"],

  milestones: [
    { title: "Falcon 9 v1.0 maiden flight", note: "A two-stage kerosene rocket with no recovery hardware at all." },
    { title: "First Dragon berthing with the ISS", note: "The first commercial spacecraft to reach the station." },
    { title: "ORBCOMM-2 — first return-to-launch-site landing", note: "The first successful vertical recovery of an orbital-class first stage." },
    { title: "SES-10 — first reflight of a used booster", note: "Proved a refurbished stage could fly a commercial mission." },
    { title: "Block 5 maiden flight", note: "The definitive version, designed for ten or more flights." },
    { title: "Demo-2 — first commercial crewed flight", note: "US domestic crew launch capability restored after nine years." },
    { title: "23rd flight of a single booster", note: "B1067 set the record for reflights of one airframe." },
  ],

  variants: [
    { name: "Falcon 9 v1.0 / v1.1 / Full Thrust", note: "The 2010–2018 iterations, progressively stretched and uprated." },
    { name: "Falcon Heavy", note: "Three Falcon 9 first stages in parallel; 63.8 t to LEO expendable. First flown 2018." },
  ],

  stages: [
    {
      nameZh: "First stage",
      propellantZh: "RP-1 kerosene / liquid oxygen (subcooled)",
      note: "In recovery configuration roughly 6–8% of the propellant is reserved for the return and landing burns, which is what takes LEO capability from 22.8 t down to about 17.5 t.",
      engines: [
        {
          cycleZh: "Gas-generator cycle",
          note: "Thrust-to-weight around 180, among the highest of any production liquid engine; throttles to 40% to enable landing.",
        },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "Restartable, supporting direct GTO, GEO and deep-space injections.",
      engines: [
        {
          cycleZh: "Gas-generator cycle",
          note: "The vacuum variant with an expansion ratio of 165 and a radiatively cooled niobium nozzle extension.",
        },
      ],
    },
  ],

  launchesNotable: [
    {
      name: "CRS-1",
      note: "One Merlin shut down in flight and the primary payload still reached orbit — the first demonstration of engine-out redundancy.",
    },
    {
      name: "CRS-7",
      note: "A second-stage LOX tank strut failed and the vehicle broke up: Falcon 9's only in-flight loss.",
    },
    {
      name: "Amos-6",
      note: "Exploded during propellant loading before a static fire (not a flight failure), exposing an incompatibility between subcooled LOX and the composite-overwrapped pressure vessels.",
    },
    { name: "Demo-2", note: "The first crewed flight." },
  ],

  parts: {
    octaweb: {
      name: "Merlin 1D engine section (×9)",
      description:
        "Eight engines in a ring around one in the centre — the “Octaweb”. The layout is not cosmetic: the centre engine works alone during landing (throttleable to about 40%), while the eight outer engines are separated by simple steel bays so that a non-contained failure in one does not take out its neighbours. The reliability risk of many engines is bought back with structural isolation and in-flight shutdown capability.",
    },
    "landing-legs": {
      name: "Landing legs (×4)",
      description:
        "Carbon fibre and aluminium honeycomb legs stowed against the airframe and deployed by high-pressure helium about 10 s before touchdown, spanning 18 m. To save mass they cannot retract under power — early recoveries needed them removed by hand, and Block 5 made them foldable to shorten turnaround.",
    },
    "s1-body": {
      name: "First stage airframe",
      description:
        "A 3.7 m diameter friction-stir-welded 2195 aluminium-lithium tank. That diameter is not an aerodynamic optimum but **the limit of road transport** — the airframe has to clear bridges and culverts on the US interstate system, which is why Falcon 9 could only grow longer (47 m on v1.0 to 70 m on Block 5) and never wider.",
    },
    "grid-fins": {
      name: "Grid fins (×4)",
      description:
        "Cast titanium grid fins that generate aerodynamic control moments during entry. The earlier aluminium versions with ablative coating burned away on every flight and had to be replaced; titanium can fly bare and be reused indefinitely — a typical Block 5 change in service of “ten flights without overhaul”.",
    },
    interstage: {
      name: "Interstage",
      description:
        "A carbon-fibre composite interstage housing a pneumatic pusher separation system. Unlike explosive bolts, a pneumatic release can be tested and reset repeatedly on the ground and produces no debris — again, a choice made for reuse.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "A single vacuum Merlin with an expansion ratio of 165 and a radiatively cooled niobium nozzle extension. The second stage is expendable: SpaceX studied recovering it and concluded that the thermal protection and structural mass required would eat most of the payload on the Falcon architecture — a conclusion that led directly to the clean-sheet Starship design.",
    },
    "fairing-boattail": {
      name: "Fairing boattail",
      description: "The transition from the 3.7 m airframe to the 5.2 m fairing.",
    },
    fairing: {
      name: "Payload fairing",
      description:
        "A 5.2 × 13.1 m aluminium-honeycomb composite fairing in two halves. After separation cold-gas thrusters orient the halves and parafoils slow them for recovery at sea and refurbishment — a fairing set costs around six million dollars, a meaningful share of a launch, which justifies keeping a fleet of ships to fetch them.",
    },
  },

  modelNote:
    "A schematic reconstruction from the published Falcon User's Guide dimensions: 3.7 m diameter, 5.2 × 13.1 m fairing, 70 m overall. Section lengths are normalised to that 70 m total, since the published segment lengths sum to slightly more (they overlap in different conventions).",

  sources: [
    { note: "Primary source for dimensions, performance envelopes and fairing size." },
    { note: "Thrust, mass and engine count." },
    { note: "The official finding on the second-stage strut failure." },
    {
      note: "Aggregated launch statistics and reflight counts; the accounting changes over time, and the figures here are current to 30 June 2025.",
    },
  ],
};
