import type { EngineDetail } from "../engines";

/**
 * 发动机知识库的英文覆盖层。缺失的字段回落到中文条目。
 */
export const ENGINE_DETAIL_EN: Record<string, Partial<EngineDetail>> = {
  "F-1": {
    propellantZh: "RP-1 kerosene / liquid oxygen",
    fuel: "RP-1 refined kerosene",
    oxidizer: "Liquid oxygen",
    maker: "Rocketdyne",
    summary: "Still the most powerful single-chamber liquid rocket engine ever flown.",
    pros: [
      "6,770 kN from one chamber — five of them lift a 3,000 t vehicle, sidestepping the control and coupling problems of large engine clusters",
      "The gas-generator cycle decouples the turbine loop from the main chamber, so the two could be developed and debugged separately — a decisive risk reduction in the 1960s",
      "Brazed tube-bundle regenerative cooling: kerosene flows through thousands of nickel-alloy tubes. Heavy, but robust",
    ],
    cons: [
      "263 s at sea level, the lowest of the major large kerosene engines — the gas generator throws away about 3% of the propellant through the turbine exhaust",
      "Combustion instability held the programme up for nearly four years; radial and circumferential injector baffles finally suppressed the high-frequency oscillation, at the cost of over 2,000 test firings",
      "The brazed tube bundle depended on specific workers' craft and tooling — the direct reason Saturn V could not simply be rebuilt after the line closed",
    ],
  },
  "Merlin 1D": {
    propellantZh: "RP-1 kerosene / LOX (both subcooled)",
    fuel: "RP-1 kerosene (chilled to −7 °C)",
    oxidizer: "Liquid oxygen (subcooled to −207 °C)",
    maker: "SpaceX",
    summary: "One of the highest thrust-to-weight production liquid engines, built for high-cadence reuse.",
    pros: [
      "Thrust-to-weight around 180, among the best of any production liquid engine — which converts directly into payload",
      "Throttles to 40%, the precondition for propulsive landing: without deep throttling there is no recovery",
      "The same engine with a vacuum nozzle serves as the second stage, so one vehicle consumes ten units — volume drives both cost and reliability down the learning curve",
      "Subcooling raises propellant density by about 8%, letting the same tanks hold more and partly offsetting kerosene's modest impulse",
    ],
    cons: [
      "Kerosene leaves coking deposits; injectors and gas generator need cleaning before reflight, a step methane engines skip",
      "Gas-generator cycle: 311 s in vacuum, below staged-combustion engines in the same class (RD-180 manages 338 s)",
      "Subcooled propellant must be loaded within about 35 minutes of launch and cannot sit — which is what forced the contested “crew first, then fuel” procedure",
    ],
  },
  "Merlin 1D Vacuum": {
    propellantZh: "RP-1 kerosene / liquid oxygen",
    fuel: "RP-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "SpaceX",
    summary: "The vacuum variant: expansion ratio 165 with a radiatively cooled niobium nozzle extension.",
    pros: [
      "Shares turbopump, injector and most parts with the sea-level version — one production line, one spares pool",
      "Restartable, which enables direct GTO, GEO and deep-space injections",
      "The radiatively cooled niobium extension has no cooling channels at all: extremely simple and light",
    ],
    cons: [
      "Radiative cooling only works in vacuum; the nozzle would overheat if lit in the atmosphere",
      "348 s in vacuum, well below a hydrolox upper stage (RL10 reaches 462 s), which costs performance on high-energy missions",
    ],
  },
  Rutherford: {
    propellantZh: "RP-1 kerosene / liquid oxygen",
    fuel: "RP-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "Rocket Lab",
    summary:
      "The first electric-pump engine to fly to orbit, with all major structural parts 3D printed.",
    pros: [
      "Electric pumps replace the turbine: no gas generator, no preburner, no turbine — the hardest part of an engine is simply deleted",
      "Throttling is just motor speed: fast and precise. Starting requires only electrical power, with no pyrotechnic starter or complex sequence",
      "Chamber, injector and pump housings are printed by electron-beam melting; one engine takes about 24 hours",
      "Spent battery packs are jettisoned in flight — something no turbopump rocket can do with a used turbine",
    ],
    cons: [
      "Batteries are pure dead weight; pump power scales linearly with thrust while battery energy density is fixed, so there is a hard thrust ceiling",
      "At 24 kN each, the first stage needs nine of them, which raises plumbing and assembly complexity",
      "55 bar chamber pressure is modest, capping achievable specific impulse",
    ],
  },
  "RD-107": {
    propellantZh: "T-1 kerosene / liquid oxygen",
    fuel: "T-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "OKB-456 (Glushko)",
    summary:
      "Four combustion chambers on one turbopump — the origin of the Soviet multi-chamber tradition.",
    pros: [
      "Four already-proven small chambers in parallel sidestep high-frequency combustion instability, which nobody could solve at large scale in the 1950s",
      "One shared turbopump: the most expensive and difficult component is built once, spreading cost and development risk",
      "Conservative to a fault in structure and process, hence extremely reliable — descendants of this design are still flying",
    ],
    cons: [
      "Four thrust chambers mean complex plumbing and higher structural mass",
      "The four chambers must be closely matched in thrust or they generate parasitic moments",
      "Two additional vernier nozzles are required for attitude control — yet another propulsion subsystem",
    ],
  },
  "RD-108": {
    propellantZh: "T-1 kerosene / liquid oxygen",
    fuel: "T-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "OKB-456 (Glushko)",
    summary:
      "The core-stage sibling of the RD-107, with four verniers so it can hold three-axis control alone.",
    pros: [
      "Highly common with the booster engine in parts and process",
      "Runs from liftoff to orbit (about 300 s) with no in-flight ignition — exactly the problem the R-7 layout exists to avoid",
    ],
    cons: [
      "The nozzle expansion ratio has to compromise between sea level and altitude, and is optimal at neither",
      "Burning from the pad to orbit means a large share of the propellant is spent at poor efficiency",
    ],
  },
  "RD-107A": {
    propellantZh: "RG-1 kerosene / liquid oxygen",
    fuel: "RG-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "NPO Energomash",
    summary: "The modernised RD-107 — in seventy years its thrust has risen by under 5%.",
    pros: [
      "More than 1,900 flights of accumulated failure modes, every one analysed and designed out; no new engine can match that reliability record quickly",
      "A new injector head and higher chamber pressure bought about 3% more thrust without touching anything around it",
    ],
    cons: [
      "The whole vehicle is built around the original thrust level, so structure and tank volume cap any further growth",
      "A gas-generator cycle on a 1950s architecture: specific impulse trails contemporary staged-combustion engines",
    ],
  },
  "RD-108A": {
    propellantZh: "RG-1 kerosene / liquid oxygen",
    fuel: "RG-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "NPO Energomash",
    summary: "The core-stage version: four chambers plus four verniers, burning to T+286 s.",
    pros: [
      "Very high commonality with the booster engine",
      "Decades of continuous production give stable cost and quality",
    ],
    cons: [
      "Same as the RD-107A: configuration and performance have hit their ceiling",
      "The verniers consume additional propellant",
    ],
  },
  "RD-0124": {
    propellantZh: "RG-1 kerosene / liquid oxygen",
    fuel: "RG-1 kerosene",
    oxidizer: "Liquid oxygen",
    maker: "KBKhA",
    summary:
      "A four-chamber oxidiser-rich staged-combustion upper stage engine — among the highest vacuum impulse of any production kerosene engine.",
    pros: [
      "359 s in vacuum, about 10% above the RD-0110 it replaced, which lifted LEO capacity from 7.0 t to 8.2 t",
      "A closed cycle dumps no turbine exhaust: all propellant does useful work",
      "The four-chamber layout keeps a mature manufacturing process, and gimballing the small chambers gives three-axis control",
    ],
    cons: [
      "Hot oxidiser-rich gas attacks the turbine and demands specialised oxidation-resistant coatings — a genuine metallurgical barrier",
      "Development ran well over a decade, far riskier on schedule than improving a gas-generator engine",
    ],
  },
  "YF-100": {
    propellantZh: "Kerosene / liquid oxygen",
    fuel: "Aerospace kerosene",
    oxidizer: "Liquid oxygen",
    maker: "AALPT (6th Academy, CASC)",
    summary:
      "China's first large oxidiser-rich staged-combustion engine, and the backbone of the entire new-generation Long March family.",
    pros: [
      "A closed cycle at 180 bar gives 300 s at sea level and 335 s in vacuum — squarely in the international mainstream",
      "One engine serves the Long March 5 boosters, the 6's first stage, both stages of the 7 and the 8 — volume and reliability climb together",
      "Non-toxic propellant replaces UDMH, cutting ground-handling hazard and environmental cost dramatically",
    ],
    cons: [
      "Oxidiser-rich turbine gas raises the materials and process bar sharply, and stretched development accordingly",
      "Kerosene coking remains, and is homework still to be done before this line can move toward reuse",
    ],
  },
  "天鹊 TQ-12": {
    propellantZh: "Liquid methane / liquid oxygen",
    fuel: "Liquid methane",
    oxidizer: "Liquid oxygen",
    maker: "LandSpace",
    summary: "China's first large methalox engine to fly.",
    pros: [
      "Methane burns clean with essentially no coking, which is friendly to later reuse",
      "Methane (−162 °C) and LOX (−183 °C) differ by only 21 °C, allowing a simple common bulkhead and a shorter, lighter vehicle",
      "Choosing a gas-generator cycle rather than staged combustion kept development risk inside what a start-up could carry",
    ],
    cons: [
      "The gas-generator cycle wastes roughly 3% of the propellant; impulse trails the BE-4 and Raptor",
      "100 bar chamber pressure is not in the same league as Raptor's 300 bar plus",
      "Methane storage, loading and test-stand infrastructure had to be built from nothing domestically",
    ],
  },

  "J-2": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "Rocketdyne",
    summary:
      "America's first practical hydrolox engine, and the first large engine able to restart in vacuum.",
    pros: [
      "421 s in vacuum, about 100 s above contemporary kerosene engines — on an upper stage every 1% of impulse converts straight into payload",
      "Restartable in orbit, which is the precondition for trans-lunar injection; without it the lunar orbit rendezvous plan does not exist",
      "Mixture ratio could be shifted in flight to optimise different phases",
    ],
    cons: [
      "Liquid hydrogen's 71 kg/m³ forced enormous tanks, and drove the S-II to the extremely difficult common-bulkhead design",
      "20 K cryogenics bring hydrogen embrittlement, insulation and leakage problems; ground operations are far harder than with kerosene",
      "On Apollo 6 a helium igniter line failed by fatigue in vacuum, shutting down two engines early and preventing the third-stage restart",
    ],
  },
  "YF-77": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "AALPT (6th Academy, CASC)",
    summary:
      "China's only large hydrolox engine, and the hardest single element of the Long March 5 programme.",
    pros: [
      "430 s in vacuum lets a core stage that burns for 490 s cash in the impulse advantage as payload",
      "Non-toxic and clean, consistent with the whole new-generation Long March approach",
      "Gimballed for thrust vector control: two engines carry three-axis attitude for the core",
    ],
    cons: [
      "Only 510 kN at sea level; two of them cannot lift 869 t, so four kerosene boosters are mandatory",
      "The 2017 Y2 failure traced directly to local turbopump structural failure at high temperature and speed, grounding the vehicle for 908 days",
      "The difficulty of large hydrolox engines made the whole programme's schedule hostage to a single component",
    ],
  },
  "YF-75D": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "AALPT (6th Academy, CASC)",
    summary: "China's first expander-cycle engine, with multiple restart capability.",
    pros: [
      "No gas generator and no preburner: hydrogen vaporising in the chamber cooling jacket drives the turbine. The simplest and most reliable arrangement there is",
      "442 s in vacuum, close to the chemical limit",
      "Multiple restarts support staged injection into GTO and trans-lunar trajectories",
    ],
    cons: [
      "Turbine power is limited by heat-exchange area, which grows as the square of size while required power grows as the cube — a hard thrust ceiling, upper stages only",
      "88.36 kN each, so two are needed in parallel",
    ],
  },
  "Vulcain 2": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "Snecma (now ArianeGroup)",
    summary: "Ariane 5's single core engine, burning from the pad to T+540 s.",
    pros: [
      "431 s in vacuum lets a core that runs for nearly nine minutes exploit hydrolox fully",
      "Gas-generator exhaust film-cools the lower nozzle — the key improvement over Vulcain 1, and what allows the larger expansion ratio",
      "A single engine, so no multi-engine synchronisation or coupling problems",
    ],
    cons: [
      "Contributes only about 8% of liftoff thrust; the vehicle simply cannot leave the pad without its solid boosters",
      "The ECA maiden flight (2002) failed on thermal deformation of this nozzle, delaying return to flight by more than two years",
      "310 s at sea level — the inherent price of hydrolox in a first stage",
    ],
  },
  "RS-68A": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "Rocketdyne",
    summary: "The most powerful hydrolox engine ever built — and a textbook trade of performance for cost.",
    pros: [
      "3,137 kN at sea level, the maximum for any hydrogen engine",
      "Deliberately abandons SSME-style perfectionism: one-fifth the part count, and far lower manufacturing cost",
      "An ablatively cooled nozzle instead of regenerative cooling greatly simplifies structure and process",
    ],
    cons: [
      "412 s in vacuum against the SSME's 452 s — the direct price of that simplification",
      "The ablative nozzle is a consumable, which rules out reuse entirely",
      "Hydrogen vented before ignition burns off in a fireball that chars the tank insulation (accepted by design, alarming to watch)",
    ],
  },
  "HM7B": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "Snecma",
    summary: "A mature hydrolox upper stage engine inherited from Ariane 4, in service for over forty years.",
    pros: [
      "446 s in vacuum: excellent upper stage performance",
      "Extremely mature — one of the parts of Ariane 5 nobody had to worry about",
    ],
    cons: [
      "**Cannot restart** — a single burn straight to GTO, which rules out direct GEO injection, multi-plane deployment and end-of-life disposal burns",
      "Only 67 kN, so the burn runs 945 s",
      "Restart capability has to be designed in from the start (ullage settling, multiple igniters, longer cryogenic hold) and cannot be retrofitted",
    ],
  },
  "RL10B-2": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "Pratt & Whitney (now L3Harris Aerojet Rocketdyne)",
    summary:
      "With its deployable nozzle extension it reaches 462 s in vacuum — the specific impulse record for a chemical rocket engine.",
    pros: [
      "Expansion ratio 285 and 462 s in vacuum, close to the theoretical chemical limit",
      "Expander cycle: the heat absorbed while cooling the chamber is exactly what drives the turbine. Nothing is wasted",
      "The carbon-composite extension stows for launch and deploys before ignition, buying a huge expansion ratio without lengthening the stage",
    ],
    cons: [
      "Only 110 kN, so injection burns run very long (over 1,100 s in some profiles)",
      "The deployment mechanism is an additional single-point failure",
      "The expander cycle's thrust ceiling means it will never be anything but an upper stage engine",
    ],
  },
  "RL10C-1-1": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "L3Harris Aerojet Rocketdyne",
    summary: "The current member of the RL10 family — the same engine line has flown since 1962.",
    pros: [
      "453.8 s in vacuum: sixty years on, still the benchmark for upper stages",
      "The expander cycle is the simplest and most reliable there is, restartable and able to coast for hours",
      "Paired with Centaur's 0.5 mm stainless pressure-stabilised tanks, the whole stage has an exceptional dry mass fraction",
    ],
    cons: [
      "106 kN each, so Vulcan uses two",
      "Thrust is limited by heat-exchange area and cannot be scaled up to a booster engine",
      "Long-duration hydrogen boil-off limits loiter time — precisely the problem ACES was proposed to solve",
    ],
  },
  "BE-3U": {
    propellantZh: "Liquid hydrogen / liquid oxygen",
    fuel: "Liquid hydrogen",
    oxidizer: "Liquid oxygen",
    maker: "Blue Origin",
    summary:
      "A vacuum open-expander engine derived from the BE-3 that powers the suborbital New Shepard.",
    pros: [
      "445 s in vacuum: the second stage extracts the full hydrolox advantage",
      "An open (bleed) expander cycle reaches far higher thrust than a closed one — 710 kN each, well beyond RL10",
      "Restartable, supporting direct GEO injection and trans-lunar trajectories",
    ],
    cons: [
      "Bleeding working fluid overboard costs a little impulse relative to a closed expander",
      "Entirely different from the first stage's methane system, so the pad must support two cryogenic loading systems",
      "Hydrogen leakage and storage remain among the most troublesome problems in the business",
    ],
  },

  "Raptor 2": {
    propellantZh: "Liquid methane / liquid oxygen",
    fuel: "Liquid methane",
    oxidizer: "Liquid oxygen",
    maker: "SpaceX",
    summary: "The first full-flow staged-combustion (FFSC) engine ever to fly.",
    pros: [
      "Fuel and oxidiser each get a preburner, and both gas streams enter the main chamber — no propellant is dumped overboard",
      "Because the full flow passes through the turbines, they run hundreds of degrees cooler for the same power, which **extends life dramatically** — decisive for an engine expected to fly N times without teardown",
      "The fuel pump only ever sees fuel-rich gas and the oxidiser pump only oxidiser-rich gas, so no cross-media seal is needed — the hardest part of an oxidiser-rich staged-combustion engine",
      "Over 300 bar chamber pressure, throttleable to about 40%, which landing requires",
      "Methane burns clean without coking and can be manufactured on Mars by the Sabatier reaction",
    ],
    cons: [
      "Two preburners and two turbopumps make it the hardest cycle to develop — the Soviet RD-270 and the American IPD both built test articles and neither ever flew",
      "Extreme chamber pressure raises the bar on materials, seals and combustion stability across the board",
      "Clustering 33 of them brings start sequencing, resonance and fault-isolation problems that showed up repeatedly in early test flights",
    ],
  },
  "Raptor Vacuum (RVac)": {
    propellantZh: "Liquid methane / liquid oxygen",
    fuel: "Liquid methane",
    oxidizer: "Liquid oxygen",
    maker: "SpaceX",
    summary: "The high-expansion vacuum Raptor, used only on orbit.",
    pros: [
      "About 380 s in vacuum, the best of any methane engine",
      "Shares turbopumps and preburners with the sea-level version; only the nozzle differs, so the production line is common",
      "The regeneratively cooled large nozzle can sustain long burns",
    ],
    cons: [
      "The large nozzle would flow-separate in the atmosphere, so it cannot be lit at low altitude",
      "Its size constrains how densely the base of the vehicle can be packed",
    ],
  },
  "BE-4": {
    propellantZh: "Liquid methane / liquid oxygen",
    fuel: "Liquid methane",
    oxidizer: "Liquid oxygen",
    maker: "Blue Origin",
    summary:
      "America's answer to the loss of the RD-180, supplied simultaneously to Blue Origin's own rocket and to its competitor ULA.",
    pros: [
      "A closed oxidiser-rich staged-combustion cycle at 2,400 kN sea level, well balanced between performance and reliability",
      "Clean methane combustion underpins the 25-flight reuse target for the first stage",
      "Domestically produced, ending dependence on the Russian RD-180 — the immediate reason it exists",
    ],
    cons: [
      "Badly delayed: seven years from first hot fire in 2017 to first flight in 2024, holding up both New Glenn and Vulcan",
      "134 bar chamber pressure is well below Raptor's 300 bar, capping ultimate performance",
      "Oxidiser-rich gas is hard on turbine materials, which was a principal cause of the delay",
    ],
  },

  "YF-20B": {
    propellantZh: "Nitrogen tetroxide / UDMH",
    fuel: "Unsymmetrical dimethylhydrazine (UDMH)",
    oxidizer: "Nitrogen tetroxide (N₂O₄)",
    maker: "AALPT (6th Academy, CASC)",
    summary:
      "China's first-generation workhorse, derived from the DF-5 ICBM; four of them form the YF-21C cluster.",
    pros: [
      "Hypergolic propellants ignite on contact, so **no igniter is needed at all** — for a crewed vehicle that removes an entire class of failure mode",
      "Storable at room temperature: no cryogenic loading, no insulation, no boil-off. The vehicle can sit fuelled, which keeps the launch window flexible",
      "Decades of flight history: the failure modes are thoroughly understood",
      "All four gimbal in two axes, giving a mature thrust vector control scheme",
    ],
    cons: [
      "UDMH is acutely toxic, carcinogenic and corrosive; any leak requires specialist handling",
      "259 s at sea level and 289 s in vacuum, far below kerosene or hydrolox",
      "Debris fields are a serious problem for an inland launch site",
    ],
  },
  "YF-22B": {
    propellantZh: "Nitrogen tetroxide / UDMH",
    fuel: "Unsymmetrical dimethylhydrazine (UDMH)",
    oxidizer: "Nitrogen tetroxide (N₂O₄)",
    maker: "AALPT (6th Academy, CASC)",
    summary: "The second-stage main engine: fixed, taking no part in attitude control.",
    pros: [
      "A fixed main engine needs no gimbal ring or flexible lines: simpler and more robust",
      "738 kN in vacuum is enough, with the verniers, for orbital insertion and terminal velocity trim",
    ],
    cons: [
      "Attitude control depends entirely on four vernier engines — an entire extra propulsion system",
      "Impulse limited by the hypergolic propellants",
    ],
  },
  "YF-23B": {
    propellantZh: "Nitrogen tetroxide / UDMH",
    fuel: "Unsymmetrical dimethylhydrazine (UDMH)",
    oxidizer: "Nitrogen tetroxide (N₂O₄)",
    maker: "AALPT (6th Academy, CASC)",
    summary: "Second-stage vernier engines: four gimballed units for attitude and terminal trim.",
    pros: ["Fine thrust gives high injection accuracy", "Shares the propellant system with the main engine"],
    cons: [
      "Consumes additional propellant",
      "Four small propulsion systems' worth of lines and valves are a reliability weak point",
    ],
  },
  "天鹊 TQ-11": {
    propellantZh: "Liquid methane / liquid oxygen",
    fuel: "Liquid methane",
    oxidizer: "Liquid oxygen",
    maker: "LandSpace",
    summary: "Second-stage vernier engines for attitude control and terminal velocity trim.",
    pros: [
      "Shares propellant with the main engine, keeping the system uniform",
      "Low thrust allows precise orbital insertion",
    ],
    cons: [
      "Thin lines, violently varying duty cycle, and flow behaviour in cryogenic methane that was entirely new",
      "Zhuque-2's maiden flight failed here — **the failures of a new-technology programme rarely happen in the new technology; they happen in the supporting system everyone assumed was already solved**",
    ],
  },
  Curie: {
    propellantZh: "Green monopropellant / bipropellant",
    fuel: "Undisclosed proprietary green propellant",
    oxidizer: "As above",
    maker: "Rocket Lab",
    summary:
      "A small restartable engine on the Kick Stage that delivers each smallsat to its own precise orbit.",
    pros: [
      "Multiple restarts allow arbitrary orbital plane deployment — precisely what a dedicated small launcher sells over rideshare",
      "Non-toxic propellant keeps ground handling simple",
      "Can deorbit itself after the mission, leaving no debris",
    ],
    cons: [
      "120 N means long manoeuvre times",
      "The propellant formulation is undisclosed, so third parties cannot independently assess performance",
    ],
  },
  "A4 发动机": {
    propellantZh: "75% ethanol / liquid oxygen",
    fuel: "75% aqueous ethanol",
    oxidizer: "Liquid oxygen",
    maker: "Peenemünde Army Research Center",
    summary:
      "The first large pump-fed liquid rocket engine, and the ancestor of every rocket engine since.",
    pros: [
      "Eighteen cup-shaped injector pots divided the combustion into zones, sidestepping the large-chamber instability nobody could then solve",
      "The turbopump ran on steam from catalytically decomposed hydrogen peroxide, fully decoupled from the main propellants so the two could be developed separately",
      "Diluting the ethanol with water lowered flame temperature to about 2,700 °C rather than kerosene's 3,400 °C, which let primitive regenerative cooling survive 65 s",
      "Wartime Germany was short of oil but could ferment ethanol from potatoes — a resource constraint that walked straight into the technical design",
    ],
    cons: [
      "Only 203 s at sea level; the 25% water was purely impulse traded for chamber life",
      "245 kN for 65 s: severely limited capability",
      "The peroxide system is an entire extra chemical plant — heavy and hazardous",
    ],
  },

  "P241 固体发动机": {
    propellantZh: "HTPB composite solid propellant",
    fuel: "HTPB (hydroxyl-terminated polybutadiene) with aluminium powder",
    oxidizer: "Ammonium perchlorate",
    maker: "Europropulsion",
    summary:
      "Ariane 5's two EAP boosters, 240 t of grain each, providing 92% of liftoff thrust.",
    pros: [
      "Enormous thrust density: solid propellant is 25 times denser than liquid hydrogen, so the same volume produces far more thrust",
      "Structurally trivial — no turbopump, no valves, no cryogenic insulation: a steel case full of propellant with a nozzle on the end",
      "Storable for years, with short launch preparation",
      "France already had a solid-motor industrial base from its ballistic missile programme, directly transferable",
    ],
    cons: [
      "275 s specific impulse, the lowest of any mainstream option",
      "**Ignition is irreversible**: no shutdown, no throttling. Any anomaly can only be resolved by the flight termination system — which is exactly why the crewed configuration was so hard to justify",
      "The thrust curve is written into the grain geometry at casting and cannot be changed in flight",
      "Several hundred tonnes of solid propellant in an assembly building is, in effect, a very large bomb",
    ],
  },
  "GEM 63XL": {
    propellantZh: "HTPB composite solid propellant",
    fuel: "HTPB with aluminium powder",
    oxidizer: "Ammonium perchlorate",
    maker: "Northrop Grumman",
    summary:
      "Filament-wound composite-case solid boosters; Vulcan covers its whole payload range with 0 to 6 of them.",
    pros: [
      "The count is configurable from zero to six, so one core covers 10.8–27.2 t to LEO",
      "A filament-wound composite case is far lighter than steel, improving booster mass fraction",
      "No pumps or valves: low unit cost and short preparation time",
    ],
    cons: [
      "Fixed nozzles that do not gimbal, so all attitude control falls on the core's two BE-4s",
      "279 s specific impulse, and every booster count requires its own aerodynamic analysis and certification",
      "A nozzle detached in flight on Cert-2 — an ablative nozzle working through 90 s of high heat flux does not have generous margin",
    ],
  },
};
