import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        onUpdate(honorsAwardsOrgsInfo);
    }, [honorsAwardsOrgsInfo, onUpdate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount <= 150 || value === '') {
            setHonorsAwardsOrgsInfo({
                ...honorsAwardsOrgsInfo,
                [name]: value
            });
        }
    };

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
            </div>
        </div>
    );
};

export default TradeHonorsAwardsOrgsForm;
