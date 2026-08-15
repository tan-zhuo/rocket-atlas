import type { RocketOverlay } from "@/i18n/localize";

export const falconHeavyEn: RocketOverlay = {
  displayName: "Falcon Heavy",
  country: "United States",
  agency: ["SpaceX"],
  description:
    "Three existing first stages strapped together produced the second most powerful rocket ever flown — and demonstrated along the way that strapping things together is nowhere near as cheap as it sounds.",

  history: `Falcon Heavy was announced in 2011 for a 2013 debut and flew on **6 February 2018**. That five-year slip is its most important technical conclusion.

Musk put it bluntly before the first flight: “We thought it would be easy to just stick three cores together, and it turned out we had to redesign the centre core … it was way harder than building a new rocket.” That is not modesty. Loads, vibration, aerodynamics and separation in a triple-body configuration are all core-level new problems.

The maiden payload was Musk's own **Tesla Roadster**, because no customer would put a real spacecraft on an untested vehicle. The mannequin “Starman” sat in the driver's seat with **DON'T PANIC** on the dash. Both side boosters returned and landed nearly simultaneously; the centre core was lost when the TEA-TEB igniter fluid for the landing burn ran out.

Flights were then very sparse — **only three in the four years after the debut.** Not because it was hard to use, but because it was too big: Falcon 9's recoverable capability (17.5 t) covers the overwhelming majority of commercial missions, and customers who need more are rare.

Cadence picked up after 2022 with three kinds of customers: Space Force high-energy orbits (USSF-44/67/52), oversized GEO communications satellites (ViaSat-3, Jupiter-3) and NASA deep-space probes (**Psyche**, **Europa Clipper**). These are missions Falcon 9 cannot reach and for which SLS is too expensive or unavailable.

**Its real place in history may be this: until Starship matures, it was the only option for missions that needed heavy lift but could not afford SLS.**`,

  designPhilosophy: `Falcon Heavy's logic is **buy capability with existing production rather than with new development** — extremely attractive on paper, expensive in engineering.

On paper: Falcon 9 first stages are already in volume production, with known cost and reliability proven over dozens of flights. Strap three together and you get nearly triple the performance for the price of “adding a connecting structure.”

The engineering bill looks nothing like that:

1. **The centre core had to be redesigned.** Each side booster produces about 7,600 kN at liftoff, all of which must pass through two sets of attachment fittings into the core. Tank walls thickened, frames added near the joints, and **the parts commonality between the centre core and a Falcon 9 first stage is far lower than outsiders assume.**
2. **The aerodynamic environment is entirely new.** Transonic flow around three bodies, shock interaction between booster nose cones and core, base recirculation heating — none of it can be extrapolated from single-body data, so wind tunnel and CFD work started over.
3. **Separation is the most dangerous event.** Two 40 m boosters must push away simultaneously and symmetrically at supersonic speed without touching the still-burning core. Any asynchrony is catastrophic.
4. **The reliability arithmetic of 27 engines.** At 0.999 per engine, the probability that all 27 behave is 0.973. Falcon Heavy depends on being able to fly through failures — several engines may shut down early and the mission still succeeds. This is the sharp contrast with N1.

**What did it buy?** A very concrete number: 63.8 t for 150 million dollars in expendable configuration, against Delta IV Heavy's 28.4 t for 350 million. **Twice the payload at less than half the price** — that comparison effectively ended the American expendable heavy-lift rocket.

And its own logic has already been superseded: Starship does not strap anything together, it simply builds a 9 m core. **Strapping is what you do while you cannot build a big core; once you can, there is no reason for it.**`,

  tradeoffs: [
    {
      question: "Won't 27 engines repeat N1's fate?",
      answer: `N1 flew 30 NK-15s, failed four times out of four, and is the evidence most often cited for “too many engines.” Falcon Heavy flies 27 and has never failed. The difference is not the number but three specific things:

**1. Whether you can shut one down in flight.**
N1's KORD system did shut engines down, but in symmetric pairs (killing the opposite engine to keep thrust balanced), and the system itself was badly flawed — on the second flight it misread a failure and shut down nearly everything. Every Merlin can be shut down independently while the flight computer re-allocates thrust vector in real time; Falcon 9 lost an engine on CRS-1 and still completed its primary mission.

**2. How many times the individual engine has flown.**
NK-15 was a single-use engine — its design did not permit flight after a test firing, so **every engine that actually flew had never been lit**, with batch quality inferred from sampled test articles. Merlin 1D is the opposite: every unit is fired at McGregor before delivery, the assembled vehicle gets a full static fire, and cumulative flight units number in the thousands.

**3. Structural isolation.**
The Octaweb separates each engine into its own bay with steel beams, so an uncontained failure (a turbine disc departing) does not damage its neighbours. N1's base was an open annular compartment; on 3 July 1969 an oxidiser pump disintegrated, the debris wrecked the entire base, and the vehicle fell back and destroyed the pad.

**Conclusion: engine count is not the problem. “Cannot shut one down + no isolation + the engines that fly have never been fired” is the problem.** With more engines reliability multiplies; but if the system tolerates single failures, it becomes additive again.

$$P_{\\text{mission}} = \\sum_{k=0}^{k_{\\max}} \\binom{n}{k} p^{\\,n-k}(1-p)^k$$

If $k_{\\max}$ failures are tolerable, mission success actually **improves** with $n$ — **the value of redundancy comes precisely from having many.**`,
    },
    {
      question: "Why is the highest-performance configuration the one that cannot be recovered?",
      answer: `Falcon Heavy has three configurations with widely different capability:

| Configuration | LEO | Notes |
|---|---|---|
| Full recovery (both boosters RTLS + core on droneship) | ≈ 30 t | Routine commercial missions |
| Boosters recovered, core expended | ≈ 45–50 t | The usual choice |
| Fully expendable | 63.8 t | Only for extreme high-energy missions |

The gap is the Δv that recovery costs. Returning requires three burns: boostback, entry and landing. That propellant would otherwise have accelerated the payload.

For the side boosters the accounting works out well: they separate at T+154 s, at low supersonic speed and below 70 km, so the return Δv is modest.

**The core is a different story.** It burns on alone for three more minutes after booster separation, staging near 3 km/s and above a hundred kilometres. Decelerating and returning from there costs far more propellant, close to a third of the payload. And missions that need 60 t of capability are usually exactly the missions least able to accept a discount — **so the missions that most need the core are the missions that must throw the core away.**

Europa Clipper (2024) was exactly that: to send a 6 t spacecraft directly onto a Jupiter transfer, all three cores were expended.

**This reveals a general rule about reuse: its economics only work when performance has margin.** When a mission pushes the vehicle to its limit, the propellant reserved for recovery becomes an unaffordable cost. Starship's way around this is to make the margin enormous — enough excess capability that full recovery still leaves plenty.`,
    },
    {
      question: "If Falcon Heavy exists, why is the US spending billions on SLS?",
      answer: `Congress has been asked this repeatedly. The answer has a technical half and a political half, and both are true.

**Technically the difference is high-energy orbits and volume.**

| | Falcon Heavy (expendable) | SLS Block 1 |
|---|---|---|
| LEO | 63.8 t | 95 t |
| Trans-lunar injection | ≈ 16–18 t | 27 t |
| Fairing envelope | 5.2 × 13.1 m | 5.0 × 19.1 m (Block 1) |
| Upper stage | Kerosene, 348 s | Hydrolox, 462 s |

The decisive row is **TLI**. Falcon Heavy's second stage burns kerosene at 348 s; SLS uses the hydrolox ICPS at 462 s. **On high-Δv trajectories the upper stage's impulse matters far more than the first stage's thrust.** That is why a 50% gap in LEO becomes a gap of more than 60% to the Moon.

For Falcon Heavy to put 27 t on a lunar transfer would require orbital refuelling or an extra stage — neither of which exists yet.

**Politically the difference is more direct.** SLS reuses the Shuttle's RS-25 engines, solid boosters and associated supply chain, with jobs spread across several key states. The authorising legislation explicitly requires the use of “existing Shuttle infrastructure and workforce.” **That is not a hidden motive; it is a written design requirement.**

The cost is roughly 2.2 billion dollars per launch excluding development amortisation, at most one flight a year.

**What will actually settle the argument is not Falcon Heavy but Starship** — if it delivers 100 t of capability fully reusable, SLS loses its technical justification too, and only the political one remains.`,
    },
  ],

  contemporaries: `**Delta IV Heavy** (2004–2024) was its direct competitor: less than half the payload at more than twice the price, retired six years after Falcon Heavy's debut. The pairing is about as clean an experiment in “two cost structures” as spaceflight offers.

**SLS** (2022) beats it by 50% to LEO and by far more to lunar transfer, but costs an order of magnitude more per flight and can be built roughly once a year. The two are complementary rather than competing: Falcon Heavy absorbed everything that needed heavy lift but did not need to be SLS.

**Long March 5** (2016, 25 t to LEO) represents a different trade: rather than strapping identical cores together, it uses a 5 m hydrolox core with four 3.35 m kerosene boosters — **heterogeneous strap-on.** Harder to develop (two propulsion systems at once) but it sidesteps the structural problem of a core carrying huge side loads from identical boosters.

**Starship** (in development) is the end of the strap-on idea: no boosters, just a 9 m core and a 9 m ship. **Falcon Heavy proved that strapping works, and also that it is not worth doing.**`,

  milestones: [
    { title: "Development announced", note: "Originally planned for a 2013 debut." },
    { title: "Successful maiden flight", note: "Payload was a Tesla Roadster; both side boosters landed nearly simultaneously and the core was lost at sea." },
    { title: "STP-2 mission", note: "First flight of reused boosters; the second stage fired four times, demonstrating long-duration orbital operations." },
    { title: "Psyche asteroid mission launched", note: "NASA's first planetary science mission on Falcon Heavy." },
    { title: "Europa Clipper launched", note: "All three cores expended to inject directly onto a Jupiter transfer." },
  ],

  launchesNotable: [
    { name: "Falcon Heavy Demo", note: "Starman and the Roadster entered a heliocentric orbit." },
    { name: "USSF-44", note: "First Space Force mission, injecting directly into GEO." },
    { name: "ViaSat-3 Americas", note: "Fully expendable, launching one of the largest commercial communications satellites ever built." },
    { name: "Europa Clipper", note: "A 6 t spacecraft sent directly onto a Jupiter transfer." },
  ],

  variants: [
    { name: "Full recovery", note: "Both boosters return to launch site and the core lands on a droneship; about 30 t to LEO." },
    { name: "Booster recovery", note: "Core expended — the standard commercial configuration." },
    { name: "Fully expendable", note: "63.8 t to LEO, used only for extreme high-energy missions." },
  ],

  stages: [
    {
      nameZh: "Three Falcon 9 first stages",
      propellantZh: "RP-1 kerosene / subcooled liquid oxygen",
      note: "27 Merlin 1D engines; the side boosters separate at T+154 s and return, and the core continues to about T+190 s.",
      engines: [
        { cycleZh: "Gas generator", note: "Identical to Falcon 9's; the centre core throttles to about 70% during the boost phase." },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "Fully common with Falcon 9, restartable, responsible for GTO and escape injections.",
      engines: [
        { cycleZh: "Gas generator", note: "Niobium radiatively cooled nozzle extension, expansion ratio 165." },
      ],
    },
  ],

  parts: {
    "core-octaweb": {
      name: "Centre core Merlin 1D (×9)",
      description:
        "The core's nine engines **throttle to about 70%** during the boost phase and return to full thrust once the side boosters separate. This is not about saving fuel — it is so the core still has propellant left at separation; 27 engines at full thrust would drain it by T+150 s.",
    },
    "core-body": {
      name: "Centre core",
      description:
        "Externally almost identical to a Falcon 9 first stage, internally not at all: **the core carries the entire thrust of both side boosters.** Structure around the two attachment points had to be redone, tank walls thickened, and fittings added to feed 8,000 kN of side load into the primary structure. This is the biggest lie inside the phrase “three identical cores strapped together” — the middle one is not identical.",
    },
    "booster-octaweb": {
      name: "Side booster Merlin 1D (×9 each)",
      description:
        "Nine per booster, so 27 Merlins light together for 22,819 kN at sea level — **the second most powerful vehicle ever actually flown, after Saturn V.** Ignition is not simultaneous: engines light in groups from the centre outward, milliseconds apart, to spare the pad the instantaneous shock.",
    },
    "booster-body": {
      name: "Side boosters (×2)",
      description:
        "Converted Falcon 9 first stages: conical nose cone instead of an interstage, attachment fittings added, tank pressurisation logic rewritten. Both separate around T+150 s and fly back to the two landing zones at the Cape — **the image of two boosters touching down almost in unison on the maiden flight is the vehicle's most famous moment.**",
    },
    "booster-gridfins": {
      name: "Booster grid fins",
      description: "Titanium grid fins providing control authority during the return and entry phases.",
    },
    "booster-nose": {
      name: "Booster nose cones",
      description: "Replacing Falcon 9's interstage, improving transonic aerodynamics of the triple-body configuration.",
    },
    interstage: {
      name: "Interstage",
      description: "The composite interstage housing the second stage vacuum nozzle and the pneumatic separation system. The core continues for about three minutes after booster separation before staging.",
    },
    "s2-body": {
      name: "Second stage",
      description:
        "Exactly the same second stage as Falcon 9, with one MVac. **This is where Falcon Heavy saves the most money and where its performance ceiling lives**: only 111 t of propellant, so capability falls away quickly for missions beyond GTO. Delivering 63.8 t to LEO requires expending all three cores.",
    },
    fairing: {
      name: "Payload fairing",
      description:
        "A 5.2 m diameter, 13.1 m composite fairing — **and this is Falcon Heavy's most practical limitation**: it can lift 63.8 t to LEO but cannot enclose a payload of matching volume. Large space telescopes and pressurised modules, where volume rather than mass is the binding constraint, still will not fit. Capability and envelope are two different things.",
    },
  },

  modelNote:
    "Reconstructed from the SpaceX user's guide: 70 m tall, 3.66 m core diameter, 12.2 m span across the triple stack, 5.2 m fairing.",

  sources: [
    { title: "Falcon User's Guide", publisher: "SpaceX", note: "Primary source for dimensions, masses, orbital performance and fairing envelope." },
    { title: "Falcon Heavy — SpaceX", publisher: "SpaceX", note: "Thrust, engine count and recovery configurations." },
    { title: "Falcon Heavy — Wikipedia", publisher: "Wikipedia", note: "Launch record and price estimates; price varies greatly with recovery configuration." },
  ],

  tags: ["Heavy lift", "Parallel stage", "Partially reusable", "Deep space"],
};
