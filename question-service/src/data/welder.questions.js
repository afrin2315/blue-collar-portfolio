const welderQuestions = [
  // =====================
  // CORE WELDING WORK
  // =====================
  {
    id: "welding_type",
    text: "What type of welding work do you do?",
    type: "multiselect",
    options: [
      "Arc welding",
      "Gas welding",
      "MIG welding",
      "TIG welding",
      "Fabrication work"
    ],
    allowCustom: true,
    section: "welder",
    showIf: { job_role: "Welder" }
  },

  // =====================
  // MATERIAL KNOWLEDGE
  // =====================
  {
    id: "metal_materials",
    text: "Which materials have you welded before?",
    type: "multiselect",
    options: [
      "Iron",
      "Steel",
      "Stainless steel",
      "Aluminium"
    ],
    allowCustom: true,
    section: "welder",
    showIf: { job_role: "Welder" }
  },

  // =====================
  // EXPERIENCE & SAFETY
  // =====================
  {
    id: "independent_welder",
    text: "Can you handle welding work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "welder",
    showIf: { job_role: "Welder" }
  },

  {
    id: "safety_welder",
    text: "Do you follow safety measures like gloves, mask, and goggles?",
    type: "yesno",
    section: "welder",
    showIf: { job_role: "Welder" }
  },

  // =====================
  // TOOLS & MACHINES
  // =====================
  {
    id: "welder_tools",
    text: "Which welding tools or machines do you have?",
    type: "multiselect",
    options: [
      "Welding machine",
      "Gas cutter",
      "Protective mask",
      "Gloves",
      "Grinding machine"
    ],
    allowCustom: true,
    section: "welder",
    showIf: { job_role: "Welder" }
  }
];

module.exports = welderQuestions;
