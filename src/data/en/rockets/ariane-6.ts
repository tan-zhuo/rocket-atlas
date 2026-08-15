import type { RocketOverlay } from "@/i18n/localize";

export const ariane6En: RocketOverlay = {
  displayName: "Ariane 6",
  country: "Europe",
  agency: ["European Space Agency (ESA)", "ArianeGroup", "Arianespace"],
  description:
    "Europe's answer to Falcon 9: do not chase reusability, just deliver the same performance for half the price — a rational choice that will always invite the obvious question.",

  history: `Ariane 6 was a forced turn.

Between 2012 and 2014 Falcon 9 halved the commercial GTO price relative to Ariane 5. Ariane 5's technology was beyond reproach (82 consecutive successes), but its cost structure rested on **dual launch**: two GEO satellites per flight, cost split between two customers. Once Falcon 9 could fly a single satellite for less, **the premise disappeared** — without a partner satellite you either waited or flew at a loss.

The ESA ministerial council approved Ariane 6 in December 2014 after a hard argument:

- One camp wanted a reusable vehicle to meet Falcon 9 head-on;
- The other argued that Europe's launch rate (around ten a year) could never amortise the development and ground infrastructure that recovery requires, and pushed instead to **squeeze cost out of an expendable design.**

**The second camp won**, on a concrete set of numbers: recovery economics need dozens of flights a year, and Europe's institutional plus commercial demand together came to fewer than ten.

So every Ariane 6 improvement targets manufacturing cost:

- Core tanks switched to **friction stir welding**, cutting weld count sharply;
- Vulcain 2.1's nozzle extension changed from a complex tube bundle to sheet-metal fabrication;
- Extensive **additive manufacturing** (Vinci's injector head went from 248 parts to one);
- **P120C shared with Vega-C**, doubling solid motor production volume;
- Assembly moved from bespoke vertical integration to a horizontal production line.

The target was 40–50% of Ariane 5's unit price.

First flight slipped repeatedly, from 2020 to **9 July 2024**. In between, Ariane 5 retired (July 2023) and Vega-C was grounded (after the December 2022 failure), so **Europe went nearly a year with no independent access to orbit at all** — and had to hand Galileo navigation satellites to Falcon 9.

The debut was largely successful: all primary payloads deployed, though the auxiliary power unit shut down early at the end of the mission and the deorbit demonstration was not completed.`,

  designPhilosophy: `Ariane 6's core question is: **how do you make an expendable rocket cheap in a market that cannot amortise reuse?**

Its answer has three threads.

**Thread one: move cost from design to manufacturing.**

The performance numbers barely changed — Vulcain 2.1 and Vulcain 2 have essentially the same thrust and impulse, and the propellant combinations are unchanged. What changed is how it is built: welding methods, part counts, assembly flow. This is a very industrial approach, matching how commercial aviation reduces cost.

The canonical example is Vinci's injector head: conventional manufacturing needed 248 parts and hundreds of welds; additive manufacturing makes it a single piece. **Cost falls and, at the same time, hundreds of potential leak paths become zero.**

**Thread two: raise volume through commonality.**

P120C embodies this completely. It is simultaneously:

- Ariane 6's booster (two on A62, four on A64);
- Vega-C's first stage (one each).

Developed separately, each line would build only a handful a year; shared, annual production exceeds twenty. **With no way to raise flight rate, this is the only route to scale effects available to Europe.**

**Thread three: buy mission generality with upper stage capability.**

Ariane 5's upper stage could ignite only once, locking it into “two satellites to GTO.” Vinci restarts four or more times, so Ariane 6 can:

- Inject satellites directly into GEO (saving the satellite's own transfer propellant);
- Deliver constellation satellites into several different planes on one flight;
- Deorbit itself at end of mission, complying with the debris rules Europe itself promotes.

**This is the shift from special-purpose freighter to general-purpose freighter, and it rests on exactly one technical enabler: whether the upper stage can relight.**

**What did it give up?** Reusability, explicitly. That choice was fiercely contested inside Europe, because it pins Ariane 6's cost floor at **the lowest a expendable rocket can reach** — roughly the price of a reused Falcon 9, with no further room. **If SpaceX cuts prices again, Ariane 6 has no second card.** ESA is already developing the Themis reusable-stage demonstrator and the Prometheus methane engine, but that is the next generation.`,

  tradeoffs: [
    {
      question: "Why did Europe not go reusable?",
      answer: `Because the arithmetic of recovery does not close at European flight rates. That is a quantifiable judgement, not conservatism.

The cost model is roughly:

$$\\text{saving per flight} = C_{\\text{stage}} \\times \\eta_{\\text{reuse}} - C_{\\text{refurb}} - \\frac{C_{\\text{dev}} + C_{\\text{ground}}}{N_{\\text{total flights}}}$$

The last term is what matters. Recovery requires one-off investment: developing the landing system, grid fins and legs, a droneship or landing zone, refurbishment facilities and process certification. SpaceX spreads that over hundreds of flights; Europe would spread it over **fewer than ten a year.**

A second constraint is **performance loss.** Recovery consumes 6–8% of first stage propellant and about 23% of LEO capability. Ariane 6's main customers are European institutions (Galileo, Copernicus, military reconnaissance) and GEO communications satellites, all sensitive to capability. **In a system with few flights, each one must be filled, so the discount hurts more.**

A third is subtler: **launch site geography.** Kourou sits on the northern coast of South America with the Atlantic downrange. Returning a stage needs land or a droneship, and the surrounding rainforest and ocean make landing zone construction less convenient than in Florida.

**The judgement was right in 2014 and is less clearly right in 2024** — Amazon's Kuiper, Europe's own IRIS² constellation and similar programmes could push flight rates into the mid-teens. ESA has accordingly started Themis (reusable stage demonstration) and Prometheus (low-cost methane engine) for a future vehicle.

**The lesson is that reusability is not a technical judgement but a judgement about market size.** The same technology can produce opposite answers at different flight rates.`,
    },
    {
      question: "What does sharing P120C between two rockets cost?",
      answer: `The benefit is clear: double the volume, spreading fixed costs. There are three costs, none small.

**1. The two rockets are tied together.**
In December 2022 Vega-C's Zefiro-40 second stage failed because of a nozzle throat insert material problem, and Vega-C was grounded for two years. Although the fault was not in P120C, Europe's entire solid propulsion supply chain and quality system came under review. **Commonality means shared risk**: if P120C ever fails, Ariane 6 and Vega-C stop flying at the same time and Europe loses orbital access entirely.

**2. The design must serve two roles.**
As Vega-C's first stage, P120C ignites on the ground and carries the whole vehicle's loads; as an Ariane 6 booster it hangs on the core side and transmits lateral forces. The two load cases differ, and the final design is the envelope of both — **optimal for neither.**

**3. Production scheduling conflicts.**
One line must serve two cadences. When Ariane 6 needs four at once and Vega-C is also waiting, priority is a real management problem.

**But those costs are worth paying**, because the alternative is worse: separate development would leave each motor at a handful of units a year with much higher unit cost, and Europe would have to sustain two entirely independent solid propulsion supply chains — ammonium perchlorate, HTPB binder, filament-wound carbon cases, throat insert materials, all of it.

**The general rule is that in low-volume space industry, commonality is almost the only way to obtain scale effects, and the price is trading independence for cost.** China's Long March family goes the other way (separate lines per type), but only because its total launch rate is high enough to keep every line busy.`,
    },
    {
      question: "Ariane 5 was so successful — why not just keep improving it?",
      answer: `Because the way it succeeded is exactly why it could not continue.

Ariane 5's business model rested on **dual launch**: two GEO communications satellites stacked inside the fairing, with the cost split between two customers. That was extremely effective through the 1990s and 2000s, giving it more than half of the global commercial GTO market.

The model carried two implicit assumptions:

1. **GEO communications satellites mass 3–6 t**, so two fit neatly inside the fairing;
2. **A partner satellite can always be found**, and both customers can accept the same launch window.

Both collapsed in the 2010s:

- **Satellite masses polarised.** All-electric platforms fell below 2 t while very large platforms rose above 7 t, thinning out the middle band that paired conveniently.
- **Falcon 9 flew single satellites for less.** Customers no longer needed to wait for a partner or accept someone else's window. **Waiting itself became a cost.**

Ariane 5's other fatal limitation was that **the upper stage could not restart.** ESC-A ignited once, so it could only reach GTO — no direct GEO injection and no multi-plane constellation deployment. When the market shifted from large GEO satellites to LEO constellations, it could not compete.

Could modification have fixed it? A restartable upper stage (exactly what Vinci provides) was technically feasible and ESA did study Ariane 5 ME. But the cost structure could not be fixed: Ariane 5's core welding processes, assembly flow and solid boosters (EAP, shared with nothing) were all 1980s designs, and **the unit price could not come down.**

**So ESA made a decision that was organisationally difficult and logically clear: do not modify, rebuild.** Keep the diameter (to reuse ground infrastructure), keep the propellant choices (to reuse process experience), keep Kourou — but replace the airframe, the engine manufacturing methods, the boosters and the upper stage.`,
    },
  ],

  contemporaries: `**Falcon 9** is both the reason it exists and the comparison it cannot escape. Ariane 6's target price approaches a reused Falcon 9's, but Ariane 6 is expendable — **meaning its cost has hit bottom while its competitor still has room to fall.**

**Vulcan Centaur** (US, 2024) is strikingly similar: started around 2014, meant to replace a successful but expensive predecessor, expendable (the planned engine-pod recovery was not implemented), betting on manufacturing cost. The two debuted months apart.

**H3** (Japan, 2023) has an identical objective: halve H-IIA's unit price through a new engine and simplified production. Three agencies reached the same conclusion in the same period.

**Long March 5** (China, 2016) is closest in configuration (hydrolox core, boosters, hydrolox upper stage) but uses liquid kerosene boosters and carries more. **China's route to cost reduction is domestic launch volume rather than commonality or process.**`,

  milestones: [
    { title: "Approved at the ESA ministerial council", note: "Choosing low-cost expendable over reusability." },
    { title: "First full-scale P120C firing", note: "The solid motor shared between Ariane 6 and Vega-C." },
    { title: "Ariane 5 retires", note: "Ariane 6 had not yet flown, leaving Europe without independent launch capability." },
    { title: "First flight", note: "All principal objectives achieved; the auxiliary power unit shut down early and the deorbit demonstration was not completed." },
    { title: "First operational mission", note: "Launched the French military optical reconnaissance satellite CSO-3." },
  ],

  launchesNotable: [
    { name: "VA262 maiden flight", note: "Cubesats and a re-entry capsule; APU shutdown prevented the deorbit demonstration." },
    { name: "VA263 / CSO-3", note: "First operational mission." },
  ],

  variants: [
    { name: "Ariane 62", note: "Two P120C boosters, 10.3 t to LEO / 4.5 t to GTO, for institutional and medium satellites." },
    { name: "Ariane 64", note: "Four P120C boosters, 21.65 t to LEO / 11.5 t to GTO, for dual launch and constellations." },
  ],

  stages: [
    {
      nameZh: "Lower liquid propulsion module + four P120C",
      propellantZh: "Liquid hydrogen / liquid oxygen · HTPB composite solid",
      note: "The four P120Cs light with Vulcain 2.1; boosters separate at T+130 s and the core burns to about T+490 s.",
      engines: [
        { cycleZh: "Gas generator", note: "A lower-cost derivative of Vulcain 2, with a sheet-metal nozzle extension and additive-manufactured components." },
        { cycleZh: "Solid", note: "Identical to Vega-C's first stage, 141.6 t of propellant in a filament-wound carbon case." },
      ],
    },
    {
      nameZh: "Upper liquid propulsion module",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Vinci restarts four or more times, with an auxiliary power unit enabling long coasts and active deorbit.",
      engines: [{ cycleZh: "Expander", note: "Deployable nozzle extension, expansion ratio 240, multiple restarts." }],
    },
  ],

  parts: {
    vulcain: {
      name: "Vulcain 2.1 engine",
      description:
        "Derived from Ariane 5's Vulcain 2: the nozzle extension switched to **lower-cost sheet-metal fabrication** and additive manufacturing is used extensively. Performance barely moved (1,370 kN in vacuum, 431 s); everything that changed was manufacturing — **Ariane 6's entire premise is “the same performance for half the cost.”**",
    },
    "core-lh2": {
      name: "Core stage liquid hydrogen tank",
      description: "A 5.4 m core, keeping Ariane 5's diameter so the existing tooling in Toulouse and Bremen and the ground infrastructure at Kourou can be reused.",
    },
    "core-lox": {
      name: "Core stage liquid oxygen tank",
      description: "Oxygen above, hydrogen below. The core burns for about eight minutes, igniting with the boosters at liftoff.",
    },
    "p120c-nozzle": {
      name: "P120C nozzles (×4)",
      description: "Carbon-phenolic throat inserts with gimballing nozzles providing thrust vector control during the boost phase.",
    },
    "p120c-body": {
      name: "P120C solid rocket booster",
      description:
        "**This is the most important shared design in European spaceflight: the same P120C is both an Ariane 6 booster and Vega-C's first stage.** It holds 141.6 t of propellant in a single filament-wound carbon case with no segment joints, and two entirely different production lines depend on it. The purpose is direct — raise annual production from a handful to more than twenty and amortise the cost. A62 carries two, A64 carries four.",
    },
    "p120c-nose": {
      name: "Booster nose cones",
      description: "The boosters separate around T+130 s and fall into the Atlantic; they are not recovered.",
    },
    "vinci-stage": {
      name: "Upper stage (Vinci)",
      description:
        "One Vinci engine: expander cycle, 457 s vacuum impulse, **and four or more restarts.** This is Ariane 6's most substantive advance over Ariane 5, whose ESC-A upper stage could ignite only once and was therefore limited to dual GTO launches. Vinci can inject directly into GEO, place constellation satellites into several planes on one flight, and actively deorbit at end of mission. **It turned Ariane from a specialist in large GEO satellites into a general-purpose launcher.**",
    },
    "apu-fairing-base": {
      name: "Payload adapter and auxiliary power unit",
      description:
        "The upper stage carries a small auxiliary power unit that pressurises tanks and settles propellant during long coasts. Without it Vinci's multiple restarts would be impossible — **keeping propellant at the outlet during coast is the shared difficulty of every restartable cryogenic upper stage.**",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 5.4 m fairing in 14 m and 20 m lengths; the long fairing gives a stack height of 63 m.",
    },
  },

  modelNote:
    "Reconstructed in the A64 long-fairing configuration: 63 m tall, 5.4 m core, four P120C solid boosters.",

  sources: [
    { title: "Ariane 6 User's Manual", publisher: "Arianespace", note: "Dimensions, masses, per-configuration performance and fairing envelopes." },
    { title: "Ariane 6 — ESA", publisher: "European Space Agency", note: "Programme background, cost targets and the P120C commonality scheme." },
    { title: "Vinci Engine", publisher: "ArianeGroup", note: "Thrust, impulse, restart capability and the additive-manufactured injector." },
  ],

  tags: ["Medium-heavy lift", "Solid boosters", "Hydrolox", "Low-cost expendable", "Europe"],
};
