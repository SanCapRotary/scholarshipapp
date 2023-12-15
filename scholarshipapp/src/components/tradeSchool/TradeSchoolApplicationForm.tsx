// src/components/tradeSchool/TradeSchoolApplicationForm.tsx
import React, { useState } from 'react';
import '../FormStyleSheet.css'

export interface TradeApplicationEntry {
    appliedTo: string;
    acceptedTo: boolean;
    programCost: string;
}

type TradeSchoolApplicationFormProps = {
    onUpdate: (entry: TradeApplicationEntry) => void;
};

const TradeSchoolApplicationForm: React.FC<TradeSchoolApplicationFormProps> = ({ onUpdate }) => {
    const [application, setApplication] = useState<TradeApplicationEntry>({
        appliedTo: '',
        acceptedTo: false,
        programCost: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const updatedApplication = {
            ...application,
            [name]: type === 'checkbox' ? checked : value
        };
        setApplication(updatedApplication);
        onUpdate(updatedApplication);
    };

    return (
        <div className="section-container">
            <label>
                School Applied To:
                <input
                    type="text"
                    name="appliedTo"
                    value={application.appliedTo}
                    onChange={handleChange}
                />
            </label>
            <label>
                Accepted:
                <input
                    type="checkbox"
                    name="acceptedTo"
                    checked={application.acceptedTo}
                    onChange={handleChange}
                />
            </label>
            <label>
                Program Cost:
                <input
                    type="text"
                    name="programCost"
                    value={application.programCost}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default TradeSchoolApplicationForm;