const endQuestions = [
  // =====================
  // FINAL CONFIRMATION
  // =====================
  {
    id: "confirm_details",
    text: "Is all the information you provided correct?",
    type: "yesno",
    section: "confirmation"
  },
  {
    id: "confirm_details_reason",
    text: "What information would you like to change or clarify?",
    type: "textarea",
    section: "confirmation",
    showIf: { confirm_details: "No" }
  },
  {
    id: "final_submission",
    text: "Your profile is now complete. Can we save and submit your information?",
    type: "yesno",
    section: "confirmation"
  }
];

module.exports = endQuestions;
