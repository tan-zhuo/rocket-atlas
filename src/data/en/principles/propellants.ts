import type { PrincipleOverlay } from "@/i18n/localize";

export const propellantsEn: PrincipleOverlay = {
  title: "Propellants and engine cycles",
  summary:
    "Where does kerosene, hydrogen, methane or a hypergolic combination belong? What separates a gas generator from staged combustion, an expander cycle from electric pumps? This is the set of choices launch vehicle designers disagree about most.",

  body: `## Specific impulse is not the only metric

The number most often quoted for a rocket engine is **specific impulse** ($I_{sp}$): impulse per unit weight of propellant, measured in seconds. It measures efficiency.

$$F = \\dot{m} \\, I_{sp} \\, g_0$$

If specific impulse were the only thing that mattered, every rocket would burn hydrogen. None of them do, because three other dimensions matter just as much:

1. **Density**, which sets tank volume and therefore structural mass and drag. Engineers often use **density impulse** ($\\rho I_{sp}$) to capture both at once.
2. **Operability**: ambient or cryogenic? Toxic? Storable? How long does loading take?
3. **Reusability**: does it burn clean? Does it coke? Is it kind to turbine and injector life?

## Four mainstream propellant combinations

| Combination | Vacuum $I_{sp}$ | Density (kg/m³) | Relative density impulse | Typical vehicles |
|---|---|---|---|---|
| Hydrogen / oxygen (hydrolox) | 440–465 s | 360 | 1.00 | Delta IV, Ariane 5 core, Centaur |
| Kerosene / oxygen (kerolox) | 310–360 s | 1030 | 2.15 | Falcon 9, Soyuz, Long March 7 |
| Methane / oxygen (methalox) | 330–380 s | 830 | 1.85 | Raptor, BE-4, Tianque TQ-12 |
| Hypergolic (N₂O₄ / UDMH) | 285–320 s | 1180 | 2.20 | Long March 2F, Proton, spacecraft RCS |
| Solid | 250–285 s | 1750 | 2.85 | Ariane 5 EAP, GEM 63XL, Shuttle SRB |

(Density is the mixture average; density impulse is normalised with hydrolox at 1.00.)

**Hydrogen** has unmatched specific impulse and a density of only 71 kg/m³ — the same propellant mass needs eleven times the tank volume of kerosene. It also demands −253 °C cryogenics, thick insulation, and constant attention to leaks, because the molecule is small enough to escape almost anything. **Hydrogen is the optimum for an upper stage and a second-best for a first stage.**

**Kerosene** is dense, ambient, cheap and supported by mature infrastructure — the "good enough and unfussy" option. Its weakness shows up in reuse: combustion leaves coking on injectors, gas generators and turbines that must be cleaned or inspected.

**Methane** is the choice of the last decade. Its impulse sits between hydrogen and kerosene, its density is workable, it burns clean without coking, its boiling point (−162 °C) is close enough to liquid oxygen (−183 °C) to allow a simple common bulkhead, and it can be manufactured on Mars by the Sabatier reaction. **Nearly every reusable vehicle initiated after 2015 uses methane.**

**Hypergolic propellants** (nitrogen tetroxide with hydrazine derivatives) ignite on contact — no igniter at all — store at room temperature indefinitely, and restart freely. The price is acute toxicity, carcinogenicity and low impulse. They now dominate spacecraft attitude control, upper stages and anything that must sit fuelled for long periods.

**Solid propellant** has the highest thrust density, the simplest structure and years of storage life, the lowest specific impulse, and — decisively — **cannot be shut down or throttled once lit.** It is a common booster choice, and a permanent headache for anyone designing a crewed vehicle.

## Engine cycles: where does the turbine exhaust go

The engine has to push propellant from a low-pressure tank into a high-pressure chamber. Where the power for that comes from, and where the waste goes, defines the "cycle".

### Gas generator (open cycle)

A small fraction of the propellant burns in a **gas generator**, drives the turbine, and the exhaust is dumped overboard (or through the nozzle skirt).

- **Advantages**: the turbine loop is **decoupled** from the main chamber, so both can be developed separately; relatively simple; start sequencing is manageable.
- **Disadvantages**: 2–5% of propellant flow is lost, with a corresponding impulse penalty; the exhaust is visible (the dark plume beside the nozzles of an F-1 or Merlin at liftoff).
- **Examples**: F-1, J-2, Merlin, Vulcain 2, RS-68, Tianque TQ-12.

### Staged combustion (closed cycle)

Propellant burns in a **preburner** at a heavily unbalanced ratio (fuel-rich or oxidiser-rich), the resulting gas drives the turbine, and **all of it is then injected into the main chamber.** Nothing is wasted.

- **Advantages**: 5–15 s more specific impulse than a gas generator; enables very high chamber pressures (the RD-180 runs at 257 bar).
- **Disadvantages**: a large step up in development difficulty. In **oxidiser-rich** staged combustion (the Soviet and Russian tradition), hot oxygen-rich gas attacks turbines and ducting and requires specialised oxidation-resistant coatings — the area where Soviet metallurgy led for decades. **Fuel-rich** staged combustion (the SSME) instead faces coking and turbine temperature problems.
- **Examples**: RD-180, RD-191, SSME, YF-100, BE-4.

### Full-flow staged combustion (FFSC)

Fuel and oxidiser each have **their own preburner** — one fuel-rich, one oxidiser-rich — each driving its own turbopump, with both gas streams then entering the main chamber.

- **Advantages**: because the full flow passes through the turbines rather than a bleed, the same power can be extracted hundreds of degrees cooler, which **extends life dramatically** — decisive for a reusable engine; no cross-media seal is needed; deep throttling is achievable.
- **Disadvantages**: two preburners and two turbopumps make it the hardest cycle to develop.
- **Examples**: Raptor (the first FFSC engine ever to fly). The Soviet RD-270 and the American IPD both built test articles and neither flew.

### Expander cycle

Hydrogen (or methane) absorbs heat while cooling the thrust chamber jacket, vaporises, drives the turbopump and is then burned. **The heat itself is the power source**; no propellant is burned to drive the turbine.

- **Advantages**: the simplest and most reliable cycle, with high specific impulse and no gas generator or preburner.
- **Disadvantages**: turbine power is limited by **heat-exchange area**, which grows as the square of size while required power grows as the cube — so there is a hard thrust ceiling (around the 300 kN class). Upper stages only.
- **Examples**: RL10 (1962 to the present), YF-75D, BE-3U, Vinci.

### Electric pump cycle

Electric motors drive the pumps, powered by batteries.

- **Advantages**: deletes the hardest part of the engine (turbine, gas generator, preburner); thrust control is fast and precise; starting is reliable; spent battery packs can be jettisoned in flight.
- **Disadvantages**: batteries are dead weight; pump power scales linearly with thrust while battery energy density is fixed, so there is a clear thrust ceiling.
- **Example**: Rutherford (Electron) — still the only electric-pump engine to have reached orbit.

### Pressure-fed

No pumps at all: high-pressure gas (usually helium) pushes propellant into the chamber.

- **Advantages**: the simplest possible arrangement, with no rotating machinery.
- **Disadvantages**: the tanks must withstand chamber pressure and are therefore thick and heavy; chamber pressure is limited and so is impulse.
- **Examples**: spacecraft attitude control thrusters, SuperDraco, the Curie kick stage, the Apollo lunar module descent engine.

## A selection table

| Your constraint | Recommended combination |
|---|---|
| Upper stage, maximum impulse | Hydrolox with an expander cycle |
| First stage, cost and maturity | Kerolox with a gas generator |
| First stage, reuse life | Methalox with staged combustion |
| Long standby or frequent restarts | Hypergolic |
| Large liftoff thrust on a limited budget | Solid boosters |
| Small vehicle, fast manufacturing | Kerolox with electric pumps |
| Attitude control and small trims | Hypergolic or monopropellant, pressure-fed |

## Choosing by layer: different answers on the same rocket

The trade is clearest on vehicles that use **different propellants in different stages**:

- **Saturn V**: kerosene below (density and thrust), hydrogen above (impulse).
- **Long March 5**: kerosene boosters, hydrolox core and second stage.
- **New Glenn**: methane first stage (reuse-friendly and dense), hydrolox second (impulse).
- **Ariane 5 / Vulcan**: solid boosters (liftoff thrust), hydrolox or methalox core, hydrolox upper stage.

The shared logic is simple: **inside the atmosphere, thrust and density matter more than impulse; in vacuum, impulse dominates everything.** Every rocket's propellant arrangement is that principle worked out under a particular set of cost, industrial and mission constraints.`,

  examples: [
    { why: "Kerosene below and hydrogen above — the textbook case of choosing propellant by layer." },
    { why: "The first full-flow staged-combustion engine ever flown, built for reuse life." },
    { why: "The extreme case of an all-hydrogen vehicle: unimpeachable performance, unviable economics." },
    { why: "The only flying example of an electric pump cycle, showing both the thrust ceiling and the manufacturing gain." },
    { why: "Why hypergolic propellants still make sense on a crewed rocket: no igniter, and it can stand fuelled." },
  ],

  sources: [
    { note: "Thermodynamic analysis of each cycle and impulse calculations." },
    { note: "The evolution of engine technology paths by country." },
    { note: "The history and chemistry behind propellant selection." },
  ],
};
