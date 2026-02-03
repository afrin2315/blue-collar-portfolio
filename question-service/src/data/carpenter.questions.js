const carpenterQuestions = [
  // =====================
  // CORE CARPENTRY WORK (STEP 5)
  // =====================
  {
    id: "carpentry_work_type",
    text: "What type of carpentry work do you do?",
    type: "multiselect",
    options: [
      "Furniture making",
      "Door & window fitting",
      "Modular kitchen work",
      "Repair & maintenance",
      "Polishing & finishing"
    ],
    allowCustom: true,
    section: "carpenter",
    showIf: { job_role: "Carpenter" },
    order: 200
  },

  // =====================
  // MATERIAL KNOWLEDGE
  // =====================
  {
    id: "wood_materials",
    text: "Which materials have you worked with?",
    type: "multiselect",
    options: [
      "Plywood",
      "Solid wood",
      "MDF",
      "Sunmica / laminate"
    ],
    allowCustom: true,
    section: "carpenter",
    showIf: { job_role: "Carpenter" },
    order: 201
  },

  // =====================
  // EXPERIENCE & INDEPENDENCE
  // =====================
  {
    id: "independent_carpenter",
    text: "Can you complete carpentry work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "carpenter",
    showIf: { job_role: "Carpenter" },
    order: 202
  },

  {
    id: "measurement_carpenter",
    text: "Are you comfortable taking measurements and reading drawings?",
    type: "yesno",
    section: "carpenter",
    showIf: { job_role: "Carpenter" }
  },

  // =====================
  // TOOLS
  // =====================
  {
    id: "carpenter_tools",
    text: "Which carpentry tools do you have?",
    type: "multiselect",
    options: [
      "Hand saw",
      "Electric drill",
      "Planer",
      "Measuring tape",
      "Chisel"
    ],
    allowCustom: true,
    section: "carpenter",
    showIf: { job_role: "Carpenter" }
  }
];

module.exports = carpenterQuestions;
