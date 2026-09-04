import type { ResearchArea } from "@/types/content";

/**
 * Real Ye Group research — restored from the legacy site
 * (https://www.ccylab.com/research.html), which is the authoritative
 * scientific narrative. The three directions tell one continuous story:
 *
 *   MATERIAL  →  MEMBRANE  →  APPLICATION
 *
 * Shared by the Research page (full narrative) and the Home research
 * overview (concise excerpts derived from the same source).
 *
 * Each area: `description` is the intro paragraph; `points` carry the
 * detailed content as bold-label + explanatory-line items, mirroring the
 * legacy research.html hierarchy (intro → individual points).
 */

/** Research page / Home overview intro line (legacy research.html). */
export const researchIntro =
  "We design porous materials and develop membrane technologies to tackle pressing challenges in energy and the environment.";

/** Research overview banner (legacy researchmain.jpeg). */
export const researchOverviewImage = "/images/legacy/researchmain.jpeg";

export const researchAreas: ResearchArea[] = [
  {
    id: "designing-porous-materials",
    title: "Designing Porous Materials",
    shortDescription:
      "Function-guided design and synthesis of porous materials with just the right features for specific tasks.",
    description:
      "We start with a question: What should this material do? Guided by function, we design and synthesise porous materials with just the right features for specific tasks.",
    points: [
      {
        label: "Building-block design",
        text: "Design and synthesise building blocks with concavities that, when combined, create large, interconnected free volumes in the solid state.",
      },
      {
        label: "Functional-group introduction",
        text: "Introduce functional groups to confer specific properties. For example, incorporating ion-conducting groups such as –SO₃⁻ or –COO⁻ enables efficient ion transport.",
      },
    ],
    image: "/images/legacy/research3.jpeg",
    keywords: [
      "function-guided material design",
      "building blocks with concavities",
      "interconnected free volume",
      "functional-group introduction",
      "ion-conducting groups",
    ],
  },
  {
    id: "building-better-membranes",
    title: "Building Better Membranes",
    shortDescription:
      "Developing membranes at all scales, shaping pore channels and fabrication routes for efficient, selective transport.",
    description:
      "The structure of the materials shapes membrane performance. We develop membranes at all scales and explore how structural features influence membrane properties and behaviour.",
    points: [
      {
        label: "Pore-channel engineering",
        text: "Design pore channels so that molecules can move through them efficiently and selectively — by adjusting their shape, rigidity, length and chemistry, and by adding functional groups or gradients.",
      },
      {
        label: "Membrane forms",
        text: "Make membranes in different forms — such as strong self-standing films or thin layers coated onto a support, shaped as hollow fibres or flat sheets depending on the needs of the separation process.",
      },
      {
        label: "Fabrication routes",
        text: "Use a range of fabrication methods suited to the material — from solution casting and spin coating, to scalable roll-to-roll processing, phase inversion and interfacial polymerisation, as well as newer approaches like electrospinning, dip-coating and even 3D printing.",
      },
    ],
    image: "/images/legacy/research2.jpeg",
    keywords: [
      "pore-channel engineering",
      "functional groups and gradients",
      "self-standing films and supported layers",
      "hollow fibres and flat sheets",
      "scalable fabrication methods",
    ],
  },
  {
    id: "solving-real-world-problems",
    title: "Solving Real-World Problems",
    shortDescription:
      "Engineering membranes for clean energy and environmental challenges — from storage and capture to purification and recovery.",
    description:
      "We engineer membranes for real-world use. Our goal is to deliver sustainable solutions for clean energy and environmental challenges using these smart materials.",
    points: [
      {
        label: "Energy storage & conversion",
        text: "Batteries, electrolysers and fuel cells store renewable energy and produce clean fuels, reducing dependence on fossil fuels.",
      },
      {
        label: "Carbon capture",
        text: "Capturing carbon dioxide helps fight climate change by cutting emissions from power plants and industries.",
      },
      {
        label: "Oil refining & petrochemicals",
        text: "More efficient separations reduce energy use and emissions in essential chemical industries.",
      },
      {
        label: "Pharmaceutical purification",
        text: "Precise separations ensure safe medicines while lowering waste and costs in drug production.",
      },
      {
        label: "Resource enrichment",
        text: "For example, uranium enrichment supports nuclear power, a reliable source of low-carbon energy.",
      },
      {
        label: "Resource recovery",
        text: "For example, lithium recovery addresses the growing demand for batteries in electric vehicles and large-scale energy storage.",
      },
    ],
    image: "/images/legacy/research1.jpeg",
    keywords: [
      "energy storage and conversion",
      "carbon capture",
      "oil refining and petrochemicals",
      "pharmaceutical purification",
      "resource enrichment and recovery",
    ],
  },
];
