import type { RocketOverlay } from "@/i18n/localize";

export const spaceShuttleEn: RocketOverlay = {
  displayName: "Space Shuttle",
  country: "United States",
  agency: ["NASA", "Rockwell International", "Thiokol", "Martin Marietta"],
  description:
    "The only vehicle that ever carried wings, a cargo bay and seven people to orbit and flew them home; also the vehicle that made the word “reusable” carry a negative connotation for the next thirty years.",

  history: `The Shuttle was approved on an assumption that was later disproved: **if you fly often enough, reusable must be cheaper than expendable.**

After Apollo 11, the roadmap NASA handed the Nixon administration was “space station + shuttle + lunar base + crewed Mars.” Everything was cut except the shuttle — **a vehicle designed to service a station, built in the absence of a station.**

To survive budget hearings, NASA accepted two fatal external conditions:

- **The Air Force's requirements.** The military wanted 27 t of payload, an 18 m bay, and 1,900 km of cross-range so the orbiter could launch into a polar orbit and land back at Vandenberg after one revolution. The first set the airframe size; the second dictated those enormous delta wings. In exchange the Air Force promised to move all military payloads to the Shuttle.
- **A development cost ceiling.** Development was capped at 5.1 billion 1971 dollars. The fully reusable two-stage design (with a fly-back booster) was cut as too expensive to develop, replaced by “solid boosters plus an expendable tank.” **Cheap development bought expensive operations**, and that trade defined the next thirty years.

Columbia flew on 12 April 1981 — **the only time in history a new launch vehicle has flown crewed on its first flight, with no prior uncrewed orbital test.**

The plan was 50 flights a year at 10 million dollars each. The reality was 135 flights in 30 years, 4.5 a year, at roughly **1.5 billion dollars** per flight when total programme cost is divided by flights — two orders of magnitude off.

Two losses killed 14 astronauts: Challenger broke up at T+73 s on 28 January 1986, Columbia during re-entry on 1 February 2003. Both accident reports concluded that the technical flaws were already well known, and what actually failed was an organisational culture that **treated “it has happened repeatedly without killing anyone” as evidence of safety.**

Atlantis landed for the last time on 21 July 2011. The United States had no crewed launch capability of its own for the next nine years.`,

  designPhilosophy: `The Shuttle's core logic was: **make every expensive part of a launch vehicle reusable, at the cost of making those parts satisfy two completely different sets of requirements — going up and coming back.**

The logic itself is sound. What was wrong was the specific configuration that implemented it: **side-mounted payload.**

A conventional rocket stacks in series: payload on top, every stage below thrown away. The Shuttle hung its payload (the orbiter) on the side of the tank, and that single decision cascaded:

1. **The main engines had to come home with the orbiter.** The three RS-25s were the most expensive hardware in the system, so making them reusable sounded like a bargain; but from then on they had to survive heat and vibration on every re-entry, and could never be staged away — their mass had to be carried all the way to orbit even though their propellant came from the tank.
2. **The orbiter sat downstream of the boosters and the tank.** Anything shedding from the tank would hit it at hundreds of metres per second. Columbia died of that geometry. In a series stack, debris falls behind the vehicle.
3. **There was nowhere to put an escape system.** Tank above, solids below, wings on the side. And a solid motor cannot be shut down once lit — Challenger's crew compartment separated intact, and there was no means of bringing it down safely.

**The result was a 78 t aeroplane flown to orbit as an upper stage, where the 27.5 t of payload capacity was accompanied by 78 t of aeroplane.** About 110 t reached orbit on a typical mission, of which roughly 25% was payload. Expendable rockets of the era were above 90%.

What did it buy? Three things available nowhere else:

- **Downmass** (14.4 t) — five Hubble servicing missions, satellite retrieval, long-duration exposure experiments returned;
- **Large-scale orbital assembly** — the ISS truss structure had no other transport;
- **Seven people plus cargo on one flight** — crew rotation, resupply and module installation in a single mission.

**Those capabilities were real and unique and genuinely worth a lot; the problem was that the Shuttle was sold as a general-purpose launcher when it was actually a specialised construction vehicle.**`,

  tradeoffs: [
    {
      question: "Why did “reusable” turn out to be more expensive?",
      answer: `The intuition goes: a rocket costs 100 million to build, so throwing it away costs 100 million a flight; fly it ten times and it costs 10 million a flight. The Shuttle's arithmetic did not work that way.

The problem is that **reuse is not the same as not inspecting.** An expendable rocket needs one acceptance test because it flies once. A vehicle that will fly again must prove, after each flight, that **it can fly again** — and the proving is where all the cost lives:

- **Main engines**: rated at 55 starts, but in practice removed after every flight, turbopumps disassembled, inspected, reassembled and hot-fired.
- **Thermal tiles**: 24,300 of them, each with a unique shape and serial number. Every one visually inspected after each flight, damaged ones replaced, re-bonded, cured, accepted.
- **Solid boosters**: soaked in seawater, then fully disassembled, cleaned, inspected, re-cast and re-stacked. Some analyses concluded that recovering them cost more than building new ones.

The operational number: roughly **25,000 person-months of ground work per mission**, with a median turnaround from landing to launch of over 90 days against an original target of 14.

The deeper problem is that **fixed costs cannot be amortised away.** Most of the Shuttle's annual budget did not vary with flight rate: the people, facilities, supply chain and certification apparatus across four centres. That was 3–4 billion dollars a year whether you flew once or eight times. So per-flight cost was governed almost entirely by **flight rate**, and the flight rate never came close to the design value.

$$\\text{cost per flight} \\approx \\frac{\\text{fixed cost}}{N} + \\text{marginal cost}$$

The design assumed $N = 50$; reality delivered $N = 4.5$. **A factor of ten in the denominator is a factor of ten in the answer.**

Falcon 9 attacked exactly these two problems: a first stage with no wings, no active thermal protection and no seawater immersion (land or dry droneship recovery), reducing refurbishment to “inspect and static fire,” while high cadence spread the fixed costs. **Whether reuse pays is not a question about the concept; it is a question about two numbers — refurbishment effort and flight rate.**`,
    },
    {
      question: "Why were the solid boosters segmented? Were the O-rings inevitable?",
      answer: `No. **Segmentation was determined by where the factory was, not by engineering.**

In the 1973 booster competition NASA selected Thiokol, in Utah. Utah is landlocked, so the only route from factory to Kennedy Space Center was rail — and rail tunnels limit the diameter and length of a single piece. **A 45 m motor cast in one piece could not be shipped.** So it was built in four segments, mated at the pad, with two rubber O-rings per joint sealing 60 bar of combustion gas.

A competing bid from Aerojet proposed a coastal Florida plant, monolithic casting and barge shipment — no joints at all. It was not selected.

The mechanics of the joint were understood before flight: at ignition the chamber pressure spikes, the case expands radially and the joint briefly opens by about 0.6 mm. Sealing during those milliseconds depends on the O-ring being extruded into the gap by pressure, which depends strongly on the rubber's resilience — which degrades sharply as temperature falls.

Joint rotation was identified in 1977; primary O-ring erosion was found after flights from 1984 onward; the worst blow-by followed a cold launch in January 1985. **Every instance of “it eroded but nothing happened” was logged as “margin exists” rather than “we are outside the envelope.”** Richard Feynman called this reasoning from a lucky outcome to a correct design.

The ambient temperature on 28 January 1986 was −0.6 °C, 12 degrees below the coldest previous launch. Engineers explicitly recommended a delay the night before, citing exactly the resilience data; management asked them to **prove it was unsafe** rather than prove it was safe. **The reversal of the burden of proof is the most quoted conclusion in the report.**`,
    },
    {
      question: "Were those enormous delta wings actually needed?",
      answer: `Judged by the missions the Shuttle actually flew: **no.**

Wing size was set by one requirement — **cross-range**, the distance the vehicle can deviate from its orbital plane during re-entry. The Air Force asked for 1,900 km, derived from a specific scenario: launch from Vandenberg into a polar orbit, complete one revolution (about 90 minutes) and land back at Vandenberg. In those 90 minutes the Earth rotates 22.5°, which at that latitude moves the landing site roughly 1,900 km east, and the vehicle has to fly back aerodynamically.

NASA's own missions needed about 1,100 km, achievable with far smaller straight wings. For the extra 800 km:

- Wing area and structural mass grew substantially, eating directly into payload;
- Generating that lateral lift required large bank-angle manoeuvres during entry, driving leading-edge heating up and forcing the use of expensive, brittle reinforced carbon-carbon panels;
- The area of the whole thermal protection system grew accordingly.

**And the scenario never happened once.** The Vandenberg Shuttle pad (SLC-6) was built, modified, cost about 4 billion dollars, and was abandoned after Challenger without a single Shuttle launch. The Air Force moved its payloads back to expendables (Titan IV), while the Shuttle carried wings designed for the Air Force for another 25 years.

**This is the canonical case of a requirement being cast in metal**: a performance figure imported from outside the programme to buy political support, which stayed as mass and risk on every flight long after the need had evaporated.`,
    },
    {
      question: "The RS-25 was so advanced — why did nobody follow that route again?",
      answer: `They still are — SLS flies the RS-25s left over after Shuttle retirement, and throws four away per mission. **Which is precisely the point: it is so good that nobody is willing to build new ones for expendable use.**

Its numbers remain the benchmark:

| | RS-25 | RS-68A (the simplified route) |
|---|---|---|
| Chamber pressure | 207 bar | 97 bar |
| Vacuum Isp | 452.3 s | 412 s |
| Cycle | Fuel-rich staged combustion | Gas generator |
| Nozzle cooling | Regenerative | Ablative |
| Unit cost (production estimate) | 40–50 M USD | ≈ 15 M USD |

Staged combustion wastes nothing: the preburner gas drives the turbine and then burns in the main chamber. The cost is that **every component operates at high pressure and temperature**: 35,000 rpm turbopumps, a 55 MW hydrogen pump (about the power of three destroyers), turbine inlet temperatures at the edge of the material. Such a machine can reach very high performance, but it has no margin anywhere.

Its service history is a maintenance history: rated at 55 starts, it repeatedly showed turbine blade cracks, injector erosion and bearing wear, and had to be removed and disassembled after every flight. **“Reusable” here meant “refurbishable,” not “ready to fly again.”**

The industry split two ways afterwards:

- **Want performance, accept expendable** — SLS discards RS-25s, since it flies once a year anyway;
- **Want economics, lower the numbers** — RS-68 deliberately cut chamber pressure to 97 bar and used an ablative nozzle, trading 40 s of impulse for one fifth the part count.

**The move that actually changed the game was a third one: stop optimising the single engine and optimise the production rate.** Merlin 1D gives up 100 s of Isp relative to RS-25, but a Falcon 9 uses ten of them and the factory builds hundreds a year — volume buying both cost and reliability, instead of performance buying everything.`,
    },
  ],

  contemporaries: `**Energia–Buran** (USSR, 1988) looked like a copy but changed the one thing that mattered: **all main engines sat on the core, and the orbiter was merely a payload.** That meant Energia could fly without Buran as a heavy-lift rocket in its own right (which it did on its 1987 debut), and Buran could land fully automatically with no crew aboard (which it did in November 1988, something the Shuttle never demonstrated). The price was that the engines were not reused. **Same silhouette, completely different system logic.**

**Saturn V** (1967) carried 4.5 times the payload and retired 14 years earlier, because it was expensive and could do exactly one thing. The Shuttle tried to be the universal answer, and proved that universality is itself the most expensive requirement.

**Soyuz** (1967–present) went the opposite way: small, simple, expendable, barely changed. It carried the entire ISS crew rotation on its own during both Shuttle stand-downs (1986–88, 2003–05) and again from 2011 to 2020. **In reliability engineering, “not changing” is itself a strategy.**`,

  milestones: [
    { title: "Nixon approves the programme", note: "After budget cuts, the half-reusable configuration (solids plus expendable tank) is locked in." },
    { title: "Enterprise approach-and-landing tests", note: "Released from a 747 to validate unpowered approach and landing." },
    { title: "Columbia's first flight (STS-1)", note: "The only crewed maiden flight of a new launch vehicle, with no prior uncrewed orbital test." },
    { title: "Loss of Challenger", note: "Broke up at T+73 s, seven lost; 32-month stand-down and a booster joint redesign." },
    { title: "Hubble Space Telescope deployed", note: "Followed by five servicing missions, all flown by the Shuttle." },
    { title: "First US ISS module", note: "The Unity node delivered and mated by Endeavour." },
    { title: "Loss of Columbia", note: "Broke up during re-entry, seven lost; the investigation pointed to the same organisational culture as Challenger." },
    { title: "Atlantis' final landing", note: "STS-135 ends the programme; US crewed capability lapses until 2020." },
  ],

  launchesNotable: [
    { name: "STS-1", note: "Crewed maiden flight; the uncrewed orbital test was skipped." },
    { name: "STS-51-L (Challenger)", note: "Right-hand booster joint blow-by, tank breakup." },
    { name: "STS-31", note: "Deployed the Hubble Space Telescope." },
    { name: "STS-61", note: "First Hubble servicing mission, installing corrective optics." },
    { name: "STS-107 (Columbia)", note: "Ascent foam strike breached the left wing leading edge; lost during entry." },
    { name: "STS-135", note: "Final mission, flown by Atlantis." },
  ],

  variants: [
    { name: "Columbia (OV-102)", note: "First orbital vehicle, structurally heavier; 28 flights, 1981–2003." },
    { name: "Challenger (OV-099)", note: "Converted from a structural test article; 10 flights, 1983–1986." },
    { name: "Discovery (OV-103)", note: "The most-flown orbiter, 39 flights." },
    { name: "Atlantis (OV-104)", note: "33 flights, including the final mission." },
    { name: "Endeavour (OV-105)", note: "Assembled from spares after Challenger; 25 flights." },
  ],

  stages: [
    {
      nameZh: "Solid boosters + main engines (parallel burn)",
      propellantZh: "PBAN ammonium perchlorate composite / LH2 · LOX",
      note: "The two solids supply 83% of liftoff thrust and separate at T+127 s for parachute recovery; the three main engines burn from ignition to T+510 s.",
      engines: [
        { cycleZh: "Solid", note: "The largest solid rocket motor ever flown, cast in four segments and mated at the pad." },
        { cycleZh: "Fuel-rich staged combustion", note: "207 bar chamber pressure and 452 s vacuum Isp — the most efficient production liquid engine ever built." },
      ],
    },
    {
      nameZh: "Orbital Manoeuvring System",
      propellantZh: "Monomethylhydrazine / nitrogen tetroxide",
      note: "At main engine cutoff the orbiter is still about 100 m/s short of orbit; the two OMS engines close that gap and later perform the deorbit burn.",
      engines: [
        { cycleZh: "Pressure-fed", note: "Hypergolic and pressure-fed — structurally minimal and therefore extremely reliable, good for hundreds of restarts." },
      ],
    },
  ],

  parts: {
    "srb-nozzle": {
      name: "Solid booster nozzles (×2)",
      description:
        "The solid motor nozzles gimbal ±8°, and are the principal attitude control during ascent — the two boosters supply 83% of liftoff thrust, so the main engines' authority is comparatively limited. The throat insert is carbon-phenolic ablative and loses several centimetres per flight.",
    },
    "srb-body": {
      name: "Solid Rocket Booster (×2)",
      description:
        "The largest solid rocket motors ever used: 502 t of propellant each, 12,450 kN at sea level. **The transverse joints on the case are where Challenger was lost** — the boosters were cast in four segments in Utah, shipped by rail to Florida and mated on site, with two rubber O-rings sealing 60 bar of gas. The ambient temperature on 28 January 1986 was −0.6 °C, the rubber lost resilience, and the right-hand joint began venting flame 0.678 s after ignition. **Segmentation was not a technical necessity; it was the direct consequence of a political decision to put the factory in Utah.**",
    },
    "srb-nose": {
      name: "Booster nose cone and parachute bay",
      description:
        "Three main parachutes live in the nose cone. The boosters separate at T+127 s and 45 km, splash down in the Atlantic and are towed back, disassembled, re-cast and reflown. This is the only large component of the Shuttle system that was genuinely reused — but the cleaning and inspection burden imposed by seawater immersion meant the reuse saved very little money on paper.",
    },
    "et-lh2": {
      name: "External Tank — liquid hydrogen",
      description:
        "The hydrogen tank occupies three quarters of the External Tank's length and holds 102 t. The tank is the only expendable element of the system and the only “stage” with no engines of its own — the three main engines live on the orbiter's tail and draw propellant through 43 cm feed lines. The first two tanks were painted white; from STS-3 onward the paint was deleted, exposing the orange spray-on foam insulation and saving 270 kg.",
    },
    "et-intertank": {
      name: "Intertank",
      description:
        "The structure joining the hydrogen and oxygen tanks, and the load path for the boosters' forward attachments — 25,000 kN of thrust passes through here at liftoff. **The foam that doomed Columbia came from the bipod ramp region of this section**: 700 g of insulation struck the left wing leading edge at about 240 m/s and punched a hole 15–25 cm across in the carbon-carbon panel.",
    },
    "et-lox": {
      name: "External Tank — liquid oxygen",
      description:
        "The ogive-nosed oxygen tank holds 616 t. Putting the dense oxidiser at the top is deliberate: it moves the stack's centre of mass forward for aerodynamic stability, and shortens the oxygen feed line running down the orbiter side.",
    },
    "orbiter-engines": {
      name: "Space Shuttle Main Engines (×3)",
      description:
        "Three RS-25s: 207 bar chamber pressure, 452 s vacuum Isp, **the most efficient production liquid rocket engine ever built.** Fuel-rich staged combustion sends all preburner gas into the main chamber, wasting nothing. The price is that it is extraordinarily expensive and extraordinarily delicate: rated at 55 starts, but removed and disassembled after every single flight, with turbopump life measured in hours. **This is what “performance first” looks like taken to its limit.**",
    },
    "orbiter-body": {
      name: "Orbiter fuselage and payload bay",
      description:
        "The bay is 18.3 m long and 4.6 m across, carrying 27.5 t up and 14.4 t back down — **and nothing else in the world has ever had that downmass capability.** The five Hubble servicing missions, the assembly of the ISS truss, and the only occasion on which satellites were retrieved from orbit, repaired and redeployed (STS-51A / 32) all rested on this bay and the 15 m Canadarm.",
    },
    "orbiter-belly": {
      name: "Underside thermal tiles",
      description:
        "24,300 high-purity silica tiles, each a different shape, each individually numbered, each individually bonded and inspected. Their conductivity is so low that a glowing tile can be held by its corners — but they are extremely fragile. **The maintenance burden of this system is the single biggest reason the Shuttle never “operated like an airliner,”** and one of the two losses came directly from it.",
    },
    "orbiter-nose": {
      name: "Orbiter nose and crew compartment",
      description:
        "A two-deck crew module, nominally seven people. There is no escape system — **the most contested decision in the entire design**: with the tank above, solids below and wings alongside, neither ejection seats nor separation could extract the crew while the solids were burning. The bail-out pole added after Challenger only works when the vehicle is already in controlled gliding flight.",
    },
    "orbiter-wing-port": {
      name: "Delta wing (port)",
      description:
        "A 23.8 m double-delta wing. Its size was not aerodynamically optimal but an Air Force requirement: **once-around abort** — launch into a polar orbit from Vandenberg, complete one revolution and land back there, by which time the Earth's rotation has moved the runway about 1,900 km, so the vehicle needs that much cross-range to fly back. That military requirement was never once exercised, and it added wing mass and entry heating to every single flight.",
    },
    "orbiter-wing-stbd": {
      name: "Delta wing (starboard)",
      description:
        "The leading edges are reinforced carbon-carbon panels good to 1,650 °C. After panel 8 on Columbia's left wing was breached by foam, entry plasma entered the wing interior and burned the structure from the inside out.",
    },
    "orbiter-tail": {
      name: "Vertical stabiliser",
      description:
        "The trailing edge is a split panel that serves as both rudder and speed brake: closed it is a rudder, open it is a brake. The Shuttle touched down at about 350 km/h with no possibility of going around — every landing was an unpowered, one-shot approach.",
    },
  },

  modelNote:
    "Reconstructed from the published 56.1 m stack height, 8.4 m tank diameter, 3.71 m booster diameter and 23.8 m wingspan. The orbiter is a side-mounted payload; the wings are approximated by two swept surfaces and the fuselage detail is simplified.",

  sources: [
    { title: "Space Shuttle Reference Manual", publisher: "NASA / Kennedy Space Center", note: "Primary source for dimensions, masses, thrust and system architecture." },
    { title: "Report of the Presidential Commission on the Space Shuttle Challenger Accident", publisher: "Rogers Commission, 1986", note: "O-ring failure mechanism and the decision process; Feynman's Appendix F treats reliability estimation separately." },
    { title: "Columbia Accident Investigation Board Report, Volume I", publisher: "NASA, 2003", note: "The physics of foam shedding and RCC breach, and the conclusions on organisational culture." },
    { title: "Space Shuttle Program Cost Analysis", publisher: "NASA Technical Reports Server", note: "Per-flight cost varies enormously with accounting basis; this page uses total programme cost divided by 135 flights." },
  ],

  tags: ["Reusable", "Crewed", "Parallel stage", "Solid boosters", "Retired"],
};
