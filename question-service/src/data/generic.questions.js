const genericQuestions = [
  // =====================
  // SKILLS & TOOLS (For Helper / Other jobs)
  // Note: Work description and daily tasks are already in common.questions.js
  // =====================
  {
    id: "skills_free",
    text: "What skills do you think you are good at?",
    type: "textarea",
    allowCustom: true,
    section: "generic",
    order: 200
  },

  {
    id: "tools_equipment_free",
    text: "What tools, machines, or equipment do you use in your work?",
    type: "textarea",
    allowCustom: true,
    section: "generic",
    order: 201
  },

  {
    id: "typical_workday",
    text: "Describe a typical day at your work.",
    type: "textarea",
    allowCustom: true,
    section: "generic",
    order: 202
  }
];

module.exports = genericQuestions;
