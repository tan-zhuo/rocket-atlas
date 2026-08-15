import type { RocketOverlay } from "@/i18n/localize";

export const lvm3En: RocketOverlay = {
  displayName: "LVM3 (GSLV Mk III)",
  country: "India",
  agency: ["Indian Space Research Organisation (ISRO)"],
  description:
    "India's largest rocket, and the product of twenty years of indigenous cryogenic development after a technology transfer was blocked; it put Chandrayaan-3 on the lunar south pole.",

  history: `LVM3's story begins with a cancelled contract.

In 1991 India signed with Russia's Glavkosmos for cryogenic upper stage technology and KVD-1 engines. After the Soviet collapse, **the United States used the Missile Technology Control Regime to pressure Russia**, and in 1993 the technology transfer portion was cancelled; only finished engines were sold.

India therefore had to develop its own, and the road was long. GSLV Mk II's indigenous cryogenic stage (CUS) failed on its first attempt in 2010 and did not succeed until 2014. The larger CE-20 was started in the late 1990s and **only flew when LVM3 debuted in 2017.**

LVM3 (renamed from GSLV Mk III in 2019 to emphasise that it is a completely different rocket from GSLV) was designed from scratch:

- Two S200 solid boosters, the only power at liftoff;
- An L110 liquid core that ignites in flight;
- A C25 hydrolox upper stage.

**A suborbital test flight (LVM3-X/CARE) flew on 18 December 2014**, mainly to validate airframe aerodynamics and crew module re-entry — the cryogenic stage was not ready and was replaced by ballast.

**The complete configuration first flew successfully on 5 June 2017.** It has since carried India's most significant missions:

- **Chandrayaan-2** (2019) — the lander was lost 2 km above the surface;
- **Chandrayaan-3** (2023) — **a successful soft landing near the lunar south pole, making India the fourth country to land softly on the Moon and the first to reach the polar region.**
- **Two OneWeb constellation launches** (2022–2023) — LVM3's first commercial orders, from Western customers, marking its entry into the international market.

Its next role is **Gaganyaan**, India's crewed programme: a human-rated LVM3 will carry three Indian astronauts to low Earth orbit, requiring an escape system, greater redundancy and human-rating certification.`,

  designPhilosophy: `LVM3's logic is: **put India's strongest technology where the most thrust is needed, put its weakest where the most impulse is needed, and bridge them with a mature liquid stage.**

The division of labour is unusually clear:

| Stage | Indian technical maturity | Role in flight |
|---|---|---|
| S200 solid | Very high (sounding rocket and missile heritage) | Liftoff thrust, overcoming gravity losses |
| L110 Vikas | High (French technology, indigenised for forty years) | Mid-phase acceleration |
| C25 hydrolox | Low (twenty years to develop) | High-impulse final acceleration |

**The most distinctive design feature is in-flight ignition of the liquid stage.**

Most strap-on configurations (Ariane 5, H-IIA, Long March 5, SLS) light the core and the boosters together on the ground. LVM3 does not: only the two S200s fire at liftoff, and **the two Vikas engines of L110 do not ignite until T+114 s.**

The benefit is explicit:

- **S200 thrust is already sufficient.** 7,156 kN against a 640 t vehicle gives a ratio of 1.14, enough to lift off. Igniting L110 late means all 110 t of its propellant is spent at altitude, where there is no drag and gravity losses are lower — **so each kilogram produces more useful Δv.**
- **It avoids running a high-altitude engine inefficiently in dense air.** Vikas' nozzle is optimised for altitude and would suffer over-expansion losses at sea level.

The cost is equally explicit:

- **An ignition failure ends the mission.** A ground ignition failure allows an abort; an in-flight failure does not.
- **It demands precise sequencing and coast control.** During solid burn, attitude control depends entirely on two gimballing nozzles, a phase with limited redundancy.

**In India's context the trade is rational:** solid motor reliability is extremely high (its solid propulsion heritage is the deepest part of the programme), so handing the first 114 seconds entirely to it is a controlled risk, while the propellant saved converts directly into GTO capability, the number India most needs.

**LVM3's other defining feature is value.** At roughly 50–60 million dollars for 4 t to GTO, **it is highly competitive internationally**, which is why OneWeb chose it. India's low cost comes from domestic labour and manufacturing rates rather than from a cost-reducing technical innovation.`,

  tradeoffs: [
    {
      question: "Why did India take twenty years to build a cryogenic upper stage?",
      answer: `Because cryogenic propulsion is the hardest thing in spaceflight to buy and among the hardest to work out alone — and India was blocked on both routes.

**Buying was blocked:** the 1991 India–Russia agreement on cryogenic upper stage technology was cancelled in its transfer provisions in 1993 under US MTCR pressure. India received a few finished KVD-1 engines, enough for several flights, but no design or process knowledge.

**What makes independent development hard?** Not the principle but a chain of engineering details:

1. **Hydrogen is at 20 K.** Every material's properties must be re-characterised at that temperature; seals become brittle; lines contract substantially.
2. **Hydrogen's density is tiny.** Pumps must generate high pressure at very low density, so shaft speeds are extreme and cavitation and rotordynamic instability are ready problems.
3. **Hydrogen molecules are small and diffuse into metal.** Hydrogen embrittlement can fail high-strength steels within hundreds of hours, tightly constraining material choice.
4. **Cryogenic propellant management on orbit.** An upper stage that coasts and relights must handle boil-off, settling and pressurisation.

None of these can be solved analytically; all require accumulated test experience. **India's test infrastructure and number of test firings were far below those of the US and Russia, so the timeline stretched.**

GSLV Mk II's indigenous CUS failed on its first flight in April 2010 (turbopump start anomaly) and succeeded only in 2014. CE-20 was a much bigger step at 200 kN, nearly three times CUS.

**India chose a gas generator cycle rather than the expander cycle more common on upper stages.** The reason is thrust: expander cycles are heat-transfer limited and reaching 200 kN is very hard (Vinci is 180 kN, already near the limit and heavily optimised). A gas generator wastes about 3% of propellant but scales in thrust and carries more controllable technical risk.

**That is a characteristic late-entrant choice: do not chase peak cycle efficiency, pick the path with the lowest engineering risk that flies soonest.**`,
    },
    {
      question: "Is it safe not to ignite the liquid stage at liftoff?",
      answer: `It is a trade that moves risk from the ground to the air, and India accepts it because its confidence in the solid boosters is very high.

**Advantages of the conventional approach (core and boosters lit together on the ground):**

- The engines reach stable operation before release, so any anomaly can abort the launch;
- The core contributes thrust vector control from the start, giving fuller attitude control redundancy.

**Advantages of LVM3's approach:**

- All 110 t of L110's propellant is spent at altitude. During flight through dense atmosphere the vehicle fights drag and gravity losses, so **each kilogram of propellant produces markedly less effective Δv than at altitude**;
- Vikas' nozzle expansion ratio can be optimised for high altitude without compromising for sea level;
- For a given liftoff mass, the payload gain is meaningful.

**Where is the risk?** An in-flight ignition failure cannot be recovered. LVM3 does two things about it:

1. **An overlapping burn.** L110 lights at T+114 s but the S200s do not separate until T+128 s — **fourteen seconds of overlap.** If L110 fails to light there is time for fault detection and, in the crewed configuration, an abort.
2. **Vikas uses hypergolic propellants.** UDMH and nitrogen tetroxide ignite on contact with no igniter, so ignition reliability is far higher than a cryogenic engine requiring a start sequence.

**The second point is the key to understanding the design.** The toxicity of hypergolics is offset here by their ignition reliability — India traded a “dirty” choice for a “dependable” sequence. **If this stage burned hydrogen, the design would not work at all.**

Comparable sequencing appears elsewhere: the Shuttle lit its main engines 6.6 seconds *before* the solid boosters (the opposite offset, to confirm all three engines were healthy before committing to solids that cannot be shut down). **Every ignition sequence offset encodes a judgement about which link is more likely to fail.**`,
    },
    {
      question: "Why are Indian rockets so cheap?",
      answer: `Because labour and domestic manufacturing account for a far larger share of the cost than in other spacefaring nations, and both are inexpensive in India.

Some reference figures:

| Mission | Cost | Comparison |
|---|---|---|
| Chandrayaan-3 (2023, spacecraft plus launch) | About 75 M USD | Less than several Hollywood film budgets |
| Mangalyaan Mars orbiter (2013) | About 74 M USD | NASA's contemporaneous MAVEN cost 670 M |
| LVM3 per launch | About 50–60 M USD | Ariane 5 in the same class cost about 170 M |

The low cost comes not from a technological breakthrough but from several concrete facts:

1. **Engineer and technician salaries** are far below Western and Japanese levels, and ISRO's headcount is large (about 17,000), with much work done in house rather than contracted out.
2. **A domestic supply chain.** India manufactures as much as possible at home, avoiding expensive imports and foreign exchange costs.
3. **Restraint in design.** Indian spacecraft and rockets generally **do not chase performance margin**: Mangalyaan carried only 15 kg of science instruments; Chandrayaan-3 dropped the orbiter entirely (reusing the still-functioning one from Chandrayaan-2). **Removing unnecessary capability is the single most effective cost control there is.**
4. **Tolerance for time.** Mangalyaan raised its apogee through several elliptical Earth orbits before departing for Mars rather than injecting directly — **saving launch capability at the price of several extra months.** Well-funded agencies rarely make that trade.

**But the advantage has a boundary.** Low labour cost helps the **labour-intensive** parts and does nothing for the **materials- and facilities-intensive** parts: cryogenic test stands, high-purity materials and precision machining are priced on the world market. That is also why India progressed quickly in solid propulsion and system design and slowly in cryogenics — **the former depends on people and experience, the latter on facilities and test count.**

Gaganyaan will test the limits of the model: the redundancy, testing and process discipline required for human rating are exactly what cheap labour cannot compress.`,
    },
  ],

  contemporaries: `**Long March 3B** (China, 1996) is close in GTO capability (5.5 t against 4 t) and has flown far more often. The two countries started in the same era; China turned a larger domestic demand into production volume.

**Ariane 5** (1996) shares LVM3's configuration (large solid boosters, liquid core, hydrolox upper stage) at about two and a half times the capability and about three times the price. **LVM3's commercial appeal comes precisely from that price gap.**

**H-IIA** (Japan, 2001) is the same generation of medium launcher, more reliable and more expensive. The pair illustrate two national strategies: Japan trades engineering discipline for reliability, India trades cost advantage for market access.

**Falcon 9** (2010) is still cheaper than LVM3 in reused configuration, but that does not affect India's domestic missions, and the OneWeb contracts show LVM3 has genuine commercial space in specific windows.`,

  milestones: [
    { title: "Russia cancels cryogenic technology transfer", note: "Under US MTCR pressure, forcing India to develop its own hydrolox upper stage." },
    { title: "LVM3-X / CARE suborbital test", note: "Validated airframe aerodynamics and crew module re-entry, with ballast in place of the cryogenic stage." },
    { title: "First flight of the complete configuration", note: "First flight of the CE-20 hydrolox engine." },
    { title: "Chandrayaan-2 launched", note: "The lander was lost 2 km above the surface; the orbiter still operates." },
    { title: "First commercial OneWeb launch", note: "Entry into the international commercial launch market." },
    { title: "Chandrayaan-3 launched", note: "Successful soft landing near the lunar south pole on 23 August." },
  ],

  launchesNotable: [
    { name: "LVM3-D1 / GSAT-19", note: "First flight of the complete configuration." },
    { name: "Chandrayaan-2", note: "The rocket performed normally; the lander's soft landing failed." },
    { name: "Chandrayaan-3", note: "The first soft landing in the lunar south polar region." },
  ],

  variants: [
    { name: "LVM3 (GSLV Mk III)", note: "Standard configuration, 4 t to GTO / 10 t to LEO." },
    { name: "HLVM3", note: "The Gaganyaan crewed configuration, adding an escape system and human-rated redundancy." },
    { name: "LVM3 with C32", note: "A planned enlarged cryogenic stage raising GTO capability into the 6 t class." },
  ],

  stages: [
    {
      nameZh: "Two S200 solid boosters",
      propellantZh: "HTPB composite solid propellant",
      note: "Only these two operate at liftoff; the liquid core does not ignite until T+114 s.",
      engines: [{ cycleZh: "Solid", note: "207 t of propellant each, the third largest solid boosters in the world." }],
    },
    {
      nameZh: "L110 liquid core",
      propellantZh: "UDMH / nitrogen tetroxide",
      note: "Two Vikas engines ignite in flight at T+114 s, overlapping the solid boosters by about 14 s.",
      engines: [{ cycleZh: "Gas generator", note: "An indigenised derivative of the French Viking engine, in service for over forty years." }],
    },
    {
      nameZh: "C25 cryogenic upper stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "India's largest indigenous cryogenic stage, and a key element of the Gaganyaan crewed programme.",
      engines: [{ cycleZh: "Gas generator", note: "India's first indigenous large hydrolox engine, developed over nearly twenty years." }],
    },
  ],

  parts: {
    "s200-nozzle": {
      name: "S200 nozzles (×2)",
      description: "Flex-joint nozzles gimballing ±5°, providing all attitude control for the first 114 seconds of flight.",
    },
    "s200-body": {
      name: "S200 solid boosters (×2)",
      description:
        "207 t of propellant each and 3,578 kN at sea level — **the third largest solid rocket boosters in the world**, after the Shuttle/SLS boosters and Ariane 5's EAP. India's solid propulsion capability grew out of its sounding rocket and missile heritage and is the most mature element of the whole programme. **These two are the only things working when LVM3 lifts off.**",
    },
    "s200-nose": {
      name: "Booster nose cones",
      description: "The boosters separate at T+128 s.",
    },
    "l110-engines": {
      name: "Vikas engines (×2)",
      description:
        "**These two engines are not running at liftoff** — they do not ignite until T+114 s, as the solid boosters approach burnout. In-flight ignition of the core is very rare among mainstream launchers (most strap-on designs light everything on the ground). The reason is that S200 thrust is already sufficient, and igniting the liquid stage late saves a great deal of propellant for the later phases. **The cost is placing a high-risk ignition event in flight.**",
    },
    "l110-body": {
      name: "L110 liquid core",
      description:
        "4 m across, holding 110 t of UDMH and nitrogen tetroxide. Vikas' lineage is French: India acquired Viking engine technology from Ariane 1 in the 1970s and indigenised it under the name Vikas. **Fifty years on, it remains the liquid propulsion core of every Indian medium and heavy rocket** — PSLV, GSLV and LVM3 all use it.",
    },
    "c25-engine": {
      name: "CE-20 engine",
      description:
        "India's indigenous hydrolox upper stage engine, 200 kN in vacuum at 443 s. It uses a **gas generator cycle** rather than the expander cycle more common on upper stages, because expander cycles are thrust-limited and 200 kN is beyond their comfortable range. **CE-20's significance goes well beyond the technology**: India originally planned to buy hydrolox upper stage technology from Russia in the 1990s, the United States pressured Russia into cancelling the transfer under missile technology controls, and India was forced into nearly twenty years of indigenous development.",
    },
    "c25-body": {
      name: "C25 cryogenic upper stage",
      description: "Holding 28 t of liquid hydrogen and oxygen. This stage determines LVM3's GTO capability and is a key element of India's Gaganyaan crewed programme.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 5 m fairing. In the crewed configuration it is replaced by the Gaganyaan spacecraft and its escape system, changing the overall height accordingly.",
    },
  },

  modelNote:
    "Reconstructed from the published configuration: 43.5 m tall, 4 m core diameter, two 3.2 m solid boosters.",

  sources: [
    { title: "LVM3 — ISRO", publisher: "Indian Space Research Organisation", note: "Dimensions, masses, stage parameters and performance." },
    { title: "CE-20 Cryogenic Engine", publisher: "ISRO Liquid Propulsion Systems Centre", note: "Thrust, impulse and cycle." },
    { title: "Chandrayaan-3 Mission", publisher: "ISRO", note: "Mission cost and launch configuration." },
  ],

  tags: ["Medium lift", "Large solid boosters", "Cryogenic upper stage", "Lunar", "India"],
};
