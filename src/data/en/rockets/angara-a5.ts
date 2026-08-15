import type { RocketOverlay } from "@/i18n/localize";

export const angaraA5En: RocketOverlay = {
  displayName: "Angara A5",
  country: "Russia",
  agency: ["Khrunichev State Research and Production Space Center"],
  description:
    "Twenty years in the making, Russia's replacement for Proton: non-toxic, modular, entirely domestic — and considerably more expensive than the rocket it replaces.",

  history: `Angara was approved in **1992**, twenty-two years before it flew in 2014. That span is its most important footnote.

The three motivations all follow from the Soviet collapse:

1. **Baikonur was no longer Russian.** Proton could only launch from Kazakhstan, at high rent, with drop-zone contamination repeatedly prompting Kazakh suspensions. Russia needed a heavy launcher it could fly from its own territory (Plesetsk, and later Vostochny).
2. **The supply chain had broken.** Parts of Proton and Zenit were made in Ukraine. Angara required **100% production inside Russia.**
3. **The toxic propellant had to go.** UDMH contamination from Proton's first stage was a lasting diplomatic and environmental burden.

The technical answer was the Universal Rocket Module (URM): a standard 2.9 m module powered by RD-191, with parallel copies covering the whole performance range. One module is Angara 1.2 (3.8 t to LEO), five is A5 (24.5 t), and seven on paper is A7 (35 t).

Then came two decades of funding famine. The Russian space budget collapsed in the 1990s and Angara nearly stopped; in the 2000s it was sustained by commercial revenue from Proton, and still slipped repeatedly. **A5 flew successfully on 23 December 2014**, by which time the rocket it was meant to replace had been flying for another twenty years.

Cadence has stayed slow since: 2014, 2020, 2021, 2024 — **only a handful of A5 flights in a decade**, one of which (2021) failed to reach the target orbit because of a Briz-M fault.

In April 2024 A5 flew successfully from **Vostochny**, achieving the most important item on its original list: independence from Kazakhstan.

The real problem is cost. **Angara A5 has been publicly reported at 1.5 to 2 times Proton's price**, a point Khrunichev's own management has acknowledged. The reason is not hard to see: Proton had sixty years and four hundred flights of amortisation; Angara builds one or two a year.`,

  designPhilosophy: `Angara's central idea is **modular universality**: one module and one engine covering the entire range of launch demand.

On paper it is very attractive:

- **One production line** — every URM-1 is identical, so volume is the sum across all configurations and unit cost should fall;
- **One engine** — RD-191 flies on everything from 1.2 to A5 to A7, with volumes adding up the same way;
- **One launch pad** — configurable support structures serve different vehicles.

Reality gave a more complicated answer.

**The strengths are real:** it fully solved the three problems in the founding charter — domestic launch site, all-domestic production, non-toxic propellant. RD-191 is genuinely excellent, at 262 bar and throttleable to 30%, world-class performance.

**The difficulty is that “universal” presupposes “enough total volume.”**

The economics of modularity assume:

$$\\text{cost per module} = f\\left(\\sum_{\\text{all configurations}} \\text{annual volume}\\right)$$

Amortisation only happens when the total is large. Russia's launch demand shrank drastically after 1991, and the commercial market was taken by Falcon 9 after 2015. **Without volume, modularity delivers only complexity and no scale effect.**

By contrast, **Falcon 9 reached the same goal by the opposite strategy**: no modularity at all, one rocket, flown a hundred times a year. **Scale comes from production rate, not from the number of configurations.**

There is a structural cost too: five parallel modules mean five engines, five pressurisation systems, four separation mechanisms and complex aerodynamic interaction. A single 4 m core with two RD-191s would be far simpler — **but that would need its own production line, defeating the point of “universal.”**

**Angara is a rocket designed for an uncertain future demand that never materialised.**`,

  tradeoffs: [
    {
      question: "Does modularity actually save money?",
      answer: `You have to separate **development cost** from **unit cost**; modularity moves them in opposite directions.

**Development cost: yes, it saves.**
Angara needed to develop one URM-1 module and one RD-191 engine to cover 3.8 to 24.5 t. Developing separate small, medium and large rockets would have cost far more. For cash-starved 1990s Russia this was the only viable path.

**Unit cost: not necessarily, and often worse.**
Modularity levies a “configuration tax”:

- **Every module must be able to do every job.** URM-1 has to work as a core (upper interface to the second stage) and as a booster (nose cone on top, separation hardware on the side), so each module carries structure that its current role does not need.
- **Parallel is more complex than monolithic.** Five modules mean five pressurisation systems, five propellant management systems, four separation mechanisms, and a complicated base heating and aerodynamic environment. An equivalent single-core vehicle needs one of each.
- **Twice as many engines.** A5 uses five RD-191s; a 4 m core with two would cut engine count by 60%, and engines are usually the most expensive item in a stage.

**Unit cost is really governed by annual volume.**

Three cases:

| | Strategy | Annual rate | Result |
|---|---|---|---|
| Angara | Modular across the whole range | 1–2 | More expensive than the Proton it replaces |
| Falcon 9 | One configuration, recovery and cadence | 100+ | The lowest unit cost in history |
| Long March | Several parallel types, each with its own line | 60+ | Every type has volume enough to amortise |

**Conclusion: modularity is the right choice when development budget is the binding constraint, but it is not a substitute for volume.** If total demand does not rise, modularity saves a one-off development cost and charges configuration complexity on every single flight.`,
    },
    {
      question: "Why does a new rocket still use the old Briz-M upper stage?",
      answer: `Because the new upper stage never arrived, and missions could not wait.

Angara was originally planned around **KVTK**, a hydrolox upper stage in the 460 s class that would have raised A5's GTO performance from 5.4 t to over 7.5 t. A hydrolox upper stage is standard equipment on heavy launchers — Ariane 5, Delta IV, Long March 5 and SLS all have one.

KVTK has never flown. The reasons are budget and priority: a cryogenic upper stage needs new loading facilities, a new engine (RD-0146) and new insulation and propellant management technology, all of it expensive.

So Angara flies the Briz-M that Proton used for twenty years: hypergolic, only 328 s of impulse, but **available, mature and restartable.**

The consequences are concrete:

- **GTO performance is capped.** A5 exceeds Proton to LEO (24.5 t against 23 t) but its GTO capability of 5.4 t is **lower than Proton's 6.9 t**, because Proton's third stage was more efficient and Briz-M worked at a better operating point there. **A better rocket went backwards on the commercially most valuable number.**
- **“Non-toxic” is only half done.** Eliminating UDMH from the first stage was one of Angara's headline claims, but the upper stage still uses it. Drop-zone contamination is solved; loading and ground handling toxicity is not.

**This is a very common pattern: a new system breaks through on the hardest part (new engine, new airframe) and then stalls on the supporting elements.** Without a matched upper stage, a heavy launcher cannot express its high-energy capability.

Angara A5M plans to fly **ORION / KVTK** and push GTO capability into the 8 t class. That work continues.`,
    },
    {
      question: "Why did it take twenty years to fly?",
      answer: `Because for those twenty years it was never the most urgent thing.

Approved in 1992, it faced a Russian space budget an order of magnitude below Soviet levels. **In years when the money barely covers operating the existing fleet, a replacement programme is always last in line** — especially when the thing being replaced (Proton) still works and earns hard currency.

The funding logic is ironic in its specifics: a substantial share of Angara's development money came from **Proton's commercial launch revenue.** Its progress depended on how well the rocket it was meant to replace was selling. The better Proton sold, the more money Angara had; once Proton stopped selling (after 2015), Angara had less.

Other causes of delay:

- **The launch sites had to be built too.** The Angara pad at Plesetsk was built from scratch, and the Vostochny pad was not finished until 2023. Rocket and pad must move together, and either one slipping holds the other.
- **RD-191 development.** Deriving a single-chamber engine from RD-170 is not simple scaling: combustion stability, turbopump matching and throttle range all had to be redone, with long test campaigns.
- **The requirement itself moved.** Over twenty years, Falcon 9 rewrote the price structure of the launch market; the cost targets Angara was benchmarked against in 1992 were obsolete by first flight.

**There is a rule here that applies to every long-cycle space programme: the longer the development, the more likely the founding assumptions have expired.** Angara was designed for the world of 1992 and delivered into the world of 2014; SLS was designed for 2010 and delivered into 2022. **In a field where technology and cost structures move quickly, time itself is the largest risk.**`,
    },
  ],

  contemporaries: `**Proton-M** is what it replaces. Angara wins comprehensively on environment, autonomy and launch site freedom, and loses on cost and GTO performance — **a direct case of better technology not making a better product.**

**Falcon 9** (2010) solved the same problem in the same period by the opposite strategy: no modularity, one rocket, cost driven down by cadence and recovery. The pairing is close to a controlled experiment on where scale effects come from.

**Vulcan Centaur** (2024) is in a similar position: built to replace a mature but politically problematic predecessor (RD-180 dependence vs Proton's toxicity), with a new domestic engine, and facing the same question of how to be cheap at low volume.

**Long March 5** (2016) took another route: rather than one module for everything, each performance band gets its own vehicle (Long March 6/7/5), each with enough domestic demand to support its production rate. **On the evidence so far, that route has worked better than Angara's one-module-fits-all.**`,

  milestones: [
    { title: "Programme approved", note: "Objectives: domestic launch site, all-domestic production, non-toxic propellant, replacing Proton." },
    { title: "Angara 1.2PP first flight", note: "Suborbital demonstration." },
    { title: "A5 flies successfully", note: "Launched from Plesetsk, placing a mass simulator into GEO." },
    { title: "Third flight", note: "Briz-M upper stage fault; the target orbit was not reached." },
    { title: "First launch from Vostochny", note: "First flight from the new Far Eastern launch site, completing the move away from Kazakhstan." },
  ],

  launchesNotable: [
    { name: "A5 maiden flight", note: "Mass simulator delivered to GEO." },
    { name: "Persona test payload", note: "Briz-M fault; target orbit not achieved." },
    { name: "Vostochny debut", note: "Ignition succeeded only on the third attempt, the first two aborted by pressurisation and engine start issues." },
  ],

  variants: [
    { name: "Angara 1.2", note: "Single-module configuration, 3.8 t to LEO." },
    { name: "Angara A5", note: "Five-module configuration, 24.5 t to LEO, replacing Proton." },
    { name: "Angara A5M", note: "Uprated engines, planned with a hydrolox upper stage." },
    { name: "Angara A5V", note: "Paper configuration with a hydrolox upper stage, up to 35 t to LEO." },
  ],

  stages: [
    {
      nameZh: "Four URM-1 boosters plus a URM-1 core",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "All five modules are identical; the core throttles to 30% during the boost phase and returns to full thrust after booster separation.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "The single-chamber member of the RD-170 family, 262 bar, throttleable to 30%." }],
    },
    {
      nameZh: "URM-2 second stage",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "One four-chamber RD-0124A at 359 s vacuum impulse, the highest of any kerosene engine.",
      engines: [{ cycleZh: "Oxidiser-rich staged combustion", note: "Four gimballing chambers sharing a single turbopump." }],
    },
    {
      nameZh: "Briz-M upper stage",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "Carried over from Proton, restartable, responsible for GTO and GEO injection.",
      engines: [{ cycleZh: "Gas generator", note: "Restartable eight times, with cumulative burn time measured in hours." }],
    },
  ],

  parts: {
    "core-rd191": {
      name: "RD-191 engine (core)",
      description:
        "A single-chamber RD-191 at 262 bar, 1,922 kN at sea level — **one quarter of an RD-170.** RD-170 (four chambers, Energia) → RD-180 (two chambers, Atlas V) → RD-191 (one chamber): the same core technology sliced three ways over thirty years. The core throttles to 30% during the boost phase to extend its own burn.",
    },
    "core-urm1": {
      name: "URM-1 core module",
      description:
        "“Universal Rocket Module” — Angara's whole design philosophy is in the name. One 2.9 m module: one of them is Angara 1.2, five are A5, and seven on paper are A7. **The goal was for one production line to cover 3.8 to 35 t.**",
    },
    "booster-rd191": {
      name: "RD-191 engines (boosters, ×4)",
      description: "One RD-191 per booster module, identical to the core's. Five light together for 9,610 kN at liftoff.",
    },
    "booster-urm1": {
      name: "URM-1 booster modules (×4)",
      description:
        "Identical to the core module with a conical nose cone on top. **This is the clearest difference from Proton**: Proton's six external cylinders are only fuel tanks, while Angara's four modules are complete boosters that separate. The price is that every module needs its own propellant management and pressurisation.",
    },
    "booster-nose": {
      name: "Booster nose cones",
      description: "The boosters separate around T+214 s.",
    },
    urm2: {
      name: "URM-2 second stage",
      description:
        "A 3.6 m second stage with one RD-0124A — **an engine whose 359 s vacuum impulse is the highest of any kerosene rocket engine.** It uses oxidiser-rich staged combustion with four gimballing chambers, sharing its lineage with Soyuz-2.1b's RD-0124.",
    },
    "briz-m": {
      name: "Briz-M upper stage",
      description:
        "Carried over from Proton: hypergolic and restartable. **This is the least “new” thing on Angara** — a new-generation rocket fitted with a previous-generation upper stage, because the planned KVTK hydrolox stage never materialised.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 4.35 m fairing, the same class as Proton's, so existing payload interfaces and envelopes carry over directly.",
    },
  },

  modelNote:
    "Reconstructed in the A5 configuration: 55.4 m tall, 2.9 m module diameter, 8.86 m span, five identical URM-1 modules.",

  sources: [
    { title: "Angara Launch Vehicle Family", publisher: "Khrunichev State Research and Production Space Center", note: "Dimensions, masses and performance for each configuration." },
    { title: "Angara — RussianSpaceWeb", publisher: "Anatoly Zak", note: "Development history, causes of schedule slip, and discussion of cost." },
    { title: "RD-191 Engine", publisher: "NPO Energomash", note: "Thrust, impulse, chamber pressure and throttle range." },
  ],

  tags: ["Modular", "Non-toxic propellant", "Heavy lift", "Russia"],
};
