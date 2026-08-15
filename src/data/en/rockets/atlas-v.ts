import type { RocketOverlay } from "@/i18n/localize";

export const atlasVEn: RocketOverlay = {
  displayName: "Atlas V",
  country: "United States",
  agency: ["United Launch Alliance (ULA)", "Lockheed Martin"],
  description:
    "The most reliable American expendable rocket of the last two decades, flying national security payloads on a Russian engine — until that fact became an unacceptable risk on its own.",

  history: `Atlas V and Delta IV came out of the same contract, the 1990s **EELV programme**. Lockheed Martin's approach was the opposite of Boeing's: **do not chase new technology, assemble the best existing parts.**

The first stage engine was simply bought from Russia. After the Soviet collapse, NPO Energomash held something the West could not produce — **oxidiser-rich staged combustion.** Western engineers had long concluded that hot, high-pressure oxygen-rich gas would burn through turbines and ducting; the Soviets had solved that “impossible” with a specific enamel coating. RD-180 is RD-170 with two of its four chambers removed, and it out-performed every American kerosene engine of the time.

The upper stage was simply Centaur, a hydrolox stage first flown in 1962 and by then reliably working in orbit for forty years.

The result was a rocket with almost no new technology and, consequently, a near-perfect record: **one partial failure since first flight** (NROL-30 in 2007, where Centaur shut down 4 s early but the payload still reached a usable orbit). It launched New Horizons, Juno, Curiosity, Perseverance, Lucy, Solar Orbiter and the crewed Starliner test flight.

**In 2014, Crimea turned RD-180 from an asset into a liability.** The US Congress prohibited military procurement of vehicles using Russian engines after 2022. ULA started Vulcan in response: a new BE-4 engine, a new core, and Centaur as the only thing carried over.

The remaining Atlas V vehicles are all sold (mostly to Amazon's Kuiper and to Starliner) and it will fly until they are gone. **It is being ended by geopolitics, not by technology or cost.**`,

  designPhilosophy: `Atlas V's philosophy fits in a sentence: **integrate other people's optimal solutions instead of reinventing them.**

That is not conservatism but explicit risk management. A new rocket concentrates risk in three places: the first stage engine, the upper stage engine, and the structural and control integration of the whole vehicle. Atlas V replaced the first two with mature products carrying long flight histories:

- The first stage flies RD-180, whose parent RD-170 had been flying since 1985;
- The upper stage flies Centaur and RL10, first flown in 1962 with more than three hundred flights behind it.

**The only genuinely new development was the airframe** — and the airframe is the easiest of the three to verify. That allocation gave Atlas V an extremely high success rate from its very first flight.

Modularity is the second thread. The three-digit designation (401, 531, 551) encodes the configuration directly: fairing diameter, number of solid boosters, number of upper stage engines. One production line covers 9.8 to 18.9 t to LEO by adding boosters — **so every mission can buy exactly the performance it needs instead of paying for capability it will not use.**

What it gave up is equally explicit:

- **The balloon tank.** Forty years of Atlas heritage — ultra-thin stainless skin held in shape by internal pressure — was abandoned on Atlas V, because the asymmetric bending loads from strapped-on solids are not something a balloon tank can take. **Structural efficiency lost to configuration flexibility.**
- **Sovereignty.** Buying the engine was commercially optimal and strategically a single point of failure. That trade looked clever in 2002 and looked like the biggest hole in the US national security launch system after 2014.

**Atlas V is a complete case study in build-versus-buy: buying delivered twenty years of reliability and low cost, and a dependency that could not be repaired domestically.**`,

  tradeoffs: [
    {
      question: "Why did the US buy a Russian engine, and what makes oxidiser-rich staged combustion hard?",
      answer: `In an oxidiser-rich staged combustion cycle, a preburner burns a small amount of fuel in **extremely oxygen-rich** conditions, producing large quantities of hot, high-pressure **oxygen-bearing gas** to drive the turbine, and then feeds all of it into the main chamber.

The advantages are obvious:

- Not a gram of propellant is wasted (a gas generator throws away about 3% through the turbine exhaust);
- The turbine working fluid is dense oxidising gas, so the turbine can be smaller for a given power;
- Fuel-rich staged combustion (the RS-25 route) deposits coke in the ducting, badly so with kerosene; oxidiser-rich does not — **which is exactly why kerosene engines go oxidiser-rich and hydrogen engines go fuel-rich.**

What is hard? **Above 500 °C, high-pressure pure oxygen gas will ignite the metal itself.** Nickel superalloys in that environment do not corrode, they burn — and once a local fire starts, the flame propagates along the ducting and through the whole engine. The West tried in the 1960s–70s, concluded it was not engineering-feasible, and American kerosene engines stopped at the gas generator cycle (F-1, Merlin).

The Soviet solution was metallurgical rather than architectural: **diffusion and enamel protective coatings** on every surface touching the oxygen-rich gas, plus extremely strict cleanliness control (any organic residue is an ignition source). There is no shortcut; it is decades of accumulated test experience.

Hence the scene in the 1990s: American engineers visiting Khimki generally did not believe RD-170's published numbers until they watched a test firing. **Buying RD-180 was not about saving money — it was about buying an accumulated body of process knowledge the US could not reproduce quickly at any price.**

The confirmation came later: the first genuinely usable American oxidiser-rich staged combustion engines (BE-4, which is actually methane, and AR1) took nearly a decade from start to flight. The 2015 congressional deadline was almost exactly one development cycle away.`,
    },
    {
      question: "Why are five solid boosters mounted asymmetrically?",
      answer: `Atlas V's core has only three booster attachment positions, and they are not spaced at 120°. Configurations of 1, 2, 3, 4 or 5 boosters use different subsets of those positions, and the 1-, 3- and 5-booster arrangements are **asymmetric** both aerodynamically and in thrust.

Standard design intuition says asymmetric thrust produces persistent roll and yaw moments and must be avoided. Atlas V does the opposite, for a concrete reason:

- **Cost of symmetry**: making 1 through 5 all symmetric requires at least five (probably more) attachment positions on the core with their load paths. All that structure is dead mass when only one booster is fitted — and the 401 (no boosters) configuration is the most-flown variant.
- **Cost of asymmetry**: RD-180 must gimbal continuously to trim. Its gimbal authority exists for attitude control anyway, so spending part of it on trim requires no new hardware; the loss is a little cosine efficiency (the axial component of a vectored thrust falls off as $\\cos\\theta$), on the order of well under 1%.

**The result moves the problem out of the structural domain and into the control domain: the structural saving is mass carried on every flight, while the control cost is a gimbal angle solved in software.**

The trade also has a precondition: RD-180 is a single large engine with generous gimbal authority. If the first stage were a cluster of small engines (as on Falcon 9), trimming asymmetric thrust would be far harder and the design would not work.`,
    },
    {
      question: "Why keep the balloon tank on the upper stage after abandoning it on the first?",
      answer: `The balloon tank was an Atlas invention of the 1950s: skin as thin as 0.25–0.5 mm, no stringers and no frames, held in shape and made load-bearing entirely by **internal pressure**. Unpressurised, it collapses under its own weight — early Atlas missiles sitting in a hangar had to stay connected to nitrogen.

The payoff is extreme structural efficiency. Centaur's dry-mass ratio is close to **1:20** (2.25 t dry carrying 20.8 t of propellant), a figure still near the top today, achieved by a 1962 design.

So why drop it on the first stage but keep it above? Because the load environments have nothing in common:

| | First stage (Atlas V CCB) | Upper stage (Centaur III) |
|---|---|---|
| Source of bending | Transonic aero loads, concentrated booster attach forces, asymmetric thrust | Almost none — inside the fairing, outside the atmosphere |
| Load directions | Complex, multi-axis | Mainly axial |
| Anything hung off it | Five solid boosters | Nothing |

A balloon tank is good at **uniform axial compression** only. Add concentrated loads (booster attachments) or large bending (transonic buffet) and thin skin buckles locally. Supporting a modular 0-to-5 booster family made abandoning the balloon tank unavoidable.

Centaur's environment is the opposite: shielded by the fairing through the atmosphere, working in vacuum, with essentially no load but its own thrust. **In that environment the balloon tank is optimal and has not been bettered in sixty years — which is why Vulcan keeps it (Centaur V, scaled up to 5.4 m).**

Worth adding: hydrogen's density is only 71 kg/m³, so upper stage tanks are large in volume and light in propellant, making structure a big fraction of dry mass. **Upper stages are therefore exactly where structural efficiency pays best** — every kilogram of dry mass saved converts almost one-for-one into payload.`,
    },
  ],

  contemporaries: `Its stablemate **Delta IV Heavy** took the all-hydrogen, triple-core route: more capable, more than twice the price, retired in 2024. Atlas V outlived it — **in a cost-sensitive market, “exactly enough and cheap” beats “top of the class.”**

**Falcon 9** exceeds Atlas V 551 to LEO (22.8 t expendable) at less than half the price, and it comes back. After 2010 it absorbed the commercial market, pushing Atlas V back to national security and deep-space science — the two customer groups that value record over price.

**Soyuz-2.1a** (Russia) is another “maturity buys reliability” case, but its maturity comes from sixty years of not changing; Atlas V's comes from assembling mature parts from different sources. **Both routes reach high reliability, but only the latter collapses when a supply chain is cut.**

Its successor **Vulcan Centaur** keeps the Centaur bloodline and the three-digit configuration code, swapping RD-180 for the American BE-4 — **the real technical task of that vehicle is to bring a bought capability back home.**`,

  milestones: [
    { title: "First flight", note: "Launched the Hot Bird 6 communications satellite." },
    { title: "New Horizons launched", note: "A 551 with an added Star 48B third stage, setting the Earth-departure speed record." },
    { title: "NROL-30 partial failure", note: "Centaur shut down 4 s early — still the only mission that fell short." },
    { title: "Curiosity launched to Mars", note: "A 541 configuration; Perseverance later flew on Atlas V as well." },
    { title: "X-37B (OTV-4) launched", note: "Atlas V carried several missions of the Air Force orbital test vehicle." },
    { title: "Starliner Crew Flight Test", note: "Atlas V's first crewed launch, with an emergency detection system and a dual-engine Centaur." },
  ],

  launchesNotable: [
    { name: "New Horizons", note: "Still the fastest Earth departure ever achieved by a spacecraft at launch." },
    { name: "Juno", note: "Jupiter orbiter, reaching its target via an Earth gravity assist." },
    { name: "OSIRIS-REx", note: "Asteroid sample return." },
    { name: "Mars 2020 / Perseverance", note: "Flown in the 541 configuration." },
    { name: "Starliner CFT", note: "First crewed flight." },
  ],

  variants: [
    { name: "Atlas V 401", note: "4 m fairing, no boosters, single-engine Centaur — the most-flown baseline." },
    { name: "Atlas V 541 / 551", note: "5 m fairing with four or five solids, used for Mars rovers and deep-space probes." },
    { name: "Atlas V N22", note: "No fairing, dual-engine Centaur, built specifically for crewed Starliner missions." },
  ],

  stages: [
    {
      nameZh: "Common Core Booster + five solid boosters",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "The solids separate in batches around T+94 s; the core continues to about T+253 s.",
      engines: [
        { cycleZh: "Oxidiser-rich staged combustion", note: "One turbopump feeding two chambers; 257 bar chamber pressure, throttleable to 47%." },
        { cycleZh: "Solid", note: "Single-segment solid boosters, 0 to 5 fitted, with fixed nozzles." },
      ],
    },
    {
      nameZh: "Centaur III",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "A stainless balloon tank, restartable and capable of long coasts, responsible for direct injection of deep-space probes.",
      engines: [
        { cycleZh: "Expander", note: "The RL10 family has been in service for over sixty years, the longest-serving liquid rocket engine line." },
      ],
    },
  ],

  parts: {
    "rd-180": {
      name: "RD-180 engine",
      description:
        "One pump, two chambers — the Russian RD-180 is RD-170 (the four-chamber monster from Energia) cut in half. It uses **oxidiser-rich staged combustion** at 257 bar, giving 311 s at sea level, a full 40 s better than any contemporary American kerosene engine. The US bought it for a simple reason: it did not have one, and developing one from scratch would take a decade. **That engine later became the single most awkward element of the US national security launch system.**",
    },
    ccb: {
      name: "Common Core Booster",
      description:
        "A 3.81 m constant-diameter aluminium structural tank. Note that it is **constant-diameter and structurally self-supporting** — a clean break with forty years of Atlas heritage: earlier Atlas vehicles used balloon tanks that held their shape only under internal pressure and would crumple like a drinks can if unpressurised. Atlas V gave up that signature technique because a balloon tank cannot take the asymmetric loads of strapped-on solid boosters.",
    },
    "srb-nozzle": {
      name: "AJ-60A booster nozzles (up to 5)",
      description:
        "The booster nozzles are fixed; all thrust vector control comes from RD-180. That produces an unusual consequence: **the five boosters are not evenly spaced.** Atlas V has three attachment positions, so a five-booster stack is asymmetric and RD-180 gimbals continuously to trim — **a textbook case of keeping the structure simple and handing the difficulty to the engine.**",
    },
    "srb-body": {
      name: "AJ-60A solid rocket booster",
      description:
        "1,688 kN each and 20 m long, the largest single-segment solid boosters flying at the time. Fitting 0 to 5 covers 9.8 to 18.9 t to LEO continuously — **and the three-digit designation (551, say) simply means “5 m fairing / 5 boosters / 1 upper stage engine.”** The naming scheme is itself a description of the modular philosophy.",
    },
    "srb-nose": {
      name: "Booster nose cone",
      description: "The conical nose houses separation ordnance; the solids are jettisoned in two batches around T+94 s to clear the core.",
    },
    boattail: {
      name: "Interstage transition",
      description: "The flare from the 3.81 m core to the 5.4 m fairing. In the 5 m configuration the fairing encapsulates the entire Centaur stage — an unusual fully-enclosed arrangement.",
    },
    centaur: {
      name: "Centaur III upper stage",
      description:
        "**The first hydrolox upper stage ever built, first flown in 1962 and still in service — one of the longest continuous lineages in all of spaceflight.** It retains the balloon tank: 0.5 mm stainless skin held in shape by internal pressure, with a dry-mass ratio close to 1:20. Centaur can coast for hours and restart repeatedly, which is what deep-space direct injection requires: New Horizons, Juno, Curiosity, Perseverance and Lucy were all sent on their way by it.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 5.4 m composite fairing in 20.7, 23.4 and 26.5 m lengths. A 4 m metallic fairing configuration also exists for smaller payloads.",
    },
    "fairing-nose": {
      name: "Fairing nose cone",
      description: "The ogive nose. For an interplanetary mission, the last few minutes inside this cone are the only time in the spacecraft's life that it is surrounded by atmosphere.",
    },
  },

  modelNote:
    "Reconstructed from the ULA user's guide 551 configuration: 62.2 m tall, 3.81 m core, 5.4 m fairing, five AJ-60A boosters.",

  sources: [
    { title: "Atlas V Launch Services User's Guide", publisher: "United Launch Alliance", note: "Dimensions, masses, per-configuration performance and fairing envelopes." },
    { title: "RD-180 Engine Data Sheet", publisher: "NPO Energomash", note: "Thrust, impulse, chamber pressure and throttle range." },
    { title: "Assessment of Atlas V and Delta IV Engine Supply", publisher: "U.S. Government Accountability Office", note: "The policy background to the RD-180 restriction and the transition to Vulcan." },
    { title: "Atlas V — Wikipedia", publisher: "Wikipedia", note: "Launch counts vary slightly with counting convention and cut-off date." },
  ],

  tags: ["Modular", "Russian engine", "Deep space", "High reliability", "Crewed"],
};
