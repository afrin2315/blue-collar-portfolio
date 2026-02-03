const electricianQuestions = [
  // =====================
  // CORE ELECTRICIAN SKILLS (STEP 5)
  // =====================
  {
    id: "electric_work_type",
    text: "What type of electrical work do you do?",
    type: "select",
    options: [
      "House wiring",
      "Commercial wiring",
      "Industrial work",
      "Repair & maintenance"
    ],
    section: "electrician",
    showIf: { job_role: "Electrician" },
    order: 200
  },

  {
    id: "voltage_level",
    text: "Which voltage level are you experienced with?",
    type: "select",
    options: ["Low voltage", "High voltage", "Both"],
    section: "electrician",
    showIf: { job_role: "Electrician" },
    order: 201
  },

  // =====================
  // SAFETY & QUALITY
  // =====================
  {
    id: "safety_knowledge",
    text: "Do you follow electrical safety rules while working?",
    type: "yesno",
    section: "electrician",
    showIf: { job_role: "Electrician" },
    order: 202
  },

  {
    id: "safety_tools",
    text: "Do you use safety equipment like gloves and testers?",
    type: "yesno",
    section: "electrician",
    showIf: { job_role: "Electrician" },
    order: 203
  },

  // =====================
  // EXPERIENCE & RESPONSIBILITY
  // =====================
  {
    id: "emergency_handling",
    text: "Have you handled electrical emergency situations before?",
    type: "yesno",
    section: "electrician",
    showIf: { job_role: "Electrician" },
    order: 204
  },

  // =====================
  // TOOLS (ELECTRICIAN-SPECIFIC)
  // =====================
  {
    id: "electric_tools",
    text: "Which electrical tools do you have?",
    type: "multiselect",
    options: [
      "Tester",
      "Multimeter",
      "Drill machine",
      "Wire cutter",
      "Insulation tape"
    ],
    section: "electrician",
    showIf: { job_role: "Electrician" },
    order: 205
  }
];

module.exports = electricianQuestions;
