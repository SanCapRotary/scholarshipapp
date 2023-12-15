import React, { useState } from 'react';
import '../FormStyleSheet.css'

export interface HonorsAwardsOrgsInfo {
    honorsAndAwards: string;
    organizationsAndLeadership: string;
}

type TradeHonorsAwardsOrgsFormProps = {
    onUpdate: (info: HonorsAwardsOrgsInfo) => void;
};

const TradeHonorsAwardsOrgsForm: React.FC<TradeHonorsAwardsOrgsFormProps> = ({ onUpdate }) => {
    const [honorsAwardsOrgsInfo, setHonorsAwardsOrgsInfo] = useState<HonorsAwardsOrgsInfo>({
        honorsAndAwards: '',
        organizationsAndLeadership: ''
    });
    const maxWords = 150;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const words = value.trim().split(/\s+/);
        const filteredWords = words.filter(word => word.length > 0);

        if (filteredWords.length <= maxWords || value === '') {
            setHonorsAwardsOrgsInfo({
                ...honorsAwardsOrgsInfo,
                [name]: value
            });

            // Update the parent component state
            onUpdate({
                ...honorsAwardsOrgsInfo,
                [name]: value
            });
        }
    };

    const wordCount = (text: string) => text.trim().split(/\s+/).filter(word => word.length > 0).length;

    return (
        <div className="trade-honors-awards-container">
            <div className="trade-honors-awards-form-group">
                <label htmlFor="honorsAndAwards">Honors and Awards:</label>
                <span className="word-count">
                    Word Count: {wordCount(honorsAwardsOrgsInfo.honorsAndAwards)}/{maxWords}
                </span>
                <textarea
                    id="honorsAndAwards"
                    name="honorsAndAwards"
                    value={honorsAwardsOrgsInfo.honorsAndAwards}
                    onChange={handleInputChange}
                />
            </div>
            <div className="trade-honors-awards-form-group">
                <label htmlFor="organizationsAndLeadership">Organizations and Leadership Roles:</label>
                <span className="word-count">
                    Word Count: {wordCount(honorsAwardsOrgsInfo.organizationsAndLeadership)}/{maxWords}
                </span>
                <textarea
                    id="organizationsAndLeadership"
                    name="organizationsAndLeadership"
                    value={honorsAwardsOrgsInfo.organizationsAndLeadership}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );

};

export default TradeHonorsAwardsOrgsForm;
