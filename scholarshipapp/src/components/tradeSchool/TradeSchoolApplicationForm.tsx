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
            <div className="input-group">
                <label htmlFor="appliedTo">School Applied To:</label>
                <input
                    type="text"
                    id="appliedTo"
                    name="appliedTo"
                    placeholder="school name"
                    value={application.appliedTo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="acceptedTo">Accepted:</label>
                <input
                    type="checkbox"
                    id="acceptedTo"
                    name="acceptedTo"
                    checked={application.acceptedTo}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="programCost">Program Cost:</label>
                <input
                    type="text"
                    id="programCost"
                    name="programCost"
                    placeholder="program cost"
                    value={application.programCost}
                    onChange={handleChange}
                />
            </div>
        </div>
    );

};

export default TradeSchoolApplicationForm;