import React, { useState } from 'react';
import '../FormStyleSheet.css'


export interface EmploymentEntry {
    employmentEmployer: string;
    employmentAddress: string;
    employmentTitle: string;
    employmentSupervisor: string;
    employmentStartDate: string;
    employmentEndDate: string;
    employmentAverageHours: string;
}

export const EmploymentForm: React.FC<{ onUpdate: (history: EmploymentEntry[]) => void }> = ({ onUpdate }) => {
    const [employmentHistory, setEmploymentHistory] = useState<EmploymentEntry[]>([
        { employmentEmployer: '', employmentAddress: '', employmentTitle: '', employmentSupervisor: '', employmentStartDate: '', employmentEndDate: '', employmentAverageHours: '' }
    ]);

    const handleEmploymentChange = (index: number, field: keyof EmploymentEntry, value: string) => {
        const updatedEmploymentHistory = employmentHistory.map((entry, i) => (
            i === index ? { ...entry, [field]: value } : entry
        ));
        setEmploymentHistory(updatedEmploymentHistory);
        onUpdate(updatedEmploymentHistory);
    };

    const addEmploymentEntry = () => {
        setEmploymentHistory([
            ...employmentHistory,
            { employmentEmployer: '', employmentAddress: '', employmentTitle: '', employmentSupervisor: '', employmentStartDate: '', employmentEndDate: '', employmentAverageHours: '' }
        ]);
    };

    const removeEmploymentEntry = (index: number) => {
        const updatedEmploymentHistory = employmentHistory.filter((_, i) => i !== index);
        setEmploymentHistory(updatedEmploymentHistory);
        onUpdate(updatedEmploymentHistory);
    };

    return (
        <>
            <div className="section-container">
                <label><h5>Employment History</h5></label>
                {employmentHistory.map((entry, index) => (
                    <div key={index} className="sub-section-container">
                        <div className="inputs-container">
                            <div className="input-group">
                                <label className="section-title">Employer</label>
                                <input
                                    type="text"
                                    value={entry.employmentEmployer}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentEmployer', e.target.value)}
                                    placeholder="Employer"
                                />
                                <input
                                    type="text"
                                    value={entry.employmentAddress}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentAddress', e.target.value)}
                                    placeholder="Address"
                                />
                                <input
                                    type="text"
                                    value={entry.employmentTitle}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentTitle', e.target.value)}
                                    placeholder="Title"
                                />
                                <input
                                    type="text"
                                    value={entry.employmentSupervisor}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentSupervisor', e.target.value)}
                                    placeholder="Supervisor"
                                />
                                <label htmlFor={`start-date-${index}`} className="date-label">Start Date</label>
                                <input
                                    type="date"
                                    id={`start-date-${index}`}
                                    value={entry.employmentStartDate}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentStartDate', e.target.value)}
                                />
                                <label htmlFor={`end-date-${index}`} className="date-label">End Date</label>
                                <input
                                    type="date"
                                    id={`end-date-${index}`}
                                    value={entry.employmentEndDate}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentEndDate', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={entry.employmentAverageHours}
                                    onChange={(e) => handleEmploymentChange(index, 'employmentAverageHours', e.target.value)}
                                    placeholder="Average Hours Per Week"
                                />
                            </div>
                            <button type="button" className="remove-x-button" onClick={() => removeEmploymentEntry(index)}>X</button>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addEmploymentEntry}>Add Employment</button>
            </div>
        </>

    );
};

export default EmploymentForm;