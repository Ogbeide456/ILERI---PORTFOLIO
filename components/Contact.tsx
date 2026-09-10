"use client";
import { useState, type FormEvent, type ChangeEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s''-]+$/;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on change
    if (fieldErrors[name as keyof FormErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear global error message when user makes edits
    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const { firstName, lastName, email, message } = formData;

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();

    if (!trimmedFirst) {
      errors.firstName = "Please enter your first name.";
    } else if (!nameRegex.test(trimmedFirst)) {
      errors.firstName = "Please enter a valid first name.";
    }

    if (!trimmedLast) {
      errors.lastName = "Please enter your last name.";
    } else if (!nameRegex.test(trimmedLast)) {
      errors.lastName = "Please enter a valid last name.";
    }

    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!trimmedMsg) {
      errors.message = "Please write a message.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!validateForm()) {
      setErrorMsg("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      let data: { error?: string; message?: string; success?: boolean; data?: unknown } = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}. ${rawText.slice(0, 80)}`);
        }
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      // Success: Clear form and display success message
      setSuccessMsg("✅ Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setFieldErrors({});

      setTimeout(() => {
        setSuccessMsg("");
      }, 6000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending your message. Please try again.";
      setErrorMsg(`❌ ${errorMessage}`);
      // Note: formData is intentionally preserved so user does not lose entered data
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-wrapper reveal">
          <h2 className="sub-title">Contact Me</h2>
          <p>
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Reach out through any of the channels below.
          </p>

          <form className="inputdetails" onSubmit={handleSubmit} noValidate>
            <div id="textboxx">
              <div className="form-field">
                <label htmlFor="contact-email1">Email:</label>
                <input
                  type="email"
                  id="contact-email1"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                {fieldErrors.email && (
                  <span className="field-error-msg">{fieldErrors.email}</span>
                )}
              </div>
              <br />
              <div className="form-field">
                <label htmlFor="contact-firstname">First Name:</label>
                <input
                  type="text"
                  id="contact-firstname"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                {fieldErrors.firstName && (
                  <span className="field-error-msg">{fieldErrors.firstName}</span>
                )}
              </div>
              <br />
              <div className="form-field">
                <label htmlFor="contact-lastname">Last Name:</label>
                <input
                  type="text"
                  id="contact-lastname"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                {fieldErrors.lastName && (
                  <span className="field-error-msg">{fieldErrors.lastName}</span>
                )}
              </div>
              <br />
              <div className="form-field form-field--textarea">
                <label htmlFor="contact-message">Message:</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                ></textarea>
                {fieldErrors.message && (
                  <span className="field-error-msg">{fieldErrors.message}</span>
                )}
              </div>
            </div>

            <div className="form-btn-wrap">
              <button
                type="submit"
                id="sendBtn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND"}
              </button>

              {successMsg && (
                <p className="success-msg">{successMsg}</p>
              )}
              {errorMsg && (
                <p className="error-msg">{errorMsg}</p>
              )}
            </div>
          </form>

          <div className="contact-links">
            <a
              href="mailto:ileriunique40@gmail.com"
              className="contact-chip"
            >
              ✉️ ileriunique40@gmail.com
            </a>
            <a
              href="tel:+2348128358675"
              className="contact-chip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 5.72 5.72l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +234 812 835 8675
            </a>
            <a
              href="https://github.com/Ogbeide456"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-chip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/samuel-ogbeide-a99988284/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-chip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#0A66C2"
                style={{ flexShrink: 0 }}
              >
                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.98-1.98c0-1.093.887-1.98 1.98-1.98s1.98.887 1.98 1.98a1.98 1.98 0 0 1-1.98 1.98zm1.956 13.019H3.379V9h3.914v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://x.com/OgbeideSpezial"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-chip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
              X
            </a>
            <a
              href="https://www.instagram.com/ileri9806/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-chip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                style={{ flexShrink: 0 }}
              >
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#ig-grad)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
