import type { RocketOverlay } from "@/i18n/localize";

export const soyuz2En: RocketOverlay = {
  displayName: "Soyuz-2.1b",
  country: "Russia",
  agency: ["Progress Rocket Space Centre", "Roscosmos"],
  description:
    "The current member of the R-7 family: a configuration essentially unchanged from the first ICBM of 1957, still in service today — the longest unbroken technical chain in human spaceflight.",

  history: `Soyuz-2 is the fifth major revision of the R-7 line. Its immediate predecessor, Soyuz-U, served from 1973 to 2017 and flew 786 times — the world record for a single rocket type.

Modernisation concentrated on three things: a **digital flight control system** (replacing 1960s analogue gyro platforms, which lets the vehicle roll in flight and fly any azimuth rather than depending on how the pad is physically aligned), a **new third-stage engine, the RD-0124** (on the 2.1b), and **removing the dependence on Ukrainian suppliers** (the original control system was built in Kharkiv).

The 2.1a flew a suborbital test in November 2004 and the 2.1b debuted in December 2006. From 2011 a Soyuz pad also operated at Kourou in French Guiana — a Soviet-designed rocket launching European payloads from a European spaceport, until that arrangement ended in 2022 with the war in Ukraine.

Since Soyuz MS-16 in 2020, crewed flights have used the Soyuz-2.1a, replacing the Soyuz-FG after nineteen years of service.`,

  designPhilosophy: `Soyuz-2's design philosophy is almost the absence of design: **on a configuration validated by 1,900 flights, change only what must change.**

The R-7 layout — four tapered boosters in parallel with a core, everything lit on the ground — existed to dodge the in-flight ignition problem of the 1950s. That reason disappeared long ago, but the configuration stayed, because changing it means re-validating everything. Russia's approach has been to confine innovation to **modules that can be validated independently**: a digital control system, a staged-combustion third stage, a larger fairing — while the load paths, tanks and main engine architecture stay put.

The return is extremely high maturity at a very low unit price. The cost is a performance ceiling locked in by choices made in 1957: 8.2 t to LEO, no recovery, no meaningful growth in diameter. When the market shifted from a few dozen individual satellites a year to thousands of constellation spacecraft, that ceiling became fatal.

**Soyuz-2 is the most successful and most extreme example of evolution over revolution — proof both of how far that road goes and of where it ends.**`,

  tradeoffs: [
    {
      question: "Why has the configuration not changed in seventy years?",
      answer: `The benefits of changing are obvious: a series two-stage design with a large-diameter core could take LEO capability from 8 t to 15–20 t and leave room for recovery. Russia started **Angara** for exactly that in 1992 — a modular URM-1 core that in principle composes into everything from 3.5 t to 24.5 t.

But Angara did not fly until 2014, has flown fewer than ten times by 2024, and costs more per launch than Soyuz. The reason is not technical but that **replacing a mature system means rebuilding too many things at once**: a new engine (RD-191), new factories, new pads, new operating procedures, new reliability statistics. Until all of that exists, the old system is still cheaper and more reliable, so resources keep flowing to it — and the new system never reaches the production volume that would amortise its cost. It is a self-locking loop.

The same pattern shows up in Ariane 5 → Ariane 6 (a decade late) and Delta/Atlas → Vulcan (eight years late). **What breaks the loop is usually not the incumbent but an entrant with no legacy system to fall back on.** SpaceX went from nothing to Falcon 9 Block 5 in a decade precisely because it had no “good enough” old rocket to lean on.`,
    },
    {
      question: "How much payload does the staged-combustion RD-0124 buy?",
      answer: `Against the older RD-0110, vacuum specific impulse rises from 326 s to 359 s — about 10%.

Run that through the ideal rocket equation for the third stage, whose mass ratio (initial over final) is around $m_0/m_f \\approx 3.5$:

$$\\Delta v = I_{sp} \\, g_0 \\ln\\frac{m_0}{m_f}$$

Going from 326 s to 359 s raises the third stage's $\\Delta v$ from roughly 4.0 km/s to about 4.4 km/s, and the extra 0.4 km/s converts entirely into payload. In practice LEO capability rose from 7.02 t (2.1a) to 8.2 t (2.1b), about +17%.

**A single upper stage engine upgrade delivered more than ten times the payload gain that a 3% increase in booster thrust could.** That is the direct expression of the rule that upper stage impulse is worth more than first stage thrust — and it explains why, with limited development budgets, agencies almost always modernise the upper stage engine first.`,
    },
    {
      question: "How does the crewed version differ from the cargo version?",
      answer: `The same Soyuz-2 is nearly two different rockets depending on whether it carries people:

- **A different top end.** The crewed version has no payload fairing in the usual sense; instead it carries the Soyuz spacecraft under a **launch escape system (SAS)** whose solid motors can pull the orbital and descent modules clear of a failing vehicle.
- **A different flight profile.** Crewed missions cap acceleration more tightly (normally ≤ 4 g on ascent), which requires a gentler pitch programme, and every phase of ascent must have a pre-planned abort landing zone (the Kazakh steppe east of Baikonur).
- **Different acceptance criteria.** Batch hardware, engine test records and weather constraints are all held to stricter standards.

The system was tested for real on **Soyuz MS-10, on 11 October 2018**: during booster separation one booster's nose struck the core's tank and the vehicle went out of control at 93 km. The escape tower had already been jettisoned by then, so the spacecraft separated using backup motors on the fairing; the two crew members endured 6.7 g and landed safely. **It is one of the very few real-world successes of a launch escape system, and a vindication of designing several independent abort mechanisms covering different phases of flight.**`,
    },
  ],

  contemporaries: `In the same capability class (5–10 t to LEO), Soyuz-2's current peers are **Falcon 9** (22.8 t, but happy to fly smaller missions), **Vega-C** (2.3 t), the **Long March 2C/4B**, **PSLV** (3.8 t) and a new generation of small commercial launchers.

Soyuz-2's historic advantages — a 40–50 million dollar price, extreme maturity, and three launch sites on two continents — were eroded one by one after 2015: Falcon 9's reuse brought its price into the same range with three times the capability, and after 2022 Western customers and the Kourou pad disappeared entirely. It now serves mainly Russian crewed, military and GLONASS missions.`,

  tags: ["Crewed", "Long-lived design", "Stage-and-a-half", "Kerolox", "Staged-combustion upper stage"],

  milestones: [
    { title: "Soyuz-2.1a suborbital test flight", note: "Validated the digital flight control system." },
    { title: "Soyuz-2.1b maiden flight", note: "First use of the RD-0124 third stage engine." },
    { title: "First launch from Kourou", note: "The first flight from a European spaceport, placing two Galileo satellites in orbit." },
    { title: "Soyuz MS-10 ascent abort", note: "The escape system worked in a real emergency and the crew returned safely." },
    { title: "Soyuz MS-16, first crewed flight", note: "Crewed missions transitioned from Soyuz-FG to Soyuz-2.1a." },
  ],

  variants: [
    { name: "Soyuz-2.1a", note: "RD-0110 third stage, 7.02 t to LEO; now the crewed workhorse." },
    { name: "Soyuz-2.1b", note: "RD-0124 third stage, 8.2 t to LEO." },
    { name: "Soyuz-2.1v", note: "A light version with no boosters and an NK-33/RD-193 core." },
    { name: "Soyuz-ST", note: "The Kourou variant, with added telemetry and range safety equipment to meet European requirements." },
  ],

  stages: [
    {
      nameZh: "Boosters (Blocks B/V/G/D)",
      propellantZh: "RG-1 kerosene / liquid oxygen",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
    {
      nameZh: "Core (Blok A)",
      propellantZh: "RG-1 kerosene / liquid oxygen",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
    {
      nameZh: "Blok I third stage",
      propellantZh: "RG-1 kerosene / liquid oxygen",
      engines: [
        {
          cycleZh: "Oxidiser-rich staged combustion",
          note: "Four chambers; among the highest vacuum specific impulse of any production kerosene engine.",
        },
      ],
    },
  ],

  launchesNotable: [
    {
      name: "Progress M-12M",
      note: "A blocked gas line in the RD-0124 third stage caused the failure — a rare third-stage fault in the R-7 family.",
    },
    {
      name: "Meteor-M No.2-1",
      note: "The Fregat upper stage tumbled because the launch site azimuth had been entered incorrectly, losing the payload — a configuration error, not a hardware failure.",
    },
    { name: "Soyuz MS-10", note: "A booster separation anomaly; the crew was saved by the escape system." },
  ],

  parts: {
    boosters: {
      name: "Strap-on boosters (×4)",
      description:
        "Tapered boosters identical in layout to the 1957 R-7, carrying RD-107A engines. At separation the forward attachment releases and residual tank pressure pushes them outward, so the four boosters fan away along parabolic paths — the “Korolev cross”, repeated on every Soyuz launch for seventy years.",
    },
    rd107a: {
      name: "RD-107A engines (×4)",
      description:
        "Four chambers plus two verniers, 838 kN at sea level. That is about 3% more than the 1957 RD-107, gained through a new injector head and higher chamber pressure — in seventy years its thrust has risen by under 5%, because everything else in the vehicle was designed around the original figure.",
    },
    rd108a: {
      name: "RD-108A engine (core)",
      description: "Four chambers plus four verniers, 792 kN at sea level, burning from the pad to T+286 s.",
    },
    "core-body": {
      name: "Core stage (Blok A)",
      description:
        "A 2.95 m kerolox core. The diameter comes from the 1950s Russian rail loading gauge — and that gauge has not changed, which is precisely why Soyuz can still be railed from the factory in Samara to Baikonur, Plesetsk or even Kourou. That is a large part of why it stays cheap.",
    },
    interstage: {
      name: "Interstage truss",
      description:
        "An open truss interstage. The third stage separates **hot**: the Blok-I's RD-0124 lights while the core is still attached, with exhaust escaping through the truss. The open structure is itself the evidence of hot staging.",
    },
    "blok-i": {
      name: "Blok I third stage",
      description:
        "The Soyuz-2.1b's third stage carries the RD-0124 — a **four-chamber oxidiser-rich staged-combustion** engine with 359 s of vacuum specific impulse, among the highest of any production kerosene engine. Against the older RD-0110 (326 s) it added roughly 950 kg of LEO capability, at the price of a development programme measured in decades.",
    },
    fairing: {
      name: "Payload fairing",
      description:
        "A 4.11 m fairing (3.7 m and stretched 4.11 m versions exist). Crewed missions replace it entirely with the Soyuz spacecraft and its escape tower — the top half of this rocket is a swappable module.",
    },
  },

  modelNote:
    "A schematic reconstruction of the Soyuz-2.1b with the 4.11 m fairing (46.3 m overall). The crewed configuration carries a spacecraft and escape tower instead, and looks quite different.",

  sources: [
    { note: "Primary source for dimensions, masses, stage parameters and performance envelopes." },
    { note: "The manufacturer's published description of the vehicle." },
    { note: "The investigation findings on the booster separation anomaly." },
    { note: "Launch statistics; sources differ on how partial failures are counted." },
  ],
};
