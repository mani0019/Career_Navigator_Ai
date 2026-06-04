# Interview AI - 4-Layer React Architecture

## Overview

This document outlines the 4-layer architecture implemented for the Interview module. This pattern promotes separation of concerns, testability, and maintainability.

```
┌─────────────────────────────────────────────┐
│ 1. UI Layer (Components)                    │
│    - Home.jsx, components                   │
│    - Handles rendering & user interactions  │
└─────────────────────────────────────────────┘
                     ↕
┌─────────────────────────────────────────────┐
│ 2. Hook Layer (Business Logic)              │
│    - useInterview.js                        │
│    - State management & validation          │
└─────────────────────────────────────────────┘
                     ↕
┌─────────────────────────────────────────────┐
│ 3. State Layer (Context)                    │
│    - interview.context.jsx                  │
│    - Global state management                │
└─────────────────────────────────────────────┘
                     ↕
┌─────────────────────────────────────────────┐
│ 4. API Layer (Services)                     │
│    - interview.api.js                       │
│    - Backend communication                  │
└─────────────────────────────────────────────┘
```

---

## Layer Details

### 1. **UI Layer** - `Home.jsx`

**Responsibility**: Render UI and handle user interactions

**Key Features**:
- Clean, presentational component
- Delegates business logic to hooks
- Manages only UI-specific state (like file input refs)
- Displays errors, loading states, and success messages

**File Structure**:
```
frontend/src/features/interview/
├── pages/
│   └── Home.jsx              ← UI Component
├── styles/
│   └── Home.scss             ← Styling
```

**Example Usage**:
```jsx
const {
    jobDescription,
    setJobDescription,
    selfDescription,
    setSelfDescription,
    loading,
    error,
    handleResumeUpload,
    generateInterviewReport,
} = useInterview();

// Use in JSX
<textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
/>

<button onClick={generateInterviewReport} disabled={loading}>
    {loading ? "Generating..." : "Generate"}
</button>
```

---

### 2. **Hook Layer** - `useInterview.js`

**Responsibility**: Business logic, form validation, and orchestration

**Key Features**:
- Validates form inputs
- Handles file uploads (with size/type validation)
- Integrates state from context
- Calls API services
- Manages loading and error states
- Provides reusable functions

**File Structure**:
```
frontend/src/features/interview/
├── hooks/
│   └── useInterview.js       ← Custom Hook
```

**Key Methods**:
```javascript
// Form validation
const validateForm = () => {
    if (!jobDescription.trim()) {
        setError("Job description is required");
        return false;
    }
    // ... more validations
    return true;
};

// File handling
const handleResumeUpload = (file) => {
    // Validate file type and size
    // Update state
};

// Main action
const generateInterviewReport = async () => {
    // Validate
    // Call API
    // Handle success/error
    // Update state
};
```

**Usage Pattern**:
```javascript
// Inside a component
const hook = useInterview();
// Returns all state and actions in one object
```

---

### 3. **State Layer** - `interview.context.jsx`

**Responsibility**: Centralized state management

**Key Features**:
- Provides global state access via Context API
- Manages all interview-related state
- Avoids prop drilling
- Provides state reset functionality

**File Structure**:
```
frontend/src/features/interview/
├── interview.context.jsx     ← Context Provider
```

**State Managed**:
```javascript
// Form inputs
- jobDescription
- selfDescription
- resumeFile / resumeFileName

// UI States
- loading (boolean)
- error (string)
- success (boolean)

// Results
- interviewReport (object)
```

**Setup in App**:
```jsx
import { InterviewProvider } from "./features/interview/interview.context";

function App() {
    return (
        <InterviewProvider>
            <Routes>
                {/* routes */}
            </Routes>
        </InterviewProvider>
    );
}
```

---

### 4. **API Layer** - `interview.api.js`

**Responsibility**: Backend communication

**Key Features**:
- Centralized API endpoints
- Error handling
- Request/response formatting
- Uses FormData for file uploads
- Credentials included for auth

**File Structure**:
```
frontend/src/features/interview/
├── services/
│   └── interview.api.js      ← API Services
```

**Available Functions**:

1. **Generate Report**
```javascript
generateInterviewReport(formData) 
→ Promise<Object>
```

2. **Get Reports**
```javascript
getInterviewReports() 
→ Promise<Array>
```

3. **Get Report by ID**
```javascript
getInterviewReportById(reportId) 
→ Promise<Object>
```

4. **Delete Report**
```javascript
deleteInterviewReport(reportId) 
→ Promise<Object>
```

**Configuration**:
```javascript
// Uses environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Set in .env.local:
# VITE_API_URL=http://localhost:5000/api
```

---

## Data Flow

```
User Input
    ↓
UI Component (Home.jsx)
    ↓
Custom Hook (useInterview.js)
    ├─ Validates input
    ├─ Reads/Updates Context State
    └─ Calls API Service
         ↓
    API Service (interview.api.js)
         ↓
    Backend API
         ↓
    Response
         ↓
    Update State (Context)
         ↓
    UI Component Re-renders
```

---

## Usage Examples

### Example 1: Basic Integration

```jsx
import { useInterview } from "../hooks/useInterview";

function MyComponent() {
    const { jobDescription, setJobDescription, loading, error } = useInterview();

    return (
        <>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            {error && <p className="error">{error}</p>}
        </>
    );
}
```

### Example 2: File Handling

```jsx
const { handleResumeUpload, resumeFileName, removeResume } = useInterview();

return (
    <>
        <input type="file" onChange={(e) => handleResumeUpload(e.target.files[0])} />
        {resumeFileName && (
            <>
                <p>Uploaded: {resumeFileName}</p>
                <button onClick={removeResume}>Remove</button>
            </>
        )}
    </>
);
```

### Example 3: Form Submission

```jsx
const { generateInterviewReport, loading, success, interviewReport } = useInterview();

return (
    <>
        <button onClick={generateInterviewReport} disabled={loading}>
            {loading ? "Generating..." : "Generate Report"}
        </button>
        {success && <p className="success">✓ Report generated!</p>}
        {interviewReport && <InterviewResult data={interviewReport} />}
    </>
);
```

---

## Validation Rules

The `useInterview` hook validates:

1. **Job Description**
   - Required field
   - Max 5000 characters
   - Must not be empty/whitespace

2. **Resume File**
   - Must be PDF or DOCX
   - Max 5MB size

3. **Self Description**
   - Either resume OR self-description required
   - Not both mandatory

---

## Error Handling

Errors are displayed via the `error` state:

```javascript
try {
    const report = await interviewAPI.generateInterviewReport(formData);
    // Success handling
} catch (err) {
    setError(err.message || "Failed to generate interview report");
}
```

Common errors:
- "Job description is required"
- "Either resume or self-description is required"
- "File size should not exceed 5MB"
- "Please upload a PDF file"
- Network/API errors from backend

---

## Testing Strategy

### Unit Tests for Hook
```javascript
// Test form validation
test("validateForm returns false if jobDescription is empty", () => {
    // setup
    // assertion
});

// Test file validation
test("handleResumeUpload rejects non-PDF files", () => {
    // setup
    // assertion
});
```

### Integration Tests
```javascript
// Test full flow
test("generateInterviewReport fetches and updates state", async () => {
    // render with provider
    // fill form
    // click button
    // assert API called
    // assert state updated
});
```

---

## File Structure Summary

```
frontend/src/features/interview/
│
├── pages/
│   └── Home.jsx                    # UI Layer - Main component
│
├── styles/
│   └── Home.scss                   # UI styling
│
├── hooks/
│   └── useInterview.js             # Hook Layer - Business logic
│
├── interview.context.jsx           # State Layer - Global state
│
├── services/
│   └── interview.api.js            # API Layer - Backend communication
```

---

## Best Practices

1. ✅ **Keep UI components pure** - Delegate logic to hooks
2. ✅ **Centralize API calls** - All API requests in services folder
3. ✅ **Validate at hook level** - Before calling API
4. ✅ **Handle errors gracefully** - Show user-friendly messages
5. ✅ **Use environment variables** - For API endpoints
6. ✅ **Reuse hooks** - Don't duplicate logic across components
7. ✅ **Document complex logic** - Add comments for validation rules

---

## Future Enhancements

- [ ] Add loading skeletons
- [ ] Implement report caching
- [ ] Add analytics tracking
- [ ] Support multiple file formats
- [ ] Add progress tracking for long operations
- [ ] Implement retry logic for failed requests
- [ ] Add optimistic updates
