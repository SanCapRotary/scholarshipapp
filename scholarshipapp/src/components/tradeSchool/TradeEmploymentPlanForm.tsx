import React, { useState } from 'react';

export interface EmploymentPlan {
    employmentPlans: string;
}

type TradeEmploymentPlanFormProps = {
    onUpdate: (employmentPlan: EmploymentPlan) => void;
};

const TradeEmploymentPlanForm: React.FC<TradeEmploymentPlanFormProps> = ({ onUpdate }) => {
    const [employmentPlan, setEmploymentPlan] = useState<EmploymentPlan>({ employmentPlans: '' });
    const maxWords = 150;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const words = value.trim().split(/\s+/);
        const filteredWords = words.filter(word => word.length > 0);

        if (filteredWords.length <= maxWords || value === '') {
            setEmploymentPlan({ employmentPlans: value });

            // Update the parent component state
            onUpdate({ employmentPlans: value });
        }
    };

    const wordCount = (text: string) => text.trim().split(/\s+/).filter(word => word.length > 0).length;

    return (
        <div>
            <label>
                Employment Plans (Limit to 150 words):
                <textarea
                    name="employmentPlans"
                    value={employmentPlan.employmentPlans}
                    onChange={handleInputChange}
                />
            </label>
            <div className="smallFont">
                Word Count: {wordCount(employmentPlan.employmentPlans)}/{maxWords}
            </div>
        </div>
    );
};

export default TradeEmploymentPlanForm;
