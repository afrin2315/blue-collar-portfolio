const commonQuestions = [
  // =====================
  // STEP 1 - BASIC DETAILS (Ask to everyone in THIS EXACT ORDER)
  // =====================
  {
    id: "name",
    text: "What is your full name?",
    type: "text",
    section: "personal",
    order: 1
  },
  {
    id: "age",
    text: "What is your age?",
    type: "number",
    section: "personal",
    order: 2
  },
  {
    id: "mobile",
    text: "What is your mobile number?",
    type: "text",
    section: "personal",
    order: 3
  },
  {
    id: "city",
    text: "What is your current city or location?",
    type: "text",
    section: "personal",
    order: 4
  },
  {
    id: "languages",
    text: "What languages do you know? For example: Hindi, English, Tamil",
    type: "text",
    section: "personal",
    order: 5
  },

  // =====================
  // STEP 2 - OCCUPATION (Question 6)
  // =====================
  {
    id: "job_role",
    text: "What work do you do?",
    type: "select",
    options: [
      "Electrician",
      "Plumber",
      "Carpenter",
      "Mason (Brick/Cement work)",
      "Painter",
      "Welder",
      "Driver",
      "AC Technician",
      "Construction Worker",
      "Cook",
      "Tailor",
      "Housekeeping",
      "Factory Worker",
      "Security Guard",
      "Delivery Executive",
      "Helper / Other"
    ],
    allowCustom: true,
    customLabel: "Please tell us your work",
    section: "job",
    order: 6
  },

  // =====================
  // STEP 3 - TOOLS LOGIC (Comes RIGHT AFTER occupation)
  // Skip for: Driver, Security Guard, Housekeeping, Delivery Executive, Cook
  // =====================
  {
    id: "has_own_tools",
    text: "Do you have your own tools required for this work?",
    type: "yesno",
    section: "tools",
    order: 7,
    skipIf: ["Driver", "Security Guard", "Delivery Executive"]
  },
  {
    id: "can_bring_tools",
    text: "Can you bring your tools with you to the work location?",
    type: "yesno",
    section: "tools",
    showIf: { has_own_tools: "Yes" },
    order: 8
  },
  {
    id: "need_tools_from_employer",
    text: "Do you need the employer to provide tools?",
    type: "yesno",
    section: "tools",
    showIf: { has_own_tools: "No" },
    order: 8
  },

  // =====================
  // STEP 4 - EXPERIENCE & WORK DETAILS
  // =====================
  {
    id: "experience_years",
    text: "How many years of experience do you have in this work?",
    type: "select",
    options: ["Fresher", "Less than 1 year", "1-2 years", "3-5 years", "5-10 years", "More than 10 years"],
    section: "experience",
    order: 100,
    allowCustom: false
  },
  {
    id: "work_description",
    text: "Describe the work you do in your own words.",
    type: "textarea",
    section: "experience",
    order: 101
  },
  {
    id: "daily_tasks",
    text: "What main tasks do you do in a normal work day?",
    type: "textarea",
    section: "experience",
    order: 102
  },
  {
    id: "work_location_type",
    text: "Where do you usually work?",
    type: "select",
    options: ["Construction site", "Customer's home", "Shop/Workshop", "Company/Factory", "Multiple locations", "Other"],
    section: "experience",
    order: 103,
    allowCustom: false
  },
  {
    id: "can_work_independently",
    text: "Can you do this work independently without supervision?",
    type: "yesno",
    section: "experience",
    order: 104
  },

  // =====================
  // STEP 5 - OCCUPATION-SPECIFIC QUESTIONS GO HERE (order 200-299)
  // Inserted by index.js based on job_role
  // =====================

  // =====================
  // STEP 6 - PROOF OF WORK
  // =====================
  {
    id: "has_photos",
    text: "Do you have photos of your work?",
    type: "yesno",
    section: "media",
    order: 300
  },
  {
    id: "has_videos",
    text: "Do you have videos of your work?",
    type: "yesno",
    section: "media",
    order: 301
  },

  // =====================
  // STEP 7 - RELOCATION LOGIC
  // =====================
  {
    id: "ready_to_relocate",
    text: "Are you ready to work outside your city?",
    type: "yesno",
    section: "mobility",
    order: 400
  },
  {
    id: "bring_family",
    text: "If the job is long-term, would you like to bring your family?",
    type: "yesno",
    section: "mobility",
    showIf: { ready_to_relocate: "Yes" },
    order: 401
  },
  {
    id: "need_accommodation",
    text: "Do you need accommodation arranged by the employer?",
    type: "yesno",
    section: "mobility",
    showIf: { ready_to_relocate: "Yes" },
    order: 402
  },

  // =====================
  // STEP 8 - SALARY PREFERENCE
  // =====================
  {
    id: "payment_preference",
    text: "How would you like to receive payment?",
    type: "select",
    options: ["Daily", "Weekly", "Monthly"],
    section: "payment",
    order: 500
  }

];

module.exports = commonQuestions;
