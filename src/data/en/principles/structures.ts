import type { PrincipleOverlay } from "@/i18n/localize";

export const structuresEn: PrincipleOverlay = {
  title: "Structures and materials",
  summary:
    "Why did SpaceX abandon carbon fibre for stainless steel? Why are Centaur's tank walls 0.5 mm thick? Launch vehicle structure is a four-way tug of war between mass, temperature, cost and manufacturability.",

  body: `## The structural coefficient: a brutal number

The structural efficiency of a stage is measured by its **structural coefficient**:

$$\\varepsilon = \\frac{m_{struct}}{m_{struct} + m_{prop}}$$

Modern large stages land between 0.04 and 0.10. In other words, a fully loaded stage is only 4–10% "hardware" and the rest is fuel. Saturn V's S-II achieved about 0.08, and Centaur reaches a remarkable 0.09 including its engines — with **the tank alone around 0.03.**

To see how extreme that is: a full drinks can is about 5% aluminium by mass. **A rocket tank is in the same structural efficiency class as a beverage can.**

## Three ways to carry the load in a tank

### 1. Pressure-stabilised (balloon tanks)

The wall is extremely thin (Centaur's is 0.5 mm stainless) and **stiffness comes entirely from internal pressure.** Unpressurised, the tank collapses under its own weight.

- **Examples**: Atlas (1957), Centaur (1962 to the present), R-7.
- **Advantages**: the lowest structural coefficient achievable, below 0.03.
- **Disadvantages**: pressure must be maintained through all ground handling; the tank cannot carry axial load when empty; any puncture is catastrophic.

### 2. Semi-monocoque (isogrid / orthogrid)

Thicker walls stiffened by a machined rib pattern, with internal pressure as a secondary contributor.

- **Examples**: every Saturn V stage, Falcon 9, Vulcan, and most modern vehicles.
- **Process**: a solid plate is milled into a triangular or rectangular grid, removing more than 90% of the material, then rolled and welded into barrel sections. **Friction stir welding** is now standard — it never melts the material, avoiding the strength loss that comes with fusion welding.
- **Advantages**: mature process, safe to handle unpressurised, straightforward to inspect.

### 3. Non-load-bearing (hung tanks)

The tanks hang inside the airframe skin and carry no axial load themselves.

- **Examples**: the V-2 and some early missiles.
- **Disadvantages**: an extra skin means extra mass, and the worst structural coefficient of the three.
- **Advantages**: simplest to build and inspect — and the V-2 was mass-produced in wartime by unskilled labour, where manufacturability outranked efficiency.

## Common bulkheads: what you save and what you pay

Merging the bottom of the oxidiser tank with the top of the fuel tank gives a **common bulkhead**.

- **Saved**: one tank dome's mass, and the interstage length between the two tanks. Saturn V's S-II saved roughly 3.6 t of structure and 3 m of length.
- **Paid**: the two sides differ enormously in temperature (LOX at −183 °C, LH₂ at −253 °C, a 70 °C gap), so an insulating layer is required (the S-II used phenolic honeycomb). Any leak brings hydrogen and oxygen into direct contact — among the most dangerous failure modes there is. **The S-II's common bulkhead was the single hardest item in the entire Saturn V programme.**

Methane and oxygen differ by only 21 °C, which makes common bulkheads far easier — one of methane's quieter advantages over hydrogen.

## Materials: a four-way tug of war

| Material | Specific strength | Cryogenic | High temperature | Cost | Repairability |
|---|---|---|---|---|---|
| 2219 aluminium | Medium | Good | Poor (150 °C) | Low | Good |
| 2195 Al-Li | High | Very good | Poor | Medium | Medium |
| 304L stainless | Low (room temp) | **Excellent** (+50% cryogenic) | **Good** (half strength at 800 °C) | Very low | Excellent |
| Carbon composite | **Very high** | Microcracking risk | Poor (resin softens at 150 °C) | Very high | Poor |
| Titanium | High | Good | Medium | High | Medium |

**Note how misleading the "specific strength" column is.** It only means anything at room temperature, for single use, in pure tension. Add temperature range, reuse count and manufacturability and the ranking inverts — which was precisely SpaceX's argument in 2018 when it dropped carbon fibre for stainless steel:

- 304L gains roughly 50% strength at liquid oxygen temperatures (cryogenic strengthening), while carbon composites face resin microcracking and permeation in deep cryogenics;
- during entry the windward face exceeds 1,300 °C; steel keeps about half its room-temperature strength at 800 °C so the tiles can be thinner, whereas carbon composite must be fully shielded by a heavy thermal protection system — **taken together, most of steel's mass penalty is bought back by a lighter TPS**;
- aerospace-grade carbon prepreg costs around 130 dollars a kilogram and needs large autoclaves; 304L sheet costs about 3 dollars a kilogram and can be welded in an open-sided tent;
- steel can be cut, welded and changed in place; once a composite mould exists, changing the design means a new mould.

**This is not "stainless steel is better than carbon fibre". It is that when re-entry, reuse and rapid iteration are all constraints at once, the objective function changes.** For an expendable upper stage that never re-enters — Electron's carbon airframe, for instance — composite remains the right answer.

## Thermal protection: three philosophies

1. **Ablative**: the material decomposes under heat, carrying energy away and leaving an insulating char layer. Consumed in use.
   - Examples: the Apollo command module, Ariane 5 solid booster nozzles, the RS-68 nozzle.
   - **Entirely single-use** — which is its fundamental conflict with reuse.

2. **Radiative cooling**: a thin wall of refractory material (niobium alloy, carbon-carbon) reaches equilibrium by radiating heat away.
   - Examples: the Merlin Vacuum nozzle extension, upper stage nozzles.
   - Only works in vacuum, where convection cannot break the equilibrium.

3. **Regenerative cooling**: propellant (usually fuel) flows through a jacket in the chamber wall, carrying heat away before being burned. **The heat is not wasted — it goes back into the system.**
   - Used in essentially every liquid engine's main chamber.
   - The expander cycle takes it one step further and uses that heat directly as turbine power.

For reusable vehicles there is a fourth: **tiles.** The Shuttle used 24,000 silica-based tiles, each a different shape, each bonded by hand, and refurbishment costs were punishing. Starship uses roughly 18,000 hexagonal ceramic tiles of uniform shape, mechanically pinned to the steel — **the same idea, with part standardisation used to force refurbishment cost down.**

## Load environment: what the structure actually has to survive

The design load case for a launch vehicle is rarely engine thrust. It is usually a combination of:

- **Axial compression**: near maximum dynamic pressure and at peak acceleration, the top of the first stage carries the inertial load of everything above it;
- **Bending moment**: aerodynamic angle of attack plus wind shear. This is usually **the controlling case** — which is why vehicles fly a zero-angle-of-attack programme and throttle down through the transonic region (Falcon 9's max-Q throttle);
- **Internal pressure**: beneficial for a pressure-stabilised structure (it provides the stiffness) and an additional load for a semi-monocoque one;
- **POGO oscillation**: self-excited coupling between the structure's longitudinal mode and the propulsion system. Apollo 6 lost two second-stage engines to it, and Apollo 13's second stage centre engine shut down early for the same reason. The fix is an **accumulator** on the oxidiser line — a gas-filled cavity that changes the line's acoustic properties and breaks the coupling;
- **Landing impact** (reusable vehicles only): a load case an expendable vehicle never sees, and the main source of recovery hardware mass.

## Summary

- A rocket tank's structural efficiency is in the same class as a drinks can, which is the backdrop to every material decision.
- Pressure-stabilised tanks are the most efficient and the most demanding to handle; semi-monocoque is today's mainstream.
- Material rankings by "specific strength" only hold at room temperature for single use; adding temperature range, reuse and manufacturability inverts them.
- Thermal protection comes in ablative, radiative and regenerative philosophies, and the first is fundamentally incompatible with reuse.
- The controlling structural load case is usually the bending moment at max-Q, not thrust.`,

  examples: [
    { why: "Dropping carbon fibre for 304L stainless is the clearest case of a material objective function changing with constraints." },
    { why: "The S-II's common bulkhead saved 3.6 t of structure and was the hardest item in the entire programme." },
    { why: "A load-bearing carbon composite tank brings first stage dry mass to 950 kg — decisive on a small rocket." },
    { why: "Centaur V's 0.5 mm pressure-stabilised stainless tank: structural efficiency unbeaten in sixty years." },
    { why: "Non-load-bearing hung tanks: the worst structural efficiency, and the rational choice under wartime manufacturability constraints." },
  ],

  sources: [
    { note: "Standard reference on tank structural forms and load cases." },
    { note: "The public argument for the stainless steel decision." },
    { note: "The development history of the S-II common bulkhead." },
  ],
};
