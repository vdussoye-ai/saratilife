import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SaratiLogo } from "../components/Logo";

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSending(true);
    // Simulate send — replace with real endpoint when available
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      fontFamily: "var(--font-body)",
      color: "var(--charcoal)",
    }}>
      <Helmet>
        <title>Contact — SaratiLife</title>
        <meta name="description" content="Get in touch with SaratiLife. Questions, feedback, or partnership ideas — we'd love to hear from you." />
        <link rel="canonical" href="https://saratilife.com/contact" />
        <meta property="og:title" content="Contact — SaratiLife" />
        <meta property="og:description" content="Get in touch with SaratiLife. Questions, feedback, or partnership ideas — we'd love to hear from you." />
        <meta property="og:url" content="https://saratilife.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>

      <style>{`
        .contact-input {
          width: 100%;
          padding: 14px 16px;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          color: var(--charcoal);
          background: var(--white);
          border: 1.5px solid var(--light-gray);
          border-radius: var(--radius-sm);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .contact-input:focus {
          border-color: var(--saffron);
        }
        .contact-input[aria-invalid="true"] {
          border-color: var(--health);
        }
        .contact-input::placeholder {
          color: var(--light-gray);
        }
        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 54px;
          background: var(--saffron);
          color: var(--white);
          border: none;
          border-radius: var(--radius-full);
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 4px 20px rgba(232,137,12,0.2);
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(232,137,12,0.3);
        }
        .contact-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .contact-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-submit:focus-visible {
          outline: 3px solid var(--saffron);
          outline-offset: 3px;
        }
        @media (max-width: 768px) {
          .contact-hero { padding: 100px 20px 40px !important; }
          .contact-heading { font-size: clamp(28px, 7vw, 36px) !important; }
        }
      `}</style>

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 24px",
        background: "rgba(248,246,243,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(200,138,42,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
          <SaratiLogo size={28} />
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-lg)",
            fontWeight: 700,
            color: "var(--charcoal)",
          }}>
            SaratiLife
          </span>
        </a>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 500,
            color: "var(--slate)",
            cursor: "pointer",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--saffron)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--slate)"; }}
        >
          &larr; Home
        </button>
      </nav>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section
          className="contact-hero"
          style={{
            padding: "140px 24px 48px",
            maxWidth: "560px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div style={{
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            color: "var(--saffron-dark)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "var(--space-md)",
          }}>
            Contact
          </div>
          <h1
            className="contact-heading"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-4xl)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--charcoal)",
              marginBottom: "var(--space-md)",
            }}
          >
            Let's connect
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-lg)",
            color: "var(--slate)",
            lineHeight: 1.7,
          }}>
            Have a question, feedback, or partnership idea? We'd love to hear from you.
          </p>
        </section>

        {/* ═══════ FORM / CONFIRMATION ═══════ */}
        <section style={{
          padding: "var(--space-xl) 24px var(--space-3xl)",
          maxWidth: "520px",
          margin: "0 auto",
        }}>
          {submitted ? (
            <div style={{
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-2xl)",
              border: "1px solid var(--light-gray)",
              textAlign: "center",
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "var(--radius-full)",
                background: "var(--saffron-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto var(--space-lg)",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="var(--saffron)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-xl)",
                fontWeight: 700,
                color: "var(--charcoal)",
                marginBottom: "var(--space-sm)",
              }}>
                Message sent
              </h2>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-md)",
                color: "var(--slate)",
                lineHeight: 1.7,
                marginBottom: "var(--space-xl)",
              }}>
                Thank you, {form.name.split(" ")[0]}! We've received your message and will get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                  color: "var(--saffron)",
                  cursor: "pointer",
                }}
              >
                &larr; Back to home
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-2xl)",
                border: "1px solid var(--light-gray)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  className="contact-input"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <p id="name-error" role="alert" style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--health)",
                    marginTop: "var(--space-xs)",
                  }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  className="contact-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" role="alert" style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--health)",
                    marginTop: "var(--space-xs)",
                  }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="contact-input"
                  placeholder="How can we help?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  style={{ resize: "vertical", lineHeight: "var(--line-height)" }}
                />
                {errors.message && (
                  <p id="message-error" role="alert" style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--health)",
                    marginTop: "var(--space-xs)",
                  }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer style={{
          padding: "40px var(--space-lg)",
          borderTop: "1px solid rgba(200,138,42,0.08)",
          textAlign: "center",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-sm)",
            marginBottom: "var(--space-sm)",
          }}>
            <SaratiLogo size={18} />
            <span style={{
              fontFamily: "var(--font-heading)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--charcoal)",
            }}>
              SaratiLife
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-xs)",
            color: "var(--slate)",
          }}>
            Flowing with intention. For professionals who refuse to go with the flow.
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "var(--light-gray)",
            marginTop: "var(--space-xs)",
          }}>
            &copy; {new Date().getFullYear()} SaratiLife. The Five Capitals Framework.
          </p>
        </footer>
      </main>
    </div>
  );
}
