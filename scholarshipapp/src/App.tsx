import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sancaplogo from './assets/sancaplogo.png';

//Publish to GitHub Pages
//npm run deploy

function App() {
    const [activeForm, setActiveForm] = useState<React.ReactNode | null>(null);


    const openPDF = (fileName: string) => {
        // Adjusted path assuming the PDFs are directly in the public folder
        const basePath = window.location.origin;
        window.open(`${basePath}/${fileName}`, '_blank');
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
                        <button className="btn btn-primary m-2" onClick={() => openPDF('TechSchoolApplication.pdf')}>
                            Trade School Scholarship
                        </button>
                        <p> </p>
                        <button className="btn btn-primary m-2" onClick={() => openPDF('UniversityApplication.pdf')}>
                            University Scholarship
                        </button>
                        <button className="btn btn-primary m-2" onClick={() => openPDF('ApplicationInstructions.pdf')}>
                            University Instructions
                        </button>

                        <p className="read-the-docs">
                            At this time, we are only accepting applications for Florida Gulf Coast University.
                        </p>

                        <p className="read-the-docs">
                            Your application must be postmarked no later than April 15th, 2024.
                        </p>
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