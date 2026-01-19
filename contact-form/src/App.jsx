import './App.css'
import ContactForm from './ContactForm'

function App() {
  return (
    <>
    <main>
      <div className="headingAndResetButton">
        <h1>Registration Form</h1>
        <p className="resetButton">Reset</p>
      </div>

      <ContactForm />

    </main>
    </>
  )
}

export default App
