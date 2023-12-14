import React, { useState } from 'react';

export interface AcademicEntry {
    schoolAttended: string;
    schoolAttendedDates: string;
}

export const AcademicHistoryForm: React.FC<{ onUpdate: (history: AcademicEntry[]) => void }> = ({ onUpdate }) => {
    const [academicHistory, setAcademicHistory] = useState<AcademicEntry[]>([
        { schoolAttended: '', schoolAttendedDates: '' }
    ]);

    const handleAcademicChange = (index: number, field: keyof AcademicEntry, value: string) => {
        const updatedAcademicHistory = academicHistory.map((entry, i) => (
            i === index ? { ...entry, [field]: value } : entry
        ));
        setAcademicHistory(updatedAcademicHistory);
        onUpdate(updatedAcademicHistory);
    };

    const addAcademicEntry = () => {
        setAcademicHistory([
            ...academicHistory,
            { schoolAttended: '', schoolAttendedDates: '' }
        ]);
    };

    const removeAcademicEntry = (index: number) => {
        const updatedAcademicHistory = academicHistory.filter((_, i) => i !== index);
        setAcademicHistory(updatedAcademicHistory);
        onUpdate(updatedAcademicHistory);
    };

    return (
        <>
            {academicHistory.map((entry, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={entry.schoolAttended}
                        onChange={(e) => handleAcademicChange(index, 'schoolAttended', e.target.value)}
                        placeholder="School Attended"
                    />
                    <input
                        type="text"
                        value={entry.schoolAttendedDates}
                        onChange={(e) => handleAcademicChange(index, 'schoolAttendedDates', e.target.value)}
                        placeholder="Dates Attended"
                    />
                    <button type="button" onClick={() => removeAcademicEntry(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAcademicEntry}>
                Add School
            </button>
        </>
    );
};

export default AcademicHistoryForm;
