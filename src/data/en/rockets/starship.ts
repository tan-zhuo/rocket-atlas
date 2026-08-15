import type { RocketOverlay } from "@/i18n/localize";

export const starshipEn: RocketOverlay = {
  displayName: "Starship / Super Heavy",
  country: "United States",
  description:
    "The largest and most powerful launch vehicle ever built, and the first orbital transport system designed from the outset around full reusability and orbital refuelling.",

  history: `Starship has been renamed and re-materialised several times. Announced in 2016 as ITS — the Interplanetary Transport System — it was 12 m in diameter, carbon fibre, and rated at 300 t of payload; in 2017 it shrank to the 9 m BFR; at the end of 2018 SpaceX abruptly abandoned the carbon-fibre airframe it had already built hardware for and switched to **stainless steel**.

In July 2019 the water-tower-shaped Starhopper completed a 150 m hop. Through 2020–2021 SN8 to SN15 repeatedly tested the belly-flop re-entry and landing flip; the first four ended in explosions on landing, and SN15 recovered intact in May 2021.

The first orbital-class integrated flight came on 20 April 2023: multiple engine failures, no stage separation, and a flight termination system that fired late. Every flight since has been about fixing what the last one exposed — flight 2 (Nov 2023) demonstrated hot staging but lost both stages later in flight; flight 3 (Mar 2024) reached near-orbital velocity; flight 4 (Jun 2024) brought both stages to controlled splashdowns; flight 5 (Oct 2024) saw **the launch tower catch the booster in mid-air for the first time**.

Starship has not yet completed a full orbital mission with recovery. It is simultaneously NASA's Artemis lunar lander (HLS), which ties America's return-to-the-Moon schedule directly to its progress.`,

  designPhilosophy: `Starship's design logic reduces to one sentence: **if launch cost is to fall to a hundredth of today's, then no hardware can be thrown away.**

Falcon 9 recovers the first stage (60–70% of cost) and discards the second stage and fairing on every flight, which puts a floor under marginal cost. Starship starts from that floor and works backwards: both stages must return, so the second stage must survive orbital re-entry; a structure that survives re-entry must be cheap and heat-tolerant; a cheap, heat-tolerant structure at that size can only be stainless steel.

The second premise is **orbital refuelling**. A 9 m two-stage vehicle putting 100 t into LEO is close to the limit; going to the Moon or Mars means topping the tanks up in orbit. That in turn requires propellant that can be stored for long periods, transferred in free fall, and be cheap enough to launch a dozen tanker flights per mission — methane is the only candidate that satisfies all three, being easier to store than hydrogen and cleaner than kerosene.

The third is **high-cadence cheap flight testing in place of ground analysis**. Saturn V had full-scale structural and dynamic test articles and full-thrust stand firings; a Starship airframe costs a few million dollars, so the programme flies, breaks things and revises. That is not recklessness — when unit cost is low enough, flight testing becomes the fastest source of information.`,

  tradeoffs: [
    {
      question: "Why abandon carbon fibre for heavy, “obsolete” stainless steel?",
      answer: `The 2018 decision astonished the industry: carbon composite has several times the specific strength of stainless steel, and essentially all modern aerospace structure has been moving toward composites.

But Starship's constraint is not room-temperature specific strength — it is **specific strength, cost and repairability across a range from −180 °C to +1,400 °C**:

- **Cold.** 304L stainless actually gains roughly 50% in strength at liquid oxygen temperatures (cryogenic strengthening), while carbon composites face resin microcracking and permeation in deep cryogenics.
- **Hot.** The windward face sees over 1,300 °C during entry. Carbon composite softens above about 150 °C and must be fully protected by a thick thermal protection system; steel retains around half its strength at 800 °C, so tiles can be thinner and the leeward side can even fly bare. Between the two effects, most of steel's mass penalty is bought back by a lighter TPS.
- **Cost.** Aerospace-grade carbon prepreg runs around 130 dollars a kilogram and needs large autoclaves; 304L sheet is about 3 dollars a kilogram and can be welded in an open-air tent.
- **Iteration speed.** Steel can be cut, welded and changed in place. Once a composite mould is made, changing the design means making a new mould.

The price is very real: Starship's dry mass fraction is far worse than a composite design, with a second stage dry mass around 100 t against Falcon 9's second stage at a few tonnes. That eats an enormous amount of payload — but if it buys a stage that flies home and flies again, the arithmetic still closes.`,
    },
    {
      question: "Why full-flow staged combustion?",
      answer: `Raptor is the first full-flow staged-combustion engine ever to fly. In this cycle fuel and oxidiser each get **their own preburner** — one fuel-rich, one oxidiser-rich — and both turbine exhaust streams are then injected **entirely into the main chamber**. No propellant is dumped.

Against the other cycles:

| Cycle | Where turbine exhaust goes | Examples |
|---|---|---|
| Gas generator | Overboard; about 3% of flow lost | F-1, Merlin |
| Staged combustion (single preburner) | All into the main chamber | RD-180, SSME |
| Full-flow staged combustion | Both streams into the main chamber | Raptor |

The real benefit is not only that 3% of impulse:

1. **Turbine temperatures are low.** Because the full flow passes through the turbines rather than a small bleed, the same power can be extracted hundreds of degrees cooler, which extends turbine life enormously — decisive for an engine meant to fly N times without teardown.
2. **No oxidiser-rich gas touches the fuel pump.** The fuel pump is driven by fuel-rich gas and the oxidiser pump by oxidiser-rich gas, so no cross-media seal is required — the hardest single problem in oxidiser-rich engines like the RD-180.
3. **Deep throttling.** Raptor throttles across roughly 40–100%, which landing requires.

The price is two preburners and two turbopumps, extremely high chamber pressure (Raptor 3 targets over 350 bar), and the highest development difficulty of any cycle. The Soviet RD-270 and the American IPD both built full-flow test articles; neither ever flew.`,
    },
    {
      question: "Why no landing legs — why catch it with tower arms?",
      answer: `Super Heavy has no landing legs at all. It hovers beside the tower, two large mechanical arms close, and the vehicle is caught on two small load pins near its top.

The scheme looks extreme and the logic is simple: **move mass from the rocket to the ground.** A leg set capable of absorbing the landing impact of a 200 t empty booster masses on the order of 10 t, and it flies up and back on every mission — while every kilogram of first-stage dry mass costs roughly 20–50 g of payload. Tower arms, however heavy, never leave the ground.

The second reason is **turnaround**. A booster landed somewhere else has to be lifted, transported, erected and stacked; a booster caught by the tower is already at the pad and can in principle be set back down, refuelled and flown. SpaceX's stated goal is a booster reflight within an hour.

The price is concentrated risk: a single failure can destroy both the booster and the only launch tower, and rebuilding a tower takes months. Which is why the first catch attempt carried extremely strict abort criteria — any failed health check and the booster would have diverted to a water landing instead.`,
    },
    {
      question: "Does “iterate fast, blow things up” hold up for human spaceflight?",
      answer: `This is the most contested part of the programme. Conventional crewed vehicle assurance runs analysis → ground test → limited flight test → crew, arguing the risk down at each step. Starship's logic is: build a batch of cheap vehicles, fly them, see how they break, and revise.

Two premises support that route:

1. **Unit cost is low enough.** An airframe is estimated at tens of millions of dollars, with a production line aimed at one a week. When hardware is cheaper than a test stand, flight testing is the most cost-effective way to buy information.
2. **The failures are uncrewed.** Every explosion so far has happened without people aboard.

But there is a hard step between “mature uncrewed test programme” and “certified for crew”: crew certification requires demonstrating that **very-low-probability events will not happen**, and that argument cannot be made from a dozen flights of statistics. Starship also has no escape system — its size and configuration make a conventional escape tower essentially impossible, so it must rely on an aviation-style argument that overall reliability is simply high enough (the way airliners carry no ejection seats). The flight sample size that argument needs may run into the hundreds.

**The more useful framing, then, is that fast iteration solves “make it fly”, while crew certification needs an entirely different methodology.** How the two are joined is the biggest open question of the next decade of this programme.`,
    },
  ],

  contemporaries: `The only vehicle in the same class in development is NASA's **SLS**: 95 t to LEO (Block 1), fully expendable, over two billion dollars a launch, with a production capacity of roughly one a year. The comparison is about as extreme a juxtaposition of two philosophies as launch vehicle history offers — SLS reuses proven Shuttle hardware (RS-25 engines, solid boosters) to be reliable on its first flight, while Starship starts from zero to drive marginal cost toward nothing.

The irony is that Artemis depends on both at once: SLS/Orion carries the crew to lunar orbit, Starship HLS takes them to the surface and back. **A single programme betting on two opposite engineering philosophies** is itself a portrait of an industry in transition.`,

  tags: ["Fully reusable", "Methalox", "Full-flow staged combustion", "Super heavy", "In development"],

  milestones: [
    { title: "Switch to stainless steel announced", note: "Carbon-fibre hardware already built was abandoned." },
    { title: "Starhopper 150 m hop", note: "The first free flight under Raptor power." },
    { title: "SN15 lands and is recovered intact", note: "Belly re-entry and landing flip completed successfully on the fifth attempt." },
    { title: "IFT-1, first orbital-class test flight", note: "Multiple engine failures; the stages never separated." },
    { title: "IFT-2 demonstrates hot staging", note: "Hot separation worked; both stages were subsequently lost." },
    { title: "IFT-4 controlled splashdown of both stages", note: "The ship completed entry and a controlled splashdown despite a burned-through flap." },
    { title: "IFT-5 tower catch of the booster", note: "The first time a rocket stage has been caught in mid-air by ground machinery." },
  ],

  variants: [
    { name: "Starship HLS", note: "The NASA Artemis lunar lander configuration: no tiles, no flaps, vacuum operation only." },
    { name: "Tanker / Depot", note: "Orbital propellant transfer and storage configurations — the precondition for every deep-space mission." },
    { name: "Starship V2 / V3", note: "Stretched tanks and Raptor 3, targeting 150–200 t of payload." },
  ],

  stages: [
    {
      nameZh: "Super Heavy first stage",
      propellantZh: "Liquid methane / liquid oxygen",
      note: "It carries no landing legs; the launch tower's arms catch it in mid-air — the leg mass has been moved to the ground.",
      engines: [
        {
          cycleZh: "Full-flow staged combustion",
          note: "The first full-flow staged-combustion engine ever to fly.",
        },
      ],
    },
    {
      nameZh: "Starship second stage",
      propellantZh: "Liquid methane / liquid oxygen",
      note: "It is simultaneously the upper stage, the spacecraft, the lunar lander and the receiving vehicle for orbital refuelling — which requires long-duration cryogenic storage on orbit.",
      engines: [
        { cycleZh: "Full-flow staged combustion" },
        {
          cycleZh: "Full-flow staged combustion",
          note: "The high-expansion vacuum variant, used only above the atmosphere.",
        },
      ],
    },
  ],

  launchesNotable: [],

  parts: {
    "raptor-33": {
      name: "Raptor engines (×33)",
      description:
        "Three in the centre, ten in the middle ring, twenty on the outside. Only the inner thirteen gimbal for thrust vector control; the outer twenty are fixed — deleting their actuators and flexible lines is the subtraction that clustering 33 engines makes necessary. Landing uses only the three centre engines.",
    },
    "booster-body": {
      name: "Super Heavy airframe",
      description:
        "A 9 m diameter 304L / 30X stainless tank, made from 4 mm sheet rolled into rings and stacked. Choosing stainless over aluminium-lithium or carbon fibre is one of the most counter-intuitive material decisions in modern launch vehicles (see the design logic tab). The oxygen tank is below, methane above, sharing a common bulkhead.",
    },
    "booster-gridfins": {
      name: "Grid fins (×4)",
      description:
        "Fixed titanium grid fins that only rotate about their own axes. Falcon 9's fold flat against the airframe during ascent to cut drag; Super Heavy simply deletes the folding mechanism — its recovery trajectory is shorter, the drag penalty is acceptable, and one fewer mechanism is one fewer failure mode.",
    },
    "hot-stage-ring": {
      name: "Hot-stage ring",
      description:
        "An open steel ring with vent openings. The ship's three sea-level Raptors light **while the stages are still attached**, with exhaust escaping through the ring. Hot staging avoids the risk of a large-diameter vehicle losing thrust control during the separation gap, at the cost of about 9 t of structure — which is why, after the fifth flight, the ring began to be jettisoned after separation to recover some performance.",
    },
    "ship-engines": {
      name: "Ship engines (3+3)",
      description:
        "Three sea-level Raptors (for landing and atmospheric manoeuvring) plus three high-expansion RVac engines (about 380 s in vacuum, used only on orbit). Both nozzle variants share turbopumps and preburners — an extension of the one-engine-fits-all strategy.",
    },
    "ship-body": {
      name: "Starship airframe",
      description:
        "Upper stage, spacecraft and lander in one. The windward face carries roughly 18,000 hexagonal ceramic tiles mechanically pinned to the steel. Stainless retains about half its room-temperature strength at 800 °C, which lets the thermal protection be thinner than an aluminium structure would allow — one of the direct dividends of choosing steel.",
    },
    "aft-flaps": {
      name: "Aft flaps (×2)",
      description:
        "The ship re-enters belly-down, using four flaps like a skydiver to trim attitude and lift-to-drag ratio, then performs a flip to vertical at around 100 m for the landing burn. On the V2 vehicles the aft flaps moved further leeward, because the hinge gap in the original position was burned through by plasma during entry.",
    },
    "fwd-flaps": {
      name: "Forward flaps (×2)",
      description:
        "A pair of flaps at the base of the nose cone that work with the aft flaps to control pitch and roll during entry.",
    },
    nosecone: {
      name: "Nose cone / payload bay",
      description:
        "Payloads are released through a side “PEZ dispenser” door rather than by jettisoning a fairing — because the fairing has to come home with the ship. That choice constrains the envelope of any single payload, but removes the cost of discarding a fairing on every flight.",
    },
  },

  modelNote:
    "A schematic reconstruction from SpaceX's published 121 m height, 9 m diameter and 33/6 engine layout. Starship is iterating rapidly, and the batches (V1/V2) differ in flap position, hot-stage ring and airframe length; this model corresponds to the late V1 configuration.",

  sources: [
    { note: "Overall height, diameter, engine configuration and payload targets." },
    { note: "Payload envelope and mission profiles." },
    { note: "The official account of the HLS approach and its orbital refuelling requirement." },
    {
      note: "Test flight timeline and outcomes. Mass and dry mass figures are public estimates; SpaceX has not released official numbers.",
    },
  ],
};
