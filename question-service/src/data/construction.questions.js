const constructionQuestions = [
  // =====================
  // CORE CONSTRUCTION WORK
  // =====================
  {
    id: "construction_tasks",
    text: "What type of construction work do you usually do?",
    type: "multiselect",
    options: [
      "Site helper work",
      "Material handling",
      "Concrete mixing",
      "Demolition",
      "General labour"
    ],
    allowCustom: true,
    section: "construction",
    showIf: { job_role: "Construction Worker" }
  },

  // =====================
  // EXPERIENCE & SKILL LEVEL
  // =====================
  {
    id: "construction_experience_type",
    text: "What kind of construction sites have you worked on?",
    type: "multiselect",
    options: [
      "Residential buildings",
      "Commercial buildings",
      "Road work",
      "Industrial sites"
    ],
    allowCustom: true,
    section: "construction",
    showIf: { job_role: "Construction Worker" }
  },

  {
    id: "independent_construction",
    text: "Can you handle work independently if required?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "construction",
    showIf: { job_role: "Construction Worker" }
  },

  // =====================
  // SAFETY & PHYSICAL WORK
  // =====================
  {
    id: "physical_work",
    text: "Are you comfortable with physically demanding work?",
    type: "yesno",
    section: "construction",
    showIf: { job_role: "Construction Worker" }
  },

  {
    id: "safety_construction",
    text: "Do you follow safety rules at construction sites?",
    type: "yesno",
    section: "construction",
    showIf: { job_role: "Construction Worker" }
  }
];

module.exports = constructionQuestions;
