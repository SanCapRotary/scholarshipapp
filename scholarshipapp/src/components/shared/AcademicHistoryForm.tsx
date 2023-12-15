import React, { useState } from 'react';
import '../FormStyleSheet.css'

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
        <div className="academic-history-container">
            {academicHistory.map((entry, index) => (
                <div key={index} className="academic-history-entry">
                    <div className="academic-history-inputs">
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
                    </div>
                    <button
                        type="button"
                        onClick={() => removeAcademicEntry(index)}
                        className="remove-button"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addAcademicEntry}
                className="add-school-button"
            >
                Add School
            </button>
        </div>
    );

};

export default AcademicHistoryForm;
