# 🔧 JavaScript API Reference

## New Functions Added to `script.js`

---

## 1. loadAnswersFromStorage()

**Purpose:** Load previously saved answers from browser storage

**Usage:** Called automatically on app start

```javascript
loadAnswersFromStorage()
```

**What It Does:**
- Checks if `portfolioAnswers` exists in localStorage
- Parses JSON string back to object
- Populates global `answers` variable
- Enables resume functionality

**Example:**
```javascript
// localStorage has: {"name": "John", "age": "35"}
loadAnswersFromStorage();
// Now: answers = {name: "John", age: "35"}
```

---

## 2. saveAnswersToStorage()

**Purpose:** Save current answers to browser storage

**Usage:** Called automatically after each answer

```javascript
saveAnswersToStorage()
```

**What It Does:**
- Converts `answers` object to JSON string
- Saves to localStorage with key `portfolioAnswers`
- Enables data persistence across sessions

**Example:**
```javascript
answers = {name: "John", age: "35"};
saveAnswersToStorage();
// localStorage now has the data
```

---

## 3. updateProgressBar()

**Purpose:** Update progress bar width based on answered questions

**Usage:** Called after loading questions and for each answer

```javascript
updateProgressBar()
```

**Calculation:**
```
percentage = (answeredCount / totalCount) × 100
```

**What It Does:**
- Counts keys in `answers` object
- Divides by `totalQuestions`
- Updates progress bar width in CSS
- Smooth animation (0.4s) shows progress

**Example:**
```javascript
totalQuestions = 10;
answers = {name: "John", age: "35"};  // 2 answered
updateProgressBar();
// Progress bar fills 20% (2/10 × 100)
```

---

## 4. uploadPhoto()

**Purpose:** Trigger photo file picker dialog

**Usage:** Called when user clicks "Add Photo" button

```javascript
uploadPhoto()
```

**What It Does:**
- Gets hidden `#photoInput` element
- Programmatically triggers click
- Opens file picker (accepts images)
- Sets up handler for file selection

**Example:**
```html
<button onclick="uploadPhoto()">📷 Add Photo</button>
<!-- Opens file picker for .jpg, .png, .gif, etc. -->
```

---

## 5. uploadVideo()

**Purpose:** Trigger video file picker dialog

**Usage:** Called when user clicks "Add Video" button

```javascript
uploadVideo()
```

**What It Does:**
- Gets hidden `#videoInput` element
- Programmatically triggers click
- Opens file picker (accepts videos)
- Sets up handler for file selection

**Example:**
```html
<button onclick="uploadVideo()">🎥 Add Video</button>
<!-- Opens file picker for .mp4, .mov, .avi, etc. -->
```

---

## 6. handleMediaUpload(input, type)

**Purpose:** Process uploaded media file

**Parameters:**
- `input` (HTMLElement) - The file input element
- `type` (string) - Either "photo" or "video"

**Usage:** Called internally by uploadPhoto/uploadVideo

```javascript
handleMediaUpload(photoInput, "photo")
```

**What It Does:**
1. Gets file from input
2. Creates FileReader to convert to Base64
3. Stores in `mediaFiles[questionId]` array
4. Updates preview grid

**Data Structure:**
```javascript
mediaFiles = {
  "photos_videos": [
    {
      type: "photo",
      data: "data:image/jpeg;base64,...",  // Base64 encoded
      name: "image.jpg"
    },
    {
      type: "video",
      data: "data:video/mp4;base64,...",
      name: "video.mp4"
    }
  ]
}
```

**Example:**
```javascript
handleMediaUpload(document.getElementById("photoInput"), "photo");
// File is read, converted to Base64, and stored
```

---

## 7. displayMediaPreview()

**Purpose:** Show thumbnail grid of uploaded media

**Usage:** Called automatically after media upload

```javascript
displayMediaPreview()
```

**What It Does:**
1. Gets current question ID
2. Clears previous preview
3. Creates `<img>` elements from Base64 data
4. Adds to preview grid with CSS classes

**HTML Generated:**
```html
<div id="mediaPreview" class="media-preview">
  <img src="data:image/jpeg;base64,..." class="media-thumb" />
  <img src="data:image/png;base64,..." class="media-thumb" />
</div>
```

**CSS Classes Applied:**
- `.media-preview` - Grid container (3 columns)
- `.media-thumb` - Individual thumbnail

---

## 8. showPortfolioPreview()

**Purpose:** Display final portfolio summary screen

**Usage:** Called automatically when all questions answered

```javascript
showPortfolioPreview()
```

**What It Does:**
1. Hides progress bar
2. Generates HTML with all answers
3. Organizes by sections (Personal, Job, Relocation, etc.)
4. Adds action buttons (Download, Start Over)

**Sections Displayed:**
- Personal Information (name, age, city, mobile)
- Job Details (job_role, experience)
- Relocation (relocate, bring_family, accommodation)
- Tools & Equipment (tools_available)
- Media (photos_videos)

**HTML Structure:**
```html
<div class="portfolio-preview">
  <h2>✅ Profile Completed Successfully!</h2>
  <div style="max-height: 400px; overflow-y: auto;">
    <div>
      <h3>PERSONAL INFORMATION</h3>
      <p><strong>name:</strong> John Doe</p>
      ...
    </div>
  </div>
  <div class="preview-actions">
    <button onclick="downloadProfile()">📥 Download Profile</button>
    <button onclick="resetProfile()">🔄 Start Over</button>
  </div>
</div>
```

---

## 9. downloadProfile()

**Purpose:** Export profile as text file

**Usage:** Called when user clicks "Download Profile" button

```javascript
downloadProfile()
```

**What It Does:**
1. Generates formatted text via `generateProfileText()`
2. Creates data URL with text content
3. Creates temporary `<a>` element
4. Triggers download with filename: `{name}_portfolio.txt`
5. Cleans up temporary element

**File Content Example:**
```
BLUE-COLLAR WORKER PORTFOLIO
==================================================

Name: John Doe
Age: 35
City: Bangalore
Mobile: 9876543210
Job Role: Electrician
Experience: 10 years

Relocation Details:
- Can Relocate: Yes
- Bring Family: No
- Accommodation Required: Yes

Tools & Equipment Available: Yes
Photos/Videos Available: Yes

Generated: 2/3/2026, 10:30:45 AM
```

**Browser Download:**
- Triggers native file download
- Filename: `John_Doe_portfolio.txt`
- Format: Plain text (.txt)

---

## 10. generateProfileText()

**Purpose:** Format answers into readable text

**Usage:** Called by `downloadProfile()`

```javascript
generateProfileText()
```

**Returns:** String with formatted profile

**Format:**
```
BLUE-COLLAR WORKER PORTFOLIO
==================================================

Name: {answers.name || "N/A"}
Age: {answers.age || "N/A"}
City: {answers.city || "N/A"}
Mobile: {answers.mobile || "N/A"}
Job Role: {answers.job_role || "N/A"}
Experience: {answers.experience || "N/A"}

Relocation Details:
- Can Relocate: {answers.relocate || "N/A"}
- Bring Family: {answers.bring_family || "N/A"}
- Accommodation Required: {answers.accommodation || "N/A"}

Tools & Equipment Available: {answers.tools_available || "N/A"}
Photos/Videos Available: {answers.photos_videos || "N/A"}

Generated: {current date and time}
```

**Example Output:**
```
BLUE-COLLAR WORKER PORTFOLIO
==================================================

Name: Raj Kumar
Age: 28
City: Delhi
Mobile: 98765-43210
Job Role: Welder
Experience: 5 years

Relocation Details:
- Can Relocate: Yes
- Bring Family: No
- Accommodation Required: No

Tools & Equipment Available: Yes
Photos/Videos Available: Yes

Generated: 2/3/2026, 10:30:45 AM
```

---

## 11. resetProfile()

**Purpose:** Clear all data and restart

**Usage:** Called when user clicks "Start Over" button

```javascript
resetProfile()
```

**What It Does:**
1. Shows confirmation dialog
2. If confirmed:
   - Clears `answers` object
   - Clears `mediaFiles` object
   - Resets `currentIndex` to 0
   - Deletes localStorage `portfolioAnswers`
   - Reloads questions from beginning

**Confirmation Dialog:**
```
"Are you sure you want to start over? 
Your current profile will be cleared."
```

**Example:**
```javascript
resetProfile();
// If user clicks "OK":
// answers = {}
// mediaFiles = {}
// localStorage cleared
// App restarts from question 1
```

---

## ENHANCED FUNCTIONS

### loadQuestions()

**What Changed:**
- Now sets `totalQuestions = questions.length`
- Calls `updateProgressBar()` after loading
- Updates progress text display

```javascript
async function loadQuestions() {
  // ... fetch code ...
  questions = await response.json();
  totalQuestions = questions.length;      // NEW
  currentIndex = 0;
  updateProgressBar();                     // NEW
  showQuestion();
}
```

---

### loadQuestionsAfterJob()

**What Changed:**
- Calculates `totalQuestions` based on answered + remaining

```javascript
async function loadQuestionsAfterJob() {
  // ... fetch code ...
  questions = allQuestions.filter(q => !(q.id in answers));
  
  totalQuestions = Object.keys(answers).length + questions.length;  // NEW
  currentIndex = 0;
  updateProgressBar();                                               // NEW
  showQuestion();
}
```

---

### showQuestion()

**What Changed:**
- Shows media section for photo/video questions
- Hides textarea for media questions
- Hides mic button for media questions
- Updates button text (Next vs Continue)

```javascript
function showQuestion() {
  // ... existing code ...
  
  // Hide media section by default, show only for specific questions
  if (q.id === "photos_videos" || q.id === "tools_available") {
    answerInput.style.display = "none";        // NEW
    mediaSection.style.display = "block";      // NEW
    micBtn.style.display = "none";             // NEW
    nextBtn.textContent = "Continue ➜";        // NEW
  } else {
    answerInput.style.display = "block";       // NEW
    micBtn.style.display = "block";            // NEW
    nextBtn.textContent = "Next ➜";            // NEW
  }
  
  updateProgressBar();                         // NEW
  speakQuestion();
}
```

---

### nextQuestion()

**What Changed:**
- Saves to localStorage after each answer
- Handles media questions (answer = "Yes" if files uploaded)
- Calls `saveAnswersToStorage()`

```javascript
function nextQuestion() {
  const q = questions[currentIndex];
  let answer = document.getElementById("answerInput").value;

  if (!q) return;

  // For media questions, answer is "Yes" if files were uploaded
  if (q.id === "photos_videos" || q.id === "tools_available") {
    answer = mediaFiles[q.id] && mediaFiles[q.id].length > 0 ? "Yes" : "No";
  }

  // Special handling for job_role
  if (q.id === "job_role") {
    const normalizedRole = normalizeJobRole(answer);
    answers[q.id] = normalizedRole;
    saveAnswersToStorage();             // NEW
    loadQuestionsAfterJob();
    return;
  }

  answers[q.id] = answer;
  saveAnswersToStorage();               // NEW
  currentIndex++;
  showQuestion();
}
```

---

### startListening()

**What Changed:**
- Added visual feedback (red button, disabled state)
- Changes button text to "🎤 Listening..."
- Restores on success or error
- Better error handling

```javascript
function startListening() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }

  const micBtn = document.getElementById("micBtn");
  micBtn.classList.add("listening");           // NEW - Red button
  micBtn.textContent = "🎤 Listening...";      // NEW
  micBtn.disabled = true;                      // NEW

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    document.getElementById("answerInput").value =
      event.results[0][0].transcript;
    micBtn.classList.remove("listening");      // NEW
    micBtn.textContent = "🎤 Speak";           // NEW
    micBtn.disabled = false;                   // NEW
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    micBtn.classList.remove("listening");      // NEW
    micBtn.textContent = "🎤 Speak";           // NEW
    micBtn.disabled = false;                   // NEW
  };

  recognition.start();
}
```

---

### normalizeJobRole()

**What Changed:**
- Added more job role synonyms
- Now includes: Welder, Construction Worker, Tailor

```javascript
function normalizeJobRole(rawValue) {
  if (!rawValue) return "Other";

  const value = rawValue.toLowerCase();

  if (value.includes("electric") || value.includes("wiring")) return "Electrician";
  if (value.includes("plumb")) return "Plumber";
  if (value.includes("drive")) return "Driver";
  if (value.includes("paint")) return "Painter";
  if (value.includes("carpent")) return "Carpenter";
  if (value.includes("mason") || value.includes("cement") || value.includes("brick")) {
    return "Mason (Brick/Cement work)";
  }
  if (value.includes("cook") || value.includes("kitchen")) return "Cook";
  if (value.includes("ac") || value.includes("fridge")) return "AC Technician";
  if (value.includes("clean")) return "Housekeeping";
  if (value.includes("factory")) return "Factory Worker";
  if (value.includes("security") || value.includes("guard")) return "Security Guard";
  if (value.includes("delivery")) return "Delivery Executive";
  if (value.includes("weld")) return "Welder";                    // NEW
  if (value.includes("construct")) return "Construction Worker";   // NEW
  if (value.includes("tailor")) return "Tailor";                  // NEW

  return "Other";
}
```

---

## GLOBAL VARIABLES

### Added

```javascript
let totalQuestions = 0;      // Total questions for this job role
let mediaFiles = {};         // Storage: mediaFiles[questionId] = [{type, data, name}, ...]
```

### Existing (Unchanged)

```javascript
let questions = [];           // Array of questions from backend
let currentIndex = 0;         // Current question index
let answers = {};             // All user answers
```

---

## DATA STRUCTURES

### mediaFiles Object

```javascript
mediaFiles = {
  "photos_videos": [
    {
      type: "photo",                    // "photo" or "video"
      data: "data:image/jpeg;base64,...",  // Base64 encoded file
      name: "IMG_001.jpg"               // Original filename
    }
  ]
}
```

### answers Object (Enhanced)

```javascript
answers = {
  "name": "John Doe",
  "age": "35",
  "city": "Bangalore",
  "mobile": "9876543210",
  "job_role": "Electrician",           // Normalized
  "experience": "10 years",
  "relocate": "Yes",
  "bring_family": "No",
  "accommodation": "Yes",
  "tools_available": "Yes",            // "Yes" if files uploaded, "No" if not
  "photos_videos": "Yes",              // "Yes" if files uploaded, "No" if not
  // ... more fields based on job role ...
}
```

---

## EXECUTION FLOW

```javascript
// 1. App starts
loadAnswersFromStorage();    // Restore previous data
loadQuestions();             // Fetch from backend

// 2. User answers question
startListening();            // Mic button clicked
// ... user speaks ...
// STT fills textarea

// 3. User clicks Next
nextQuestion();              // Process answer
  → answers[questionId] = userAnswer
  → saveAnswersToStorage()   // Auto-save
  → updateProgressBar()      // Update UI
  → showQuestion()           // Load next

// 4. Special case: job_role
  → normalizeJobRole()       // Convert "wiring" → "Electrician"
  → answers[job_role] = normalized
  → saveAnswersToStorage()
  → loadQuestionsAfterJob()  // Reload with new questions

// 5. Special case: media questions
  → showQuestion() detects id
  → Hides textarea, shows media UI
  → User clicks photo/video button
  → uploadPhoto() or uploadVideo()
  → handleMediaUpload()      // Process file
  → displayMediaPreview()    // Show thumbnail
  → User clicks Continue
  → nextQuestion() detects media question
  → answer = (files exist) ? "Yes" : "No"

// 6. All questions answered
  → showQuestion() detects end
  → showPortfolioPreview()   // Show summary
  → User clicks Download
  → downloadProfile()        // Generate & save file
  → User clicks Start Over
  → resetProfile()           // Clear & restart
```

---

## ERROR HANDLING

### Web Speech API Not Supported
```javascript
if (!("webkitSpeechRecognition" in window)) {
  alert("Speech Recognition not supported in this browser.");
  return;
}
```

### Speech Synthesis Not Supported
```javascript
if (!("speechSynthesis" in window)) return;
```

### File Upload Errors
```javascript
recognition.onerror = (event) => {
  console.error("Speech recognition error", event.error);
  // ... restore UI state ...
};
```

---

## TESTING EXAMPLES

### Test 1: Storage Persistence
```javascript
// Save some data
answers = {name: "John", age: "35"};
saveAnswersToStorage();

// Reload page (in browser) - then check:
console.log(answers);  // Should show: {name: "John", age: "35"}
```

### Test 2: Progress Bar
```javascript
totalQuestions = 10;
answers = {name: "John", age: "35"};  // 2 answered
updateProgressBar();
// Progress bar should show 20% width
```

### Test 3: Media Upload
```javascript
// User clicks photo button
uploadPhoto();
// File picker opens, user selects image.jpg
handleMediaUpload(photoInput, "photo");
// Image converts to Base64 and stores
displayMediaPreview();
// Thumbnail appears in grid
```

### Test 4: Portfolio Preview
```javascript
// All questions answered
showPortfolioPreview();
// Should display formatted summary with all sections
// Download and Start Over buttons visible
```

---

## COMPLETE API SUMMARY

| Function | Purpose | Called By | Returns |
|----------|---------|-----------|---------|
| loadAnswersFromStorage() | Load from localStorage | App start | void |
| saveAnswersToStorage() | Save to localStorage | nextQuestion() | void |
| updateProgressBar() | Update progress % | Multiple | void |
| uploadPhoto() | Open photo picker | User click | void |
| uploadVideo() | Open video picker | User click | void |
| handleMediaUpload(input, type) | Process file | uploadPhoto/Video | void |
| displayMediaPreview() | Show thumbnails | handleMediaUpload | void |
| showPortfolioPreview() | Show final screen | showQuestion | void |
| downloadProfile() | Export as file | User click | void |
| generateProfileText() | Format text | downloadProfile | string |
| resetProfile() | Clear & restart | User click | void |
| loadQuestions() | Get initial questions | App start | Promise |
| loadQuestionsAfterJob() | Get job questions | nextQuestion | Promise |
| showQuestion() | Display current Q | Multiple | void |
| nextQuestion() | Process answer | User click | void |
| speakQuestion() | Read question | showQuestion | void |
| startListening() | Start STT | User click | void |
| normalizeJobRole(value) | Map job role | nextQuestion | string |

---

**API Reference Complete**  
**Date:** February 3, 2026  
**Status:** ✅ Ready for Development
