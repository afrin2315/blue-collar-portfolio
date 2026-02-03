const plumberQuestions = [
  // =====================
  // CORE PLUMBING SKILLS (STEP 5)
  // =====================
  {
    id: "plumbing_work_type",
    text: "What type of plumbing work do you do?",
    type: "select",
    options: [
      "Pipe installation",
      "Leak fixing",
      "Bathroom fitting",
      "Water tank & pump work"
    ],
    section: "plumber",
    showIf: { job_role: "Plumber" },
    order: 200
  },

  {
    id: "pipe_material",
    text: "Which types of pipes have you worked with?",
    type: "multiselect",
    options: ["PVC", "CPVC", "GI", "Copper"],
    section: "plumber",
    showIf: { job_role: "Plumber" },
    order: 201
  },

  // =====================
  // EXPERIENCE & QUALITY
  // =====================
  {
    id: "independent_work_plumber",
    text: "Can you handle plumbing work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "plumber",
    showIf: { job_role: "Plumber" },
    order: 202
  },

  {
    id: "emergency_plumbing",
    text: "Have you handled plumbing emergency situations before?",
    type: "yesno",
    section: "plumber",
    showIf: { job_role: "Plumber" },
    order: 203
  },

  // =====================
  // TOOLS (PLUMBER-SPECIFIC)
  // =====================
  {
    id: "plumber_tools",
    text: "Which plumbing tools do you have?",
    type: "multiselect",
    options: [
      "Pipe wrench",
      "Adjustable spanner",
      "Teflon tape",
      "Pipe cutter",
      "Drilling machine"
    ],
    section: "plumber",
    showIf: { job_role: "Plumber" }
  }
];

module.exports = plumberQuestions;
