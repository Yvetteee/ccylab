import type { Opportunity } from "@/types/content";

/**
 * Recruitment content for the Join Us page. Structured so hiring details can
 * change without touching JSX — edit this file only.
 *
 * VERIFY BEFORE PRODUCTION LAUNCH:
 * Current NTU/CEE admissions requirements (TOEFL/IELTS thresholds, GRE,
 * application periods, scholarship eligibility) are programme-policy values
 * and can change year to year.
 */
export const phdOpportunity: Opportunity = {
  id: "phd",
  title: "PhD Opportunities",
  introduction:
    "We welcome applications from highly motivated students with backgrounds in chemistry, materials science, chemical engineering and related disciplines.",
  rows: [
    {
      sections: [
        {
          heading: "Qualifications",
          type: "list",
          items: [
            "A strong Bachelor's (Honours) degree in Chemistry, Materials Science, Chemical Engineering, or a related field",
            "Proficiency in written and spoken English",
            "Valid English test scores (non-native speakers): TOEFL 600 (paper) / 100 (iBT); IELTS 6.5 (Academic)",
            "GRE (within 5 years): Verbal + Quantitative ≥ 319 and Analytical Writing ≥ 3.5",
          ],
        },
        {
          heading: "Application Period",
          type: "intakes",
          intro: "Two intakes each year",
          items: [
            { label: "August Intake", period: "1 October – 31 January" },
            { label: "January Intake", period: "1 June – 31 July" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          heading: "Research Scholarships",
          type: "scholarships",
          groups: [
            {
              label: "Singapore Citizens & Permanent Residents",
              items: [
                "Nanyang President's Graduate Scholarship",
                "NTU Research Scholarship",
              ],
            },
            {
              label: "International Applicants",
              items: [
                "Nanyang President's Graduate Scholarship",
                "NTU Research Scholarship",
                "Singapore International Graduate Award (SINGA)",
              ],
            },
          ],
          note: "Applicants with strong backgrounds and/or relevant publications are encouraged to apply. Competitive full scholarships are available for outstanding candidates.",
        },
      ],
    },
    {
      sections: [
        {
          heading: "How to Apply",
          type: "apply",
          intro: "Please submit the following documents as a single PDF:",
          documents: [
            "Cover letter describing research interests and career plans",
            "CV with full academic record and publications",
            "Names and contact information of 2–3 referees",
          ],
          applyUrl: "/apply/phd",
          email: "chunchun.ye@ntu.edu.sg",
          subject: "University + Major + Name + PhD",
          emailNote:
            "If you are unable to use the online form, you may submit your application by email.",
        },
      ],
    },
  ],
};

export const postdocOpportunity: Opportunity = {
  id: "postdoc",
  title: "Postdoctoral Research Fellow",
  introduction:
    "We welcome applications from motivated postdoctoral researchers to join the group and lead new work on materials and membranes for electrochemical and separation applications.",
  rows: [
    {
      layout: "columns",
      sections: [
        {
          heading: "Key Responsibilities",
          type: "list",
          items: [
            "Conduct independent research on materials design and membranes for electrochemical or separation applications",
            "Develop and optimise experimental methods and apparatus",
            "Publish in high-impact journals and present at international conferences",
            "Collaborate with academic and industrial partners worldwide",
            "Assist in supervising undergraduate and postgraduate students",
            "Contribute to the preparation of research proposals",
          ],
        },
        {
          heading: "Qualifications",
          type: "list",
          items: [
            "PhD in Chemistry, Materials Science, Chemical Engineering, or a closely related field",
            "Strong background in one or more of: porous materials (e.g., PIMs, HCPs), membrane technologies, electrochemical energy systems (e.g., flow batteries), separation/purification processes",
            "Demonstrated research excellence (publications or a successful PhD)",
            "Proficiency in written and spoken English",
          ],
        },
      ],
    },
    {
      sections: [
        {
          heading: "How to Apply",
          type: "apply",
          intro: "Please send the following documents as a single PDF:",
          documents: [
            "Cover letter outlining research interests and career plans",
            "Full CV (complete publications; include selected representative works)",
            "Names and contact details of 2–3 referees",
          ],
          applyUrl: "/apply/postdoc",
          email: "chunchun.ye@ntu.edu.sg",
          subject: "University + Major + Name + Postdoc",
          emailNote:
            "If you are unable to use the online form, you may submit your application by email.",
        },
      ],
    },
  ],
};

export const opportunities: Opportunity[] = [
  phdOpportunity,
  postdocOpportunity,
];
