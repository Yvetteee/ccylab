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
  {
    id: "chunlin-zhai",
    name: "Chunlin Zhai",
    nameZh: "翟春霖",
    role: "PhD student",
    category: "phd",
    photo: "/images/people/chunlin-zhai.jpg",
    researchInterests: [
      "Polymers of Intrinsic Microporosity (PIMs)",
      "Functional microporous polymers",
      "Polymer membranes and molecular separation",
      "Structure–property relationships in porous materials",
    ],
    email: "CZHAI001@E.NTU.EDU.SG",
    orcid: "0009-0007-2246-8519",
    bio: "CHUNLIN ZHAI received his master's degree from Tongji University, where he worked on the design and development of efficient nanofiltration membranes for water treatment in Prof. Shengji Xia's group. His current research interests include functional polymers of intrinsic microporosity (PIMs) as membrane materials for efficient separation. Outside of research, he enjoys working out, playing badminton, swimming, and hiking.",
    active: true,
  },
  {
    id: "yongbin-cho",
    name: "Yongbin Cho",
    nameZh: "조용빈",
    nameLang: "ko",
    role: "PhD Student",
    category: "phd",
    photo: "/images/people/yongbin-cho.png",
    researchInterests: [
      "Polymer of Intrinsic Microporosity (PIM) membranes",
      "Membranes for electrochemical energy storage and conversion",
      "Ion-selective membranes and redox flow batteries",
      "Scalable membrane fabrication and thin-film composite membranes",
    ],
    bio: "Yongbin Cho is a PhD student at Nanyang Technological University working on advanced polymer membranes for electrochemical energy storage and conversion. He previously worked as a Research Intern in Professor Andrew Livingston's group at Queen Mary University of London, where he investigated PEEK membranes for plastic and solvent recovery, including membrane fabrication, characterisation and roll-to-roll scale-up. During his MEng in Chemical Engineering at Imperial College London, he completed a membrane separation project on two-stage hollow-fibre nitrogen enrichment and a research internship at Yonsei University's Digital Twin Battery Laboratory under Professor Yong Min Lee, where he investigated ceramic-coated separators for lithium-ion batteries. Outside of research, he enjoys playing football, listening to music, and watching movies.",
    active: true,
  },
  {
    id: "wenchang-wang",
    name: "Wenchang Wang",
    nameZh: "王文昌",
    role: "PhD",
    category: "phd",
    photo: "/images/people/wenchang-wang.jpg",
    researchInterests: [
      "PIMs design and fabrication",
      "MOFs synthesis",
      "Radionuclide removal",
    ],
    email: "WANG2518@e.ntu.edu.sg",
    orcid: "https://orcid.org/0009-0006-8474-8770",
    bio: "Wenchang obtained his bachelor's and master's degrees in the College of Chemical and Biological Engineering at Zhejiang University, where he worked on the design of metal–organic frameworks (MOFs) and their application in radionuclide removal under the supervision of Prof. Chengliang Xiao. His research then focused on the design of polymers of intrinsic microporosity (PIMs) and their exploratory applications in Prof. Chunchun Ye's group. In his leisure time, he enjoys basketball, orienteering, and playing guitar in a band.",
    active: true,
  },
  {
    id: "qian-xu",
    name: "Qian Xu",
    nameZh: "徐谦",
    role: "Research Student",
    category: "visiting",
    photo: "/images/people/qian-xu.jpg",
    researchInterests: ["porous materials", "selective crystallization", "lithium extraction"],
    bio: "Qian received her bachelor's degree in Environmental Engineering from Tsinghua University in 2024 and continued her studies toward a Master's degree in Prof. Xi Chen's group, where she focused on selective lithium extraction from spent battery leachate. She joined Prof. Chunchun Ye's group as an exchange student to broaden her academic perspective and gain international research experience. Outside of research, she enjoys both appreciating and creating music, literature and art. Visiting period: July – October 2026. Research topic: Ion Sieving in Polymers of Intrinsic Microporosity for Selective Lithium Extraction.",
    active: true,
  },
  {
    id: "rini-lora-love",
    name: "Rini Lora Love",
    role: "Undergraduate Visiting Student from Columbia University (Global Career Fellowship programme)",
    category: "alumni",
    active: false,
  },
];
