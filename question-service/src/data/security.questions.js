const securityGuardQuestions = [
  // =====================
  // CORE SECURITY WORK
  // =====================
  {
    id: "security_duty_type",
    text: "What type of security duty have you done?",
    type: "multiselect",
    options: [
      "Building security",
      "Office security",
      "Residential security",
      "Factory security",
      "Gate duty"
    ],
    allowCustom: true,
    section: "security",
    showIf: { job_role: "Security Guard" }
  },

  // =====================
  // SHIFT & DISCIPLINE
  // =====================
  {
    id: "security_shift",
    text: "Which shifts are you comfortable working?",
    type: "select",
    options: ["Day shift", "Night shift", "Both"],
    section: "security",
    showIf: { job_role: "Security Guard" }
  },

  {
    id: "uniform_required",
    text: "Are you comfortable wearing uniform and following duty rules?",
    type: "yesno",
    section: "security",
    showIf: { job_role: "Security Guard" }
  },

  // =====================
  // EXPERIENCE & RESPONSIBILITY
  // =====================
  {
    id: "emergency_security",
    text: "Have you handled emergency situations before?",
    type: "yesno",
    section: "security",
    showIf: { job_role: "Security Guard" }
  },

  {
    id: "independent_security",
    text: "Can you handle security duty independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "security",
    showIf: { job_role: "Security Guard" }
  }
];

module.exports = securityGuardQuestions;
