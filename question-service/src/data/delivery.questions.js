const deliveryQuestions = [
  // =====================
  // CORE DELIVERY WORK
  // =====================
  {
    id: "delivery_type",
    text: "What type of delivery work do you do?",
    type: "multiselect",
    options: [
      "Food delivery",
      "Courier delivery",
      "E-commerce delivery",
      "Grocery delivery",
      "Medicine delivery"
    ],
    allowCustom: true,
    section: "delivery",
    showIf: { job_role: "Delivery Executive" }
  },

  // =====================
  // VEHICLE & LICENSE
  // =====================
  {
    id: "delivery_vehicle",
    text: "Which vehicle do you use for delivery?",
    type: "select",
    options: ["Bicycle", "Two-wheeler", "Car", "Company vehicle"],
    allowCustom: true,
    section: "delivery",
    showIf: { job_role: "Delivery Executive" }
  },

  {
    id: "delivery_license",
    text: "Do you have a valid driving license?",
    type: "yesno",
    section: "delivery",
    showIf: { job_role: "Delivery Executive" }
  },

  // =====================
  // EXPERIENCE & AVAILABILITY
  // =====================
  {
    id: "delivery_experience",
    text: "How experienced are you in delivery work?",
    type: "select",
    options: ["Fresher", "1-2 years", "3+ years"],
    section: "delivery",
    showIf: { job_role: "Delivery Executive" }
  },

  {
    id: "delivery_shift",
    text: "Which shifts are you comfortable working?",
    type: "select",
    options: ["Day shift", "Night shift", "Flexible"],
    section: "delivery",
    showIf: { job_role: "Delivery Executive" }
  }
];

module.exports = deliveryQuestions;
