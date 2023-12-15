import React, { useState } from 'react';
import './App.css';
import { TradeSchoolForm } from './forms/TradeSchoolForm';
// import { UniversityForm } from './forms/UniversityForm'; // Import the UniversityForm component
import sancaplogo from './assets/sancaplogo.png';

function App() {
    const [activeForm, setActiveForm] = useState<React.ReactNode | null>(null);

    const handleFormChange = (formName: string) => {
        if (formName === 'tradeSchool') {
            setActiveForm(<TradeSchoolForm />);
            // Uncomment below if you have UniversityForm
            // setActiveForm(<UniversityForm />);
        }
    };

    const handleBackButtonClick = () => {
        setActiveForm(null); // Clear the active form to go back to the initial state
    };

    const buttonStyle = {
        margin: '5px'
    };

    return (
        <>
            {/* Conditionally render the content */}
            {!activeForm && (
                <>
                    <div>
                        <img
                            src={sancaplogo}
                            className="logo"
                            alt="Sanibel Captiva Rotary Club logo"
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </div>

                    <div>
                        <h1>Rotary Club of Sanibel Captiva</h1>
                        <h2>Scholarship Applications</h2>

                        <p className="read-the-docs">
                            Select which application you would like to complete:
                        </p>
                        <button style={buttonStyle} onClick={() => handleFormChange('tradeSchool')}>
                            Trade School Scholarship
                        </button>
                        <button disabled={true} style={buttonStyle} onClick={() => handleFormChange('tradeSchool')}>
                            University Scholarship
                        </button>
                    </div>
                </>
            )}

            {activeForm && (
                <div>
                    {/* Render the active form */}
                    {activeForm}
                    <button onClick={handleBackButtonClick}>Back</button>
                </div>
            )}
        </>
    );
}

export default App;
