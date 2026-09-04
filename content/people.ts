import type { Person } from "@/types/content";
import { piPerson } from "./pi";

/**
 * People data — real lab members (source: Ye Group site, verified 2026-09-02).
 * Keep the shape identical; the People page groups by `category` and renders a
 * section only when members exist. Portraits are the real legacy photographs
 * migrated byte-for-byte from the ccylab source (public/images/legacy/).
 * The PI entry is the shared piPerson record (content/pi.ts) so /people and
 * /dr-ye render from one source.
 */
export const people: Person[] = [
  piPerson,
  {
    id: "kaiping-zhu",
    name: "Kaiping Zhu",
    nameZh: "朱开平",
    role: "Research Fellow",
    category: "postdoc",
    photo: "/images/legacy/kaiping-zhu.png",
    researchInterests: ["PIM-based Membranes", "Redox Flow Batteries"],
    email: "kaiping.zhu@ntu.edu.sg",
    bio: "Kaiping Zhu received his Master's degree from Soochow University, where he conducted research on electrochemical and photoelectrochemical energy conversion under the supervision of Prof. Mark H. Rümmeli and Prof. Guifu Zou. He later obtained his PhD in Materials Science and Engineering from Nanjing University under the supervision of Prof. Yagang Yao, focusing on electrochemical energy storage systems. His current research interests center on PIM-based membranes for redox flow batteries and related coupled systems. In his leisure time, he enjoys playing basketball and table tennis, as well as travelling and exercising.",
    order: 1,
    active: true,
  },
  {
    id: "kim-jiayi-wu",
    name: "Kim Jiayi Wu",
    nameZh: "吴佳仪",
    role: "Research Associate",
    category: "assistant",
    photo: "/images/legacy/jiayi-wu.png",
    researchInterests: ["PIM Synthesis", "Structure–Property Relationships in Membranes"],
    email: "jiayi.wu@ntu.edu.sg",
    bio: "Kim obtained her integrated Master's degree in Chemistry from The University of Edinburgh in 2022, where she worked on the synthesis of novel polymers of intrinsic microporosity (PIMs) in Prof. Neil B. McKeown's group for her final year research project. After that, she continued her PhD studies in the McKeown group under an EPSRC-funded programme (SynHiSel). Her research interests include the synthesis and structure–property relationships of PIMs in membrane applications. In her leisure time, she enjoys photography, travelling, hiking, exercising, cooking, and music.",
    order: 1,
    active: true,
  },
  {
    id: "christine-sunho-on",
    name: "Christine Sunho On",
    nameZh: "온선호",
    nameLang: "ko",
    role: "PhD Student",
    category: "phd",
    photo: "/images/legacy/christine.png",
    researchInterests: ["Porous Materials", "Sustainable Energy Systems"],
    email: "SUNHO001@e.ntu.edu.sg",
    bio: "Christine received her bachelor's degree in Chemistry & Nanoscience from Ewha Womans University in 2025. During her undergraduate studies, she worked on the synthesis of metal-organic frameworks (MOFs) as porous materials for gas storage. She later conducted research on porous polymers for ion-exchange membrane applications during a study-abroad semester at the University of Edinburgh in Prof. Neil B. McKeown's group. Her research interests include porous materials and functional design for sustainable energy system applications. Outside of research, she enjoys baking, exploring coffee shops, seeing live performances, and traveling.",
    order: 1,
    active: true,
  },
];
