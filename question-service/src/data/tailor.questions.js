const tailorQuestions = [
  // =====================
  // CORE TAILORING SKILLS
  // =====================
  {
    id: "tailoring_type",
    text: "What type of tailoring work do you do?",
    type: "select",
    options: [
      "Men's clothing",
      "Women's clothing",
      "Children's clothing",
      "All types"
    ],
    section: "tailor",
    showIf: { job_role: "Tailor" }
  },

  {
    id: "stitching_work",
    text: "What kind of stitching work are you experienced in?",
    type: "multiselect",
    options: [
      "Blouse stitching",
      "Pant & shirt stitching",
      "Alterations",
      "Designer wear"
    ],
    section: "tailor",
    showIf: { job_role: "Tailor" }
  },

  // =====================
  // MACHINES & METHODS
  // =====================
  {
    id: "machine_type",
    text: "Which sewing machines do you use?",
    type: "multiselect",
    options: [
      "Manual machine",
      "Electric machine",
      "Overlock machine",
      "Embroidery machine"
    ],
    section: "tailor",
    showIf: { job_role: "Tailor" }
  },

  // =====================
  // EXPERIENCE & QUALITY
  // =====================
  {
    id: "measurement_skill",
    text: "Are you comfortable taking customer measurements independently?",
    type: "yesno",
    section: "tailor",
    showIf: { job_role: "Tailor" }
  },

  {
    id: "independent_work_tailor",
    text: "Can you complete tailoring work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "tailor",
    showIf: { job_role: "Tailor" }
  },

  // =====================
  // TOOLS (TAILOR-SPECIFIC)
  // =====================
  {
    id: "tailor_tools",
    text: "Which tailoring tools do you have?",
    type: "multiselect",
    options: [
      "Measuring tape",
      "Scissors",
      "Chalk",
      "Needles",
      "Threads"
    ],
    section: "tailor",
    showIf: { job_role: "Tailor" }
  }
];

module.exports = tailorQuestions;
