import type { RocketOverlay } from "@/i18n/localize";

export const electronEn: RocketOverlay = {
  displayName: "Electron",
  country: "New Zealand / United States",
  agency: ["Rocket Lab"],
  description:
    "The first small launch vehicle to make a business out of being small, and the vehicle that redefined how small rocket engines are built through electric pumps and 3D printing.",

  history: `Rocket Lab was founded by the New Zealand engineer Peter Beck in 2006. Electron's market thesis was explicit: CubeSats and smallsats were multiplying, but they could only ride as secondary payloads on large rockets, accepting whatever orbit and schedule the primary dictated. If a 300 kg class rocket could fly on the customer's timetable to the customer's orbit, a new market existed.

The maiden flight in May 2017 (“It's a Test”) was terminated because of **a configuration error in ground telemetry equipment** — the vehicle itself was working correctly. The second flight reached orbit in January 2018. Electron has since become the most-flown American-family orbital rocket after Falcon 9, with more than sixty launches.

Recovery took a detour. The original plan was to catch the parachute-descending stage in mid-air with a helicopter (briefly achieved in May 2022, then released when the load behaved unexpectedly); the company later judged the complexity not worth the return and switched to splashdown and recovery by ship. Since 2024 recovered and refurbished Rutherford engines have flown again.

Rocket Lab's centre of gravity is now shifting to the medium, reusable **Neutron** (13 t to LEO).`,

  designPhilosophy: `Electron's design logic **moves the small launcher's economic problem from performance to manufacturing.**

Small rockets face a brutal arithmetic: the smaller the vehicle, the higher the fraction of its mass that is structure and engines, and the worse the payload ratio. Electron lifts off at 13 t and delivers 0.32 t to LEO — 2.5% — against Falcon 9's 4.2%. Scale works against you.

Unable to win on performance, Rocket Lab competed on two other axes:

1. **Manufacturing cost.** A turbopump is the most expensive, most difficult and longest-lead component in a rocket engine. The electric pump cycle replaces it with motors and batteries — motors are a mature industrial product, easy to control, and able to modulate flow precisely. Combined with 3D printing, a Rutherford goes from raw material to finished engine in about 24 hours, and a vehicle needs ten of them.
2. **Cadence and orbital service.** A private launch site (Mahia Peninsula in New Zealand — the only privately owned orbital launch site in the world) bypasses the queue, and the Kick Stage delivers any orbit you want. What the customer buys is **certainty**, and pays far more per kilogram for it than rideshare costs (about 7.5 million dollars for 300 kg, roughly 23,000 dollars a kilogram, more than ten times Falcon 9's rideshare price).

**This is a re-definition of what a launch vehicle actually sells: not dollars per kilogram, but control over time and orbit.**`,

  tradeoffs: [
    {
      question: "Electric pumps: what does running a rocket on batteries cost?",
      answer: `Rutherford's propellant is fed by motor-driven pumps powered by lithium polymer batteries. On a large rocket that is unthinkable; on a small one it works, because **pump power scales linearly with thrust while battery energy density is fixed.**

Each Rutherford pump needs about 37 kW. Nine first-stage engines need around 330 kW, and the first stage battery pack masses on the order of 100 kg. Scale that to Merlin's thrust (845 kN, about 35 times more) and the battery mass would consume the entire payload. **Electric pumping has a hard thrust ceiling, and Electron sits just under it.**

At this scale the benefits are substantial:

- **No turbine, no gas generator, no preburner** — the hardest part of an engine is deleted entirely;
- **Precise, fast thrust control**: adjusting motor speed is far simpler than modulating turbine power, and responds faster;
- **Reliable starting**: no pyrotechnic starter and no complex start sequence — apply power;
- **Batteries can be jettisoned**: spent packs are dropped in flight, which no turbopump rocket can do with a used turbine.

Beyond the power ceiling the other cost is **impulse**: batteries are dead weight producing no thrust. Rutherford's 343 s in vacuum is close to Merlin's 348 s, which suggests the penalty is acceptable at low thrust.`,
    },
    {
      question: "Why not propulsive recovery?",
      answer: `Falcon 9's booster decelerates and lands on its own engines; Electron uses a parachute and recovery at sea. The reason is that **the propellant budget simply is not there on a small rocket.**

Falcon 9's recovery burns about 6–8% of first stage propellant and costs roughly 23% of LEO capability. On a 22.8 t vehicle that leaves 17.5 t — still good business. Apply the same fraction to Electron: 320 kg minus 23% leaves 246 kg. And the minimum-thrust problem is worse: even a single Rutherford produces a thrust-to-weight ratio well above 1 for an empty Electron stage, so it cannot hover.

Parachute recovery has different arithmetic: a chute bay, heat shielding and flotation add tens of kilograms, costing under 10% of capability. The price is that **the airframe soaks in seawater**, which makes refurbishment far harder — especially for carbon structures and electrical systems.

Rocket Lab's actual conclusion is pragmatic: whole-stage reuse has unclear economics, but **engine reuse clearly pays** — Rutherfords are most of the stage's cost, and they are sealed metal assemblies where salt water damage is relatively manageable. Since 2024, recovered and refurbished Rutherfords have been flying again.

A footnote: in 2019 Peter Beck said publicly that Electron would never be recovered, and that he would eat his hat if it were. When the company announced recovery a year later he blended a hat and drank it — now a standing joke in the industry.`,
    },
    {
      question: "Is there really a small launch market?",
      answer: `More than a hundred small launch companies were founded between 2018 and 2021. Almost all have folded or pivoted. Worldwide, no more than three are still launching regularly.

The structural difficulty is that **SpaceX's rideshare missions (Transporter) put the price at roughly 6,000 dollars a kilogram, while a small launcher's cost floor sits above 20,000.** For a customer who does not care about precise orbit and can wait six months, rideshare always wins.

Electron survives on the customers **who cannot rideshare**:

- **Military and intelligence payloads**, which will not share a launch or publish a schedule;
- **Science missions needing unusual orbits**, such as NASA's CAPSTONE, sent to a lunar transfer by the Kick Stage;
- **Constellation replenishment**: when one satellite in a constellation fails, waiting six months for a rideshare is unacceptable;
- **Technology demonstrations** whose operators do not want to share a ride.

Even so, Rocket Lab's main revenue has shifted from launch to **satellite manufacturing and components** (reaction wheels, solar arrays, flight computers). Which suggests a more general judgement: **at the current size of the market, pure small-launch services struggle to be a sustainable business on their own** — they are an entry ticket into the space industry rather than a destination. That is exactly why Rocket Lab's strategic centre has moved to the medium, reusable Neutron.`,
    },
  ],

  contemporaries: `Among contemporaries, **Astra Rocket 3.3** (cheaper but insufficiently reliable, now discontinued) and **Virgin Orbit's LauncherOne** (air-launched, bankrupt in 2023) were the closest competitors, with **Firefly Alpha** (1 t) sitting between small and medium. China's **Ceres-1, Kuaizhou-1A and Hyperbola-1** take the solid-rocket route — cheaper and faster to prepare, at the cost of impulse and injection accuracy.

The interesting part is that Electron's real competitor is not another small rocket but **Falcon 9's rideshare service**: one Transporter mission carries a hundred smallsats at an order of magnitude lower price. A small launcher has to find the space rideshare cannot serve, and that space is narrower than anyone expected in 2018.`,

  tags: ["Small launcher", "Electric pump", "3D printed", "Commercial spaceflight", "Carbon airframe"],

  milestones: [
    { title: "Maiden flight “It's a Test”", note: "Terminated by a ground telemetry configuration error; the vehicle itself was fine." },
    { title: "“Still Testing” reaches orbit", note: "The second flight succeeded and used the Kick Stage for the first time." },
    { title: "First booster recovery", note: "Parachute descent followed by recovery at sea." },
    { title: "Helicopter mid-air catch attempt", note: "Briefly caught and then released; the approach was later abandoned." },
    { title: "CAPSTONE launched", note: "The Kick Stage sent a 25 kg spacecraft onto a lunar transfer trajectory." },
    { title: "First flight of a reused Rutherford", note: "A recovered and refurbished engine returned to flight." },
  ],

  variants: [
    { name: "Electron (standard)", note: "The expendable configuration, 320 kg to LEO." },
    { name: "Electron (recovery configuration)", note: "With chute bay and heat shielding; slightly reduced capability." },
    { name: "HASTE", note: "A suborbital hypersonic test configuration." },
  ],

  stages: [
    {
      nameZh: "First stage",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "Recovered by parachute and retrieved at sea; several boosters have been recovered and their engines reflown.",
      engines: [
        {
          cycleZh: "Electric pump cycle",
          note: "The first electric-pump engine to reach orbit, with all major parts 3D printed.",
        },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      engines: [{ cycleZh: "Electric pump cycle" }],
    },
    {
      nameZh: "Curie Kick Stage",
      propellantZh: "Green monopropellant / bipropellant",
      note: "Restartable, used for precise orbital placement and end-of-life disposal.",
      engines: [{ cycleZh: "Pressure-fed" }],
    },
  ],

  launchesNotable: [
    { name: "It's a Test", note: "A ground equipment problem, not a vehicle failure." },
    { name: "Pics Or It Didn't Happen", note: "A second-stage battery connection failed." },
    { name: "CAPSTONE", note: "The first translunar mission flown by a small launcher." },
    { name: "We Will Never Desert You", note: "A second-stage power system failure grounded the vehicle for two months." },
  ],

  parts: {
    "rutherford-9": {
      name: "Rutherford engines (×9)",
      description:
        "The first **electric pump cycle** engine to fly to orbit: propellant is fed not by a turbine-driven pump but by two brushless DC motors running off lithium polymer batteries. Each engine produces just 24 kN at sea level. The primary structural components — thrust chamber, injector, pump housings, turbine — are all produced by electron-beam melting 3D printing, with a print cycle of about 24 hours per engine.",
    },
    "s1-body": {
      name: "First stage airframe",
      description:
        "A carbon fibre composite tank that carries load directly rather than being hung inside a skin. The difficulty with composite cryogenic tanks is resin microcracking and permeation, which Rocket Lab solved with a proprietary liner. The complete first stage has a dry mass of around 950 kg — roughly 40% lighter than an aluminium equivalent of the same diameter, which is decisive for a small rocket: **payload fraction is already tiny, so every kilogram of structure saved is very nearly a kilogram of payload gained.**",
    },
    interstage: {
      name: "Interstage",
      description:
        "In the recovery configuration the first stage separates below this point, decelerates on entry and descends by parachute for recovery by ship (earlier attempts used a helicopter to catch the parachute). There is no propulsive recovery — Electron is too small, and carrying return propellant would consume the entire payload.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "A single vacuum Rutherford with a larger expansion ratio (343 s in vacuum). The stage's battery packs are **jettisoned in batches as they are depleted** — a mass-saving trick unique to the electric pump cycle: a turbopump rocket cannot discard a turbine it has already used.",
    },
    "kick-stage": {
      name: "Curie Kick Stage",
      description:
        "A small restartable upper stage with the 120 N Curie engine. It delivers each smallsat to its own precise orbit instead of dropping every payload at one point, as traditional rideshare does — **which is exactly what a dedicated small launcher sells: not capability, but authority over your own orbit.**",
    },
    fairing: {
      name: "Fairing",
      description:
        "A 1.2 m fairing with a ⌀1.07 × 1.4 m payload envelope. For a 300 kg class smallsat, the binding constraint is usually that volume rather than mass.",
    },
  },

  modelNote:
    "A schematic reconstruction from Rocket Lab's user guide: 18 m overall, 1.2 m diameter. The distribution of section lengths is indicative.",

  sources: [
    { note: "Dimensions, capability, payload envelope and Kick Stage capabilities." },
    { note: "Rutherford engine parameters and the recovery approach." },
    { note: "Aggregated launch record, current to 30 June 2025." },
  ],
};
