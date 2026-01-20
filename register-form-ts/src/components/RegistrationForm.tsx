import "../styles/RegistrationForm.css";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface userInfo {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  consent: boolean;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  consent: false,
};

type FormErrors = Partial<Record<keyof userInfo, string>>;

export default function RegistrationForm() {
  const [formData, setFormData] = useState<userInfo>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "First name should be at least 3 characters";
    }

    if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last name should be at least 3 characters";
    }

    if (!formData.gender) {
      newErrors.gender = "This field is required";
    }

    const dob = new Date(formData.dateOfBirth);
    const ageLimit = new Date();
    ageLimit.setFullYear(ageLimit.getFullYear() - 18);

    if (!formData.dateOfBirth || dob > ageLimit) {
      newErrors.dateOfBirth = "Age should be greater than 18";
    }

    if (!formData.consent) {
      newErrors.consent =
        "To submit this form, please consent to being contacted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setServerResponse("");

    if (!validate()) return;

    setLoading(true);

    try {
      const resp = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        setServerResponse("User registration failed");
      } else {
        setServerResponse("User registered successfully");
        setFormData(initialState);
      }
    } catch {
      setServerResponse("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset(): void {
    setFormData(initialState);
    setErrors({});
    setServerResponse("");
  }

  return (
    <main>
      <form className="contact_form" onSubmit={handleSubmit}>
        <div className="heading_and_reset">
          <h1>Registration Form</h1>
          <p className="reset_button" onClick={handleReset}>
            Reset
          </p>
        </div>

        <div className="name_section">
          <div className="input_field">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="required_field_text">{errors.firstName}</p>
            )}
          </div>

          <div className="input_field">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="required_field_text">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="input_field">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_field">
          <p>Gender *</p>
          <div className="radio_buttons">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="radio_button">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="required_field_text">{errors.gender}</p>
          )}
        </div>

        <div className="input_field">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && (
            <p className="required_field_text">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="input_field">
          <label className="checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            I consent to being contacted by the team
          </label>
          {errors.consent && (
            <p className="required_field_text">{errors.consent}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {serverResponse && <p className="server_response">{serverResponse}</p>}
      </form>
    </main>
  );
}
