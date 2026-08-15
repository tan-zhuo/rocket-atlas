import type { RocketOverlay } from "@/i18n/localize";

export const h3En: RocketOverlay = {
  displayName: "H3",
  country: "Japan",
  agency: ["JAXA", "Mitsubishi Heavy Industries"],
  description:
    "Japan's attempt to halve H-IIA's price: a cycle everyone said could not be scaled up was scaled up, at the cost of a failed maiden flight and two years of delay.",

  history: `H3's objective was a single sentence: **halve H-IIA's launch price**, from about 100 million dollars to the 50 million class.

The reason was the market. H-IIA's reliability was world class (49 successes in 50 flights), but it never captured meaningful international commercial share — it was too expensive. After Falcon 9 arrived in the 2010s the gap widened further. Japan's choice was either to accept that its rocket would only serve its own government, or to build one that could compete.

**Cost reduction targeted three areas:**

1. **A new engine, LE-9.** LE-7A's fuel-rich staged combustion needs a preburner, hot gas ducting and a complex start sequence, with many parts and many inspection steps. The expander bleed cycle has no preburner, far fewer parts and lower manufacturing cost.
2. **Simplified boosters.** SRB-3 deleted the nozzle gimbal mechanism, cutting about 10% from unit cost.
3. **A different way of building.** Automotive production thinking: standardised tooling, automated welding, bulk purchase of commercial parts (some electronics are automotive grade).

**All the difficulty concentrated in LE-9.**

An expander cycle's power comes from the heat the chamber wall gives to the hydrogen, and transfer area grows as the square of size while thrust grows with volume — **the larger the thrust, the less heat there is to go round.** That is why every previous expander engine was upper stage class (RL10 at 110 kN, Vinci at 180 kN). LE-9 needed 1,471 kN, a tenfold jump.

Testing in May 2020 revealed two problems: **cracks in the combustion chamber wall and fatigue cracks in the turbine blades**, rooted in high-frequency pressure oscillation in the chamber. The fix required redesigning the injector and the chamber cooling channels, and the programme slipped two years.

**The maiden flight on 7 March 2023 failed.** The first stage worked correctly but the second stage's LE-5B-3 never ignited: an electrical anomaly after staging prevented the ignition command from being executed, and the ALOS-3 Earth observation satellite was lost.

**The second flight succeeded on 17 February 2024.** H3 has flown steadily since and took over all of H-IIA's missions in 2025.`,

  designPhilosophy: `H3's philosophy is to **squeeze cost out of the design without giving up reliability.**

Japan faces the same constraint as Europe: few launches a year (five to eight), so neither volume nor reuse can amortise the cost. Reduction therefore has to come from **building it more cheaply**, not from using it more times.

**The central bet is LE-9's cycle choice.**

Comparing the two routes:

| | LE-7A (staged combustion) | LE-9 (expander bleed) |
|---|---|---|
| Preburner | Yes | **No** |
| Hot gas ducting | Yes (about 800 K fuel-rich gas) | **No** |
| Start sequence | Complex, needs igniters | Simple, self-starting on phase change |
| Turbine gas temperature | High | **Low (a few hundred K)** |
| Part count | High | **About 20% lower** |
| Vacuum Isp | 440 s | 425 s |
| Unit cost | Baseline | **About 40% lower** |

Note the impulse row: **LE-9 gives up 15 s relative to LE-7A.** That is a deliberate loss — expander bleed dumps a small hydrogen flow, and the cycle cannot reach staged combustion pressures (LE-9 runs near 100 bar against LE-7A's 120).

**Japan traded 3.4% of impulse for a 40% cost reduction.** That trade only makes sense when cost is the dominant problem, which is exactly H3's founding premise.

**The second bet is deleting the gimbal from the boosters.**

SRB-3's nozzle is fixed and all attitude control comes from the two LE-9s on the core. That requires:

- Enough gimbal authority in LE-9 (it must simultaneously counter thrust dispersion from four solids);
- Good enough thrust consistency between boosters (otherwise the trim torque becomes unmanageable).

**This is a textbook transfer of risk from mechanism to control** — hydraulic actuators are moving parts and a common source of failure; control laws are software and can be verified repeatedly.

**The third thread is configuration flexibility.** H3 spans H3-30 (three LE-9s, no boosters) to H3-24L (two LE-9s, four boosters). **H3-30 is the most interesting: no solid boosters at all, lifting off on three hydrolox engines.** That has no precedent anywhere (hydrolox engines usually cannot lift themselves), and it depends on LE-9 having enough thrust. If it works, Japan can cut costs further on lower-performance missions.`,

  tradeoffs: [
    {
      question: "Expander cycles supposedly cannot scale — how did LE-9 get around it?",
      answer: `Through the bleed variant, which frees the turbine from the chamber's pressure constraint.

**First, the dead end in a closed expander cycle (RL10, Vinci):**

Liquid hydrogen flows through the chamber and nozzle cooling jacket, gasifies and rises in pressure, drives the turbine, and **then all of it enters the chamber to burn.** Because the hydrogen must eventually enter the chamber, the turbine exit pressure has to exceed chamber pressure. The available pressure ratio is therefore tiny, and producing enough power requires either more flow or more temperature rise — and temperature rise comes from heat transfer.

Heat transfer scales with **area**:

$$Q \\propto A_{\\text{wall}} \\propto D^2$$

Thrust scales with throat area, also roughly $D^2$, which looks matched. But the problem is the **chamber characteristic length**: as thrust rises, chamber pressure and flow rise while wall heat flux rises only modestly, and required turbine power rises quickly. In practice closed expander cycles top out around 200–300 kN.

**The expander bleed (open) cycle changes one thing:** the hydrogen driving the turbine is **vented overboard afterwards rather than entering the chamber.**

The consequences:

- Turbine exit pressure can drop to near ambient, so **the available pressure ratio goes from a few to tens**;
- The same power then needs far less flow and far less temperature rise;
- Heat transfer area stops being the bottleneck and the thrust ceiling opens.

The cost is that **the vented hydrogen produces no thrust.** LE-9 dumps a few per cent of the fuel flow, worth about fifteen seconds of impulse.

**Why could Japan do it?** Because it had spent forty years on this line: LE-5 (1986), LE-5A and LE-5B are all expander bleed, with continuous experience in heat transfer and turbine matching. **LE-9 did not start from nothing; it pushed a forty-year road to its limit.**

**It was still hard.** The 2020 cracking showed that even with a simple cycle, a 1,471 kN chamber still meets combustion instability and thermal fatigue — **problems that belong to “large thrust” rather than to the cycle.**`,
    },
    {
      question: "What changed after the maiden flight failure?",
      answer: `Very little, and that is itself the conclusion.

The failure on 7 March 2023 occurred at second stage ignition: the first stage worked and separated, but LE-5B-3 never lit. The investigation pointed at the **second stage electrical system** — specifically, an electrical transient generated at staging tripped a protective action in the power distribution system, cutting power to the engine controller.

Three things are worth noting:

**1. It had nothing to do with LE-9.** The programme's largest technical risk — a new cycle at a new scale — worked perfectly on its first flight. The failure was in a relatively conventional subsystem.

**2. The root cause could not be uniquely determined.** JAXA's report listed three plausible failure paths that the telemetry could not distinguish. **The fix was therefore to close all three** — the standard practice in spaceflight failure response: when you cannot tell which one it was, assume every one of them.

**3. The changes were confined to electrical isolation and redundancy**, touching neither propulsion nor structure. The second flight succeeded less than a year later.

**The deeper issue exposed is the illusion of heritage.** LE-5B-3 and much of its electrical system were inherited from H-IIA, the engine with a perfect record. But H3's first stage, staging method and power architecture were all new, and **an old component placed in a new environment no longer has verified interface behaviour.**

This pattern recurs:

- Ariane 5's maiden flight failure (1996) came from reusing Ariane 4's inertial navigation software, whose numerical range the new flight profile exceeded;
- The Shuttle's booster design came from missile heritage but exposed joint problems in a new load environment.

**Inheriting mature components reduces component risk, not integration risk — and integration risk is usually the larger of the two.**`,
    },
  ],

  contemporaries: `**Ariane 6** (2024) is almost the same exam paper with a different answer sheet: approved around 2014, built to halve an old rocket's price, expendable rather than reusable, betting on manufacturing, delayed three or four years, first flown in 2023–2024. **Their configurations are also very close: hydrolox core, solid boosters, hydrolox upper stage.**

**Vulcan Centaur** (US, 2024) is the third answer, differing in propellant (methane) and in planning engine-pod recovery.

**Falcon 9** is the common competitor and the common reason all three exist.

**H-IIA** is what it must surpass: 98% reliability at 100 million dollars. **H3 has to prove that reliability and low cost can coexist — if it succeeds, Japan stays on the list of countries with independent launch capability; if not, Japanese spaceflight retreats to purely governmental missions.**`,

  milestones: [
    { title: "Programme approved", note: "The objective was to halve H-IIA's launch price." },
    { title: "Cracks found in LE-9 testing", note: "Combustion chamber wall and turbine blade cracks delayed the programme by two years." },
    { title: "Maiden flight fails", note: "A second stage electrical anomaly prevented LE-5B-3 ignition; the ALOS-3 satellite was lost." },
    { title: "Second flight succeeds", note: "Flown after improvements to electrical isolation and redundancy." },
    { title: "First operational mission", note: "Launched the ALOS-4 Earth observation satellite." },
  ],

  launchesNotable: [
    { name: "TF1", note: "Maiden flight failure; the second stage did not ignite." },
    { name: "TF2", note: "Successful return to flight, validating the full mission profile." },
    { name: "ALOS-4", note: "First operational launch." },
  ],

  variants: [
    { name: "H3-22S / 22L", note: "Two LE-9s and two SRB-3s, with short or long fairing." },
    { name: "H3-24L", note: "Two LE-9s, four SRB-3s and a long fairing — the highest-performance configuration." },
    { name: "H3-30S", note: "Three LE-9s and no solid boosters; an all-hydrolox liftoff configuration with no precedent anywhere, aimed at low-cost missions." },
  ],

  stages: [
    {
      nameZh: "First stage + four SRB-3",
      propellantZh: "Liquid hydrogen / liquid oxygen · HTPB composite solid",
      note: "The SRB-3s burn for 105 s; the two LE-9s ignite on the ground and burn to about T+300 s.",
      engines: [
        { cycleZh: "Expander bleed", note: "The most powerful expander bleed engine in the world; development slipped two years after cracking was found." },
        { cycleZh: "Solid", note: "The nozzle gimbal mechanism is deleted, with attitude control handed to the first stage engines." },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "An improved LE-5B from H-IIA, with longer burn time and stronger restart capability.",
      engines: [{ cycleZh: "Expander bleed", note: "A derivative of the LE-5B that never failed in flight on H-IIA." }],
    },
  ],

  parts: {
    le9: {
      name: "LE-9 engines (×2)",
      description:
        "**The most powerful expander bleed engine in the world: 1,471 kN in vacuum.** This is a significant leap — because of the heat transfer limit, expander cycles were long assumed to cap out around 200 kN and to suit only upper stages. LE-9 took it to a first stage. The price was a difficult development: testing in 2020 found cracks in the turbine blades and the chamber wall, delaying the whole H3 programme by two years.",
    },
    "core-body": {
      name: "First stage",
      description:
        "5.27 m across, considerably wider than H-IIA's 4 m. The reason is **structural efficiency and simpler manufacturing**: for the same propellant load, a shorter, fatter tank has fewer welds and lighter structure. Mitsubishi builds these tanks on an automated line aimed at halving production time.",
    },
    "srb3-nozzle": {
      name: "SRB-3 nozzles (up to four)",
      description:
        "**SRB-3 made a counterintuitive simplification relative to H-IIA's SRB-A3: the nozzle gimbal mechanism was deleted.** Attitude control is handed entirely to the two LE-9s on the core. A fixed nozzle means no hydraulic actuator, no flex joint and no control interface, cutting about 10% from unit cost.",
    },
    "srb3-body": {
      name: "SRB-3 solid boosters",
      description:
        "2,158 kN each, fitted 0, 2 or 4 at a time. **H3's designation states its configuration directly**: H3-24L means two LE-9s, four SRB-3s and a long fairing. There is also a planned H3-30 configuration — **no boosters at all, lifting off on three LE-9s** — Japan's most aggressive step toward lower launch cost.",
    },
    "srb3-nose": {
      name: "Booster nose cones",
      description: "The separation hardware was likewise simplified, dropping some of the ordnance design that had caused trouble on H-IIA.",
    },
    interstage: {
      name: "Interstage",
      description: "The interstage housing the second stage's LE-5B-3 nozzle.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "One LE-5B-3, still an expander bleed engine — an improved version of the one that never failed on H-IIA, with longer burn time and better restart capability. **H3's strategy here is explicit: take the risk on the first stage (an entirely new LE-9) and stay safe on the second.**",
    },
    fairing: {
      name: "Payload fairing",
      description: "5.2 m in diameter, in short (S) and long (L) versions; the long fairing gives a 63 m stack.",
    },
  },

  modelNote:
    "Reconstructed in the H3-24L configuration: 63 m tall, 5.27 m core, four SRB-3 solid boosters and the long fairing.",

  sources: [
    { title: "H3 Launch Vehicle — JAXA", publisher: "JAXA", note: "Configurations, stage parameters, performance and cost targets." },
    { title: "H3 Test Flight 1 Failure Investigation Report", publisher: "JAXA", note: "The three candidate failure paths for the maiden flight and the corresponding corrective actions." },
    { title: "LE-9 Engine Development", publisher: "Mitsubishi Heavy Industries", note: "Scaling the expander bleed cycle and the cracking problems found during development." },
  ],

  tags: ["Medium-heavy lift", "Expander bleed", "All-hydrolox", "Solid boosters", "Low-cost expendable"],
};
