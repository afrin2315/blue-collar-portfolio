const housekeepingQuestions = [
  // =====================
  // CORE HOUSEKEEPING WORK
  // =====================
  {
    id: "cleaning_area",
    text: "What type of places do you usually clean?",
    type: "multiselect",
    options: [
      "Homes",
      "Offices",
      "Hospitals",
      "Hotels",
      "Factories"
    ],
    allowCustom: true,
    section: "housekeeping",
    showIf: { job_role: "Housekeeping" }
  },

  // =====================
  // TASK DETAILS
  // =====================
  {
    id: "cleaning_tasks",
    text: "What cleaning tasks are you comfortable doing?",
    type: "multiselect",
    options: [
      "Sweeping & mopping",
      "Bathroom cleaning",
      "Dusting",
      "Waste disposal",
      "Deep cleaning"
    ],
    allowCustom: true,
    section: "housekeeping",
    showIf: { job_role: "Housekeeping" }
  },

  // =====================
  // EXPERIENCE & SHIFT
  // =====================
  {
    id: "independent_housekeeping",
    text: "Can you handle housekeeping work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "housekeeping",
    showIf: { job_role: "Housekeeping" }
  },

  {
    id: "shift_housekeeping",
    text: "Which shifts are you comfortable working?",
    type: "select",
    options: ["Day shift", "Night shift", "Both"],
    section: "housekeeping",
    showIf: { job_role: "Housekeeping" }
  },

  // =====================
  // TOOLS & SAFETY
  // =====================
  {
    id: "housekeeping_tools",
    text: "Do you have your own cleaning tools?",
    type: "select",
    options: ["Yes - Full", "Yes - Partial", "No"],
    section: "housekeeping",
    showIf: { job_role: "Housekeeping" }
  },

  {
    id: "safety_housekeeping",
    text: "Do you follow safety and hygiene practices while working?",
    type: "yesno",
    section: "housekeeping",
    showIf: { job_role: "Housekeeping" }
  }
];

module.exports = housekeepingQuestions;
