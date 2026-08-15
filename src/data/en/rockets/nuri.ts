import type { RocketOverlay } from "@/i18n/localize";

export const nuriEn: RocketOverlay = {
  displayName: "Nuri (KSLV-II)",
  country: "South Korea",
  agency: ["Korea Aerospace Research Institute (KARI)", "Hanwha Aerospace"],
  description:
    "South Korea's first entirely indigenous launch vehicle: engines, tanks and avionics all domestic, twelve years in the making, making Korea the seventh country able to put a tonne-class payload into orbit on its own.",

  history: `Nuri's predecessor was **Naro (KSLV-I)**, and it was a lesson.

In the 2000s South Korea partnered with Russia on Naro: **the first stage was supplied directly by Khrunichev** (in effect a variant of the Angara URM-1) with Korea building only the solid second stage and doing the integration. The contract explicitly excluded transfer of the first stage design.

The result: the maiden flight failed in 2009 (fairing separation), the second failed in 2010 (explosion before first/second stage separation), and only the third succeeded in 2013. **And after that success Korea still could not build the first stage.**

**KSLV-II “Nuri” was founded on that experience: everything indigenous, above all the engine.**

Development began in 2010 around the **KRE-075 engine**. Korea had never built a large liquid rocket engine and had to establish everything from chamber cooling and turbopump design to combustion stability from scratch. A new test facility was built, and the campaign ran to more than 180 firings totalling over 18,000 seconds.

**The maiden flight of 21 October 2021**: the first and second stages worked correctly, but the third stage shut down 46 seconds early, and the payload (a 1.5 t mass simulator) reached 700 km without sufficient velocity to enter orbit.

The investigation is instructive. A **helium bottle mounting bracket** inside the third stage's liquid oxygen tank came loose in flight. The design had checked only the 1 g ground case and the axial flight acceleration case, **and had not accounted for the reversal of buoyancy direction in flight** — the helium bottle floats in liquid oxygen, and under acceleration the “effective gravity” points opposite to the ground case, so the bracket saw a load direction it was never designed for.

**The second flight on 21 June 2022 succeeded**, placing a 162.5 kg performance verification satellite and four cubesats into a 700 km sun-synchronous orbit. **South Korea became the seventh country to place a tonne-class payload into orbit with an indigenous rocket** (after the USSR/Russia, the US, Europe, China, Japan and India).

The third flight succeeded in May 2023 with commercial customer satellites aboard. Production is progressively being transferred to the private company **Hanwha Aerospace**, following the American pattern of government development and commercial operation.`,

  designPhilosophy: `Nuri's design is built almost entirely around one word: **autonomy.**

Nothing about it is state of the art: a gas generator cycle (not staged combustion), kerolox (not methane), expendable (not recoverable), three stages in series (no strap-ons). **What these choices share is that they are thoroughly proven and carry controllable development risk.**

For a country starting from zero, that is the only rational path.

**The most important decision is using one engine on two stages.**

KRE-075 comes in two versions: the sea-level version (four in parallel on the first stage) and the vacuum version (one on the second, with a larger expansion ratio). Apart from the nozzle, the turbopump, chamber and feed system are essentially identical.

The benefits are direct:

- **Development effort halves.** Only one engine has to be brought to maturity.
- **Test data is shared.** Every first stage firing builds confidence for the second stage as well.
- **Production doubles.** One vehicle needs five KRE-075s, so volume is at least 1.25 times what a first-stage-only engine would see.

The cost is that **neither stage operates at its optimum.** 735 kN is small for a 200 t vehicle, hence four in parallel; and one engine is slightly over-powered for the second stage (a high thrust-to-weight ratio brings acceleration and structural penalties). **This is the classic trade of performance for development certainty.**

**The second decision is four parallel engines rather than one large one.**

Same logic: building a 3,000 kN engine is not four times harder than 735 kN but an order of magnitude harder (combustion instability, turbopump power, cooling). The difficulties of four in parallel — thrust synchronisation, base heating, structural coupling — are more “engineering” problems solvable by testing.

**That choice also produced a by-product:** Korea now has flight experience with multi-engine control, a necessary foundation for any future reusable vehicle.

**Nuri's real significance is not its performance but its demonstration that** a country with no prior large liquid engine experience can, in twelve years and on a comparatively modest budget (about 2 billion dollars), walk the whole path from an engine test stand to orbit. **Compare Naro's “buy the first stage” route — ten years later, nothing remained.**`,

  tradeoffs: [
    {
      question: "How different is buying a first stage from building one?",
      answer: `The difference is between “having a capability” and “having a rocket,” and South Korea demonstrated it with two consecutive programmes.

**Naro (KSLV-I, 2002–2013):**

- The first stage was supplied by Russia (a variant of Angara URM-1) with design data explicitly excluded from the contract;
- Korea built the solid second stage and did integration;
- Three launches, two failures, success on the third.

**What did Korea have after that success?** One orbital insertion and some system design and launch operations experience. **It did not have the ability to build a first stage** — that part was a black box. When the programme ended, launching again meant buying again.

**Nuri (KSLV-II, 2010–):**

- Everything indigenous, above all the KRE-075 engine;
- A national engine test facility, with 180-plus firings totalling more than 18,000 seconds;
- One failure, then success on the second flight.

**What did Korea have after that success?** A team able to design, build and test large liquid engines; a test and verification infrastructure; and an industrial chain running from tank forming to final assembly. **All of that can support the next rocket; a bought first stage cannot.**

**The comparison illustrates a basic truth about space technology transfer: you can buy products, but capability is very hard to buy.**

The reason is that most of the knowledge in a rocket engine is **tacit**: what counts as an acceptable weld, what vibration signature means stop the test, what injector hole tolerance is acceptable. None of it is on the drawings; it lives in people's experience and in test records.

India's history says the same. In 1993 Russia cancelled its cryogenic upper stage technology transfer under US pressure and sold only finished engines. **India flew a few missions on those engines, but truly owning the capability took nearly twenty years of indigenous CE-20 development.**

**“Buying” solves the mission of the moment; “building” solves whether you exist in the long run.**`,
    },
    {
      question: "How can one helium bottle bracket destroy a whole mission?",
      answer: `Because once loose it became a free-moving high-pressure vessel inside the liquid oxygen tank, and it broke the tank floor.

The physical sequence:

1. The third stage's liquid oxygen tank contains several **high-pressure helium bottles** immersed in the propellant. Putting bottles inside cryogenic propellant is common practice — cooled helium is denser, so a given volume holds more and the bottles can be smaller.
2. The bottles are held by brackets whose design loads covered 1 g on the ground and axial acceleration in flight.
3. **But the design did not properly account for the reversal of buoyancy direction.** The bottles float in liquid oxygen. On the ground buoyancy acts upward; in flight the effective gravity from acceleration points the other way, and buoyancy reverses and scales with the acceleration — near the end of third stage burn the axial load factor reaches 4–5 g and buoyancy is multiplied accordingly.
4. Under that unanticipated load direction the bracket failed. The bottle moved freely, struck the tank wall and eventually ruptured the lower dome of the oxygen tank.
5. Oxidiser leaked, the mixture ratio went out of balance, and the third stage engine shut down 46 seconds before propellant depletion.
6. The payload reached 700 km but at only about 6.3 km/s, 1.5 km/s short of orbit.

**The lesson is not “the bracket was too weak” but “the load cases were not fully enumerated.”**

Every part on a rocket must be checked against a set of **load cases**: ground transport, erection, loading, ignition transients, transonic buffet, staging, and the acceleration environment of each flight phase. **Miss one case and however accurate the stress analysis, it does not matter.**

Similar cases recur throughout spaceflight history:

- Ariane 5's maiden flight (1996): reused inertial navigation software overflowed an integer because the new flight profile exceeded the range it had been validated for — **the new case fell outside the old software's envelope.**
- Columbia (2003): foam shedding was a known phenomenon, but “foam strikes an RCC panel” had never been analysed as a potentially fatal case.

**What these share is that every component was individually compliant, and the failure came from nobody asking “what happens under this particular condition.”** It is also why flight testing cannot be fully replaced by simulation — **simulation only verifies the cases you thought of.**`,
    },
  ],

  contemporaries: `**Electron** (New Zealand/US) is close in capability (0.32 t against 1.5 t to SSO) but entirely different in business model: a private company serving a commercial market versus a national programme building sovereign capability.

**Vega-C** (Europe) is in the same SSO class (2.3 t against 1.5 t) and likewise flies mostly institutional missions.

**H-IIA / H3** (Japan) represents the other East Asian path: Japan first imported American technology in the 1970s and indigenised gradually, while Korea, after Naro, went straight to full indigenisation. **Both routes worked, but Japan took thirty years and Korea twelve — a late starter can skip some detours, provided it is willing to invest in engines from the beginning.**

**The Long March family** (China) started similarly (largely indigenous, beginning with small and medium vehicles) but along a far longer development path and at an entirely different scale today. **Nuri today sits roughly where China's Long March 2 sat in the 1980s.**`,

  milestones: [
    { title: "Naro's third launch succeeds", note: "The first stage came from Russia and Korea received no design data." },
    { title: "KSLV-II approved", note: "Fully indigenous development, centred on the KRE-075 engine." },
    { title: "Test vehicle suborbital flight", note: "A second stage validation flight with a single KRE-075, burning for 151 seconds." },
    { title: "Maiden flight", note: "A helium bottle bracket came loose in the third stage, causing early shutdown; the payload did not reach orbit." },
    { title: "Second flight succeeds", note: "Korea becomes the seventh country to place a tonne-class payload in orbit indigenously." },
    { title: "Third flight succeeds", note: "First commercial customer satellites aboard; production begins transferring to Hanwha Aerospace." },
  ],

  launchesNotable: [
    { name: "Maiden flight", note: "The mass simulator reached 700 km but fell 1.5 km/s short of orbital velocity." },
    { name: "Second flight", note: "A performance verification satellite and four cubesats reached orbit." },
    { name: "Third flight", note: "First operational payloads and commercial satellites." },
  ],

  variants: [
    { name: "KSLV-II baseline", note: "Three-stage configuration, 1.5 t to SSO." },
    { name: "KSLV-III (planned)", note: "A higher-capability successor, with plans including recovery technology demonstration and lunar mission capability." },
  ],

  stages: [
    {
      nameZh: "First stage",
      propellantZh: "Kerosene / liquid oxygen",
      note: "Four KRE-075s in parallel; thrust synchronisation and structural coupling were the main development challenges.",
      engines: [{ cycleZh: "Gas generator", note: "Korea's indigenous 75 tf class engine, shared between the first and second stages." }],
    },
    {
      nameZh: "Second stage",
      propellantZh: "Kerosene / liquid oxygen",
      note: "One vacuum KRE-075 with a larger expansion ratio.",
      engines: [{ cycleZh: "Gas generator", note: "The vacuum version of the first stage engine." }],
    },
    {
      nameZh: "Third stage",
      propellantZh: "Kerosene / liquid oxygen",
      note: "One KRE-007; on the 2021 maiden flight a helium bottle bracket failure caused early shutdown.",
      engines: [{ cycleZh: "Gas generator", note: "A 7 tf class engine responsible for final orbital insertion." }],
    },
  ],

  parts: {
    "s1-engines": {
      name: "KRE-075 engines (×4)",
      description:
        "Four 75 tf (735 kN) class kerolox engines on a gas generator cycle. **Korea chose “four medium engines in parallel” rather than developing a single 300 tf engine**, for reasons of development risk: the same engine serves both the first stage (four in parallel) and the second (one vacuum unit), so one development effort covers two. The cost is thrust synchronisation and structural coupling across four engines — **the principal technical challenge before first flight.**",
    },
    "s1-body": {
      name: "First stage",
      description:
        "A 3.5 m kerolox first stage with indigenous aluminium alloy tanks. **Only a handful of countries can independently build cryogenic tanks at this scale** — forming, welding and static testing thin-walled large-diameter tanks all require dedicated facilities and years of accumulated experience.",
    },
    "s2-engine": {
      name: "KRE-075 vacuum version",
      description: "The vacuum variant of the first stage engine with a larger expansion ratio. Reusing one engine type across two stages was Korea's most important development strategy after the Naro experience.",
    },
    "s2-body": {
      name: "Second stage",
      description: "Also 3.5 m in diameter, holding 56 t of propellant.",
    },
    interstage: {
      name: "Interstage transition",
      description: "Stepping from 3.5 m down to 2.6 m.",
    },
    "s3-body": {
      name: "Third stage",
      description:
        "One 7 tf (68.6 kN) KRE-007. **The 2021 maiden flight failure happened here**: in flight, acceleration caused a helium bottle mounting bracket inside the liquid oxygen tank to come loose, and the bottle struck the tank interior, rupturing it. Oxidiser leaked and the third stage shut down 46 seconds early, leaving the payload 1.5 km/s short of orbit. **This is a textbook example of a failure mode that is hard to reproduce on the ground** — the bracket had been designed for 1 g on the ground and axial flight acceleration, without properly accounting for the reversal of buoyancy direction.",
    },
    fairing: {
      name: "Payload fairing",
      description: "A 3.4 m fairing. The maiden flight carried a 1.5 t mass simulator; real satellites flew only from the second flight onward.",
    },
  },

  modelNote:
    "Reconstructed from the published 47.2 m height, 3.5 m first and second stage diameter and the three-stage series configuration.",

  sources: [
    { title: "KSLV-II Nuri — KARI", publisher: "Korea Aerospace Research Institute", note: "Stage parameters, engine thrust and performance." },
    { title: "Nuri First Flight Investigation Result", publisher: "Ministry of Science and ICT, Republic of Korea", note: "The failure mechanism of the third stage early shutdown (helium bottle bracket and buoyancy direction)." },
    { title: "Nuri (KSLV-II) — Wikipedia", publisher: "Wikipedia", note: "Launch record and development budget; some figures come from public reporting." },
  ],

  tags: ["Small-medium lift", "Kerolox", "Indigenous development", "South Korea"],
};
