import React, { useState } from 'react';
import '../FormStyleSheet.css'

export interface ClassStanding {
    tradeHighSchoolGPA: string;
}

export const TradeClassStandingForm: React.FC<{ onUpdate: (classStanding: ClassStanding) => void }> = ({ onUpdate }) => {
    const [classStanding, setClassStanding] = useState<ClassStanding>({ tradeHighSchoolGPA: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedClassStanding = { ...classStanding, tradeHighSchoolGPA: e.target.value };
        setClassStanding(updatedClassStanding);
        onUpdate(updatedClassStanding);
        console.log("Updated Class Standing:", updatedClassStanding);

    };

    return (
        <div className="section-container">
            <div className="trade-class-standing-form-group">
                <label htmlFor="tradeHighSchoolGPA">High School GPA:</label>
                <input
                    type="text"
                    id="tradeHighSchoolGPA"
                    value={classStanding.tradeHighSchoolGPA}
                    onChange={handleChange}
                    placeholder="Enter GPA"
                />
            </div>
            <div>
                <p style={{ textAlign: 'left' }}>
                    Student must have completed at least two courses in one of the high school Career and Technical Academies and be on track for certification/degree in the same field.
                </p>

                <p style={{ textAlign: 'left' }}>
                    To apply for this scholarship, you must be a graduating senior.
                </p>
            </div>



        </div>
    );



};

export default TradeClassStandingForm;