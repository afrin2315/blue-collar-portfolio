# Interview System - Testing Guide

## How to Test the System

### 1. Start the Backend
```powershell
cd c:\Users\Fathma\Downloads\blue-collar-portfolio\question-service
npm start
```
Expected output: "Question service running on port 5001"

### 2. Open the Frontend
Open `frontend/index.html` in your browser or use a local server.

---

## Test Scenarios

### Test 1: Tools Logic - User HAS Tools
**Steps:**
1. Start session
2. Answer basic details (name, age, mobile, city, languages)
3. Select occupation: "Electrician"
4. When asked "Do you have your own tools?" → Answer: **Yes**
5. **Expected:** Next question should be "Can you bring your tools with you?"
6. **Not Expected:** Should NOT ask "Do you need employer to provide tools?"

---

### Test 2: Tools Logic - User DOESN'T HAVE Tools
**Steps:**
1. Start session
2. Answer basic details
3. Select occupation: "Plumber"
4. When asked "Do you have your own tools?" → Answer: **No**
5. **Expected:** Next question should be "Do you need the employer to provide tools?"
6. **Not Expected:** Should NOT ask "Can you bring your tools?"

---

### Test 3: Relocation Logic - User WILLING to Relocate
**Steps:**
1. Complete basic details and work experience questions
2. When asked "Are you ready to work outside your city?" → Answer: **Yes**
3. **Expected:** Should ask TWO more questions:
   - "If the job is long-term, would you like to bring your family?"
   - "Do you need accommodation arranged by the employer?"

---

### Test 4: Relocation Logic - User NOT WILLING to Relocate
**Steps:**
1. Complete basic details and work experience questions
2. When asked "Are you ready to work outside your city?" → Answer: **No**
3. **Expected:** Should skip family and accommodation questions
4. Next question should be about salary/payment preference

---

### Test 5: Occupation-Specific Questions - Electrician
**Steps:**
1. Answer basic details
2. Select occupation: "Electrician"
3. **Expected:** After common questions, should ask electrician-specific questions like:
   - "What type of electrical work do you do?"
   - "Which voltage level are you experienced with?"
   - "Do you follow electrical safety rules?"
   - "Do you use safety equipment?"
   - "Have you handled emergency situations?"
   - "Which electrical tools do you have?"

---

### Test 6: Generic Questions - Helper / Other
**Steps:**
1. Answer basic details
2. Select occupation: "Helper / Other" OR type something like "General Labor"
3. **Expected:** After common questions, should ask generic questions:
   - "Please describe the work you do in your own words."
   - "What are your main responsibilities?"
   - "What skills do you think you are good at?"
   - "What tools, machines, or equipment do you use?"
   - "Describe a typical day at your work."

---

### Test 7: Complete Interview Flow - All Steps
**Steps:**
1. **STEP 1:** Enter name, age, mobile, city, languages
2. **STEP 2:** Select "Carpenter"
3. **STEP 3:** Answer tool questions (Yes → Can bring)
4. **STEP 4:** Answer experience and work details
5. **STEP 5:** Answer carpenter-specific questions
6. **STEP 6:** Answer proof of work (photos/videos)
7. **STEP 7:** Answer relocation (Yes → Family + Accommodation)
8. **STEP 8:** Select payment preference (Daily/Weekly/Monthly)
9. **STEP 9:** Confirm all details are correct
10. **STEP 10:** Final submission

**Expected:** Should see "Interview Completed Successfully!" message

---

### Test 8: Voice Features
**Steps:**
1. Start session
2. **Expected:** Each question should be read aloud automatically
3. Click "Repeat Question" button
4. **Expected:** Current question should be read again
5. Verify:
   - Voice uses Indian English accent
   - Speech is clear and at a reasonable pace
   - Works in modern browsers (Chrome, Edge, Firefox)

---

### Test 9: Job Role Normalization
Test that various inputs map to correct occupations:

| User Input | Expected Mapping |
|------------|-----------------|
| "electrician" | Electrician |
| "wiring work" | Electrician |
| "plumber" | Plumber |
| "pipe fitter" | Plumber |
| "driver" | Driver |
| "painter" | Painter |
| "carpenter" | Carpenter |
| "wood work" | Carpenter |
| "mason" | Mason (Brick/Cement work) |
| "rajmistri" | Mason (Brick/Cement work) |
| "cement work" | Mason (Brick/Cement work) |
| "cook" | Cook |
| "chef" | Cook |
| "ac repair" | AC Technician |
| "cleaning" | Housekeeping |
| "factory" | Factory Worker |
| "security" | Security Guard |
| "guard" | Security Guard |
| "delivery" | Delivery Executive |
| "welder" | Welder |
| "construction" | Construction Worker |
| "labour" | Construction Worker |
| "tailor" | Tailor |
| "stitching" | Tailor |
| "helper" | Helper / Other |
| "anything else" | Helper / Other |

---

### Test 10: Question Order Verification

Verify that questions appear in this EXACT order:

1. Full Name
2. Age
3. Mobile Number
4. Current City
5. Languages Known
6. What work do you do? (Occupation)
7. Do you have your own tools? (AFTER occupation)
8. [Conditional tool question based on answer]
9. How many years of experience?
10. Describe the work you do
11. What main tasks do you do?
12. Where do you usually work?
13. Can you work independently?
14. [Occupation-specific questions - ONLY for selected occupation]
15. Do you have photos?
16. Do you have videos?
17. Are you ready to work outside your city?
18. [Conditional relocation questions]
19. How would you like to receive payment?
20. Is all information correct?
21. [If NO → What to change?]
22. Can we save and submit?

---

## Expected Behavior

### ✅ Correct Behavior
- Questions appear one at a time
- Each question is automatically read aloud
- Answer is recorded when "Next Question" is clicked
- Progress indicator updates correctly
- Conditional questions appear/disappear based on answers
- Session can be ended at any time
- Log shows all activities

### ❌ Incorrect Behavior
- Questions appear out of order
- Tool questions asked before occupation
- Family/accommodation asked when not relocating
- Generic questions shown for known occupations
- Questions skipped or repeated
- Progress indicator stuck
- Voice not working

---

## Debugging Tips

### If questions don't load:
1. Check console for errors (F12 → Console tab)
2. Verify backend is running: `http://localhost:5001`
3. Check network tab for API responses

### If conditional logic fails:
1. Check the answers object in console: `console.log(answers)`
2. Verify the showIf condition matches the answer exactly
3. Check that questions are reloaded after each answer

### If voice doesn't work:
1. Check browser support (Chrome/Edge recommended)
2. Allow microphone/audio permissions
3. Check if speechSynthesis API is available: `'speechSynthesis' in window`

---

## Success Criteria

✅ All 10 test scenarios pass
✅ Questions follow the exact order specified
✅ Conditional logic works correctly
✅ Voice features work in supported browsers
✅ Job role normalization works for all test cases
✅ Interview can be completed from start to finish
✅ Session can be ended and restarted

---

**Last Updated:** February 3, 2026
