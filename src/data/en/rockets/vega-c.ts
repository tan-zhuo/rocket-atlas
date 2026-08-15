import type { RocketOverlay } from "@/i18n/localize";

export const vegaCEn: RocketOverlay = {
  displayName: "Vega-C",
  country: "Europe",
  agency: ["European Space Agency (ESA)", "Avio", "Arianespace"],
  description:
    "Europe's small launcher: three solid stages build the speed and one small liquid stage trims the orbit — and its first stage is simultaneously an Ariane 6 booster.",

  history: `The Vega programme was led by Italy and first flew in 2012. The rationale was that Europe had Ariane 5 for large satellites and Soyuz (flying from Kourou) for medium ones, **but nothing of its own at the small end**, while demand for Earth observation and small science satellites was growing.

**Vega-C (“C” for Consolidation) is the enlarged version**, first flown on 13 July 2022, with three main changes:

1. The first stage went from P80 to **P120C**, with propellant load rising from 88 t to 141.6 t;
2. The second stage went from Zefiro-23 to **Zefiro-40**;
3. The fairing grew, adding about 40% of volume.

Sun-synchronous capability rose from 1.5 t to 2.3 t at essentially unchanged unit price.

**The key design decision was sharing P120C with Ariane 6.** That was not coincidence but a deliberate consolidation of Europe's solid propulsion industry: separate motors for Vega and Ariane would each be built a handful of times a year, whereas a shared motor can exceed twenty units annually.

**The second flight (VV22) failed on 20 December 2022.** Zefiro-40's nozzle throat insert eroded abnormally in flight, thrust collapsed, and the vehicle lost control at T+151 s, destroying its payload of two Pléiades Neo satellites. The investigation traced the cause to a carbon-carbon composite throat insert sourced from the Ukrainian supplier Yuzhnoye that did not meet specification.

**Vega-C was grounded for two years.** That period overlapped with Ariane 5's retirement and Ariane 6's pre-debut delay, so **Europe temporarily had no independent access to orbit at all**, and had to hand Galileo navigation satellites to Falcon 9.

Vega-C returned to flight successfully on 5 December 2024 with the Copernicus Sentinel-1C satellite.

The fourth stage's main engine (RD-843) also comes from Ukraine. After the outbreak of war, Europe started the **M10 methane engine** as the upper stage powerplant for a future Vega-E, to escape that supply chain.`,

  designPhilosophy: `Vega-C's configuration logic closely matches PSLV's: **solid stages build speed, a small liquid stage supplies precision.**

The first three stages are solid, for direct reasons:

- **Solid motors have the best structural mass fraction.** No pumps, no pressurisation system, no separation structure between tank and engine — the stage is a tube full of propellant with a nozzle on the end. For a small launcher, structural mass fraction is the killer problem: the smaller the vehicle, the larger the share of total mass taken by structure and engines.
- **Solids need no loading infrastructure.** A small launcher's business case rests on fast turnaround and low ground costs; solid stages can be pre-assembled with no cryogenic loading flow on launch day.
- **Europe's solid propulsion industry is strong.** Italy's Avio has a complete solid motor capability, which is why Vega is Italian-led.

**The cost is accuracy.** A solid motor cannot be shut down or throttled, its total impulse is fixed by the propellant grain, and the actual value varies by a few per cent. Stacking three solid stages produces a large error in final velocity.

**AVUM exists to fix exactly that.** It produces only 2.45 kN (comparable to a small motorcycle engine) with 740 kg of propellant, but it can:

- Control cutoff precisely, trimming semi-major axis and inclination to the required accuracy;
- Restart five times, delivering different satellites to different orbits on one mission;
- Actively deorbit at end of mission, leaving no orbital debris.

**It is a very clean division of labour: solids provide the muscle, liquid provides the aim.**

**P120C commonality is the other thread.** It ties Vega-C and Ariane 6 to the same production line, which in Europe's low-volume space industry is almost the only route to scale effects. The price is shared risk — a problem in the solid propulsion supply chain would ground both vehicles at once.

**What it has not solved is price.** Vega-C costs about 35–40 million dollars for 2.3 t to SSO, roughly 16,000 dollars a kilogram. Falcon 9's Transporter rideshare is about 6,000. **Vega-C's market exists on the policy premise that European institutional missions fly on European rockets.**`,

  tradeoffs: [
    {
      question: "Why does an all-solid small rocket still need a liquid terminal stage?",
      answer: `Because a solid motor physically cannot control its cutoff time, and injection accuracy is entirely determined by cutoff time.

A solid motor's thrust curve is set by the geometry of the propellant grain (the shape of the bore evolves as it burns), and once ignited it follows that curve to the end. Its total impulse varies with manufacturing: propellant mass, burn rate and surface regression all differ by a few tenths of a per cent to a few per cent.

For an orbit, that variation is fatal. A 1 m/s velocity error (0.013% of 7,800 m/s) shifts perigee altitude by several kilometres, and the accumulated error from three solid stages can reach tens of metres per second.

**A liquid terminal stage fixes this with closed-loop guidance**: it measures its own state as it burns, computes the remaining Δv required, and cuts off at exactly the right moment. Low thrust is an advantage here — **the lower the thrust, the smaller the velocity error produced by a given timing error.**

$$\\Delta v_{\\text{error}} \\approx \\frac{F}{m}\\cdot \\Delta t_{\\text{error}}$$

AVUM produces only 2.45 kN, so even a 0.1 s cutoff error is a velocity error on the order of centimetres per second.

**The stage brings two further capabilities:**

1. **Multi-orbit deployment.** Five restarts mean one mission can serve several customers with different orbital requirements.
2. **Active deorbit.** A final burn lowers the orbit so the stage re-enters and burns up within months instead of remaining for decades. **Europe promotes debris mitigation rules and its rockets have to set an example.**

**The same design appears on PSLV (PS4), Minotaur and Electron (Kick Stage) — essentially every small launcher whose main propulsion is solid carries a small liquid terminal stage.** It is now the standard architecture for the class.`,
    },
    {
      question: "What did the VV22 failure expose?",
      answer: `Something more troubling than a technical fault: **in low-volume space manufacturing, every link in the supply chain is a single point of failure.**

The immediate cause is specific: the nozzle **throat insert** of Zefiro-40 eroded abnormally in flight. The throat insert is the ring of material at the narrowest point of the nozzle, which must hold its shape in gas above 3,000 °C — it ablates, but it must ablate **uniformly and predictably.**

VV22's insert was a carbon-carbon composite supplied by Ukraine's Yuzhnoye. The investigation concluded that the batch did not meet specification.

**The problem is not “a foreign supplier” but the depth of verification.**

In high-volume industry, material batches are controlled by statistical sampling and in-line inspection. **In spaceflight the batch size is too small for statistics to work** — a handful of inserts a year cannot establish a meaningful distribution. So control falls back on:

- Supplier process control (trusting that their process has not changed);
- Incoming inspection (but destructive testing consumes the sample and cannot cover every unit);
- Ground firing (but the article fired is not the article that flies).

**None of those three layers can guarantee that the specific unit that flies is good.** This is the same class of problem as N1's “the engines that flew had never been fired,” at a far smaller scale.

**A second layer is geopolitics.** AVUM's main engine RD-843 also comes from Ukraine. After the war began that supply chain became highly unstable, forcing Europe to start the M10 methane engine as a replacement — **a development programme driven by war rather than by technical need.**

**A third layer is the absence of a backup.** The two years Vega-C spent grounded coincided exactly with Ariane 5's retirement and Ariane 6's pre-debut delay. In 2023 Europe **had no independent access to orbit at all**, a situation without precedent since Ariane 1 first flew in 1979.

**The lesson: shared components buy scale effects and also shared fragility.** When a space programme has only two launchers and they share critical hardware, any single failure propagates across the whole system.`,
    },
  ],

  contemporaries: `**PSLV** (India) is almost identical in approach: solid main stages, a restartable small liquid terminal stage, multi-satellite deployment. PSLV carries more for less, and is Vega-C's most direct competitor in the international smallsat market.

**Electron** (New Zealand/US) goes an entirely different way: all-liquid, electric pumps, 3D printing, only 0.32 t of capability but a far higher flight rate. **The two represent the two business models of small launch: Vega-C lives on institutional orders, Electron on dedicated launch services.**

**Falcon 9's Transporter rideshare** beats both on price (6,000 dollars a kilogram against Vega-C's 16,000) but offers only a few fixed orbits. **The survival space for small launchers depends on what “a custom orbit and schedule” is worth.**

**Ariane 6** is its stablemate: they share P120C and therefore share Europe's solid propulsion supply chain and capacity. The relationship is both cooperative and binding.`,

  milestones: [
    { title: "First flight of the original Vega", note: "Europe's first indigenous small launcher, led by Italy." },
    { title: "Vega-C first flight succeeds", note: "The first stage becomes P120C, raising SSO capability from 1.5 t to 2.3 t." },
    { title: "VV22 fails", note: "Abnormal erosion of the Zefiro-40 nozzle throat insert; two years of grounding followed." },
    { title: "Return to flight", note: "Launched the Copernicus Sentinel-1C satellite." },
  ],

  launchesNotable: [
    { name: "VV21 maiden flight", note: "Carrying LARES-2 and several cubesats." },
    { name: "VV22", note: "Zefiro-40 throat insert failure; two Pléiades Neo satellites lost." },
    { name: "VV25 / Sentinel-1C", note: "Successful return to flight." },
  ],

  variants: [
    { name: "Vega (original)", note: "P80 first stage, 1.5 t to SSO, in service 2012–2024." },
    { name: "Vega-C", note: "P120C first stage and enlarged fairing, 2.3 t to SSO." },
    { name: "Vega-E", note: "A planned improvement replacing AVUM's hypergolic terminal stage with the M10 methane engine." },
  ],

  stages: [
    {
      nameZh: "P120C first stage",
      propellantZh: "HTPB composite solid propellant",
      note: "Identical to Ariane 6's booster, the shared component between Europe's two active launchers.",
      engines: [{ cycleZh: "Solid", note: "The largest monolithic filament-wound solid motor in the world, with no segment joints." }],
    },
    {
      nameZh: "Zefiro-40 second stage",
      propellantZh: "HTPB composite solid propellant",
      note: "The VV22 failure in 2022 came from abnormal nozzle throat erosion; the supplier was changed and the part recertified.",
      engines: [{ cycleZh: "Solid", note: "Carbon fibre case with a gimballing nozzle." }],
    },
    {
      nameZh: "Zefiro-9 third stage",
      propellantZh: "HTPB composite solid propellant",
      note: "Shared with the original Vega.",
      engines: [{ cycleZh: "Solid", note: "10.6 t of propellant." }],
    },
    {
      nameZh: "AVUM+ fourth stage",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "Restartable five times, responsible for precise injection, multi-orbit deployment and active deorbit.",
      engines: [{ cycleZh: "Pressure-fed", note: "A Ukrainian Yuzhnoye product; Europe started a replacement programme after the war." }],
    },
  ],

  parts: {
    "p120c-nozzle": {
      name: "P120C nozzle",
      description: "A carbon-phenolic throat insert with a gimballing flex-joint nozzle providing thrust vector control throughout first stage flight.",
    },
    "p120c-body": {
      name: "First stage P120C",
      description:
        "**The largest monolithic (single-segment) filament-wound carbon-case solid rocket motor in the world**: 141.6 t of propellant, 4,650 kN of thrust, and a case wound in one piece with no segment joints — and therefore none of the O-ring problems that afflicted the Shuttle boosters. The same P120C is also Ariane 6's booster: **the first stage of a small launcher is simultaneously the booster of a heavy one.**",
    },
    "interstage-1": {
      name: "First/second interstage",
      description: "Stepping from 3.4 m down to 2.3 m. Vega-C's four stages shrink progressively, giving it the profile of a sharpened pencil.",
    },
    zefiro40: {
      name: "Second stage Zefiro-40",
      description:
        "A solid second stage with 36 t of propellant and 1,304 kN in vacuum. **The VV22 mission of 20 December 2022 was destroyed here**: the nozzle throat insert — a carbon-carbon material bought from a Ukrainian supplier — eroded abnormally during operation, thrust collapsed and the vehicle lost control. Europe subsequently changed suppliers and recertified the part, and Vega-C was grounded for two years.",
    },
    "interstage-2": {
      name: "Second/third interstage",
      description: "Stepping from 2.3 m down to 1.9 m.",
    },
    zefiro9: {
      name: "Third stage Zefiro-9",
      description: "A solid third stage with 10.6 t of propellant and 314 kN in vacuum. The first three stages are all solid, pushing the payload to near orbital velocity.",
    },
    avum: {
      name: "Fourth stage AVUM+",
      description:
        "**All of the vehicle's precision lives in this stage.** The three solid stages can only deliver a fixed total impulse and cannot control cutoff precisely, so injection accuracy is poor; AVUM+ uses a single 2.45 kN hypergolic engine, restartable five times, to shape the final orbit, deploy to multiple orbits and actively deorbit at end of mission. It is also the vehicle's attitude control unit.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 3.3 m fairing, larger than the original Vega's with about 40% more volume, accommodating bigger single satellites or more smallsat dispensers.",
    },
  },

  modelNote:
    "Reconstructed from the published 34.8 m height, 3.4 m first stage diameter and the progressively tapering four-stage configuration.",

  sources: [
    { title: "Vega-C User's Manual", publisher: "Arianespace", note: "Stage parameters, performance and fairing envelope." },
    { title: "Vega-C VV22 Independent Enquiry Commission Report", publisher: "ESA / Arianespace", note: "The investigation findings on the Zefiro-40 nozzle throat insert failure." },
    { title: "P120C Solid Rocket Motor", publisher: "Avio", note: "Propellant load, thrust and the commonality scheme across two launchers." },
  ],

  tags: ["Small lift", "All-solid main stages", "Multi-satellite deployment", "Sun-synchronous", "Europe"],
};
