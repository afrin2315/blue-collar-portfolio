const factoryWorkerQuestions = [
  // =====================
  // CORE FACTORY WORK
  // =====================
  {
    id: "factory_work_type",
    text: "What type of factory work do you do?",
    type: "multiselect",
    options: [
      "Machine operation",
      "Assembly line work",
      "Packaging",
      "Quality checking",
      "Loading & unloading"
    ],
    allowCustom: true,
    section: "factory",
    showIf: { job_role: "Factory Worker" }
  },

  // =====================
  // MACHINES & SKILLS
  // =====================
  {
    id: "machine_experience",
    text: "Have you worked with machines before?",
    type: "yesno",
    section: "factory",
    showIf: { job_role: "Factory Worker" }
  },

  {
    id: "machine_types",
    text: "Which machines or equipment have you used?",
    type: "textarea",
    allowCustom: true,
    section: "factory",
    showIf: { job_role: "Factory Worker" }
  },

  // =====================
  // SHIFT & DISCIPLINE
  // =====================
  {
    id: "factory_shift",
    text: "Which shifts are you comfortable working?",
    type: "select",
    options: ["Day shift", "Night shift", "Rotational shifts"],
    section: "factory",
    showIf: { job_role: "Factory Worker" }
  },

  {
    id: "factory_safety",
    text: "Do you follow safety rules inside the factory?",
    type: "yesno",
    section: "factory",
    showIf: { job_role: "Factory Worker" }
  }
];

module.exports = factoryWorkerQuestions;
