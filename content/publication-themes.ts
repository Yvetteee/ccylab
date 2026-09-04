import type { PublicationTheme } from "@/types/content";

/**
 * Legacy publication themes — the thematic grouping used on the legacy Ye
 * Group site (https://www.ccylab.com/publications.html). The Publications
 * page renders one section per theme (in this order); within each theme,
 * publications appear in the order given. Years remain attached to each
 * individual citation — year is no longer the primary hierarchy.
 *
 * Mapping + per-item evidence: docs/legacy-content-integration/PUBLICATION-MAPPING.md.
 */
export const publicationThemes: PublicationTheme[] = [
  {
    id: "theme-1a",
    code: "1A",
    title: "Flow Battery Energy Storage",
    descriptor:
      "Ion-selective membranes for aqueous organic redox flow batteries — ion transport, crossover control and long-life energy storage.",
    publicationIds: [
      "pub-2023-nature-triazine",
      "pub-2022-natcom-sulfonated",
      "pub-2022-angew-amidoxime",
      "pub-2024-acsnano-micropore",
      "pub-2023-advsci-tfc",
      "pub-2023-advmat-microporous",
      "pub-2025-joule-speek",
      "pub-2020-natmat-hydrophilic",
    ],
  },
  {
    id: "theme-1b",
    code: "1B",
    title: "Other Energy Conversion & Storage Technologies",
    descriptor:
      "Beyond flow batteries — current collectors for lithium-ion batteries and supercapacitors, dendrite-free zinc metal batteries, and redox-active polymers of intrinsic microporosity.",
    publicationIds: [
      "pub-2024-carbon-energy",
      "pub-2024-angew-zinc",
      "pub-2022-jacs-redox-pim",
    ],
  },
  {
    id: "theme-2a",
    code: "2A",
    title: "Membrane Processes for Liquid Separation",
    descriptor:
      "Nanofiltration and related liquid-separation membranes — heavy-metal removal, dye desalination, molecular nanofiltration and dehydration.",
    publicationIds: [
      "pub-2025-advmat-li-recycling",
      "pub-2019-cej-heavy-metal",
      "pub-2019-cej-dye-desal",
      "pub-2024-adfm-thin-film",
      "pub-2018-progchem-nf",
      "pub-2017-jms-zwitterionic",
      "pub-2016-jms-polyvinylsulfonate",
    ],
  },
  {
    id: "theme-2b",
    code: "2B",
    title: "Nanomaterials Engineering for Membrane Processes",
    descriptor:
      "Graphene oxide, carbon nanotubes and polyelectrolyte complex nanoparticles engineered into high-performance membranes.",
    publicationIds: [
      "pub-2019-jms-go-polyelectrolyte",
      "pub-2017-matdes-cnt-go",
      "pub-2016-acsami-nanocomposite",
    ],
  },
  {
    id: "theme-3a",
    code: "3A",
    title: "Membrane Material Design & Synthesis",
    descriptor:
      "Designing and synthesising new membrane materials — triptycene-like scaffolds, anthraquinone-derived monomers and mixed matrix membranes.",
    publicationIds: [
      "pub-2024-polymchem-cf3tms",
      "pub-2024-chemsci-triptycene",
      "pub-2021-arkivoc-mmm",
    ],
  },
];
