import React, { useState } from 'react';

interface EmploymentEntry {
    employment: string;
    address: string;
    title: string;
    supervisor: string;
    startDate: string;
    endDate: string;
    averageHours: string;
}

export const UniversityForm: React.FC = () => {
    const [employmentHistory, setEmploymentHistory] = useState<EmploymentEntry[]>([
        { employment: '', address: '', title: '', supervisor: '', startDate: '', endDate: '', averageHours: '' }
    ]);

    const handleEmploymentChange = (index: number, field: keyof EmploymentEntry, value: string) => {
        const updatedEmploymentHistory = employmentHistory.map((entry, i) => (
            i === index ? { ...entry, [field]: value } : entry
        ));
        setEmploymentHistory(updatedEmploymentHistory);
    };

    const addEmploymentEntry = () => {
        setEmploymentHistory([
            ...employmentHistory,
            { employment: '', address: '', title: '', supervisor: '', startDate: '', endDate: '', averageHours: '' }
        ]);
    };

    const removeEmploymentEntry = (index: number) => {
        const updatedEmploymentHistory = employmentHistory.filter((_, i) => i !== index);
        setEmploymentHistory(updatedEmploymentHistory);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Form submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            {employmentHistory.map((entry, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={entry.employment}
                        onChange={(e) => handleEmploymentChange(index, 'employment', e.target.value)}
                        placeholder="Employment"
                    />
                    {/* Add other input fields for each property in EmploymentEntry */}
                    <button type="button" onClick={() => removeEmploymentEntry(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={addEmploymentEntry}>Add Employment</button>
            <button type="submit">Submit</button>
        </form>
    );
};
