const painterQuestions = [
  // =====================
  // CORE PAINTING WORK (STEP 5 - Occupation-specific)
  // =====================
  {
    id: "painting_work_type",
    text: "What type of painting work do you do?",
    type: "multiselect",
    options: [
      "Interior painting",
      "Exterior painting",
      "Putty work",
      "Polish & texture work",
      "Waterproof coating"
    ],
    allowCustom: true,
    section: "painter",
    showIf: { job_role: "Painter" },
    order: 200
  },

  // =====================
  // SURFACE KNOWLEDGE
  // =====================
  {
    id: "surface_types",
    text: "Which surfaces have you painted before?",
    type: "multiselect",
    options: [
      "Walls",
      "Ceilings",
      "Wood surfaces",
      "Metal surfaces"
    ],
    allowCustom: true,
    section: "painter",
    showIf: { job_role: "Painter" },
    order: 201
  },

  // =====================
  // EXPERIENCE & SAFETY
  // =====================
  {
    id: "independent_painter",
    text: "Can you handle painting work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "painter",
    showIf: { job_role: "Painter" },
    order: 202
  },

  {
    id: "safety_painter",
    text: "Do you follow safety measures like masks and gloves?",
    type: "yesno",
    section: "painter",
    showIf: { job_role: "Painter" },
    order: 203
  },

  // =====================
  // TOOLS
  // =====================
  {
    id: "painter_tools",
    text: "Which painting tools do you have?",
    type: "multiselect",
    options: [
      "Brushes",
      "Rollers",
      "Spray machine",
      "Scraper",
      "Putty knife"
    ],
    allowCustom: true,
    section: "painter",
    showIf: { job_role: "Painter" },
    order: 204
  }
];

module.exports = painterQuestions;
