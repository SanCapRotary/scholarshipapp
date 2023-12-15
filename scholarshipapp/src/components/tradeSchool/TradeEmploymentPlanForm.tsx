import React, { useState } from 'react';
import '../FormStyleSheet.css'

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
        <div className="trade-employment-plan-container">
            <div className="trade-employment-plan-form-group">
                <label htmlFor="employmentPlans">Employment Plans:</label>
                <span className="word-count">
                    Word Count: {wordCount(employmentPlan.employmentPlans)}/{maxWords}
                </span>
                <textarea
                    id="employmentPlans"
                    name="employmentPlans"
                    value={employmentPlan.employmentPlans}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default TradeEmploymentPlanForm;
