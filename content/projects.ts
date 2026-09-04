import type { Project } from "@/types/content";

/**
 * Placeholder projects — entirely fictional. Projects are concrete, funded or
 * collaborative undertakings; they link back to research areas by id.
 */
export const projects: Project[] = [
  {
    id: "collaborative-ml-platform",
    title: "A Collaborative Platform for Reproducible ML Experiments",
    summary:
      "Building an open platform that lets distributed teams run, track and share machine learning experiments reproducibly.",
    description:
      "The project develops a lightweight experiment-tracking and orchestration layer on top of commodity clusters. It targets academic groups that need reproducibility without the operational burden of a full MLOps stack.",
    status: "active",
    startYear: 2025,
    collaborators: ["Northbridge University", "Example Cloud Lab"],
    funding: "Example National Research Council (placeholder)",
    relatedResearchAreas: ["machine-learning-systems"],
  },
  {
    id: "model-compression-kit",
    title: "Model Compression Toolkit for Edge Deployment",
    summary:
      "A library of quantization, pruning and distillation recipes validated on resource-constrained devices.",
    status: "active",
    startYear: 2024,
    collaborators: ["Example Edge Computing Institute"],
    relatedResearchAreas: ["machine-learning-systems"],
  },
  {
    id: "explainable-assistant",
    title: "Explainable Conversational Assistant for Non-Experts",
    summary:
      "Designing and evaluating an assistant that explains its own failures in plain language.",
    status: "active",
    startYear: 2024,
    funding: "Example University Seed Grant (placeholder)",
    relatedResearchAreas: ["human-centered-ai"],
  },
  {
    id: "sim-to-real-mobile-manipulation",
    title: "Sim-to-Real Mobile Manipulation for Service Robots",
    summary:
      "Transferring manipulation policies learned in simulation to real service robots with verification.",
    status: "completed",
    startYear: 2022,
    endYear: 2025,
    collaborators: ["Example Robotics Lab"],
    relatedResearchAreas: ["embodied-intelligence"],
  },
  {
    id: "formal-verification-survey",
    title: "Formal Verification Methods for Learned Components",
    summary:
      "A survey and toolkit comparing formal guarantees available for neural-network-based controllers.",
    status: "upcoming",
    startYear: 2026,
    relatedResearchAreas: ["trustworthy-computing"],
  },
];
