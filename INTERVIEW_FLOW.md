# Voice Interview System - Complete Flow Documentation

## Overview
This is an intelligent voice interview system designed to collect job profile details from blue-collar workers. The system follows a strict, structured flow with conditional logic based on user answers.

---

## Interview Flow (8 Steps)

### STEP 1 — BASIC DETAILS (Asked to everyone)

Questions are asked in this exact order:

1. **Full Name** (`name`)
   - "What is your full name?"
   
2. **Age** (`age`)
   - "What is your age?"
   
3. **Mobile Number** (`mobile`)
   - "What is your mobile number?"
   
4. **Current City / Location** (`city`)
   - "What is your current city or location?"
   
5. **Languages Known** (`languages`)
   - "What languages do you know? (For example: Hindi, English, Tamil)"
   
6. **Occupation** (`job_role`)
   - "What work do you do?"

**Important:** The occupation is stored carefully. ALL subsequent questions depend on this answer.

---

### STEP 2 — OCCUPATION DETECTION

Based on the occupation answer, the system switches to occupation-specific questioning.

**Supported Occupations:**
- Electrician → Tools, wiring, voltage work, panels
- Plumber → Pipes, fittings, leakage repair
- Carpenter → Wood work, furniture, cutting tools
- Mason → Bricks, cement, construction
- Painter → Painting tools, surfaces
- Welder → Welding equipment, metal work
- Driver → License, vehicle type
- AC Technician → AC repair, maintenance
- Cook → Cooking skills, kitchen work
- Construction Worker → Construction site tasks
- Tailor → Sewing, stitching
- Housekeeping → Cleaning, maintenance
- Factory Worker → Factory operations
- Security Guard → Security duties
- Delivery Executive → Delivery tasks
- Helper / Other → General labor tasks

From this point forward, ONLY occupation-specific questions are asked.

---

### STEP 3 — TOOLS LOGIC (Conditional)

**First Question:**
- "Do you have your own tools required for this work?" (`has_own_tools`)

**IF YES:**
  - "Can you bring your tools with you to the work location?" (`can_bring_tools`)

**IF NO:**
  - "Do you need the employer to provide tools?" (`need_tools_from_employer`)

---

### STEP 4 — EXPERIENCE & WORK DETAILS

Questions in order:

1. **Experience** (`experience_years`)
   - "How many years of experience do you have in this work?"
   - Options: Fresher, Less than 1 year, 1-2 years, 3-5 years, 5-10 years, More than 10 years

2. **Work Description** (`work_description`)
   - "Describe the work you do in your own words."

3. **Daily Tasks** (`daily_tasks`)
   - "What main tasks do you do in a normal work day?"

4. **Work Location Type** (`work_location_type`)
   - "Where do you usually work?"
   - Options: Construction site, Customer's home, Shop/Workshop, Company/Factory, Multiple locations, Other

5. **Independent Work** (`can_work_independently`)
   - "Can you do this work independently without supervision?"

---

### STEP 5 — OCCUPATION-SPECIFIC QUESTIONS

Based on the occupation detected in STEP 2, specialized questions are asked.

**Example for Electrician:**
- What type of electrical work do you do?
- Which voltage level are you experienced with?
- Do you follow electrical safety rules?
- Do you use safety equipment like gloves and testers?
- Have you handled electrical emergency situations?
- Which electrical tools do you have?

**For Helper / Other:**
- Generic questions about job description, responsibilities, skills, and tools are asked.

---

### STEP 6 — PROOF OF WORK

Questions in order:

1. **Photos** (`has_photos`)
   - "Do you have photos of your work?"

2. **Videos** (`has_videos`)
   - "Do you have videos of your work?"

If YES → System asks to upload later.

---

### STEP 7 — RELOCATION LOGIC (Conditional)

**First Question:**
- "Are you ready to work outside your city?" (`ready_to_relocate`)

**IF YES:**
  - "If the job is long-term, would you like to bring your family?" (`bring_family`)
  - "Do you need accommodation arranged by the employer?" (`need_accommodation`)

**IF NO:**
  - Skip family & accommodation questions.

---

### STEP 8 — SALARY PREFERENCE

**Question:**
- "How would you like to receive payment?" (`payment_preference`)
- Options: Daily, Weekly, Monthly

---

### STEP 9 — FINAL CONFIRMATION

Questions in order:

1. **Confirmation** (`confirm_details`)
   - "Is all the information you provided correct?"

2. **If NO** (`confirm_details_reason`)
   - "What information would you like to change or clarify?"

3. **Final Submission** (`final_submission`)
   - "Your profile is now complete. Can we save and submit your information?"

Only after confirmation, the interview ends.

---

## System Architecture

### Backend (question-service)
- **File:** `src/data/common.questions.js` - Basic details, tools, experience, relocation, payment
- **File:** `src/data/[occupation].questions.js` - Occupation-specific questions
- **File:** `src/data/generic.questions.js` - Questions for unrecognized occupations
- **File:** `src/data/end.questions.js` - Final confirmation questions
- **File:** `src/data/index.js` - Question assembly logic
- **File:** `src/app.js` - API endpoint with conditional logic filtering

### Frontend
- **File:** `index.html` - Interview interface
- **File:** `script.js` - Logic for question flow, answer submission, and TTS
- **File:** `style.css` - UI styling

---

## Conditional Logic Rules

### Tool Questions
- Tool questions are ONLY asked AFTER occupation is known
- If user has tools → Ask if they can bring them
- If user doesn't have tools → Ask if employer should provide them

### Relocation Questions
- Relocation questions are ONLY asked AFTER work experience questions are completed
- Family and accommodation questions ONLY appear if user is willing to relocate

### Occupation-Specific Questions
- These are ONLY asked AFTER the job_role is answered
- Each occupation has its own set of specialized questions
- Generic questions are asked for "Helper / Other" or unrecognized occupations

---

## Voice Interaction

The system uses **Web Speech Synthesis API** to:
- Automatically read each question aloud
- Use Indian English accent (en-IN)
- Speak at a slower, clearer pace (0.9x speed)
- Allow users to repeat questions using the "Repeat Question" button

---

## Answer Storage

All answers are stored in an `answers` object with the following structure:

```javascript
{
  name: "Rajesh Kumar",
  age: "28",
  mobile: "9876543210",
  city: "Mumbai",
  languages: "Hindi, English, Marathi",
  job_role: "Electrician",
  has_own_tools: "Yes",
  can_bring_tools: "Yes",
  experience_years: "3-5 years",
  // ... and so on
}
```

After each answer is recorded, the backend is queried to fetch the next set of questions based on the current answers, ensuring proper conditional logic.

---

## Important Rules

✅ **DO:**
- Follow the step-by-step order strictly
- Ask conditional questions only when conditions are met
- Keep questions short and simple for voice interaction
- Store every answer properly
- Reload questions after each answer to handle conditional logic

❌ **DON'T:**
- Skip steps in the flow
- Ask tool questions before knowing occupation
- Ask relocation questions before finishing work questions
- Ask family/accommodation if user is not relocating
- Ask irrelevant questions

---

## Testing the System

1. Start the backend: `cd question-service && npm start`
2. Open `frontend/index.html` in a browser
3. Click "Start Session" to begin the interview
4. Answer each question and observe the flow
5. Test conditional logic by:
   - Answering "Yes" to "has_own_tools" → Should ask "can_bring_tools"
   - Answering "No" to "has_own_tools" → Should ask "need_tools_from_employer"
   - Answering "Yes" to "ready_to_relocate" → Should ask family and accommodation
   - Answering "No" to "ready_to_relocate" → Should skip family and accommodation

---

## Question Counts by Section

- **Basic Details:** 6 questions (always asked)
- **Tools:** 2-3 questions (conditional)
- **Experience & Work:** 5 questions (always asked)
- **Occupation-Specific:** 5-10 questions (depends on occupation)
- **Proof of Work:** 2 questions (always asked)
- **Relocation:** 1-3 questions (conditional)
- **Salary:** 1 question (always asked)
- **Confirmation:** 2-3 questions (conditional)

**Total:** Approximately 24-33 questions depending on answers.

---

## Customization

To add a new occupation:

1. Create `src/data/[occupation].questions.js`
2. Add questions with `showIf: { job_role: "YourOccupation" }`
3. Import in `src/data/index.js`
4. Add to `occupationMap` in `index.js`
5. Update `normalizeJobRole()` in `frontend/script.js`
6. Add to dropdown options in `common.questions.js`

---

**Last Updated:** February 3, 2026
