const acTechnicianQuestions = [
  // =====================
  // CORE AC / FRIDGE WORK
  // =====================
  {
    id: "ac_work_type",
    text: "What type of AC or refrigerator work do you do?",
    type: "multiselect",
    options: [
      "AC installation",
      "AC servicing",
      "Gas charging",
      "AC repair",
      "Refrigerator repair"
    ],
    allowCustom: true,
    section: "ac",
    showIf: { job_role: "AC Technician" }
  },

  // =====================
  // EXPERIENCE & SKILL
  // =====================
  {
    id: "ac_experience_level",
    text: "How experienced are you in AC / fridge work?",
    type: "select",
    options: ["Basic", "Intermediate", "Expert"],
    section: "ac",
    showIf: { job_role: "AC Technician" }
  },

  {
    id: "independent_ac",
    text: "Can you handle AC or fridge work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "ac",
    showIf: { job_role: "AC Technician" }
  },

  // =====================
  // SAFETY & TOOLS
  // =====================
  {
    id: "safety_ac",
    text: "Do you follow safety rules while handling electrical and gas work?",
    type: "yesno",
    section: "ac",
    showIf: { job_role: "AC Technician" }
  },

  {
    id: "ac_tools",
    text: "Which tools or equipment do you have for AC / fridge work?",
    type: "multiselect",
    options: [
      "Vacuum pump",
      "Gas cylinder",
      "Pressure gauge",
      "Spanner set",
      "Multimeter"
    ],
    allowCustom: true,
    section: "ac",
    showIf: { job_role: "AC Technician" }
  }
];

module.exports = acTechnicianQuestions;
