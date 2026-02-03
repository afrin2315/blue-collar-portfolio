let questions = [];
let currentIndex = 0;
let answers = {};
let totalQuestions = 0;

// DOM Elements - will be initialized on page load
let startBtn, nextBtn, repeatBtn, endBtn, questionText, answerInput, audioPlayer, responseLog, occupationDisplay, questionIndexDisplay, sessionStatusDisplay;

// Initialize DOM elements and event listeners when page loads
document.addEventListener('DOMContentLoaded', () => {
  startBtn = document.getElementById('startBtn');
  nextBtn = document.getElementById('nextBtn');
  repeatBtn = document.getElementById('repeatBtn');
  endBtn = document.getElementById('endBtn');
  questionText = document.getElementById('questionText');
  answerInput = document.getElementById('answerInput');
  audioPlayer = document.getElementById('audioPlayer');
  responseLog = document.getElementById('responseLog');
  occupationDisplay = document.getElementById('occupation');
  questionIndexDisplay = document.getElementById('questionIndex');
  sessionStatusDisplay = document.getElementById('sessionStatus');

  // Event Listeners
  startBtn.addEventListener('click', startSession);
  nextBtn.addEventListener('click', submitAnswer);
  repeatBtn.addEventListener('click', repeatQuestion);
  endBtn.addEventListener('click', endSession);
  answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });
});

// ==========================
// LOG FUNCTION
// ==========================
function log(message, type = 'info') {
  const time = new Date().toLocaleTimeString();
  const logClass = `log-entry log-${type}`;
  const logEntry = document.createElement('div');
  logEntry.className = logClass;
  logEntry.textContent = `[${time}] ${message}`;
  responseLog.appendChild(logEntry);
  responseLog.scrollTop = responseLog.scrollHeight;
}

// ==========================
// LOAD QUESTIONS (INITIAL)
// ==========================
async function loadQuestions() {
  try {
    console.log('Fetching questions with answers:', answers);
    const response = await fetch("http://localhost:5001/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answers)
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid response format. Expected {questions, total, answered}');
    }
    
    questions = data.questions;
    totalQuestions = data.total;
    currentIndex = 0;
    
    console.log('Loaded questions:', questions.length, 'Total:', totalQuestions);
    showQuestion();
  } catch (error) {
    console.error('ERROR loading questions:', error);
    log(`ERROR loading questions: ${error.message}`, 'error');
  }
}

// ==========================
// SHOW CURRENT QUESTION
// ==========================
function showQuestion() {
  if (!questions[currentIndex]) {
    log('Interview completed!', 'success');
    questionText.textContent = '✅ Interview Completed Successfully!';
    answerInput.disabled = true;
    nextBtn.disabled = true;
    repeatBtn.disabled = true;
    sessionStatusDisplay.textContent = 'Completed';
    return;
  }

  const q = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  questionIndexDisplay.textContent = `${answeredCount + 1} of ${totalQuestions} (${progress}%)`;
  
  // Show question text
  let displayText = q.text;
  
  // Add options hint for select questions
  if (q.type === 'select' && q.options) {
    displayText += `\n\nOptions: ${q.options.join(', ')}`;
  }
  
  // Add hint for yes/no questions
  if (q.type === 'yesno') {
    displayText += '\n\n(Answer: Yes or No)';
  }
  
  questionText.textContent = displayText;
  answerInput.value = '';
  answerInput.focus();

  log(`Q${answeredCount + 1}: ${q.text}`, 'info');
  speakQuestion();
}

// ==========================
// JOB ROLE NORMALIZATION
// ==========================
function normalizeJobRole(rawValue) {
  if (!rawValue) return "Helper / Other";

  const value = rawValue.toLowerCase();

  if (value.includes("electric") || value.includes("wiring")) return "Electrician";
  if (value.includes("plumb")) return "Plumber";
  if (value.includes("drive")) return "Driver";
  if (value.includes("paint")) return "Painter";
  if (value.includes("carpent") || value.includes("wood")) return "Carpenter";
  if (value.includes("mason") || value.includes("cement") || value.includes("brick") || value.includes("rajmistri")) {
    return "Mason (Brick/Cement work)";
  }
  if (value.includes("cook") || value.includes("kitchen") || value.includes("chef")) return "Cook";
  if (value.includes("ac") || value.includes("fridge") || value.includes("air condition")) return "AC Technician";
  if (value.includes("clean") || value.includes("housekeep")) return "Housekeeping";
  if (value.includes("factory") || value.includes("manufacturing")) return "Factory Worker";
  if (value.includes("security") || value.includes("guard")) return "Security Guard";
  if (value.includes("delivery") || value.includes("courier")) return "Delivery Executive";
  if (value.includes("weld")) return "Welder";
  if (value.includes("construct") || value.includes("labour") || value.includes("labor")) return "Construction Worker";
  if (value.includes("tailor") || value.includes("stitch")) return "Tailor";
  if (value.includes("helper") || value.includes("assist")) return "Helper / Other";

  return "Helper / Other";
}

// ==========================
// SUBMIT ANSWER
// ==========================
async function submitAnswer() {
  const q = questions[currentIndex];
  let answer = answerInput.value.trim();

  if (!answer) {
    alert('Please enter an answer');
    return;
  }

  if (!q) {
    alert('No current question');
    return;
  }

  try {
    // ===== STRICT VALIDATION =====
    
    // 1. VALIDATE YES/NO QUESTIONS (MOST STRICT)
    if (q.type === 'yesno') {
      const lowerAnswer = answer.toLowerCase();
      if (lowerAnswer === 'yes' || lowerAnswer === 'y') {
        answer = 'Yes';
      } else if (lowerAnswer === 'no' || lowerAnswer === 'n') {
        answer = 'No';
      } else {
        alert('❌ Please answer with "Yes" or "No" only');
        log('❌ Invalid answer: Must be Yes or No', 'error');
        answerInput.value = '';
        answerInput.focus();
        return;
      }
    }

    // 2. VALIDATE NUMBER FIELDS (age, experience)
    else if (q.type === 'number') {
      const num = parseInt(answer);
      if (isNaN(num) || num < 1 || num > 100) {
        alert('❌ Please enter a valid number between 1 and 100');
        log('❌ Invalid answer: Must be a valid number', 'error');
        answerInput.value = '';
        answerInput.focus();
        return;
      }
      answer = num.toString();
    }

    // 3. VALIDATE SELECT QUESTIONS (STRICT - must match options exactly)
    else if (q.type === 'select' && q.options) {
      const answerLower = answer.toLowerCase().trim();
      
      // Find exact match (case-insensitive)
      const matchedOption = q.options.find(opt => opt.toLowerCase() === answerLower);
      
      if (matchedOption) {
        answer = matchedOption;
      } else if (q.allowCustom) {
        // If custom allowed but answer is too short
        if (answer.length < 3) {
          alert('❌ Please enter at least 3 characters');
          log('❌ Invalid answer: Too short', 'error');
          answerInput.value = '';
          answerInput.focus();
          return;
        }
        // Accept custom answer
        answer = answer;
      } else {
        // Not in list and custom not allowed
        alert(`❌ Please choose EXACTLY from these options:\n\n${q.options.join('\n')}\n\nYour answer: "${answer}"`);
        log(`❌ Invalid answer: "${answer}" not in options`, 'error');
        answerInput.value = '';
        answerInput.focus();
        return;
      }
    }

    // 4. VALIDATE MOBILE NUMBER (exactly 10 digits)
    else if (q.id === 'mobile') {
      const cleanNumber = answer.replace(/\D/g, '');
      if (cleanNumber.length !== 10) {
        alert('❌ Please enter exactly 10 digits for mobile number');
        log('❌ Invalid mobile number', 'error');
        answerInput.value = '';
        answerInput.focus();
        return;
      }
      answer = cleanNumber;
    }

    // 5. VALIDATE TEXT FIELDS (minimum 2 characters)
    else if ((q.type === 'text' || q.type === 'textarea') && answer.length < 2) {
      alert('❌ Please enter at least 2 characters');
      log('❌ Invalid answer: Too short', 'error');
      answerInput.value = '';
      answerInput.focus();
      return;
    }

    // ===== ALL VALIDATIONS PASSED =====
    
    // Final normalization for any yes/no answers (ensure consistency)
    if (q.type === 'yesno') {
      const lowerAnswer = answer.toLowerCase();
      if (lowerAnswer === 'yes' || lowerAnswer === 'y') {
        answer = 'Yes';
      } else if (lowerAnswer === 'no' || lowerAnswer === 'n') {
        answer = 'No';
      }
    }
    
    // Store the answer
    answers[q.id] = answer;
    log(`✅ Answer recorded: ${answer}`, 'success');

    // Special handling for job_role
    if (q.id === "job_role") {
      const normalizedRole = normalizeJobRole(answer);
      answers[q.id] = normalizedRole;
      log(`✅ Job role detected: ${normalizedRole}`, 'success');
      occupationDisplay.textContent = normalizedRole;
    }

    // After each answer, reload questions to handle conditional logic
    await loadQuestions();

  } catch (error) {
    log(`ERROR submitting answer: ${error.message}`, 'error');
    alert('Failed to submit answer: ' + error.message);
  }
}

// ==========================
// TEXT TO SPEECH (AUTO)
// ==========================
function speakQuestion() {
  const text = questionText.textContent;

  if (!("speechSynthesis" in window)) {
    log('Speech Synthesis not supported', 'error');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
  log('Speaking question...', 'info');
}

// ==========================
// REPEAT QUESTION
// ==========================
function repeatQuestion() {
  if (questions[currentIndex]) {
    speakQuestion();
  }
}

// ==========================
// START SESSION
// ==========================
function startSession() {
  log('Session started', 'success');
  sessionStatusDisplay.textContent = 'Active';
  startBtn.disabled = true;
  nextBtn.disabled = false;
  repeatBtn.disabled = false;
  endBtn.disabled = false;
  answerInput.disabled = false;
  
  answers = {};
  currentIndex = 0;
  occupationDisplay.textContent = '-';
  responseLog.innerHTML = '';
  
  loadQuestions();
}

// ==========================
// END SESSION
// ==========================
function endSession() {
  if (confirm('Are you sure you want to end the session?')) {
    log('Session ended by user', 'error');
    sessionStatusDisplay.textContent = 'Ended';
    
    answers = {};
    currentIndex = 0;
    totalQuestions = 0;
    questions = [];
    
    startBtn.disabled = false;
    nextBtn.disabled = true;
    repeatBtn.disabled = true;
    endBtn.disabled = true;
    answerInput.disabled = true;
    answerInput.value = '';
    questionText.textContent = 'Click "Start Session" to begin';
    occupationDisplay.textContent = '-';
    questionIndexDisplay.textContent = '-';
  }
}
