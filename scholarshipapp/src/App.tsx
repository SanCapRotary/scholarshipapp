import React, { useState, useEffect } from 'react';
import './App.css';
import { TradeSchoolForm } from './forms/TradeSchoolForm';
import sancaplogo from './assets/sancaplogo.png';

function App() {
    const [activeForm, setActiveForm] = useState<React.ReactNode | null>(null);

    const handleFormChange = (formName: string) => {
        if (formName === 'tradeSchool') {
            setActiveForm(<TradeSchoolForm />);
        }
    };

    const handleBackButtonClick = () => {
        setActiveForm(null);
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: '100%', // Make content adapt to the viewport width
        margin: '0 auto', // Center the content horizontally
        padding: '20px',
        boxSizing: 'border-box', // Specify box-sizing
        textAlign: 'center', // Center text within the container
    };

    const buttonStyle = {
        margin: '5px',
    };

    useEffect(() => {
        document.title = 'SanCap Rotary Scholarship Application';
    }, []);

    return (
        <div style={containerStyle}>
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
                    {activeForm}
                    <button onClick={handleBackButtonClick}>Back</button>
                </div>
            )}
        </div>
    );
}

export default App;
