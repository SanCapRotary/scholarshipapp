import React, { useState } from 'react';

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
        <div>
            <div>
                <label>
                    Honors and Awards (Limit to 150 words):
                    <textarea
                        name="honorsAndAwards"
                        value={honorsAwardsOrgsInfo.honorsAndAwards}
                        onChange={handleInputChange}
                    />
                </label>
                <div className="smallFont">
                    Word Count: {wordCount(honorsAwardsOrgsInfo.honorsAndAwards)}/{maxWords}
                </div>
            </div>
            <div>
                <label>
                    Organizations and Leadership Roles (Limit to 150 words):
                    <textarea
                        name="organizationsAndLeadership"
                        value={honorsAwardsOrgsInfo.organizationsAndLeadership}
                        onChange={handleInputChange}
                    />
                </label>
                <div className="smallFont">
                    Word Count: {wordCount(honorsAwardsOrgsInfo.organizationsAndLeadership)}/{maxWords}
                </div>
            </div>
        </div>
    );
};

export default TradeHonorsAwardsOrgsForm;
