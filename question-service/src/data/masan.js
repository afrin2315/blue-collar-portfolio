const masonQuestions = [
  // =====================
  // CORE MASON WORK
  // =====================
  {
    id: "mason_work_type",
    text: "What type of brick or cement work do you do?",
    type: "multiselect",
    options: [
      "Brick wall construction",
      "Cement plastering",
      "Tile fixing",
      "Concrete work",
      "Foundation work"
    ],
    allowCustom: true,
    section: "mason",
    showIf: { job_role: "Mason (Brick/Cement work)" }
  },

  // =====================
  // EXPERIENCE LEVEL
  // =====================
  {
    id: "mason_experience",
    text: "How experienced are you in masonry work?",
    type: "select",
    options: ["Basic", "Intermediate", "Expert"],
    section: "mason",
    showIf: { job_role: "Mason (Brick/Cement work)" }
  },

  // =====================
  // INDEPENDENCE & QUALITY
  // =====================
  {
    id: "independent_mason",
    text: "Can you complete brick or cement work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "mason",
    showIf: { job_role: "Mason (Brick/Cement work)" }
  },

  {
    id: "measurement_mason",
    text: "Are you comfortable taking measurements and following drawings?",
    type: "yesno",
    section: "mason",
    showIf: { job_role: "Mason (Brick/Cement work)" }
  },

  // =====================
  // TOOLS
  // =====================
  {
    id: "mason_tools",
    text: "Which tools do you have for masonry work?",
    type: "multiselect",
    options: [
      "Trowel",
      "Level tool",
      "Measuring tape",
      "Hammer",
      "Plumb bob"
    ],
    allowCustom: true,
    section: "mason",
    showIf: { job_role: "Mason (Brick/Cement work)" }
  }
];

module.exports = masonQuestions;
