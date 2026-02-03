const driverQuestions = [
  // =====================
  // DRIVER-SPECIFIC (STEP 5)
  // =====================
  {
    id: "has_license",
    text: "Do you have a valid driving license?",
    type: "yesno",
    section: "driver",
    showIf: { job_role: "Driver" },
    order: 200
  },
  {
    id: "license_type",
    text: "What type of driving license do you have?",
    type: "select",
    options: ["LMV", "HMV", "Commercial"],
    section: "driver",
    showIf: { job_role: "Driver" },
    order: 201,
    allowCustom: false
  },
  {
    id: "vehicle_type",
    text: "What type of vehicle do you drive?",
    type: "select",
    options: ["Two-wheeler", "Car", "Auto", "Truck", "Bus"],
    section: "driver",
    showIf: { job_role: "Driver" },
    order: 202,
    allowCustom: false
  },
  {
    id: "route_type",
    text: "Which routes are you comfortable with?",
    type: "select",
    options: ["Local", "Outstation", "Both"],
    section: "driver",
    showIf: { job_role: "Driver" },
    order: 203,
    allowCustom: false
  },
  {
    id: "night_shift",
    text: "Are you comfortable driving at night?",
    type: "yesno",
    section: "driver",
    showIf: { job_role: "Driver" },
    order: 204
  }
];

module.exports = driverQuestions;
