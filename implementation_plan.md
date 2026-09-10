# Connect Next.js Portfolio to MongoDB Atlas with Mongoose

Connect the personal portfolio website to MongoDB Atlas using Mongoose, establishing a cached database connection utility, defining a Contact model, creating a POST API route (`app/api/contact/route.ts`), and wiring the existing `Contact.tsx` component with full form submission handling, loading states, and error/success feedback.

## User Review Required

> [!IMPORTANT]
> The database connection string must remain securely stored in `.env` as `MONGODB_URI` and will never be exposed, printed, or echoed in code or client responses.
> `.gitignore` already contains `.env` to prevent accidental commits of secrets.

## Proposed Changes

### Database & Models Layer

#### [NEW] [mongodb.ts](file:///c:/Users/HP/Downloads/ILERI---PORTFOLIO/lib/mongodb.ts)
- Read `process.env.MONGODB_URI` and throw a descriptive error if missing.
- Implement the standard Next.js + Mongoose global cache pattern (`global.mongoose = { conn, promise }`).
- Export an asynchronous `dbConnect()` function returning the active Mongoose connection.

#### [NEW] [Contact.ts](file:///c:/Users/HP/Downloads/ILERI---PORTFOLIO/models/Contact.ts)
- Define TypeScript interface `IContact`.
- Create Mongoose `ContactSchema` with:
  - `name`: string, required, trimmed.
  - `email`: string, required, trimmed, lowercase, validated format with regex.
  - `message`: string, required, trimmed.
  - `createdAt`: Date, default `Date.now`.
- Guard against model re-compilation on hot-reload: `mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)`.

---

### API Route Layer

#### [NEW] [route.ts](file:///c:/Users/HP/Downloads/ILERI---PORTFOLIO/app/api/contact/route.ts)
- Handle `POST` requests in Next.js App Router format (`export async function POST(request: Request)`).
- Parse JSON body and validate required fields (`name`, `email`, `message`) and email format.
- Return HTTP 400 Bad Request with a clear validation error message if invalid.
- Call `dbConnect()` and create the contact record in MongoDB.
- Return HTTP 201 Created on success.
- Catch errors, log them securely on the server, and return HTTP 500 with a generic user-safe error message (never exposing internals, stack traces, or connection strings).

---

### UI / Component Layer

#### [MODIFY] [Contact.tsx](file:///c:/Users/HP/Downloads/ILERI---PORTFOLIO/components/Contact.tsx)
- Add loading/submitting state (`isSubmitting`).
- Update form handling to prevent default submission.
- Combine first and last name into `name` (or send `{ name, email, message }`).
- Send `POST` request with `Content-Type: application/json` to `/api/contact`.
- On success:
  - Clear the form fields and field error states.
  - Display success feedback message.
- On failure:
  - Display error feedback message.
  - Preserve user inputs so the user does not lose their entered message.
- Update the Send button to display dynamic loading text (`SENDING...` vs `SEND`) and disable the button while submitting.
- Clean up inner `<a href="mailto:...">` tag on the button so click events trigger the API submission cleanly.

---

### Configuration & Security

- Verify `.env` is listed in `.gitignore` (confirmed on line 27 of `.gitignore`).

---

## Verification Plan

### Automated / Build Verification
- Run TypeScript compiler check (`npx tsc --noEmit`) to verify all types, imports, and models compile cleanly.
- Verify Mongoose package dependency.

### Manual Verification
- Test contact form submission flow in the browser or via API test.
- Verify validation errors (empty fields, invalid email format) return 400.
- Verify loading state disables button and prevents duplicate submissions.
- Verify success clears the form and shows success banner.
- Verify error state displays message and retains input values.
