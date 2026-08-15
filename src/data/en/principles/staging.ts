import type { PrincipleOverlay } from "@/i18n/localize";

export const stagingEn: PrincipleOverlay = {
  title: "The rocket equation and staging",
  summary:
    "Why is single-stage-to-orbit so hard that the mathematics rules it out? Why is almost every launch vehicle two or three stages rather than five? Starting from a formula written in 1903, this derives the most basic constraint on the shape of a rocket.",

  body: `## One formula sets the shape of a rocket

In 1903 Tsiolkovsky wrote down what is now called the ideal rocket equation:

$$\\Delta v = I_{sp} \\, g_0 \\ln\\frac{m_0}{m_f}$$

where $\\Delta v$ is the velocity increment the vehicle can achieve, $I_{sp}$ is specific impulse in seconds, $g_0 = 9.81\\ \\mathrm{m/s^2}$, $m_0$ is the initial mass and $m_f$ the mass after the propellant is gone.

The derivation uses nothing but conservation of momentum — no engineering assumptions at all. Its cruelty lies entirely in that **logarithm**: velocity grows logarithmically with mass ratio, while mass ratio grows inversely with payload fraction. **Going a little further costs exponentially more propellant.**

## How much Δv does orbit actually need

Circular velocity in low Earth orbit is 7.8 km/s, but the rocket must supply considerably more:

| Component | Typical value | Where it comes from |
|---|---|---|
| Orbital velocity | 7.8 km/s | Circular orbital speed |
| Gravity loss | 1.2–1.5 km/s | Thrust spent holding the vehicle up during ascent |
| Drag loss | 0.1–0.3 km/s | Resistance in the dense lower atmosphere |
| Steering loss | 0.1–0.5 km/s | Thrust not aligned with the velocity vector |
| Earth rotation credit | −0.1 to −0.46 km/s | Launching east borrows the Earth's rotation (up to 465 m/s at the equator) |
| **Total** | **about 9.0–9.5 km/s** | |

**Gravity loss** is the term most often overlooked: while climbing vertically, a substantial part of the thrust is doing nothing but hovering. That is also why liftoff thrust-to-weight cannot be too low — at a T/W of 1.2, 83% of the thrust is consumed by gravity; at 1.5 that falls to 67%.

## Why single-stage-to-orbit is so hard

Suppose we build a single-stage vehicle with the best kerosene engine available (340 s in vacuum). The required mass ratio is:

$$\\frac{m_0}{m_f} = e^{\\Delta v / (I_{sp} g_0)} = e^{9400 / (340 \\times 9.81)} \\approx e^{2.82} \\approx 16.8$$

So $1 - 1/16.8 = 94\\%$ of liftoff mass must be propellant. The remaining 6% has to contain tanks, engines, plumbing, pressurisation, avionics, batteries, fairing **and payload**.

In practice the best large stages achieve structural mass fractions (dry mass over total) of 4–8%. Take the optimistic 4% and only 2% is left for payload — before accounting for on-orbit attitude propellant or a fairing.

Switch to hydrolox (450 s in vacuum):

$$\\frac{m_0}{m_f} = e^{9400 / (450 \\times 9.81)} \\approx e^{2.13} \\approx 8.4$$

Propellant drops to 88%, which sounds much easier. But liquid hydrogen's density is only 71 kg/m³, tank volume grows tenfold, and structural fraction climbs back above 10% — **the impulse gain is eaten by the density penalty.** That is why single-stage-to-orbit has been attempted for decades (X-33, VentureStar, Skylon) and never achieved: it does not fall just short, it has no feasible point in the parameter space at all.

## How staging breaks the deadlock

Staging works by **throwing away mass that has stopped being useful, so that $m_f$ drops in steps during flight.**

For an $n$-stage vehicle the total velocity increment is the sum:

$$\\Delta v_{total} = \\sum_{i=1}^{n} I_{sp,i} \\, g_0 \\ln\\frac{m_{0,i}}{m_{f,i}}$$

The key is that stage $i$'s "payload" is the entire mass of stage $i+1$ and everything above it. Which means **every kilogram saved on an upper stage is amplified by every stage below it.** A rough but very useful rule of thumb:

> Save 1 kg on an upper stage ≈ gain 1 kg of payload.
> Save 1 kg on the first stage ≈ gain 0.02–0.05 kg of payload.

That rule explains a whole family of apparently asymmetric decisions: why upper stages get expensive hydrolox and paper-thin pressure-stabilised tanks while first stages can be cheap and heavy; why Centaur's tank walls are 0.5 mm; why a 10% improvement in upper stage specific impulse is worth far more than a 10% increase in first stage thrust.

## Why two or three stages, and not five

On mass ratio alone, more stages is always better — in the limit of infinitely many stages you approach the ideal of continuously shedding structure. But each additional stage costs:

1. **Interstage structure**: connection, load path and separation hardware, typically 3–8% of the stage's mass;
2. **A complete propulsion system**: even a small upper stage needs pumps or pressurisation, valves and igniters;
3. **A separation event**: historically one of the largest single categories of launch failure;
4. **An ignition event**: the reliability of igniting in vacuum is exactly what the R-7's stage-and-a-half configuration was built to avoid.

Diminishing returns meeting rising risk puts the crossover at two or three:

- **Two stages**: the norm for low orbit missions (Falcon 9, Electron, Zhuque-2).
- **Three stages**: for high-energy and deep-space missions (Saturn V, Soyuz-2, Long March 3B), or with a small solid final stage for precise injection.
- **"Two and a half stages"**: strap-on configurations (Long March 5, Ariane 5, Vulcan) — boosters are functionally a parallel "stage zero", which adds liftoff thrust without adding a series stage.

## How Δv should be divided between stages

A common misconception is that stages should split Δv evenly. The optimum depends on each stage's specific impulse and structural coefficient. Define the structural coefficient of stage $i$:

$$\\varepsilon_i = \\frac{m_{struct,i}}{m_{struct,i} + m_{prop,i}}$$

Solving the minimum-total-mass problem with Lagrange multipliers gives the result that **stages with higher specific impulse and lower structural coefficient should be assigned more Δv** — which matches intuition: let the efficient stages do more of the work.

Real vehicles divide it roughly like this:

| Vehicle | Stage 1 Δv | Stage 2 Δv | Stage 3 Δv |
|---|---|---|---|
| Saturn V | ~3.0 km/s | ~4.5 km/s | ~2.0 + 3.2 km/s (incl. TLI) |
| Falcon 9 | ~2.4 km/s | ~7.0 km/s | — |
| Soyuz-2 | ~2.6 km/s (stage-and-a-half) | ~2.9 km/s | ~4.4 km/s |

Note that Falcon 9's first stage supplies only about a quarter of the total Δv — **in the recovery configuration it must separate early and leave more of the work to the expendable second stage.** That split is dictated by reuse, not by an optimisation.

## Summary

- The rocket equation links velocity and mass through a logarithm, and that is the origin of every difficulty in launch vehicle design.
- Reaching orbit needs about 9.0–9.5 km/s, of which more than 1.5 km/s is pure loss.
- Single-stage-to-orbit has no feasible solution at achievable chemical specific impulse; staging is the only way out.
- A kilogram on an upper stage is worth far more than a kilogram on the first stage, which explains most of the apparently asymmetric design decisions.
- The optimal stage count sits where diminishing returns meet rising risk: usually two or three.`,

  examples: [
    {
      why: "Its three-stage split was dictated by the requirement to coast in orbit and restart for trans-lunar injection — not by a mass optimisation.",
    },
    {
      why: "The limiting case of a single stage: a mass ratio of 3.1 gives only 1.6 km/s, an order of magnitude short of orbit.",
    },
    {
      why: "The stage-and-a-half configuration substitutes parallel staging for series staging, avoiding the unsolved in-flight ignition problem of the 1950s.",
    },
    {
      why: "Its first stage supplies only a quarter of the Δv — recovery moved the optimum staging point.",
    },
  ],

  sources: [
    { note: "The standard derivation of staging optimisation and structural coefficients." },
    { note: "Typical values for each component of the Δv budget." },
  ],
};
