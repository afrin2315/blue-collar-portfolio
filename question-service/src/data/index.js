// COMMON & GENERIC
const commonQuestions = require("./common.questions");
const genericQuestions = require("./generic.questions");
const endQuestions = require("./end.questions");

// OCCUPATION-SPECIFIC
const driverQuestions = require("./driver.questions");
const electricianQuestions = require("./electrician.questions");
const plumberQuestions = require("./plumber.questions");
const tailorQuestions = require("./tailor.questions");
const constructionQuestions = require("./construction.questions");
const masonQuestions = require("./masan"); // mason (brick/cement work)
const carpenterQuestions = require("./carpenter.questions");
const painterQuestions = require("./painter.questions");
const welderQuestions = require("./welder.questions");
const acQuestions = require("./ac.questions");
const housekeepingQuestions = require("./housekeeping.questions");
const factoryQuestions = require("./factory.questions");
const securityQuestions = require("./security.questions");
const cookQuestions = require("./cook.questions");
const deliveryQuestions = require("./delivery.questions");

// MAP JOB ROLE → QUESTIONS
const occupationMap = {
  "Driver": driverQuestions,
  "Electrician": electricianQuestions,
  "Plumber": plumberQuestions,
  "Tailor": tailorQuestions,
  "Construction Worker": constructionQuestions,
  "Mason (Brick/Cement work)": masonQuestions,
  "Carpenter": carpenterQuestions,
  "Painter": painterQuestions,
  "Welder": welderQuestions,
  "AC Technician": acQuestions,
  "Housekeeping": housekeepingQuestions,
  "Factory Worker": factoryQuestions,
  "Security Guard": securityQuestions,
  "Cook": cookQuestions,
  "Delivery Executive": deliveryQuestions
};

/**
 * answers = object containing previous answers
 * example:
 * {
 *   job_role: "Electrician"
 * }
 */
function getQuestions(answers = {}) {
  let questions = [...commonQuestions];

  const jobRole = answers.job_role;

  // ✅ If known occupation → load specific questions (order 200-299)
  if (jobRole && occupationMap[jobRole]) {
    const occupationQuestions = occupationMap[jobRole].map(q => ({
      ...q,
      order: q.order || 200
    }));
    questions = questions.concat(occupationQuestions);
  }

  // ✅ If unknown / Other / Helper / free text → load generic questions (order 200-299)
  if (!jobRole || jobRole === "Other" || jobRole === "Helper / Other" || !occupationMap[jobRole]) {
    const genericQuestionsWithOrder = genericQuestions.map(q => ({
      ...q,
      order: q.order || 200
    }));
    questions = questions.concat(genericQuestionsWithOrder);
  }

  // ✅ Add end questions (confirmation) at the very end (order 600+)
  const endQuestionsWithOrder = endQuestions.map((q, idx) => ({
    ...q,
    order: 600 + idx
  }));
  questions = questions.concat(endQuestionsWithOrder);

  // ✅ Sort by order to ensure correct sequence
  questions.sort((a, b) => (a.order || 999) - (b.order || 999));

  return questions;
}

module.exports = getQuestions;
