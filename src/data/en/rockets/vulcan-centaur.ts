import type { RocketOverlay } from "@/i18n/localize";

export const vulcanCentaurEn: RocketOverlay = {
  displayName: "Vulcan Centaur",
  country: "United States",
  agency: ["United Launch Alliance (ULA)"],
  description:
    "ULA's single platform replacing both Atlas V and Delta IV, covering the whole payload range with a variable number of solid boosters and an upper stage whose lineage runs back sixty years.",

  history: `Vulcan has an unmistakably political origin. After Russia annexed Crimea in 2014, US Congress legislated against using Russian RD-180 engines for military launches — and ULA's workhorse Atlas V was powered by exactly that engine. Within a few years ULA had to replace either the engine or the entire rocket.

It chose the rocket, and solved a second problem along the way: maintaining two production lines, Atlas V and Delta IV, was expensive. Vulcan's goal was **one platform to replace two families**, bringing per-launch cost down from Atlas V's 110 million dollars and up toward the 80 million class.

Development was repeatedly held up by the BE-4 engine. First flight slipped from a planned 2019 to 8 January 2024 (Cert-1, carrying Astrobotic's Peregrine lunar lander — the rocket performed perfectly and the lander failed on its own propulsion leak). On the Cert-2 flight in October 2024 a solid booster nozzle detached in flight; the mission still succeeded, but certification slipped.

Vulcan's order book is among the healthiest of any new vehicle: US Space Force NSSL Phase 2 contracts and 38 launches for Amazon's Kuiper constellation. **It does not need to win in the open market; it needs to deliver on schedule.**`,

  designPhilosophy: `Vulcan's design logic is **replacing a family of vehicles with a family of configurations.**

Atlas V already practised this in part (zero to five solid boosters). Vulcan takes it to the limit: one core, one upper stage, and 0/2/4/6 solid boosters plus two fairing lengths cover everything from small GTO missions to 27 t to LEO. The user's guide lists a dozen configuration codes (VC0S through VC6L), but the factory runs one line.

The value of that is **amortising fixed cost**: the dominant costs in this industry are production lines, buildings, test equipment and skilled staff, not raw materials. Making every mission share the same hardware is the most direct way to cut unit price when flight rate is limited (10–25 a year).

The second thread is **selective aggression inside a conservative design**: a first stage using an oxidiser-rich staged-combustion methane engine nobody had ever mass-produced (BE-4), paired with an upper stage whose lineage began service in 1962 (RL10). That combination reflects ULA's judgement — **the first stage engine had to be replaced (RD-180 was cut off); the upper stage had no reason to change** (Centaur's performance and reliability remain unmatched).

The third is **explicitly declining whole-vehicle reuse**. ULA has published its arithmetic: at 10–25 launches a year, the refurbishment and facility costs of recovering a whole first stage cannot be amortised. The SMART proposal (recovering only the engine section) is its compromise, and remains on paper — **which is effectively an admission that at this flight rate, reuse is a sum that does not close.**`,

  tradeoffs: [
    {
      question: "Why no first stage recovery?",
      answer: `ULA's former CEO Tory Bruno has set out this reasoning publicly several times, and it is worth following in full.

The economics of booster recovery depend on three quantities: **what fraction of vehicle cost is the first stage** (call it $f$), **refurbishment cost as a fraction of new-build cost** ($r$), and **how many times an airframe flies** ($n$) — plus the payload lost to recovery.

ULA's numbers: engines are about 65% of first stage cost, and the first stage is about 60% of vehicle cost. So engines are roughly 40% of the vehicle and the structure only 20%.

Under that cost structure:

- Recovering the whole stage costs payload (about 25%), landing hardware mass, and the fixed cost of a recovery fleet and refurbishment facilities, to recover 60% of airframe value;
- Recovering only the engine section (SMART) costs far less payload — separation hardware, a decelerator and a capture — to recover 40% of the value.

**The decisive variable is flight rate.** Fixed recovery costs are divided by launches per year. SpaceX flies 100+ times, so the per-flight share is negligible; ULA flies 10–25, so the same facilities cost four to ten times as much per flight. On ULA's numbers the SMART approach returns more than whole-stage recovery, and whole-stage recovery may return less than nothing.

The argument is mathematically sound, but it contains an assumption: **that flight rate is exogenous.** SpaceX did the reverse — assume you can create the demand (Starlink) and then design the rocket for that rate. **Two opposite causal directions: one treats cadence as a constraint, the other as a variable you can change.**`,
    },
    {
      question: "RL10 has been flying for sixty years. Why has nothing beaten it?",
      answer: `The RL10 first flew in 1962 and Centaur entered service the same year. Today's Centaur V on Vulcan is unchanged in principle:

- **Expander cycle**: hydrogen absorbs heat in the thrust chamber cooling jacket, vaporises, drives the turbopump, and is then burned in the chamber. No gas generator, no preburner, nothing wasted. It is the simplest and most reliable cycle there is, at the price of thrust limited by heat-exchange area (the RL10 produces only 106 kN), which confines it to upper stages.
- **Pressure-stabilised stainless tanks**: 0.5 mm walls held rigid by internal pressure, giving an exceptional dry mass fraction. The 1950s Atlas “steel balloon” idea found its perfect application on an upper stage.
- **453.8 s in vacuum**, close to the theoretical chemical limit.

It has not been beaten because **the design is already close to optimal for the problem**: vacuum operation, multiple restarts, long coast, and no need for high thrust. Under those constraints, an expander-cycle hydrolox engine on ultra-thin pressure-stabilised tanks is nearly unimprovable.

What has been improved is everything around it: Centaur V extends on-orbit loiter from hours toward days, adds restarts and enlarges the tanks. ULA's proposed ACES went further still, using an internal combustion engine running on boil-off hydrogen and oxygen to generate power and attitude control thrust, aiming at weeks in orbit.

**A design from 1962 still defines the standard for 2020s upper stages — which tells you how long the shelf life of a genuine optimum can be.**`,
    },
    {
      question: "Does a variable booster count really give you one platform for everything?",
      answer: `In principle, 0 to 6 GEM 63XLs cover 10.8 to 27.2 t to LEO continuously. But that continuity has hidden costs:

- **Every configuration must be certified separately.** US Space Force NSSL certification is per configuration, and VC0 and VC6 differ completely in aerodynamic loads, vibration environment and separation sequencing. Vulcan needs several flights after its debut to certify the main configurations.
- **A combinatorial explosion in loads analysis.** With six boosters, asymmetric configurations (which two positions do you use for a two-booster flight?) change aerodynamics and roll moments significantly, and each has to be analysed.
- **Solid booster thrust is not adjustable.** Once lit it follows its cast curve, with no way to trim in flight, which narrows the trajectory optimisation space.

Compare Falcon 9's approach: **one configuration, with the payload range covered by recovering or not recovering and by different trajectories.** That means certifying one configuration, at the cost of "wasting" a large rocket on light missions.

Which is better depends on the shape of the mission set. If missions spread widely across the capability range with meaningful numbers at each point, modularity wins; if they cluster at a few points, one configuration plus trajectory shaping is simpler. **Vulcan's choice reflects its customer base — US national security payloads range from 2 t navigation satellites to 15 t reconnaissance spacecraft.**`,
    },
  ],

  contemporaries: `Vulcan's position is almost exactly symmetric with **Ariane 6** (Europe, first flown 2024, 21.6 t to LEO, also configurable with 2 or 4 solids, also expendable): both are incumbent national launch providers replacing their own legacy vehicles, both centre on modularity for cost, both explicitly forgo reuse, both ran years late, and both depend primarily on government orders.

The question they share is this: **when a competitor's marginal cost keeps falling through reuse, is the 20–30% that modularity and line consolidation can save enough?** So far the answer depends less on the market than on whether governments are willing to pay for maintaining multiple independent launch providers — a strategic procurement question rather than a commercial one.`,

  tags: ["Modular configuration", "Methalox", "Solid boosters", "Expander upper stage", "National security launch"],

  milestones: [
    { title: "Vulcan programme announced", note: "A single platform to replace both Atlas V and Delta IV." },
    { title: "Cert-1 maiden flight succeeds", note: "Carried the Peregrine lunar lander; the rocket performed normally." },
    { title: "Cert-2 flight", note: "A solid booster nozzle detached in flight; the mission still succeeded." },
  ],

  variants: [
    { name: "VC0 / VC2 / VC4 / VC6", note: "Configurations distinguished by solid booster count (0/2/4/6)." },
    { name: "S / L fairings", note: "A 15.5 m short fairing and a 21.3 m long fairing." },
  ],

  stages: [
    {
      nameZh: "GEM 63XL solid boosters (×0–6)",
      propellantZh: "HTPB composite solid propellant",
      note: "The count is set per mission and is the main means of adjusting capability.",
      engines: [{ cycleZh: "Solid" }],
    },
    {
      nameZh: "First stage",
      propellantZh: "Liquid methane / liquid oxygen",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion" }],
    },
    {
      nameZh: "Centaur V upper stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Restartable, with on-orbit operation measured in hours.",
      engines: [
        {
          cycleZh: "Expander cycle",
          note: "The RL10 family has been in service since 1962 — the longest-serving rocket engine in the world.",
        },
      ],
    },
  ],

  launchesNotable: [
    { name: "Cert-1 / Peregrine Mission One", note: "Maiden flight; the lander's own failure was unrelated to the rocket." },
    {
      name: "Cert-2",
      note: "A solid booster nozzle detached in flight; the guidance system compensated and the vehicle still reached orbit.",
    },
  ],

  parts: {
    "be4-pair": {
      name: "BE-4 engines (×2)",
      description:
        "Two Blue Origin BE-4 methane engines, 2,400 kN each at sea level. ULA buying engines from a competitor is a purely political outcome: after 2014, US law barred Russian RD-180s from military launches, and only two domestic large-engine options existed — **a supply chain decision made entirely by geopolitics.**",
    },
    srb: {
      name: "GEM 63XL solid boosters (up to 6)",
      description:
        "Filament-wound composite-case solid boosters producing 2,027 kN each. **The count is configurable from zero to six per mission** — the central design idea of Vulcan: instead of developing a different rocket for each capability class, use one core with a variable number of solids to span 10.8 to 27.2 t to LEO. Here a solid booster is essentially an adjustable thrust module.",
    },
    "srb-nose": {
      name: "Booster nose cone",
      description:
        "Solid booster nose cones. The GEM 63XL uses a fixed nozzle that does not gimbal, so attitude control rests entirely on the core's two BE-4s.",
    },
    "core-body": {
      name: "First stage",
      description:
        "A 5.4 m methalox core of friction-stir-welded aluminium orthogrid panels. ULA has proposed **SMART reuse**: separate only the engine section (about 65% of first stage cost) during entry, decelerate it with an inflatable decelerator and parachute, and catch it by helicopter — recovering the engines rather than the whole airframe. It has not been implemented.",
    },
    "centaur-v": {
      name: "Centaur V upper stage",
      description:
        "Two RL10C-1-1 hydrolox engines with 453.8 s of vacuum specific impulse. Centaur's lineage goes back to 1962 — **the first hydrolox upper stage ever built**, evolving continuously for six decades. Centaur V uses pressure-stabilised stainless tanks: walls only 0.5 mm thick, held rigid by internal pressure and prone to collapse without it, which gives an extraordinary dry mass fraction. It operates for hours on orbit with multiple restarts, and the proposed ACES would extend that to weeks.",
    },
    fairing: {
      name: "Fairing",
      description: "A 5.4 m fairing available in 15.5 m and 21.3 m lengths (this model shows the short version).",
    },
  },

  modelNote:
    "A schematic reconstruction of the VC6S configuration (six solid boosters, short fairing), about 61.6 m overall. Actual missions fly with anywhere from zero to six boosters.",

  sources: [
    { note: "Primary source for configurations, dimensions and capability." },
    { note: "Per-configuration performance tables and payload envelopes." },
    { note: "Development history and flight record." },
  ],
};
