import type { RocketOverlay } from "@/i18n/localize";

export const saturnVEn: RocketOverlay = {
  displayName: "Saturn V",
  country: "United States",
  description:
    "A three-stage heavy-lift rocket built for a single objective — landing on the Moon within the decade. It is still the largest launch vehicle ever to reach orbit, and the only one that has taken people beyond low Earth orbit.",

  history: `When Kennedy made a Moon landing national policy in May 1961, no American stage produced more than 700 kN of thrust. Von Braun's team at Marshall spent four years dragging the F-1 from paper to the test stand, while NASA argued internally for two years about how to do the mission at all: Direct Ascent needed a Nova three times the size of Saturn V; Earth Orbit Rendezvous needed two launches and a docking. In July 1962 NASA finally chose **lunar orbit rendezvous (LOR)**, the option John Houbolt had been pushing — a lander that shuttles only between lunar orbit and the surface, so the heat shield and return propellant never go down to the Moon at all.

That decision set the size of the rocket. The trans-lunar injection requirement fell from around 68 t to the 45 t class, which a single Saturn V could deliver in one launch. Its staging, its diameter, its tank volumes are all reverse-engineered from that 48.6 t TLI capability.

Apollo 4 flew on 9 November 1967 and succeeded on the first attempt, using the aggressive **all-up testing** approach — fly the complete vehicle from the start. Apollo 8 carried a crew around the Moon in December 1968; Apollo 11 landed in July 1969. Of thirteen launches only Apollo 6 suffered a serious failure — early second-stage engine shutdowns and a third stage that would not restart — and no crew was ever lost to the launch vehicle. The final vehicle, in a two-stage configuration, put the Skylab station into orbit in May 1973; the production line had already closed in 1970.`,

  designPhilosophy: `Saturn V's design logic compresses into one sentence: **it is not a general-purpose launch vehicle, it is a tool sized for one mission.**

The mission architecture (LOR) was fixed first, which fixed the mass that had to be sent toward the Moon (48.6 t), which was then run backwards through the ideal rocket equation to derive each stage's mass ratio and propellant choice — rather than building a rocket and then looking for missions. That is the opposite of what Shuttle and SLS later attempted, and it explains why Saturn V's performance was extraordinary and its economics were hopeless: every vehicle was a hand-built, single-use article, with nothing in it designed for reuse, high flight rate or low marginal cost.

The second thread is **propellant chosen by layer**: kerosene in the first stage to buy density, hydrogen in the upper stages to buy specific impulse. The third is **redundancy instead of incremental verification** — all-up testing saved two years, at the price of pushing the risk onto ground testing and design margin.`,

  tradeoffs: [
    {
      question: "Why does the first stage burn kerosene while the upper stages burn hydrogen?",
      answer: `This is the classic density-versus-impulse trade. Liquid hydrogen delivers about 100 s more vacuum specific impulse than kerosene (421 s vs 304 s), but its density is one twelfth as high (71 kg/m³ vs 810 kg/m³).

A first stage fights gravity losses and aerodynamic drag in dense air; what it needs is **thrust and compactness**. Had the S-IC burned hydrogen, the tank volume required for the same propellant mass would have ballooned to something unmanageable — vehicle diameter, structural mass and drag would all have run away — while part of the impulse advantage would have been eaten by poor nozzle efficiency at low altitude anyway.

Upper stages work in vacuum and contribute the larger share of the velocity increment. There, every 1% of specific impulse converts straight into payload. So the S-II and S-IVB accepted enormous tanks, 20 K insulation and hydrogen embrittlement in exchange for 421 s.

Worth noting how the S-II clawed back some of hydrogen's volume penalty: a **common bulkhead**, where the bottom of the hydrogen tank *is* the top of the oxygen tank, separated only by a honeycomb insulation layer. That single decision saved about 3.6 t of structure and 3 m of length — and was the hardest part of the entire stage to build.`,
    },
    {
      question: "Why three stages, rather than two or four?",
      answer: `More stages give a theoretically better mass ratio, but each one costs an interstage, a separation mechanism, extra engines and one more chance of a separation failure. What actually fixed Saturn V at three stages was **the mission profile, not an optimisation**:

- Stage one (S-IC): get out of the atmosphere. Purely a lifting problem.
- Stage two (S-II): supply most of the orbital velocity.
- Stage three (S-IVB): finish the last kilometre per second to orbit, **then shut down, coast for two or three revolutions, and restart** for trans-lunar injection.

The third point is the decisive one. The TLI burn's timing is set by the Moon's position and the launch window, so it cannot follow orbital insertion continuously. That requires a stage capable of **restarting after a coast** — with ullage settling, long-duration cryogenic management and a re-ignitable engine. Isolating that expensive capability in the smallest stage (the S-IVB masses only 119 t) was far cheaper than giving the huge S-II the same ability.

A four-stage design saves a few tonnes on paper, but each extra separation is another single-point failure — a poor trade on a crewed mission.`,
    },
    {
      question: "Why did the F-1 use a gas-generator cycle instead of more efficient staged combustion?",
      answer: `The contemporary Soviet NK-15 was already using oxidiser-rich staged combustion, with higher specific impulse. The F-1 instead chose the most “wasteful” cycle available — turbine exhaust dumped overboard through the nozzle skirt, throwing away about 3% of the propellant flow.

The reason is that **scale mattered more than efficiency**. The F-1 targeted 6,770 kN from a single chamber, an order of magnitude beyond anything then in development. Staged combustion demands that preburner, turbine and main chamber work coupled at high pressure; any instability propagates through the whole system. With 1960s materials and computation, scaling that coupling to F-1 size was extremely risky. A gas generator decouples the turbine loop from the main chamber, so engineers could debug the two separately.

Even so, the F-1 was stuck on **combustion instability** for nearly four years: over 2,000 test firings and dozens of injector baffle designs before radial and circumferential baffles on a copper injector face finally damped the high-frequency oscillation — and small explosive charges were detonated inside the running chamber to prove it could recover within 0.1 s.

The price was a sea-level specific impulse of just 263 s. For a first stage that is acceptable: payload sensitivity to first-stage impulse is far lower than to upper-stage impulse.`,
    },
    {
      question: "Was all-up testing reckless or rational?",
      answer: `The traditional von Braun approach was incremental: fly the first stage with dummy uppers, then two live stages, then the complete vehicle. With only thirteen vehicles procured and a 1969 deadline, Saturn V had no room for that sequence.

In 1963 George Mueller, head of NASA's Office of Manned Space Flight, imposed all-up testing: **the first flight would be the complete three-stage vehicle with a real spacecraft, everything live at once.** His argument was that each Saturn V cost too much and took too long to build to be spent as a first-stage test article; better to pour the resources into ground test stands and component reliability than to debug incrementally in flight.

The bet paid off on Apollo 4: success first time. But Apollo 6, the second uncrewed flight, exposed two nearly fatal problems — **POGO longitudinal coupling** between structure and propulsion, and fatigue failure of a J-2 helium igniter line in vacuum. Two second-stage engines shut down early and the third stage could not restart. Had that been a crewed mission, the outcome is hard to predict.

In hindsight, all-up testing worked because of one precondition: ground test coverage was good enough. Saturn V had full-scale structural and dynamic test articles and full-thrust S-IC and S-II stand firings. Starship today runs the opposite strategy — **cheap airframes flown often** — because its cost assumptions are entirely different.`,
    },
    {
      question: "Why has Saturn V never been rebuilt?",
      answer: `The common claim is that “the drawings were lost”. That is not accurate — the drawings and a great deal of documentation survive. What cannot be recovered is **the industrial ecosystem and tacit knowledge that made it**: the F-1's brazed nozzle was assembled from thousands of hand-welded nickel-alloy tubes, dependent on particular workers' skill and particular tooling; hundreds of suppliers moved on decades ago; the test stands were demolished or rebuilt.

The deeper reason is that **the requirement disappeared**. Saturn V's marginal cost in today's money was something like 1.2–1.5 billion dollars per vehicle, and every one was expendable. Once Apollo's political objective was met, no mission needed several 140 t launches a year. When NASA cancelled the follow-on order in 1970, it was effectively acknowledging that the premises of the design — cost no object, one mission, short timescale — no longer held.

This is the point this atlas keeps returning to: **a launch vehicle is never “advanced” in the abstract, only relative to the mission model it serves.** Saturn V was close to perfect for its mission model, and is entirely unsuited to today's.`,
    },
  ],

  contemporaries: `Saturn V's direct counterpart was the Soviet **N1**: more liftoff thrust (thirty NK-15s, 45,400 kN), but lacking a single large engine like the F-1 it was forced into thirty engines in parallel, and its KORD control system could not reliably handle the plumbing coupling when one failed. All four launches failed. The comparison is usually cited to illustrate an engineering principle: **increasing engine count converts a first stage's reliability problem from single-engine reliability into a system coupling problem** — a conclusion SpaceX challenged half a century later with a 33-engine Super Heavy, on the strength of completely different sensing, control and iteration capability.

On payload, no rocket that has **successfully reached orbit** has yet exceeded Saturn V's 140 t to LEO. Starship's target figure is higher, but it has not yet completed an orbital mission.`,

  tags: ["Moon landing", "Heavy lift", "Hydrolox upper stages", "Crewed", "Historic milestone"],

  milestones: [
    { title: "Kennedy commits the US to a Moon landing", note: "At the time, the F-1 had not yet completed a full-engine test firing." },
    { title: "NASA selects lunar orbit rendezvous", note: "The decision that set the upper bound on the vehicle's size." },
    { title: "Apollo 4 — maiden flight", note: "All-up testing succeeded on the first attempt." },
    { title: "Apollo 6 — POGO oscillation", note: "Two second-stage engines shut down early; the third stage failed to restart." },
    { title: "Apollo 8 — first crewed lunar orbit", note: "The first time humans left Earth's gravitational sphere of influence." },
    { title: "Apollo 11 — first crewed landing", note: "" },
    { title: "Skylab — final flight", note: "A two-stage configuration placed the 77 t station in orbit." },
  ],

  variants: [
    { name: "Saturn V (Apollo configuration)", note: "The standard three-stage vehicle, SA-501 through SA-512." },
    { name: "Saturn INT-21", note: "Two-stage configuration used to launch Skylab." },
    { name: "Saturn V-B / MLV series", note: "Various uprated proposals (added solids, larger F-1A engines); none built." },
  ],

  stages: [
    {
      nameZh: "S-IC first stage",
      propellantZh: "RP-1 kerosene / liquid oxygen",
      note: "At shutdown it was around 68 km up at 2.76 km/s — less than a third of the total velocity increment, for 70% of the vehicle's propellant mass. That is the price of gravity losses and drag.",
      engines: [
        {
          cycleZh: "Gas-generator cycle",
          note: "The most powerful single-chamber liquid rocket engine ever flown.",
        },
      ],
    },
    {
      nameZh: "S-II second stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "The common bulkhead pushed the dry mass fraction past 1:12, the most structurally efficient large stage of its era.",
      engines: [
        {
          cycleZh: "Gas-generator cycle",
          note: "America's first practical hydrolox engine, restartable in vacuum.",
        },
      ],
    },
    {
      nameZh: "S-IVB third stage",
      propellantZh: "Liquid hydrogen / liquid oxygen",
      note: "Two burns: about 165 s to orbit, then a restart after two or three revolutions for a roughly 340 s trans-lunar injection.",
      engines: [{ cycleZh: "Gas-generator cycle" }],
    },
  ],

  launchesNotable: [
    { name: "Apollo 4", note: "Maiden flight, validating all three stages and re-entry." },
    { name: "Apollo 11", note: "The first crewed lunar landing." },
    {
      name: "Apollo 13",
      note: "The launch vehicle performed normally; the second stage's centre engine shut down early from POGO and the remaining engines burned longer to compensate.",
    },
    { name: "Skylab 1", note: "The only flight in the two-stage configuration." },
  ],

  parts: {
    "f1-cluster": {
      name: "F-1 engine cluster (×5)",
      description:
        "Five F-1s in a four-corners-plus-centre arrangement, each producing 6,770 kN at sea level — still the most powerful single-chamber liquid engine ever flown. The four outboard engines gimbal for thrust vector control; the centre engine is fixed and was shut down early at about T+135 s to keep acceleration below 4 g.",
    },
    "s1c-body": {
      name: "S-IC first stage",
      description:
        "A 10.1 m diameter kerolox stage holding 2,077 t of propellant, burning 168 s to reach 68 km and 2.76 km/s. The RP-1 tank sits below the LOX tank, separated by a truss-type intertank, with oxygen fed down through five ducts that run straight through the kerosene tank.",
    },
    "s1c-fins": {
      name: "S-IC fins",
      description:
        "Four fixed fins provide aerodynamic stability margin, so the control system does not have to hold attitude on gimballing alone through the transonic region. They also serve as launch-pad support points and as fairings for the outboard engines.",
    },
    "s2-body": {
      name: "S-II second stage",
      description:
        "Five J-2 engines on liquid hydrogen and oxygen — the hardest stage of its day. To save mass it used a common bulkhead, with the hydrogen and oxygen tanks separated by a single honeycomb sandwich, giving a startling dry mass fraction beyond 1:20. It burned about 360 s, taking velocity to 6.8 km/s.",
    },
    "s2-interstage": {
      name: "S-II / S-IVB interstage",
      description:
        "A conical interstage tapering from 10.1 m to 6.6 m. Separation between the S-II and S-IVB was “hot”: the upper stage engine lit first and explosive cord then cut the connection, avoiding poor propellant settling in free fall.",
    },
    "s4b-body": {
      name: "S-IVB third stage",
      description:
        "A single J-2 hydrolox stage, and the only one that had to restart on orbit: the first burn completed orbital insertion, then after two or three revolutions of coasting it relit for trans-lunar injection. The auxiliary propulsion system (APS) modules visible on the exterior handled ullage settling and attitude control during the coast.",
    },
    iu: {
      name: "Instrument Unit (IU)",
      description:
        "The vehicle's brain: an IBM-built ring section containing the ST-124 inertial platform and the LVDC digital computer, which guided the vehicle from liftoff through TLI independently of the spacecraft. Concentrating guidance into a single replaceable ring was central to the Saturn series' maintainability.",
    },
    sla: {
      name: "Spacecraft/LM Adapter (SLA)",
      description:
        "The conical adapter housed the Lunar Module. After TLI its four panels sprang outward, and the Command/Service Module turned around, docked with the lander and pulled it free — the transposition-and-docking manoeuvre being a direct consequence of the lunar orbit rendezvous plan.",
    },
    sm: {
      name: "Service Module (SM)",
      description:
        "Carried the SPS main engine (91 kN, hypergolic), fuel cells and consumables, and performed lunar orbit insertion and the return burn. Jettisoned before re-entry.",
    },
    cm: {
      name: "Command Module (CM)",
      description:
        "The pressurised cabin and re-entry vehicle for three astronauts: 5.5 t of the vehicle's 3,000 t, and the only part that came home.",
    },
    les: {
      name: "Launch Escape System (LES)",
      description:
        "A 667 kN solid escape motor able to pull the Command Module clear of a failing rocket from the pad or during ascent. In a normal flight it was jettisoned about 30 s after S-II ignition, by which point the Service Module could perform an abort on its own.",
    },
  },

  modelNote:
    "A schematic reconstruction from published dimensions in NASA SP-4206 and the Saturn V Flight Manual: stage lengths, diameters and the F-1 arrangement match the real vehicle, while surface detail (plumbing, stringers, roll pattern) is indicative.",

  sources: [
    {
      note: "Primary source for stage dimensions, thrust and flight sequence.",
    },
    {
      note: "The authoritative account of F-1 combustion instability, the S-II common bulkhead and the all-up testing decision.",
    },
    { note: "Launch record and mission statistics." },
    {
      note: "Reference for aggregate figures such as liftoff mass and LEO payload; sources differ between 118 and 140 t depending on whether residual S-IVB propellant is counted.",
    },
  ],
};
