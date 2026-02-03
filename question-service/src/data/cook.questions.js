const cookQuestions = [
  // =====================
  // CORE COOKING WORK
  // =====================
  {
    id: "cooking_type",
    text: "What type of cooking work do you do?",
    type: "multiselect",
    options: [
      "Home cooking",
      "Hotel / restaurant cooking",
      "Fast food",
      "Bakery items",
      "Kitchen helper work"
    ],
    allowCustom: true,
    section: "cook",
    showIf: { job_role: "Cook" }
  },

  // =====================
  // CUISINE & EXPERIENCE
  // =====================
  {
    id: "cuisine_type",
    text: "Which type of food are you experienced in?",
    type: "multiselect",
    options: [
      "South Indian",
      "North Indian",
      "Chinese",
      "Continental",
      "All types"
    ],
    allowCustom: true,
    section: "cook",
    showIf: { job_role: "Cook" }
  },

  {
    id: "independent_cook",
    text: "Can you handle cooking work independently?",
    type: "select",
    options: ["Yes", "With supervision", "Only with team"],
    section: "cook",
    showIf: { job_role: "Cook" }
  },

  // =====================
  // HYGIENE & SHIFT
  // =====================
  {
    id: "food_hygiene",
    text: "Do you follow food hygiene and cleanliness practices?",
    type: "yesno",
    section: "cook",
    showIf: { job_role: "Cook" }
  },

  {
    id: "cook_shift",
    text: "Which shifts are you comfortable working?",
    type: "select",
    options: ["Morning", "Evening", "Full day"],
    section: "cook",
    showIf: { job_role: "Cook" }
  }
];

module.exports = cookQuestions;
