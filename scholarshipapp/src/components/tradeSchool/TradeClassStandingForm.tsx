import React, { useState } from 'react';

export interface ClassStanding {
    tradeHighSchoolGPA: string;
}

export const TradeClassStandingForm: React.FC<{ onUpdate: (classStanding: ClassStanding) => void }> = ({ onUpdate }) => {
    const [classStanding, setClassStanding] = useState<ClassStanding>({ tradeHighSchoolGPA: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClassStanding = { ...classStanding, tradeHighSchoolGPA: e.target.value };
        setClassStanding(updatedClassStanding);
        onUpdate(updatedClassStanding);
    };

    return (
        <div>
            <label>
                High School GPA:
                <input
                    type="text"
                    value={classStanding.tradeHighSchoolGPA}
                    onChange={handleChange}
                    placeholder="Enter GPA"
                />
            </label>
        </div>
    );
};

export default TradeClassStandingForm;
