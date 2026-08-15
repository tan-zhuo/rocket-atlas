import type { FamilyOverlay } from "@/i18n/localize";

export const FAMILY_EN: Record<string, FamilyOverlay> = {
  "a-series": {
    displayName: "Aggregat (A-series)",
    country: "Germany",
    summary: `The Peenemünde A-series is the common ancestor of every modern launch vehicle. Between the A1 of 1933 and the A4 of 1942 — the V-2 — it took liquid rocketry from an amateur pursuit to industrial scale, and was the first programme to get pump-fed engines, regenerative cooling, inertial guidance and thrust vector control working together.

After the war the line forked in two: Redstone → Jupiter → Juno in the United States, and R-1 → R-2 → R-5 → R-7 in the Soviet Union. **Every rocket flying today traces its technical ancestry back here.**`,
    lineage: [
      { note: "Test articles that proved gyroscopic stabilisation and liquid engines." },
      { name: "A5", note: "The sub-scale A4 test vehicle; more than 25 flights." },
      {
        note: "The first large liquid ballistic missile, and the first man-made object in space.",
      },
      { note: "Extended-range and two-stage designs; few or no flights." },
      { note: "V-2 plus WAC Corporal — the first practical multi-stage rocket flight." },
      { name: "R-1 (Soviet copy)", note: "Korolev's team started here." },
      {
        name: "Redstone (US)",
        note: "Von Braun's first American missile, which later flew Shepard on a suborbital hop.",
      },
    ],
  },
  "r-7": {
    displayName: "R-7 family",
    country: "Soviet Union / Russia",
    summary: `The most-launched and longest-serving rocket family in history: more than 1,900 flights since the first ICBM of 1957, and still flying.

Its basic layout — four tapered boosters around a core, all lit on the ground — was born from a technical gap: in the 1950s nobody could reliably ignite an engine in flight. That gap closed long ago; the configuration survived because it became too mature to replace. What changed over seventy years was the control system, the upper stages and the manufacturing. What did not change was the 2.95 m core diameter and the four-chamber engines.

**It is simultaneously the strongest evidence for evolution over revolution, and the clearest demonstration of that strategy's ceiling.**`,
    lineage: [
      { note: "The first ICBM and the first satellite launcher." },
      { note: "A Blok-E upper stage added for lunar probes." },
      { note: "Gagarin's ride; the first human spaceflight." },
      { note: "Four stages, for highly elliptical orbits and planetary probes." },
      { note: "Crewed flights and reconnaissance satellites." },
      { note: "The dedicated Soyuz spacecraft launcher." },
      { note: "786 launches — the world record for a single rocket type." },
      { note: "The crew workhorse until Soyuz-2.1a replaced it." },
      { note: "The current version, with a digital flight control system." },
    ],
  },
  saturn: {
    displayName: "Saturn",
    country: "United States",
    summary: `The rocket family built for Apollo — and the only heavy-lift line in history designed by first fixing the mission and then deriving the vehicle from it.

Saturn I and IB proved out hydrogen upper stages and large-diameter airframes; Saturn V scaled that to 140 t to LEO. Its life was extremely short — first flight 1967, production halted 1970, last flight 1973 — because once the political goal was met, no mission needed it.

**Saturn V remains the largest launch vehicle ever to reach orbit, and the only one to send people beyond low Earth orbit.**`,
    lineage: [
      { note: "Eight clustered H-1 engines with a hydrolox upper stage; ten development flights." },
      {
        note: "Used the S-IVB as a second stage; flew Apollo 7, the Skylab crews and Apollo–Soyuz.",
      },
      { note: "The three-stage heavy configuration; 13 launches." },
      { note: "Two-stage configuration that launched Skylab." },
      { name: "Nova / MLV studies", note: "Larger follow-on concepts, none of them built." },
    ],
  },
  delta: {
    displayName: "Delta",
    country: "United States",
    summary: `From Thor-Delta in 1960 to Delta IV Heavy in 2024, the Delta family spans 64 years and more than 380 launches — the longest-running rocket lineage in the West.

Its evolution is characteristically American and incremental: start with the Thor intermediate-range missile as a first stage, then keep changing upper stages, adding solid boosters and widening the airframe, until Delta IV was finally redesigned from scratch as an all-hydrogen vehicle. And it was exactly that clean-sheet redesign that destroyed its cost advantage — **Delta IV was the most capable member of the family and the least viable.**`,
    lineage: [
      {
        note: "Thor as the first stage; launched Telstar, the first commercial communications satellite.",
      },
      { note: "A dozen variants, continually re-engined and re-boosted." },
      {
        note: "The workhorse of GPS and Mars exploration: 2 failures in 155 launches.",
      },
      { note: "A short-lived design: two failures in three flights." },
      { note: "The all-hydrogen single-core version, retired in 2019 on cost." },
      { note: "The three-core heavy configuration." },
    ],
  },
  ariane: {
    displayName: "Ariane",
    country: "Europe",
    summary: `Europe's answer to its dependence on American launch services. Approved in 1973, first flown in 1979, and for more than four decades the only European route to orbit.

Ariane 1–4 evolved incrementally on storable propellants; Ariane 5 was a clean-sheet redesign (hydrolox core, solid boosters) that captured much of the global commercial market on the strength of one business model — dual-payload GTO launches; Ariane 6 is a belated answer to Falcon 9.

**Each generational change took roughly a decade, which is the structural reason this family has always been half a step behind a fast-moving market.**`,
    lineage: [
      { note: "A three-stage storable-propellant vehicle; 1.8 t to GTO." },
      { note: "Solid boosters added, raising GTO capacity to 2.7 t." },
      { note: "A modular design with six booster configurations: 113 successes in 116 flights." },
      { note: "Hydrolox core plus solid boosters; the commercial dual-launch workhorse." },
      { note: "Two booster configurations and a restartable upper stage, aimed at lower cost." },
      { note: "A small solid launcher complementing Ariane." },
    ],
  },
  "long-march-2": {
    displayName: "Long March 2 series",
    country: "China",
    summary: `China's first operational launch vehicle family, derived from the DF-5 ICBM: storable nitrogen tetroxide/UDMH propellants and a 3.35 m airframe throughout.

Its most important branch is the human-rated **Long March 2F**, which added an escape tower and a fault detection system to the CZ-2E airframe and has flown every Shenzhou mission since 1999 with a perfect record.

Technically it belongs to a previous generation — toxic propellants, modest impulse, no reuse — but it remains in heavy use precisely because it is so mature. **In human spaceflight, predictability is worth more than sophistication.**`,
    lineage: [
      { note: "Derived from the DF-5; the workhorse for recoverable satellites and commercial launches." },
      { note: "SAST's improved variant, the mainstay for sun-synchronous missions." },
      { note: "The first Chinese vehicle with strap-on boosters, and the basis for the crewed version." },
      { note: "The crewed configuration, with escape tower and fault detection system." },
      { note: "The space-lab configuration without an escape tower." },
    ],
  },
  "long-march-new": {
    displayName: "New-generation Long March",
    country: "China",
    summary: `A wholesale re-basing of Chinese launch vehicles begun in the 2000s: replace UDMH with kerolox and hydrolox, and cover the entire capability range by combining modular 5 m / 3.35 m / 2.25 m airframes with three engines — YF-100, YF-77 and YF-75D.

The core of it is not any single rocket but **a shared engine and module system**: the YF-100 alone powers the Long March 5's boosters, the 6's first stage, both stages of the 7 and the 8.

The changeover also redrew China's spaceflight geography — a 5 m diameter exceeds the rail loading gauge, which is what produced the Tianjin assembly plant and the Wenchang launch site.`,
    lineage: [
      { note: "A small SSO launcher; the first of the new generation to fly." },
      { note: "A solid, rapid-response vehicle, also launched from sea platforms." },
      { note: "The heavy flagship: 25 t to LEO." },
      { note: "The all-kerolox medium workhorse for cargo and high-energy missions." },
      { note: "A medium vehicle aimed at the commercial market, with recovery planned." },
      { note: "In development: the next crewed and lunar vehicle, with first stage recovery planned." },
    ],
  },
  falcon: {
    displayName: "Falcon",
    country: "United States",
    summary: `SpaceX's kerosene family, and the first lineage to turn orbital-class booster recovery from a demonstration into routine operations.

From the failed Falcon 1 of 2006 to the definitive Falcon 9 Block 5 of 2018, the through-line is not a single technical breakthrough but **a commercial bet on the size of the launch market**: recovery only pays if flight rate is high enough, and flight rate only gets that high if you create the demand yourself (Starlink).

By 2024 a single Falcon family flew more times in one year than any nation has ever managed in total.`,
    lineage: [
      { note: "Two successes in five launches — SpaceX's fight for survival." },
      { note: "The original configuration, with no recovery hardware at all." },
      { note: "Stretched airframe, Octaweb engine layout, landing legs." },
      { note: "Subcooled propellant; the first successful booster landing." },
      { note: "The definitive version, designed for high-cadence reuse." },
      { note: "Three cores in parallel: 63.8 t to LEO." },
    ],
  },
  starship: {
    displayName: "Starship",
    country: "United States",
    summary: `SpaceX's fully reusable super-heavy transport system, and the first orbital vehicle designed from the outset around two premises: **both stages must come back**, and **it must refuel in orbit**.

The configuration went through several major rewrites: the 12 m carbon-fibre ITS of 2016, the 9 m BFR of 2017, and the switch to stainless steel at the end of 2018. Every one of them pointed at the same goal — cutting unit launch cost by one to two orders of magnitude.

It has not yet completed an orbital flight with recovery, but the launch tower has caught the booster in mid-air.`,
    lineage: [
      { note: "A single-engine test article that completed a 150 m hover hop." },
      { note: "Belly re-entry and the landing flip; success on the fifth attempt." },
      { note: "Orbital-class integrated flights that achieved hot staging and tower catch." },
      { note: "In development: stretched tanks and Raptor 3, targeting 150–200 t." },
      { note: "In development: the NASA Artemis lunar lander configuration." },
    ],
  },
  "new-glenn": {
    displayName: "New Glenn",
    country: "United States",
    summary: `Blue Origin's reusable heavy family, defined by a 7 m diameter, an unusually large fairing and a split propellant architecture — methane in the first stage, hydrogen in the second.

The company motto *Gradatim Ferociter* — step by step, ferociously — describes its pace: twenty years on the suborbital New Shepard, then one jump straight to orbital class. Reaching orbit on the first flight and recovering the booster on the second is the other kind of return that slow path can pay.`,
    lineage: [
      { note: "A reusable suborbital vehicle that proved out the BE-3 engine and vertical landing." },
      { note: "The two-stage vehicle: 45 t to LEO with a recoverable first stage." },
      { note: "In development: a lunar lander to fly on New Glenn." },
    ],
  },
  vulcan: {
    displayName: "Vulcan",
    country: "United States",
    summary: `ULA's single platform replacing both Atlas V and Delta IV. Its origin is unusually political: in 2014 the United States barred Russian RD-180 engines from military launches, and ULA had to replace either the engine or the whole rocket.

The design idea is modularity: one core and one upper stage, with 0–6 solid boosters and two fairing lengths covering 10.8–27.2 t to LEO. The upper stage, Centaur V, traces back to 1962 — **the first hydrolox upper stage ever built, and still unsurpassed.**`,
    lineage: [
      {
        note: "The highly reliable Russian-powered workhorse: one partial failure in 89 launches.",
      },
      { note: "A BE-4 methane first stage with a Centaur V hydrolox upper stage." },
      {
        name: "SMART reuse / ACES",
        note: "Proposals to recover only the engine section, and to keep an upper stage on orbit for weeks.",
      },
    ],
  },
  electron: {
    displayName: "Electron / Neutron",
    country: "New Zealand / United States",
    summary: `Rocket Lab's family. Electron used electric-pump engines and 3D printing to bring small launch vehicle manufacturing cost down, and proved for the first time that a dedicated small launcher can be a real business — a narrow one.

The company's centre of gravity is already shifting to the medium, reusable Neutron, which says most of what needs saying about the ceiling of the small launch market.`,
    lineage: [
      { note: "An 18 m small launcher: 320 kg to LEO, with parachute booster recovery." },
      { note: "A suborbital hypersonic test configuration." },
      {
        note: "In development: a 13 t reusable medium launcher with a carbon airframe and Archimedes methane engines.",
      },
    ],
  },
  zhuque: {
    displayName: "Zhuque",
    country: "China",
    summary: `LandSpace's family, and the case where a Chinese private company got ahead of the international field on a key technology.

After the solid-fuelled Zhuque-1 failed, the company skipped kerosene entirely and went to methalox. In July 2023 Zhuque-2 became **the first methalox rocket in the world to reach orbit** — ahead of Vulcan, New Glenn and Starship.

The Zhuque-3 in development uses a stainless steel airframe and first stage propulsive recovery, aimed squarely at Falcon 9's position.`,
    lineage: [
      { note: "A three-stage solid rocket; its single launch failed to reach orbit." },
      { note: "The first methalox rocket to reach orbit: 6 t to LEO." },
      { note: "A 4.2 m fairing aimed at constellation deployment." },
      {
        note: "In development: a stainless steel reusable vehicle, 3.8 m diameter, 21 t to LEO.",
      },
    ],
  },
};
