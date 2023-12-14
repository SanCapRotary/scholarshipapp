// src/contexts/TradeSchoolContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PersonalInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    mailingAddress: string;
    emailAddress: string;
}

interface AcademicEntry {
    schoolAttended: string;
    schoolAttendedDates: string;
}

interface TradeSchoolFormData {
    personalInfo: PersonalInfo;
    academicHistory: AcademicEntry[];
}

interface TradeSchoolContextProps {
    formData: TradeSchoolFormData;
    updateFormData: (field: keyof TradeSchoolFormData, value: PersonalInfo | AcademicEntry[]) => void;
}

interface ProviderProps {
    children: ReactNode;
}

// Create the context with a default value
const TradeSchoolContext = createContext<TradeSchoolContextProps>({} as TradeSchoolContextProps);

// Create a provider component
export const TradeSchoolProvider: React.FC<ProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<TradeSchoolFormData>({
        personalInfo: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            mailingAddress: '',
            emailAddress: ''
        },
        academicHistory: []
    });

    const updateFormData = (field: keyof TradeSchoolFormData, value: PersonalInfo | AcademicEntry[]) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <TradeSchoolContext.Provider value={{ formData, updateFormData }}>
            {children}
        </TradeSchoolContext.Provider>
    );
};

// Custom hook to use the trade school context
export const useTradeSchoolContext = () => useContext(TradeSchoolContext);

export default TradeSchoolProvider;
