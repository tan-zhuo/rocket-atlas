import type { PrincipleOverlay } from "@/i18n/localize";

export const guidanceEn: PrincipleOverlay = {
  title: "Guidance, navigation and control",
  summary:
    "How does a rocket know where it is, where it should point, and how does it get there? From the V-2's two gyroscopes to today's adaptive guidance, the evolution of the control system determines what missions a vehicle can fly.",

  body: `## Three separate questions

A launch vehicle's control system answers three different questions:

- **Navigation**: where am I? How fast? What attitude?
- **Guidance**: to reach the target orbit, which way should I be accelerating right now?
- **Control**: how do I actually get the vehicle pointed that way and keep it stable?

They operate on time scales orders of magnitude apart: the control loop runs in milliseconds, guidance in seconds, and navigation is a continuous integration.

## Control: keeping a long thin tube from tumbling

A launch vehicle is **aerodynamically unstable**: the centre of pressure normally sits ahead of the centre of mass, so any small disturbance is amplified. That is the opposite of an aircraft.

> An analogy: balancing a broom upright on your palm. It will not stabilise itself; it needs continuous active control.

The available means:

### Thrust vector control (TVC)

- **Gimballed engines**: mount the whole engine on a joint and deflect it ±5–8° with hydraulic or electromechanical actuators. This is today's mainstream — no thrust is lost and the control moment is large.
- **Vernier engines**: keep the main engine fixed and steer with several small gimballed engines. The Chinese Long March family and the Soviet and Russian tradition both use this: structurally simple, but it adds several complete propulsion systems.
- **Jet vanes**: refractory vanes reaching into the exhaust. The V-2's approach, costing about 17% of thrust with continuous erosion. Now used only where burn times are very short, such as escape systems.
- **Secondary injection**: injecting liquid or gas into the nozzle to deflect the shock structure. Used on some solid motors.

### Aerodynamic surfaces

- **Fins**: passive stability margin, so the control system does not have to hold attitude on TVC alone. Saturn V's four fins existed for exactly this.
- **Grid fins**: used by Falcon 9 and Super Heavy during entry. A lattice is more efficient than a flat plate at supersonic speed and produces lower hinge moments.

### Reaction control thrusters (RCS)

Small thrusters, usually cold gas or monopropellant, used in vacuum or between burns. Coast-phase attitude and propellant settling both depend on them.

## A trap you have to design around: bending modes

A launch vehicle is a long elastic beam, with fineness ratios of 15–25. It has its own **bending modes** (first bending typically 1–3 Hz). If an attitude sensor is mounted where the structure is flexing, it reads structural vibration as attitude change; the control system gimbals in response and excites the vibration further — **structure-control coupling, which can destroy a vehicle in seconds if mishandled.**

Three standard remedies:

1. Mount the gyros near a **node** of the bending mode, where amplitude is smallest;
2. Put **notch filters** in the control loop to remove content near the bending frequency;
3. Keep control bandwidth well below the first bending frequency.

Ariane 5's maiden flight broke up because the control system received bad data, commanded extreme deflections, and the vehicle failed under aerodynamic load.

## POGO: a different coupling

**POGO oscillation** is self-excited coupling between the structure's longitudinal mode and the propulsion system: the vehicle oscillates lengthwise → feed line pressure fluctuates → thrust fluctuates → the oscillation grows. The name comes from a pogo stick.

Apollo 6 (Saturn V's second uncrewed flight) lost two J-2 engines to POGO; Apollo 13's second stage centre engine shut down early for the same reason. The fix is an **accumulator** on the oxidiser line — a helium-filled cavity that changes the line's acoustic impedance and breaks the feedback loop.

## Guidance: from flying a programme to solving for the optimum in flight

### Open-loop programmed guidance (the V-2 era)

Follow a pre-loaded pitch programme and use an integrating accelerometer to decide when to cut the engine. **No position feedback at all.** The V-2's accuracy was therefore about 17 km CEP.

### Explicit or closed-loop guidance

From the 1960s, rockets began computing the optimal thrust direction from current state to target orbit in flight.

Saturn V's **IGM (iterative guidance mode)** is the classic example: the LVDC computer in the Instrument Unit re-solved for the optimal pitch programme roughly every two seconds, substituting current position, velocity and target orbital elements into an analytical solution derived from the calculus of variations.

That brings one crucial capability: **automatic compensation for deviations.** When Apollo 13's second stage centre engine shut down early, the guidance system automatically extended the burns of the remaining engines and the third stage, and the mission reached its planned orbit. **With open-loop programmed guidance that mission would have failed.**

### Modern: adaptive guidance and online trajectory optimisation

Today's launch vehicles routinely have:

- **Engine-out tolerance**: Falcon 9 can re-plan its trajectory after losing a Merlin (demonstrated on CRS-1);
- **Online trajectory replanning**: on Vulcan's Cert-2 flight a solid booster nozzle detached and the guidance system compensated well enough to complete the mission;
- **Payload-adaptive cutoff**: shutdown is decided by actual remaining propellant rather than a pre-set time.

## Navigation: knowing where you are

### Inertial navigation (INS)

Gyroscopes and accelerometers: integrate acceleration for velocity, integrate again for position. **Completely self-contained, with no external signal** — which matters for military use and jamming resistance.

The price is that **error accumulates with time**. A gyro drift of 0.01°/h sounds negligible, but after ten minutes of flight it is kilometres of position error.

- V-2: two mechanical gyroscopes, no position feedback;
- Saturn V: the ST-124 three-axis stabilised platform with gas-bearing gyros;
- Today: fibre-optic (FOG) or ring laser (RLG) gyros — no moving parts and far more reliable.

### Satellite navigation aiding (GPS / BeiDou / GLONASS)

Modern vehicles use satellite navigation to correct inertial drift, which has improved injection accuracy by an order of magnitude. **When Ariane 5 launched the James Webb Space Telescope, its injection was accurate enough that the propellant saved raised the observatory's design life from 10 years to more than 20.**

### Ground tracking

Early vehicles (the R-7, early Long March) depended on ground radar tracking with uplinked corrections. That constrained launch azimuths and orbit selection, and is why Soyuz-2 could only "roll in flight and fly any azimuth" once it moved to autonomous digital guidance.

## Flight safety and abort

A launch vehicle must be able to terminate itself if it goes out of control:

- **Flight termination system (FTS)**: traditionally explosive cord fired on command from a range safety officer. The modern trend is **autonomous flight termination (AFTS)**, where onboard computers judge against pre-loaded safety boundaries without a ground command. Adopting AFTS across the fleet cut both the staffing and the interval between SpaceX launches significantly.
- **Crew abort**: an escape tower (Long March 2F, Soyuz) or integrated escape engines (Crew Dragon's SuperDraco). The key metric is **time from decision to separation** — a solid escape motor reaches full thrust in about 0.1 s, which no liquid engine can match.
- **Fault detection**: Long March 2F's fault detection system monitors a dozen or so parameters in real time and triggers abort autonomously when it judges the crew at risk. **At that moment, the rocket's own computer has been given authority to overrule the mission.**

## Summary

- Launch vehicles are aerodynamically unstable and require continuous active control, usually by gimballing engines.
- Structure-control coupling (bending modes) and structure-propulsion coupling (POGO) are two failure modes that must be designed around explicitly.
- Guidance evolved from flying a programme to solving for the optimum in flight, and its greatest single gain is **automatic compensation for failures.**
- Inertial navigation is autonomous but drifts; satellite navigation is precise but external. Modern vehicles combine both.
- A crewed vehicle's control system must include the authority to overrule the mission.`,

  examples: [
    { why: "Open-loop guidance and jet vanes: the most primitive form of control, and the starting point for everything after." },
    { why: "IGM iterative guidance let Apollo 13 reach orbit despite an early second-stage engine shutdown." },
    { why: "A fault detection system plus an escape tower: layered abort capability on a crewed vehicle." },
    { why: "Flight 501 is the most cited negative example in control system design." },
    { why: "Demonstrated engine-out tolerance and autonomous flight termination in real operations." },
  ],

  sources: [
    { note: "Standard text on GNC design and load environments." },
    { note: "The original technical report on iterative guidance mode." },
    { note: "The full analysis of how bad control data destroyed the vehicle." },
  ],
};
