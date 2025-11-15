// import React from 'react';
// import { Link } from 'react-router-dom'; // Use Link for navigation
// import './Calmness.css'; // We will create this

// export default function Calmness() {
//   return (
//     <div className="calm-container">
//       <div className="calm-card">
//         <Link to="/" className="back-link">&larr; Back to Dashboard</Link>

//         <h2>Box Breathing Exercise</h2>
//         <p>Take a moment to center yourself. Follow these steps:</p>

//         <div className="breathing-steps">
//           <div className="step">
//             <strong>1. Inhale</strong>
//             <p>Breathe in slowly through your nose for 4 seconds.</p>
//           </div>
//           <div className="step">
//             <strong>2. Hold</strong>
//             <p>Hold your breath for 4 seconds.</p>
//           </div>
//           <div className="step">
//             <strong>3. Exhale</strong>
//             <p>Breathe out slowly through your mouth for 4 seconds.</p>
//           </div>
//           <div className="step">
//             <strong>4. Hold</strong>
//             <p>Hold the empty breath for 4 seconds.</p>
//           </div>
//         </div>

//         <p className="subtext">Repeat this cycle 3-5 times or until you feel calm.</p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Calmness.css';

// A few sample quotes
const quotes = [
  { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
  { text: "Almost everything will work again if you unplug it for a few minutes... including you.", author: "Anne Lamott" }
];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

export default function Calmness() {
  // This state will track what to show: null (ask), 'feedback', or 'quote'
  const [showSection, setShowSection] = useState(null);

  const handleFeedback = (feeling) => {
    // In a real app, you might save this. For now, just show a thank you.
    alert(`Thanks for the feedback! You're feeling: ${feeling}`);
    setShowSection(null); // Reset
  };

  return (
    <div className="calm-container">
      <div className="calm-card">
        <Link to="/" className="back-link">&larr; Back to Dashboard</Link>
        
        <h2>Box Breathing Exercise</h2>
        <p>Take a moment to center yourself. Follow these steps:</p>

        {/* This is the original static breathing exercise */}
        <div className="breathing-steps">
          <div className="step">
            <strong>1. Inhale</strong>
            <p>Breathe in slowly through your nose for 4 seconds.</p>
          </div>
          <div className="step">
            <strong>2. Hold</strong>
            <p>Hold your breath for 4 seconds.</p>
          </div>
          <div className="step">
            <strong>3. Exhale</strong>
            <p>Breathe out slowly through your mouth for 4 seconds.</p>
          </div>
          <div className="step">
            <strong>4. Hold</strong>
            <p>Hold the empty breath for 4 seconds.</p>
          </div>
        </div>
        <p className="subtext">Repeat this cycle 3-5 times or until you feel calm.</p>

        {/* --- NEW SECTION --- */}
        <div className="post-exercise-section">
          <hr />
          <h3>Did you complete the exercise?</h3>
          <p>Would you like to log how you're feeling now?</p>
          
          <div className="prompt-buttons">
            <button className="prompt-btn yes-btn" onClick={() => setShowSection('feedback')}>
              Yes, I'll log my feeling
            </button>
            <button className="prompt-btn no-btn" onClick={() => setShowSection('quote')}>
              No, not right now
            </button>
          </div>

          {/* This part shows *if* the user clicks "Yes" */}
          {showSection === 'feedback' && (
            <div className="feedback-area">
              <p>How do you feel?</p>
              <div className="feedback-options">
                <button onClick={() => handleFeedback('Better')}>Better</button>
                <button onClick={() => handleFeedback('Same')}>Same</button>
                <button onClick={() => handleFeedback('Worse')}>Worse</button>
              </div>
            </div>
          )}

          {/* This part shows *if* the user clicks "No" */}
          {showSection === 'quote' && (
            <div className="quote-area">
              <p>That's okay. Here's a thought for your day:</p>
              <blockquote className="quote-text">
                "{randomQuote.text}"
                <span>- {randomQuote.author}</span>
              </blockquote>
            </div>
          )}
        </div>
        {/* --- END OF NEW SECTION --- */}
        
      </div>
    </div>
  );
}