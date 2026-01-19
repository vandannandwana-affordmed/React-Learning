import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, gender, age, consent);
  };

  return (
    <>
      <form className={styles.ContactForm} onSubmit={handleSubmit}>
        <div className={styles.nameSection}>
          <div className={styles.inputField}>
            <label for="first_name">FirstName *</label>
            <input
              type="text"
              name="first_name"
              className={styles.textInput }
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <p class="required_field_text">This field is required</p>
          </div>

          <div id="last_name_field" class="input_field">
            <label for="last_name">Last Name *</label>
            <input
              type="text"
              name="last_name"
              class="text_input required_field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <p class="required_field_text">This field is required</p>
          </div>
        </div>

        <div id="email_field" class="input_field">
          <label for="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            class="text_input required_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p class="required_field_text">This field is required</p>
        </div>

        <div id="gender_section" class="input_field">
          <p>Gender Type *</p>
          <div class="radio_buttons">
            <div class="radio_button">
              <input type="radio" value={gender} onChange={(e)=> setGender("male")} name="gender_type" required />
              <p>Male</p>
            </div>
            <div class="radio_button">
              <input type="radio" value={gender} onChange={(e)=> setGender("female")} name="gender_type" required />
              <p>Female</p>
            </div>
            <div class="radio_button">
              <input type="radio" value={gender} onChange={(e)=> setGender("other")} name="gender_type" required />
              <p>Other</p>
            </div>
          </div>
          <p class="required_field_text">This field is required</p>
        </div>

        <div id="age_section">
          <label for="date_of_birth">Date of Birth *</label>
          <input type="date" id="date_of_birth" name="date_of_birth" required />
          <p class="required_field_text">Age should be greater than 18</p>
        </div>

        <div id="concent_section">
          <div id="concent_text">
            <input type="checkbox" name="consent" id="consent" required />
            <label for="consent">
              I consent to being contacted by the team
            </label>
          </div>
          <p class="required_field_text">
            To submit this form, please consent to being contacted
          </p>
        </div>

        <button id="submit_button" type="submit">
          Register
        </button>
        <div id="loader"></div>
        <p id="server_response">Server Response</p>
      </form>
    </>
  );
}
