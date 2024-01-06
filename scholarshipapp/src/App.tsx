import React, { useState, useEffect } from 'react';
import './App.css';
import { TradeSchoolForm } from './forms/TradeSchoolForm';
import UniversityForm from './forms/UniversityForm'; // Import UniversityForm
import 'bootstrap/dist/css/bootstrap.min.css';
import sancaplogo from './assets/sancaplogo.png';

function App() {
    const [activeForm, setActiveForm] = useState<React.ReactNode | null>(null);

    const handleFormChange = (formName: string) => {
        if (formName === 'tradeSchool') {
            setActiveForm(<TradeSchoolForm />);
        } else if (formName === 'university') { // Handle the case for the University form
            setActiveForm(<UniversityForm />);
        }
    };

    const handleBackButtonClick = () => {
        setActiveForm(null);
    };

    useEffect(() => {
        document.title = 'SanCap Rotary Scholarship Application';
    }, []);

    return (
        <div className="container"> {/* Use Bootstrap container for responsive padding and margin */}
            {!activeForm && (
                <>
                    <div className="text-center">
                        <img
                            src={sancaplogo}
                            className="logo img-fluid"
                            alt="Sanibel Captiva Rotary Club logo"
                        />
                    </div>

                    <div>
                        <h2>Scholarship Applications</h2>

                        <p className="read-the-docs">
                            Select which application you would like to complete:
                        </p>
                        <button className="btn btn-primary m-2" onClick={() => handleFormChange('tradeSchool')}>
                            Trade School Scholarship
                        </button>
                        <button className="btn btn-primary m-2" disabled={false} onClick={() => handleFormChange('university')}>
                            University Scholarship
                        </button>
                    </div>
                </>
            )}

            {activeForm && (
                <div>
                    {activeForm}
                    <button className="btn btn-info" onClick={handleBackButtonClick}>Back</button>
                </div>
            )}
        </div>
    );
}

export default App;
