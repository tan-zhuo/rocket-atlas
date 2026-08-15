import type { RocketOverlay } from "@/i18n/localize";

export const longMarch3BEn: RocketOverlay = {
  displayName: "Long March 3B",
  country: "China",
  agency: ["China Aerospace Science and Technology Corporation", "China Academy of Launch Vehicle Technology"],
  description:
    "China's longest-serving and most frequently flown GTO workhorse; its maiden flight was the worst day in the history of the Chinese space programme, and it went on to become one of its most reliable vehicles.",

  history: `Long March 3B's first flight was the darkest day in Chinese spaceflight.

On **14 February 1996** at Xichang, Long March 3B lifted off carrying Intelsat 708. The vehicle began tilting two seconds after liftoff and crashed into a village on a hillside 1.85 km from the pad 22 seconds later. The officially published toll was 6 dead and 57 injured; international estimates of the actual casualties differ.

The cause was **failure of an electronic component (a gold–aluminium bond) in the inertial platform**, which produced an erroneous attitude signal; the control system corrected against the false signal and the vehicle yawed.

The immediate consequence for Chinese commercial spaceflight was a collapse in customer confidence and a doubling of insurance rates, compounded by another Long March 3 failure in August 1996. China spent two years on a comprehensive quality overhaul, after which the Long March family entered a long period of high reliability.

**The indirect consequence was far more lasting.** During the 1996 and 1998 failure investigations, engineers from Hughes and Loral participated in the analysis and were accused of transferring sensitive technology to China. That led directly to the 1999 **Cox Report** and the policy shift that followed: **commercial communications satellites were returned to the munitions list (ITAR) and barred from launching on Chinese rockets.**

That restriction still stands, shutting Chinese rockets out of the Western commercial launch market entirely — **and every subsequent Chinese commercial launch strategy has had to be built on domestic demand and on satellites free of Western components.**

Long March 3B's own record ran the other way. After the debut it became the absolute mainstay of Chinese GTO launch: most of the BeiDou navigation constellation, nearly every domestic GEO communications satellite, and the Chang'e 1 through 4 lunar probes. By the end of 2024 it had flown more than ninety times, one of the most-launched single types in China.`,

  designPhilosophy: `Long March 3B's logic is: **on an airframe whose diameter is fixed by railway tunnels, use strap-on boosters and a hydrolox upper stage to reach 5.5 t to GTO.**

Every one of its characteristics traces to a specific constraint:

**Constraint one: 3.35 m diameter.**
China's launch sites (Jiuquan, Taiyuan, Xichang) are all inland, so airframes travel by rail, and the tunnel loading gauge fixes the diameter. Raising performance means lengthening and strapping, never widening. **Long March 3B is simply “Long March 3A plus four boosters.”**

**Constraint two: hypergolic propellants.**
The first two stages burn UDMH and nitrogen tetroxide, inherited from the DF-5 ICBM. The benefits are ambient storage, simple ignition and mature engines; the costs are low impulse, severe toxicity, and **the drop zone problem of inland launch sites** — every launch drops the first stage and boosters on populated mountainous terrain in south-west China, requiring tens of thousands of people to be evacuated in advance.

**Constraint three: a hydrolox upper stage is mandatory.**
GTO missions need large Δv, and using hypergolics for the upper stage would make the vehicle unmanageably large. China committed to hydrogen engine development in the 1970s and Long March 3 flew successfully in 1984 — that is where the whole value of the Long March 3 series comes from.

**One distinctive capability is restart.**

YF-75 can relight after shutdown, which enables:

1. The third stage fires to place the stack in a low parking orbit;
2. It shuts down and coasts until it is over a suitable point near the equator;
3. It fires again to enter GTO.

**That step markedly reduces the inclination of the transfer orbit**, cutting the propellant the satellite must spend on its own manoeuvres. For a GEO communications satellite, propellant saved is on-orbit lifetime gained. **Xichang sits at 28° latitude, and that latitude penalty is partly recovered precisely by upper stage coasting and restart.**

**The ceiling of the design is equally clear:** hypergolic impulse cannot be raised, 3.35 m limits scale, and drop zones limit flight rate. China's answer was to start over — Long March 5/6/7 all switched to kerosene and hydrogen, went to 5 m diameter, and moved the launch site to Wenchang on Hainan. **Long March 3B will not be improved; it will be replaced.**`,

  tradeoffs: [
    {
      question: "Why does China use liquid strap-on boosters when the West and Japan use solid?",
      answer: `Because the available industrial bases are exactly opposite.

**Large solid motors** require large propellant casting facilities, high-strength case winding, ablation-resistant throat materials and a safety regime for handling tens of tonnes of hazardous propellant. The West and Japan inherited all of that from ballistic missiles and the Shuttle: the US had Shuttle boosters and the Peacekeeper missile, Europe the M51 SLBM, Japan the M-V sounding and launch vehicle.

**Liquid hypergolic engines** require mature turbopump and chamber manufacturing plus a storage and loading regime for hypergolic propellants. China's version of that came from the DF-5 ICBM — the YF-20 family has been in volume production since the 1970s.

The choice follows naturally: **use what you are already mass-producing.**

The technical differences are real too:

| | Solid boosters | Liquid boosters |
|---|---|---|
| Thrust density | High | Medium |
| Impulse | 260–280 s | 260–300 s |
| Shutdown after ignition | **No** | Yes |
| Throttling | No | Limited |
| Structural complexity | Low (a case and a nozzle) | High (tanks, pumps, plumbing, pressurisation) |
| Ground operations | Hazardous propellant handling | Loading (hypergolics are highly toxic) |
| Unit cost | Low | Medium-high |

**The most practical advantage of liquid boosters is that they can be shut down.** If one behaves anomalously it can in principle be commanded off while the remaining engines re-trim; a solid, once lit, cannot be stopped and only destruct remains.

**The most practical advantage of solids is simplicity.** A P120C is a carbon fibre tube and a nozzle, with no rotating parts at all.

China's later choices are informative: **Long March 5 still uses liquid boosters (YF-100 kerosene engines), while Long March 11 and the Jielong series use solids.** That is not a change of doctrine but choosing the tool for the job — solids suit responsive launch and small missions, liquids suit heavy lift.

**One counter-intuitive fact:** Long March 3B has eight engines running at liftoff (four on the first stage, four on the boosters). That is a high count for a hypergolic vehicle, but because the YF-20 family is so mature it has never been a reliability bottleneck.`,
    },
    {
      question: "What exactly did the 3.35 m diameter constrain?",
      answer: `It constrained the performance ceiling, and indirectly constrained twenty years of Chinese space planning.

Launch vehicle capability scales roughly with the **square of diameter** (cross-sectional area) while structural mass scales linearly, so widening is the most effective way to add performance. With diameter locked, only two options remain:

1. **Lengthen** — but slenderness has a limit; too long lowers the bending mode frequency until it couples with the control system (POGO and elastic vibration problems);
2. **Strap on** — but boosters face the same diameter limit and there is a practical cap on how many.

Long March 3B exhausted both: a 54.8 m airframe (slenderness 16) with four boosters. 5.5 t to GTO is essentially the ceiling of that configuration.

**Why 3.35 m?** Because airframes travel by **rail** from factories near Beijing to Jiuquan, Taiyuan or Xichang. Chinese rail tunnel and bridge clearances, together with curve radii, cap the shippable cylinder diameter at about 3.35 m. This is exactly the same class of constraint as Falcon 9's 3.66 m (US highway bridges) and Proton's 4.1 m (Soviet rail gauge).

**There is only one way around it: stop shipping by land.**

Hence the **Wenchang Space Launch Site** on Hainan (completed 2014): on the coast, so airframes can be shipped **by sea** from the Tianjin factory directly to the pad. That single step released the diameter constraint and made Long March 5's 5 m core possible.

**The causal chain is worth writing out in full:**

> Want more capability → need a larger diameter → cannot ship it overland → must ship by sea → the launch site must be coastal → build Wenchang on Hainan → and incidentally gain a low latitude (19.6°N) and a downrange over open ocean

**That last line was an unplanned bonus.** Wenchang is 8° closer to the equator than Xichang, worth several per cent of GTO capability for the same rocket; and launching east drops debris into the South China Sea, ending inland evacuations. **A decision driven by transport constraints happened to solve the latitude and drop zone problems as well.**`,
    },
    {
      question: "How serious is the drop zone problem with hypergolic propellants?",
      answer: `Serious enough to be one of the main drivers behind China's entire new generation of launch vehicles.

Every Long March 3B launch drops five objects back to the ground: four boosters and the first stage. They land in mountainous terrain east of Xichang, across Guizhou and Hunan, scattered over hundreds of kilometres.

The consequences:

**1. Evacuation.** Residents inside the drop zones must be moved out before each launch. A single Xichang launch typically involves temporarily relocating tens of thousands of people, organised by local government, at real cost both financially and socially.

**2. Residual propellant.** The stages do not burn completely dry; hundreds of kilograms to several tonnes of UDMH and nitrogen tetroxide remain. UDMH is a **potent carcinogen**, and nitrogen tetroxide forms nitric acid with water. The yellow-brown cloud seen at impact sites is nitrogen tetroxide, corrosive and toxic.

**3. It caps flight rate.** The organisational cost and social tolerance of evacuation effectively limit how many launches an inland site can conduct in a year.

Compare the new generation:

| | Long March 3B | Long March 5 / 7 |
|---|---|---|
| Propellant | UDMH / nitrogen tetroxide | Kerolox, hydrolox |
| Combustion products | Nitrogen oxides, organic residues | Carbon dioxide and water |
| Drop zone | Inland mountains, evacuation required | South China Sea, uninhabited |
| Launch site | Xichang (28°N, inland) | Wenchang (19.6°N, coastal) |

**In the new generation's programme documents, “non-toxic and non-polluting” sits alongside capability as an objective.** The same trend runs worldwide: the US retired Titan's hypergolic first stages in the 1990s, Russia replaced Proton with Angara, and Europe never used hypergolics in a first stage at all.

**But hypergolics have not disappeared — they retreated to where they genuinely belong:** upper stages, satellite propulsion, and the orbital manoeuvring and deorbit burns of crewed spacecraft. There the quantities are a few hundred kilograms, the toxicity is manageable, and the advantages of “no igniter, unlimited restarts, indefinite storage” are irreplaceable.

**Technology is rarely eliminated; more often it is pushed back to what it is actually good at.**`,
    },
  ],

  contemporaries: `**Proton-M** (Russia) is closest in configuration logic: hypergolic propellants, rail transport constraints, direct GEO injection, and responsibility for all large domestic GEO missions. Both were also displaced by non-toxic new-generation vehicles in the 2010s.

**Ariane 5** (Europe, 1996) debuted the same year with about twice the GTO capability. Ariane took the commercial market on dual launches while Long March 3B was locked out by ITAR — **a small technical gap and a vast difference in market outcome.**

**H-IIA** (Japan, 2001) matches its GTO class (4.1–6.0 t) with better reliability at a higher price.

**Long March 5** (2016) is its effective successor: 5 m diameter, non-toxic propellants, 14 t to GTO. But the two coexisted for a long time — **Long March 3B's production line is mature, its cost low and its turnaround quick, so it remained the most economical choice for GTO missions below 5.5 t.**`,

  milestones: [
    { title: "Maiden flight fails", note: "An inertial platform component failed and the vehicle crashed into a village 22 seconds after liftoff." },
    { title: "First success", note: "Launched the Philippine Mabuhay satellite, entering commercial service." },
    { title: "Chang'e 1 launched", note: "China's first lunar probe." },
    { title: "Chang'e 4 launched", note: "The first soft landing on the far side of the Moon." },
    { title: "Final BeiDou-3 satellite launched", note: "Completing the global BeiDou system, most of whose GEO and IGSO satellites flew on Long March 3B." },
  ],

  launchesNotable: [
    { name: "Intelsat 708", note: "The maiden flight crash, after which Chinese commercial launch was blocked for decades." },
    { name: "Chang'e 1", note: "China's first lunar probe." },
    { name: "ChinaSat 9A", note: "A third stage anomaly; the satellite reached GEO after 16 days of self-rescue on its own propellant." },
    { name: "Chang'e 4", note: "Soft landing on the lunar far side." },
  ],

  variants: [
    { name: "Long March 3A", note: "No strap-on boosters, 2.6 t to GTO." },
    { name: "Long March 3B", note: "Four boosters, 5.5 t to GTO, the main configuration." },
    { name: "Long March 3B/E", note: "Stretched boosters and first stage, 5.5 t to GTO, used for the Chang'e and BeiDou missions." },
    { name: "Long March 3C", note: "Two boosters, 3.9 t to GTO, between the 3A and 3B." },
  ],

  stages: [
    {
      nameZh: "First stage + four boosters",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "Boosters ignite with the first stage and separate at T+140 s.",
      engines: [
        { cycleZh: "Gas generator", note: "Descended from the DF-5 ICBM, in service for over half a century." },
        { cycleZh: "Gas generator", note: "The booster variant of the YF-20B." },
      ],
    },
    {
      nameZh: "Second stage",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "One main engine plus four vernier engines that handle attitude control.",
      engines: [{ cycleZh: "Gas generator", note: "The main engine is fixed; attitude control comes from four YF-23B verniers." }],
    },
    {
      nameZh: "Third stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Two YF-75 engines, restartable, performing GTO injection.",
      engines: [{ cycleZh: "Gas generator", note: "China's first operational hydrolox upper stage engine, capable of a second start." }],
    },
  ],

  parts: {
    "s1-engines": {
      name: "YF-21C engine cluster (four YF-20B)",
      description:
        "Four YF-20Bs assembled into one cluster. This engine descends from the DF-5 ICBM of the 1960s, and **it is the longest-serving liquid engine in the Chinese space programme** — used from Long March 2 through Long March 3B and Long March 4, for half a century. Hypergolic propellants, gas generator cycle, 740 kN per unit.",
    },
    "s1-body": {
      name: "First stage",
      description:
        "3.35 m in diameter — **the common diameter of China's older rockets, set by railway tunnel clearances.** Airframes travel by rail to Jiuquan, Taiyuan and Xichang, and the tunnel cross-section fixed that number. There is only one way past it: put the launch site on the coast and ship by sea — which is exactly where the Wenchang site on Hainan and Long March 5 came from.",
    },
    "booster-engines": {
      name: "Booster engines (four YF-25)",
      description: "One YF-25 per booster (the booster variant of YF-20B) at 740.4 kN. All four boosters light with the first stage.",
    },
    "booster-body": {
      name: "Liquid strap-on boosters (×4)",
      description:
        "2.25 m across and 15.3 m long, burning the same hypergolic propellants. **China chose liquid rather than solid boosters, the opposite of Europe, the US and Japan** — a consequence of industrial base: China's liquid engine technology was mature while large solid motors came later, and the reverse was true elsewhere.",
    },
    "booster-nose": {
      name: "Booster nose cones",
      description: "The boosters separate around T+140 s.",
    },
    "s2-engines": {
      name: "Second stage engine (YF-24E)",
      description:
        "One YF-22E main engine plus four YF-23E vernier engines. Verniers are a Soviet tradition: the main engine is fixed and attitude is controlled by gimballing four small engines. **That approach was inevitable in the 1960s (large engines could not be gimballed) and has since been entirely superseded by gimballing the main engine.**",
    },
    "s2-body": {
      name: "Second stage",
      description: "A hypergolic second stage. Only the third stage uses cryogenic propellants, and that pairing is the signature of the Long March 3 series.",
    },
    interstage: {
      name: "Interstage transition",
      description: "The transition from 3.35 m down to 3.0 m.",
    },
    "s3-body": {
      name: "Third stage (hydrolox)",
      description:
        "Two YF-75 hydrolox engines at 438 s vacuum impulse, **capable of a second start.** China was the fifth country, after the US, USSR, Europe and Japan, to master hydrolox upper stage technology (Long March 3's first flight in 1984), and this stage is the entire reason the Long March 3 series can perform GTO missions. Restart lets it enter a parking orbit first and then fire near the equator to enter the transfer orbit — **which directly improves GTO injection accuracy and the room to optimise inclination.**",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 4.0 m fairing. Long March 3B served international customers, so its envelope and interfaces follow common international standards.",
    },
  },

  modelNote:
    "Reconstructed from the published configuration: 54.8 m tall, 3.35 m core diameter, four 2.25 m liquid strap-on boosters.",

  sources: [
    { title: "LM-3A Series Launch Vehicle User's Manual", publisher: "China Great Wall Industry Corporation (CGWIC)", note: "Primary source for dimensions, masses, stage parameters and performance." },
    { title: "Long March 3B — CALT", publisher: "China Academy of Launch Vehicle Technology", note: "Configuration and mission record." },
    { title: "Long March 3B — Wikipedia", publisher: "Wikipedia", note: "Launch statistics vary with cut-off date; casualty figures for the 1996 accident differ markedly between sources." },
  ],

  tags: ["Medium lift", "GTO workhorse", "Hypergolic", "Cryogenic upper stage", "China"],
};
