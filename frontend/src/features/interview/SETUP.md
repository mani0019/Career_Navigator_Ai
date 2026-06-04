# Interview Feature - Setup & Integration Guide

## Quick Setup

### Step 1: Update App.jsx

Wrap your app with `InterviewProvider`:

```jsx
import { InterviewProvider } from "./features/interview/interview.context";

function App() {
  return (
    <InterviewProvider>
      {/* Your routes */}
    </InterviewProvider>
  );
}

export default App;
```

### Step 2: Environment Configuration

Create `.env.local` in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Or use defaults (http://localhost:5000/api)

### Step 3: Backend Endpoint

Ensure your backend has this endpoint:

```
POST /api/interview/generate-report
```

**Request (FormData)**:
- `jobDescription` - string (required, max 5000 chars)
- `selfDescription` - string (optional if resume provided)
- `resume` - file (optional if selfDescription provided, PDF/DOCX, max 5MB)

**Response**:
```json
{
  "success": true,
  "report": {
    "interviewQuestions": [],
    "tips": [],
    "score": 0,
    "analysis": ""
  }
}
```

---

## Component Usage

### Simple Import Pattern

```jsx
import { useInterview } from "../hooks/useInterview";

function MyInterviewComponent() {
  const {
    jobDescription,
    setJobDescription,
    selfDescription,
    setSelfDescription,
    resumeFileName,
    loading,
    error,
    success,
    handleResumeUpload,
    removeResume,
    generateInterviewReport,
  } = useInterview();

  return (
    // Your JSX here
  );
}
```

---

## API Methods Available

### 1. Generate Report
```javascript
import { generateInterviewReport } from "../services/interview.api";

const formData = new FormData();
formData.append("jobDescription", "...");
formData.append("selfDescription", "...");
formData.append("resume", fileObject);

const report = await generateInterviewReport(formData);
```

### 2. Get All Reports
```javascript
import { getInterviewReports } from "../services/interview.api";

const reports = await getInterviewReports();
```

### 3. Get Single Report
```javascript
import { getInterviewReportById } from "../services/interview.api";

const report = await getInterviewReportById("reportId");
```

### 4. Delete Report
```javascript
import { deleteInterviewReport } from "../services/interview.api";

await deleteInterviewReport("reportId");
```

---

## Validation & Error Handling

### Built-in Validations
✓ Job description required & max 5000 chars  
✓ Resume or self-description required  
✓ File type validation (PDF/DOCX)  
✓ File size validation (max 5MB)  

### Error Handling
```jsx
{error && (
  <div className="alert alert-error">
    <span className="alert-icon">⚠️</span>
    {error}
  </div>
)}
```

---

## State Management

### Available State
```javascript
const {
  // Inputs
  jobDescription,
  selfDescription,
  resumeFileName,
  resumeFile,
  
  // UI States
  loading,
  error,
  success,
  
  // Results
  interviewReport,
} = useInterview();
```

### State Actions
```javascript
const {
  setJobDescription,
  setSelfDescription,
  handleResumeUpload,
  removeResume,
  generateInterviewReport,
  resetState,
} = useInterview();
```

---

## File Upload Handling

### Programmatic Upload
```jsx
const { handleResumeUpload, resumeFileName } = useInterview();

<input 
  type="file" 
  onChange={(e) => handleResumeUpload(e.target.files[0])}
  accept=".pdf,.doc,.docx"
/>

{resumeFileName && <p>✓ {resumeFileName}</p>}
```

### Drag & Drop Support
```jsx
const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files?.[0];
  handleResumeUpload(file);
};

<div onDragOver={handleDragOver} onDrop={handleDrop}>
  Drop file here
</div>
```

---

## Styling Classes

### Available CSS Classes
- `.home` - Main container
- `.interview-container` - Content wrapper
- `.interview-input-group` - Form grid
- `.left` - Job description section
- `.right` - Profile section
- `.primary-button` - CTA button
- `.alert.alert-error` - Error message
- `.alert.alert-success` - Success message
- `.info-box` - Info notification

---

## Performance Tips

1. **Memoize components** if they re-render frequently
2. **Lazy load** the interview page if using code splitting
3. **Cache API responses** for previously generated reports
4. **Use loading states** to prevent duplicate submissions

Example:
```jsx
import { lazy, Suspense } from "react";

const InterviewPage = lazy(() => import("./pages/Home"));

<Suspense fallback={<div>Loading...</div>}>
  <InterviewPage />
</Suspense>
```

---

## Troubleshooting

### "useInterview must be used within InterviewProvider"
**Solution**: Ensure `InterviewProvider` wraps your component in `App.jsx`

### API calls fail with 401
**Solution**: Check if authentication token is being sent (credentials: "include")

### File upload shows no feedback
**Solution**: Check console for validation errors via `error` state

### State not persisting across page reload
**Solution**: Current setup uses Context (session storage). Add localStorage to persist.

---

## Next Steps

1. ✅ Integrate with your backend endpoints
2. ✅ Test all form validations
3. ✅ Add loading skeletons for better UX
4. ✅ Implement report display component
5. ✅ Add retry logic for failed requests
6. ✅ Add analytics tracking
