import type { RocketOverlay } from "@/i18n/localize";

export const v2En: RocketOverlay = {
  displayName: "V-2 (Aggregat 4)",
  country: "Germany",
  agency: ["Heeresversuchsanstalt Peenemünde"],
  description:
    "The first large liquid-fuelled ballistic missile, and the first man-made object to reach space. It failed completely as a weapon, and as a technical starting point it defined every launch vehicle that followed.",

  history: `The V-2's roots lie in German amateur rocketry of the 1920s. In 1932 the army recruited a 20-year-old Wernher von Braun — the Treaty of Versailles capped artillery calibres but said nothing about rockets, which made rocketry a direction the army could legally fund. From the A1 to the A4, Peenemünde spent a decade taking a hobby to industrial scale.

On 3 October 1942 the A4 flew successfully for the first time: 190 km downrange, 84.5 km apogee. Walter Dornberger, who ran the programme, said that evening: “Today the spaceship was born.” A vertical test shot on 20 June 1944 (MW 18014) reached 176 km — **the first time a man-made object crossed the 100 km Kármán line into space.**

As a weapon it began striking London, Antwerp and other cities in September 1944; roughly 3,172 were fired, killing about 9,000 people. Building it cost far more: the underground Mittelwerk plant at Nordhausen used concentration camp forced labour, and **an estimated 12,000–20,000 labourers died in production — far more people died making this weapon than were killed by it.** No discussion of the V-2's technical achievement should be separated from that fact.

After the war the United States, the Soviet Union and Britain divided the legacy. Operation Paperclip brought von Braun, more than a hundred engineers and hundreds of components to America, leading directly to Redstone, Jupiter and eventually Saturn; the Soviet Union took the Peenemünde facilities and some personnel, and Korolev's copy — the R-1 — was where his road to the R-7 began.`,

  designPhilosophy: `The V-2 established the **basic parts list** that every launch vehicle has used since: a pump-fed liquid engine, a regeneratively cooled thrust chamber, a turbopump, inertial guidance, thrust vector control, a lightweight load-bearing airframe, and a large-scale ground test programme. Before it, none of those had been demonstrated at scale.

Its design logic can be summed up as **finding a detour around every unsolved problem**:

- Large chambers go unstable → divide combustion across 18 injector pots.
- No mature way to drive a turbopump → use an independent hydrogen-peroxide steam system, entirely decoupled from the main propellants.
- Air rudders do not work in thin air → put graphite vanes directly in the exhaust.
- Load-bearing tank manufacturing is not good enough → hang the tanks inside the skin and let each do its own job.

Every detour cost mass or efficiency (the jet vanes alone threw away 17% of the thrust; the hung tanks made the vehicle heavy; ethanol has far less impulse than kerosene), and every one turned a “cannot” into a “can”. **That is the characteristic shape of first-generation engineering: not the optimal solution, only a feasible one.**

Its failure as a weapon follows directly from the same design. A 17 km CEP means it can only terrorise cities, and a 1 t warhead is not strategically decisive. Spending a rocket that cost as much as four fighter aircraft to deliver one bomb is absurd military economics. **The V-2's real value was never in what it was built to do.**`,

  tradeoffs: [
    {
      question: "Why ethanol rather than kerosene?",
      answer: `A 75% aqueous ethanol solution delivers only 203 s of specific impulse at sea level, about 40 s less than kerosene. It was chosen for three reasons:

1. **Cooling.** Ethanol has a high heat of vaporisation, and diluting it with water lowers flame temperature to about 2,700 °C rather than kerosene's 3,400 °C. Regenerative cooling in 1942 was primitive, and cutting the temperature was what let the chamber survive 65 s. The 25% water was purely impulse traded for chamber life.
2. **Supply.** Wartime Germany was short of oil but could ferment ethanol from potatoes in quantity — the V-2 programme at one point consumed a noticeable fraction of German potato production. A resource constraint walking straight into a technical decision.
3. **Combustion behaviour.** Ethanol burns steadily with little coking, which is far kinder to injectors nobody could yet control precisely.

Both post-war copies (Redstone, R-1) kept ethanol, and only replaced it in the mid-1950s once kerosene's cooling and coking problems had been solved. **The lesson is that propellant choice is rarely driven by theoretical impulse; it is driven by whether the available materials and processes can survive it.**`,
    },
    {
      question: "Were jet vanes a good solution?",
      answer: `At liftoff the V-2's speed is zero, so aerodynamic surfaces do nothing; at altitude the air is too thin for them to work either. Controlling attitude across both regimes means acting directly on the thrust.

Von Braun's team put **four graphite vanes in the nozzle exit** to deflect the exhaust. It worked, it was simple, and it needed no moving engine mount. The costs:

- The vanes sit in 2,700 °C exhaust and **erode continuously**; 65 s of burn is close to their life.
- They block the flow, costing about 17% of thrust — an enormous performance tax.
- Erosion changes control authority over time, which the control system has to tolerate.

Every later rocket moved to **gimballed engines**: mount the whole engine on a joint and steer with actuators, losing no thrust at all. The V-2 did not, because flexible cryogenic propellant lines and high-power actuators did not yet exist.

**What jet vanes established is that thrust vector control is possible at all** — and once that was proven, finding a better implementation was merely engineering. They survive today where burn times are very short, as in some solid missile boost phases and launch escape systems.`,
    },
    {
      question: "Why could the V-2 never reach orbit?",
      answer: `Its burnout velocity was about 1.6 km/s; low Earth orbit needs about 7.8 km/s. Not quite a factor of five — but the gap is far harder than it looks, because it lives inside an exponential.

The ideal rocket equation:

$$\\Delta v = I_{sp} \\, g_0 \\ln\\frac{m_0}{m_f}$$

With $I_{sp} \\approx 239$ s in vacuum and a mass ratio of $12{,}500 / 4{,}008 \\approx 3.1$, that gives $\\Delta v \\approx 2.65$ km/s ideal, or about 1.6 km/s after gravity and drag losses.

To reach the roughly 9.4 km/s an orbital launch actually requires, the same engine would need a mass ratio of:

$$\\frac{m_0}{m_f} = e^{9400 / (239 \\times 9.81)} \\approx e^{4.0} \\approx 55$$

That is, only 1/55 of the vehicle could be structure and payload — while the V-2's structure alone is about a third. **Single-stage-to-orbit at that specific impulse is not a hard engineering problem; it is mathematically impossible**, however good the workmanship.

Which is exactly why staging is necessary: throwing away empty tanks makes $m_f$ drop in steps during flight. Von Braun knew this early — the two-stage, transatlantic A9/A10 was on paper before the war ended, and both the R-7 and Redstone are continuations of that line.`,
    },
  ],

  contemporaries: `The V-2 had no technical contemporary — the Allies had no comparable liquid rocket programme. American JATO and WAC Corporal work and Soviet Katyusha rockets were far smaller solid or simple liquid devices. That gap is itself a statement about concentrated investment: German spending on the V-2 between 1937 and 1945 has been estimated as comparable to the Manhattan Project.

The two programmes delivered very different things. Manhattan produced a weapon that ended a war. The V-2 produced a militarily ineffective weapon, a morally heavy legacy, and a technological inheritance that two superpowers each took home and used to put people in space within twenty years.`,

  tags: ["Origin point", "Suborbital", "First object in space", "Liquid ballistic missile"],

  milestones: [
    { title: "First successful flight", note: "190 km downrange, 84.5 km apogee." },
    { title: "MW 18014 — first object in space", note: "A vertical test shot reached 176 km, the first crossing of the Kármán line." },
    { title: "First operational use", note: "Attacks on Paris and London." },
    { title: "Operation Paperclip / Soviet capture of Peenemünde", note: "The technical legacy divided between the United States and the Soviet Union." },
    { title: "First US launch of a captured V-2", note: "From White Sands, for upper atmosphere and cosmic ray research." },
    { title: "Bumper-WAC reaches 393 km", note: "A V-2 with a WAC Corporal second stage: the first practical multi-stage rocket flight." },
  ],

  variants: [
    { name: "A4b", note: "A winged glide-extended version; two test flights." },
    { name: "A9 / A10", note: "A two-stage transatlantic concept that never left the drawing board." },
    { name: "Bumper", note: "The American two-stage test vehicle using a V-2 first stage and a WAC Corporal second stage." },
    { name: "R-1", note: "The Soviet copy, and the start of Korolev's programme." },
  ],

  stages: [
    {
      nameZh: "Single stage",
      propellantZh: "75% aqueous ethanol / liquid oxygen",
      note: "Burnout at about 1.6 km/s, 320 km range, apogee around 88 km.",
      engines: [
        {
          cycleZh: "Hydrogen-peroxide steam turbopump feed",
          note: "The turbopump ran on steam from catalytically decomposed peroxide, independent of the main propellants.",
        },
      ],
    },
  ],

  parts: {
    nozzle: {
      name: "Thrust chamber and nozzle",
      description:
        "A single 245 kN chamber, fed through 18 cup-shaped injector pots that divided the combustion into zones — a way around the large-chamber instability nobody could then solve. The nozzle wall was regeneratively cooled with ethanol, with additional film cooling.",
    },
    tail: {
      name: "Tail section",
      description:
        "Houses the turbopump (driven by steam from catalytically decomposed hydrogen peroxide), the peroxide tank and the sodium permanganate catalyst tank. Turbopump power came from a separate chemical system rather than the main propellants — the earliest form of a dedicated gas source, heavier than a gas generator but far easier to develop separately.",
    },
    fins: {
      name: "Fins and jet vanes (×4)",
      description:
        "Four large fins provide aerodynamic stability, with **graphite jet vanes** at their roots reaching directly into the exhaust to steer it — control authority at zero speed and in thin air alike. This was the first practical thrust vector control, and it cost about 17% of thrust while the vanes eroded continuously in the 2,700 °C flow.",
    },
    tanks: {
      name: "Propellant tank section",
      description:
        "An ethanol tank above and a liquid oxygen tank below, both aluminium and both **hung inside the airframe skin** rather than carrying load themselves. That is far heavier than the load-bearing tanks that followed, but much simpler to build and inspect — and the V-2 was mass-produced in wartime by unskilled labour, where manufacturability outranked structural efficiency.",
    },
    guidance: {
      name: "Guidance section",
      description:
        "Two gyroscopes (one for pitch/yaw, one for roll) and an integrating accelerometer. The guidance logic was elementary: hold attitude, follow a programmed pitch-over, and cut the engine when accumulated velocity reached a set value — no position feedback, no closed-loop navigation. Accuracy was therefore about 17 km CEP, which made it nearly worthless as a weapon.",
    },
    warhead: {
      name: "Warhead / nose cone",
      description:
        "A 1,000 kg Amatol warhead. The nose did not separate — the whole vehicle struck the target above Mach 5, which also means the V-2 had no concept of re-entry heating: the airframe only had to hold together for the final seconds.",
    },
  },

  modelNote:
    "A schematic reconstruction from published A4 drawings: 14 m overall, 1.65 m body diameter, 3.56 m fin span. Internal tanks and turbopump placement are indicative rather than exact.",

  sources: [
    { note: "The standard reference on the Peenemünde team, A4 development and the post-war transfer." },
    { note: "Dimensions, mass and thrust from museum artefacts." },
    { note: "The authoritative record of forced labour and death tolls." },
    { note: "Launch counts and casualty figures; sources give total production between 2,800 and 3,600." },
  ],
};
