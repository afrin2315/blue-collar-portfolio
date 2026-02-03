const express = require("express");
const cors = require("cors");

const getQuestions = require("./data");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Question Service Running");
});

// Get questions API
app.post("/api/questions", (req, res) => {
  const answers = req.body || {};
  console.log('Received answers:', JSON.stringify(answers, null, 2));
  
  let allQuestions = getQuestions(answers);
  
  // Filter out questions that have already been answered
  let remainingQuestions = allQuestions.filter(q => !(q.id in answers));
  
  // Apply skipIf logic (skip questions for certain job roles)
  remainingQuestions = remainingQuestions.filter(q => {
    if (q.skipIf && Array.isArray(q.skipIf)) {
      const jobRole = answers.job_role;
      if (q.skipIf.includes(jobRole)) {
        console.log(`Skipping question ${q.id} for job role ${jobRole}`);
        return false; // Skip this question for this job role
      }
    }
    return true;
  });
  
  // Apply conditional logic (showIf)
  remainingQuestions = remainingQuestions.filter(q => {
    // If no showIf condition, always show the question
    if (!q.showIf) return true;
    
    // Check if all conditions in showIf are met
    for (const [key, value] of Object.entries(q.showIf)) {
      console.log(`🔍 Checking ${q.id}: needs ${key}="${value}", got "${answers[key]}"`);
      if (answers[key] !== value) {
        console.log(`❌ Question ${q.id} showIf FAILED: ${key} is "${answers[key]}" but needs "${value}"`);
        return false; // Condition not met
      }
    }
    
    console.log(`✅ Question ${q.id} showIf PASSED!`);
    return true; // All conditions met
  });
  
  console.log(`Returning ${remainingQuestions.length} questions`);
  
  // Return both remaining questions and total count
  res.json({
    questions: remainingQuestions,
    total: allQuestions.length,
    answered: Object.keys(answers).length
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Question service running on port ${PORT}`);
});
