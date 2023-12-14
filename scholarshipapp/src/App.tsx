import { useState } from 'react'
import './App.css'
import { TradeSchoolForm } from './forms/TradeSchoolForm'
import TradeSchoolProvider from './contexts/TradeSchoolContext'
import sancaplogo from './assets/sancaplogo.png'

function App() {

    return (
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
            <h1>Sanibel Captiva Rotary Scholarship Applications</h1>

            <p className="read-the-docs">
                Select which application you would like to complete:
                </p>
            </div>
            <div>
                {/* Other components */}
                <TradeSchoolProvider>
                    <TradeSchoolForm />
                </TradeSchoolProvider>
            </div>
        </>
    )
}

export default App