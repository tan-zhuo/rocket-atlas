import type { PrincipleOverlay } from "@/i18n/localize";

export const reusabilityEn: PrincipleOverlay = {
  title: "Reusability: technology and economics",
  summary:
    "Does recovering a booster actually pay? Why does the same arithmetic come out positive for SpaceX and negative for ULA? Reusability is not a purely technical question — it is a bet on the size of the launch market.",

  body: `## How the arithmetic works

Take an expendable vehicle costing $C$ to build, of which the first stage is a fraction $f$. Recovering it means:

- paying a **refurbishment cost** of $r \\cdot f \\cdot C$ per flight ($r$ being refurbishment as a fraction of new-build cost);
- flying each airframe $n$ times;
- losing payload $\\lambda$ to recovery hardware and landing propellant;
- carrying an annual fixed cost $F$ for recovery ships, refurbishment facilities and engineering staff, spread over $N$ launches a year.

Airframe cost per flight is roughly:

$$C_{reuse} = (1-f)C + \\frac{f C}{n} + r f C + \\frac{F}{N}$$

against $C_{expend} = C$ for the expendable case. Reuse pays when $C_{reuse} < C$, that is when:

$$f\\left(1 - \\frac{1}{n} - r\\right) > \\frac{F}{NC}$$

The entire industry argument lives inside that inequality. The left side is **technical** (booster cost share, reflight count, refurbishment cost); the right side is **operational** (fixed cost divided by flight rate).

## Why two companies get opposite answers

**SpaceX's parameters**: $f \\approx 0.6$–$0.7$, target $n$ of 10+ (achieved 20+), very low $r$ (Block 5's goal was routine inspection between flights), $N \\approx 100$+.

Substituting, the left side is far larger than the right, so reuse clearly pays. There is also a hidden benefit: **the production bottleneck disappears.** Building fifteen boosters a year while flying 130 times reduces factory pressure by an order of magnitude.

**ULA's parameters**: $f \\approx 0.6$, but engines are 65% of that and structure only 35%; $N \\approx 10$–$25$. Former CEO Tory Bruno's published conclusion is that at this flight rate $F/(NC)$ is too large for whole-stage recovery to close, and that recovering only the engine section (the SMART proposal) returns more.

**The argument is mathematically sound, but it treats $N$ as an exogenous constant.** SpaceX did the opposite: assume you can create the demand (a Starlink constellation needing dozens of launches a year), then design the rocket for that rate.

> **Two causal directions: one treats flight rate as a constraint, the other as a variable you can change.** That, and not any specific technical disagreement, is the fundamental split in launch vehicles over the past fifteen years.

## The family of recovery methods

### 1. Parachutes and sea recovery

The oldest approach: Shuttle solid boosters, Electron's first stage.

- **Advantages**: small payload loss (a chute bay and heat shielding, roughly 5–10%); no landing propellant.
- **Disadvantages**: the airframe soaks in seawater, and corrosion and contamination make refurbishment expensive. Shuttle SRB refurbishment eventually approached the cost of new production.
- **Suits**: simple, corrosion-tolerant, high-value components — solid cases and engines.

### 2. Propulsive vertical landing

Pioneered by Falcon 9 and followed by New Glenn: the stage decelerates on its own engines and lands vertically.

- **Advantages**: precise landing site, no seawater contact, cheapest refurbishment.
- **Disadvantages**: 6–8% of propellant must be reserved (more for return-to-site), costing 20–30% of payload; engines must throttle deeply and restart reliably; precise terminal guidance is required.
- **Two modes**:
  - **Return to launch site (RTLS)**: usable at low separation velocity, requiring a boostback burn. Highest payload cost, fastest turnaround.
  - **Droneship (ASDS)**: the only option at high separation velocity. Lower payload cost, at the price of a fleet and weather risk.

### 3. Tower catch

Super Heavy's approach: the booster hovers beside the tower and mechanical arms catch it on load pins.

- **Advantages**: **moves landing leg mass from the rocket to the ground** (legs able to absorb a 200 t empty booster's landing mass on the order of 10 t); the booster lands at the pad and could in principle be refuelled and reflown directly.
- **Disadvantages**: risk is concentrated — one failure can destroy both the booster and the only tower.

### 4. Recovering only the valuable parts

ULA's SMART (engine section only) and Rocket Lab's engine reuse fall into this category.

- **The logic**: if engines are 65% of first stage cost, why pay the price of recovering the whole stage for the other 35%?
- **The costs**: the separation mechanism has its own mass and risk, and inflatable decelerators, parachute descent and mid-air or sea capture are not yet mature.

### 5. Full reuse

Starship's goal. The second stage must return too, which means surviving the full thermal load of orbital re-entry — the hardest step in the whole field.

- **Why it is so much harder**: a first stage separates at 2–2.5 km/s and its entry heating is manageable; a second stage reaches 7.8 km/s, more than ten times the kinetic energy, all of which must be turned into heat by aerodynamic braking. That is why the Shuttle needed 24,000 tiles, and why SpaceX concluded Falcon 9's aluminium second stage could not be recovered and redesigned the entire vehicle in stainless steel.

## How reuse reshapes the whole design

Reuse is not "an expendable rocket with legs added". It works backwards through nearly every decision:

| Design item | Expendable | Reusable |
|---|---|---|
| Propellant | Impulse first | Cleanliness first (methane over kerosene) |
| Engine cycle | Impulse first | Turbine life first (FFSC) |
| Throttle range | Not needed | Must throttle below 40% |
| Structural margin | One flight | N flights plus landing loads |
| Separation hardware | Explosive bolts (single use) | Pneumatic or mechanical: resettable, testable, debris-free |
| Materials | Specific strength first | Heat tolerance, repairability, cost |
| Staging point | Mass optimum | Earlier, to reduce first stage entry velocity |

That last row deserves attention: **Falcon 9's first stage supplies only about a quarter of the total Δv**, far from the mass optimum. Every extra 100 m/s at separation raises both entry heating and the deceleration propellant required. **To be recovered, the rocket deliberately gives up its optimal staging point.**

## Where the ceiling is

Even if the technology all works, how far reuse can drive cost down depends on several non-technical factors:

1. **Propellant cost.** A Falcon 9 launch burns 200,000–300,000 dollars of propellant; Starship around a million. That is a hard floor.
2. **Ground operations.** Pad crews, range, regulatory approval, insurance. At high flight rates this can exceed hardware cost.
3. **Demand.** If the world needs only a hundred launches a year, no rocket is cheap enough to amortise fixed costs. **This is the most fragile link in the reusability story — it assumes that lower prices create demand, and so far that assumption has only been demonstrated in one niche: constellation satellites.**

## Summary

- Reuse economics is an inequality with technical terms on one side and operational terms on the other, and **flight rate is the decisive variable.**
- The argument is not about whether recovery is possible, but about how large you believe the market is.
- Reuse works backwards through propellant, cycle, materials, structural margin and even the staging point — it is not a feature you can bolt on later.
- Second stage reuse is an order of magnitude harder than first stage reuse, because the entry energy differs by more than tenfold.`,

  examples: [
    { why: "The first vehicle to make booster recovery routine, and the original data set for this economics." },
    { why: "Full reuse plus tower catch — pushing the logic to its limit and redesigning everything as a result." },
    { why: "Published the explicit arithmetic showing that at its flight rate, reuse does not pay." },
    { why: "On a small rocket the propellant budget rules out propulsive recovery; only engine reuse closes." },
    { why: "Takes Falcon 9's validated route and pushes every parameter up: larger diameter, longer reuse life." },
  ],

  sources: [
    { note: "Payload comparison between recovery and expendable configurations." },
    { note: "The published rationale for recovering only the engine section." },
    { note: "Measured refurbishment costs after seawater recovery." },
  ],
};
