import type { RocketOverlay } from "@/i18n/localize";

export const pslvEn: RocketOverlay = {
  displayName: "PSLV",
  country: "India",
  agency: ["Indian Space Research Organisation (ISRO)"],
  description:
    "India's workhorse: four alternating solid and liquid stages with a restartable final stage, delivering a hundred satellites to different orbits on one flight — not the most powerful rocket, but perhaps the best at sorting the delivery.",

  history: `PSLV was approved for a specific job: putting India's **remote sensing satellites** into sun-synchronous orbit.

India already had the small SLV-3 and ASLV in the 1980s, but they carried only tens to a couple of hundred kilograms, and ASLV failed three times in five flights. PSLV was the first Indian rocket that could actually do work.

**The maiden flight on 20 September 1993 failed** — a sequencing error between second and third stage separation caused loss of attitude control. The second flight succeeded in 1994, and PSLV then entered thirty years of steady service.

Several entries in its record stand out:

- **Chandrayaan-1** (2008) — India's first lunar probe, sent to a trans-lunar trajectory by PSLV. Its Moon Mineralogy Mapper made the first confirmation of water ice at the lunar poles.
- **Mangalyaan / Mars Orbiter Mission** (2013) — India's first Mars mission at about 74 million dollars, **successful on the first attempt** (every other nation's first Mars mission had failed). PSLV could not send it directly to Mars, so the spacecraft entered a highly elliptical Earth orbit and raised its apogee through repeated burns before escaping — **trading time for capability.**
- **15 February 2017: 104 satellites deployed on a single launch**, a record that stood for four years.

It is also the main bus for international smallsats, having launched more than three hundred satellites for over thirty countries in thirty years. **PSLV's commercial value is not its capability but the ability of its fourth stage to put different customers' satellites precisely where each of them needs to be.**

PSLV-C39 failed in 2017 when the fairing did not separate, and PSLV-C61 failed in 2025, but its overall success rate remains above 94%.`,

  designPhilosophy: `PSLV's configuration is rare anywhere in the world: **solid → liquid → solid → liquid, four alternating stages.**

This is not novelty for its own sake; each stage solves a different problem:

| Stage | Type | What it solves |
|---|---|---|
| PS1 | Solid (large) | Liftoff thrust. Solids have the highest thrust density, the simplest structure and the best reliability |
| PS2 | Liquid (Vikas) | Controlled acceleration. Liquids can shut down and gimbal, leaving room for attitude and sequencing |
| PS3 | Solid (small) | High-altitude impulse. Fine control is not needed here, only speed |
| PS4 | Liquid (pressure-fed) | Precision and flexibility. Restartable, shaping the final orbit |

**The core idea is to buy “thrust” and “precision” separately.**

Solid motors are cheap, reliable and powerful, but they cannot be shut down or throttled, their total impulse is fixed, and their injection accuracy is poor. Liquid engines are expensive and complex, but their shutdown timing can be controlled precisely, and that directly determines injection accuracy.

PSLV lets the solids **build up speed** and the liquids **trim it.** **The fourth stage's two engines together produce only 15.2 kN, less thrust than a car engine, yet they determine the injection accuracy of the whole vehicle.**

**The fourth stage's restart capability is PSLV's most commercially valuable feature.** In a single flight it can:

1. Fire, place the primary payload (say a remote sensing satellite) into a 630 km sun-synchronous orbit, release it;
2. Shut down, coast, fire again to lower the orbit;
3. Release a batch of smallsats in the new orbit;
4. Fire again, adjust again, release the next batch.

The 104-satellite launch of 2017 worked exactly this way — **the satellites were not all ejected at once but in batches, on a timeline and at differing velocities, to avoid collisions.**

**The price of the design is the number of stages.** Four stages mean three separations and four ignitions, each a potential failure point. Of PSLV's two failures, one was a staging sequence problem (the 1993 debut) and one was a fairing that did not separate (2017). **Stage count and reliability are in direct tension, and PSLV suppressed that tension with a very large number of repeated flights.**`,

  tradeoffs: [
    {
      question: "Why alternate solid and liquid? Why not go all-liquid?",
      answer: `Technically it would work, but it would be a different rocket, far more expensive and far harder to develop.

Consider India's technical position in the 1980s:

- **Solid propulsion**: very mature. India started with sounding rockets and had a complete industry in propellant casting, case winding and ablative nozzle materials.
- **Liquid propulsion**: newly indigenised from French Viking technology. Exactly one usable engine (Vikas).
- **Cryogenic propulsion**: none at all.

Under those constraints, “four liquid stages” would have required developing at least three different thrust classes of liquid engine, a decade's work. **PSLV's configuration is essentially “build a good-enough rocket from what is already in hand.”**

But it was assembled thoughtfully, not arbitrarily. Look at each stage's rationale:

**PS1 solid:** liftoff demands absolute thrust, and solids have far higher thrust density (thrust per unit volume) than liquids. For the same volume a solid first stage delivers more thrust, needs no turbopump, needs no loading infrastructure and can be stored.

**PS2 liquid:** once the first stage is gone the vehicle is out of the dense atmosphere and what is needed is **controllability**. A liquid stage can shut down at any moment and gimbal for three-axis control. If this stage were solid, the flight timeline would be locked to the propellant grain's burn curve.

**PS3 solid:** this stage pushes velocity from about 5 km/s toward orbital speed above 200 km. There is no atmospheric disturbance and attitude demands are simple; what is wanted is impulse. A solid stage has a better structural mass fraction here (no pumps, no pressurisation, no tank-to-engine separation structure) — **in this position, simple means efficient.**

**PS4 pressure-fed liquid:** restarts and precise cutoff are needed, and only liquids can do that. At this thrust level pressure feeding (gas bottles pushing propellant, no turbopump) is the simplest and most reliable option.

**So this is not a compromise configuration but one that matches each stage's physical requirement precisely to the available technology.** Its uniqueness comes from India's unique starting point; its logic is universal.`,
    },
    {
      question: "How do 104 satellites avoid hitting each other?",
      answer: `Through multiple burns of the fourth stage, a carefully sequenced release, and a little orbital mechanics.

The payload on 15 February 2017 was one 714 kg Indian cartographic satellite (the primary) plus 103 smallsats, mostly cubesats under 5 kg from operators such as Planet Labs.

The key problem is that **releasing 103 objects simultaneously leaves them with tiny relative velocities (tens of centimetres per second), so they stay close together for a long time and collision risk is high.**

There are three layers to the solution:

**Layer one: structural stratification.** The fairing contained multi-deck dispensers with the smallsats distributed across different decks and azimuths.

**Layer two: release timing and direction.** Satellites were not ejected together but in batches seconds apart, with **adjacent batches fired in opposite directions.** Each ejector imparts roughly 0.5–1.5 m/s of relative velocity, alternating in direction.

**Layer three: the fourth stage's own attitude and velocity adjustments.** Between batches, PS4 performed small attitude manoeuvres to change the ejection directions of subsequent satellites, and could make small orbit adjustments where needed.

The whole deployment took about ten minutes.

**The real significance is not the record but the business model.** The biggest pain point for smallsat customers is that a rideshare must accept the primary payload's orbit with no say. PSLV's fourth stage loosened that constraint — **it can serve several customers with different orbital requirements on a single mission.**

SpaceX's Transporter missions later applied the same idea at larger scale (a hundred-plus satellites at a time) but with **fewer** orbit choices, because Falcon 9's second stage does not perform wide-ranging orbit changes. **PSLV's advantage is fine-grained sorting; Falcon's is volume and price.**

ISRO went further and turned PS4 into an **orbital experiment platform**: after the mission the fourth stage stays in orbit instead of deorbiting, carrying hosted experiments (solar panels, attitude control) and operating for months. **Turning the last stage from debris into a satellite is an extra return at near-zero cost.**`,
    },
  ],

  contemporaries: `**Long March 2C / 4B** (China) occupy the same performance class with a similar emphasis on sun-synchronous remote sensing launches. China flies more often, but does not match the orbital deployment flexibility of PSLV's fourth stage.

**Vega / Vega-C** (Europe) is the closest analogue: a small launcher, sun-synchronous focus, and the same “solid stages plus a liquid terminal stage (AVUM)” architecture. **The two upper stage philosophies are nearly identical** — a small restartable liquid stage providing precision and multi-orbit deployment.

**Falcon 9's Transporter rideshare** (from 2021) undercuts both on price (about 6,000 dollars a kilogram against PSLV's two to three times that), but offers only a few fixed orbits. **Small launcher survival depends on what “custom orbit and schedule” is worth.**

**Electron** (New Zealand/US) sits at the other extreme: smaller and more expensive, but flying on the customer's schedule to the customer's orbit. **The three define the three business models of small satellite launch: rideshare is cheapest, PSLV is most flexible, Electron is most exclusive.**`,

  milestones: [
    { title: "Maiden flight fails", note: "A second/third stage separation sequencing error caused loss of attitude control." },
    { title: "First success", note: "The beginning of three decades of steady service." },
    { title: "Chandrayaan-1 launched", note: "India's first lunar probe, which confirmed water ice at the lunar poles." },
    { title: "Mangalyaan Mars orbiter launched", note: "About 74 million dollars in total, successful on the first attempt." },
    { title: "104 satellites on one launch", note: "A world record for satellites deployed on a single mission, held for four years." },
    { title: "PSLV-C39 failure", note: "The fairing did not separate and the satellite remained trapped inside." },
  ],

  launchesNotable: [
    { name: "Chandrayaan-1", note: "India's first lunar mission." },
    { name: "Mangalyaan", note: "Raised its orbit through repeated Earth burns instead of direct injection, trading time for capability." },
    { name: "PSLV-C37", note: "104 satellites on one launch." },
    { name: "PSLV-C39", note: "Fairing separation failure." },
  ],

  variants: [
    { name: "PSLV-G", note: "The original configuration with six standard strap-on boosters, retired." },
    { name: "PSLV-CA", note: "The “core alone” version with no strap-ons, about 1.1 t to SSO." },
    { name: "PSLV-XL", note: "Six extended strap-ons, 1.75 t to SSO, the main configuration." },
    { name: "PSLV-DL / QL", note: "Two- and four-booster intermediates, tailored per mission." },
  ],

  stages: [
    {
      nameZh: "PS1 (S139) + six PSOM-XL",
      propellantZh: "HTPB composite solid propellant",
      note: "Four of the six strap-ons ignite on the ground and two at T+25 s, flattening the liftoff acceleration profile.",
      engines: [
        { cycleZh: "Solid", note: "A solid first stage with 138 t of propellant." },
        { cycleZh: "Solid", note: "Extended strap-on boosters with 12 t of propellant each." },
      ],
    },
    {
      nameZh: "PS2",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "One Vikas engine, gimballing for three-axis control.",
      engines: [{ cycleZh: "Gas generator", note: "An indigenised derivative of the French Viking engine." }],
    },
    {
      nameZh: "PS3",
      propellantZh: "HTPB composite solid propellant",
      note: "A solid stage delivering high-altitude impulse.",
      engines: [{ cycleZh: "Solid", note: "Carbon fibre case with 7.6 t of propellant." }],
    },
    {
      nameZh: "PS4",
      propellantZh: "Monomethylhydrazine / mixed oxides of nitrogen",
      note: "Two small engines, restartable, responsible for precise injection and multi-orbit deployment.",
      engines: [{ cycleZh: "Pressure-fed", note: "Pressure-fed and structurally minimal, capable of repeated restarts." }],
    },
  ],

  parts: {
    "s139-nozzle": {
      name: "S139 nozzle",
      description: "A flex-joint nozzle gimballing ±2°. Roll control on the first stage comes from two separate hypergolic vernier engines.",
    },
    "s139-body": {
      name: "First stage S139",
      description:
        "A solid first stage with 138 t of propellant and 4,800 kN at sea level. India's rocket heritage began with sounding rockets, and solid propulsion is its earliest and most confident technology — **so PSLV hands the phase that can least afford failure entirely to solids.**",
    },
    "psom-nozzle": {
      name: "Strap-on booster nozzles (×6)",
      description: "Four of the six ignite on the ground and two at T+25 s — **using ignition timing rather than throttling to flatten the thrust profile** and avoid excessive acceleration at liftoff.",
    },
    "psom-body": {
      name: "PSOM-XL solid strap-on boosters",
      description: "12 t of propellant each (in the XL version) at 719 kN. Fitting 0, 2, 4 or 6 gives the PSLV-CA, PSLV-G and PSLV-XL performance tiers.",
    },
    "psom-nose": {
      name: "Booster nose cones",
      description: "The four ground-lit boosters separate at T+70 s and the two air-lit ones at T+92 s.",
    },
    "ps2-engine": {
      name: "Vikas engine (second stage)",
      description:
        "One Vikas on hypergolic propellants. **PSLV's most distinctive feature is right here: solid (first) → liquid (second) → solid (third) → liquid (fourth), alternating.** That configuration has essentially no counterpart anywhere in the world.",
    },
    "ps2-body": {
      name: "Second stage PS2",
      description: "Holding 42 t of UDMH and nitrogen tetroxide. The liquid stage's role here is to provide controllable, stoppable thrust as the foundation for precise injection later.",
    },
    interstage: {
      name: "Interstage transition",
      description: "The transition from 2.8 m down to 2.0 m.",
    },
    ps3: {
      name: "Third stage PS3",
      description:
        "Another solid stage with 7.6 t of propellant and 240 kN in vacuum. **Why go back to solid for the third stage?** Because at this altitude what is required is a large impulse to push velocity up; solids have the highest thrust density and the simplest structure, and this stage does not need throttling or shutdown — those jobs belong to the fourth stage.",
    },
    ps4: {
      name: "Fourth stage PS4",
      description:
        "Two 7.6 kN engines, **restartable multiple times.** This stage is the source of all of PSLV's precision and flexibility: it can place the primary payload in a sun-synchronous orbit and then change orbit to deliver hosted smallsats to different altitudes. **The 104-satellite record of 2017 was achieved by firing this stage repeatedly and releasing satellites in batches.**",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 3.2 m fairing. For multi-satellite missions it contains multi-deck dispensers, such as the two-tier structure used for Chandrayaan-1.",
    },
  },

  modelNote:
    "Reconstructed in the PSLV-XL configuration: 44.4 m tall, 2.8 m first stage, six 1 m strap-on boosters.",

  sources: [
    { title: "PSLV — ISRO", publisher: "Indian Space Research Organisation", note: "Stage parameters, configurations and performance." },
    { title: "PSLV-C37 / Cartosat-2D Mission", publisher: "ISRO", note: "The deployment sequence and dispenser design for the 104-satellite launch." },
    { title: "PSLV — Wikipedia", publisher: "Wikipedia", note: "Launch statistics vary with cut-off date, and sources classify partial failures differently." },
  ],

  tags: ["Small-medium lift", "Alternating solid and liquid", "Multi-satellite deployment", "Sun-synchronous", "India"],
};
