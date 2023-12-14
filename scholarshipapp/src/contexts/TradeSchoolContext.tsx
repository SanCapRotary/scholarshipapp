import React, { createContext, useState, useContext, ReactNode } from 'react';
import { GuardianEntry, SiblingEntry } from '../components/shared/FamilyInformationForm'; // Adjust the path as needed
import { ClassStanding } from '../components/tradeSchool/TradeClassStandingForm'; // Adjust path as needed


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

interface EmploymentEntry {
    employmentEmployer: string;
    employmentAddress: string;
    employmentTitle: string;
    employmentSupervisor: string;
    employmentStartDate: string;
    employmentEndDate: string;
    employmentAverageHours: string;
}

interface TradeSchoolFormData {
    personalInfo: PersonalInfo;
    academicHistory: AcademicEntry[];
    classStanding: ClassStanding;
    employmentHistory: EmploymentEntry[];
    guardians: GuardianEntry[];
    siblings: SiblingEntry[];
}

interface TradeSchoolContextProps {
    formData: TradeSchoolFormData;
    updateFormData: (field: keyof TradeSchoolFormData, value: PersonalInfo | AcademicEntry[] | EmploymentEntry[] | GuardianEntry[] | SiblingEntry[] | ClassStanding) => void;
}


interface ProviderProps {
    children: ReactNode;
}

const TradeSchoolContext = createContext<TradeSchoolContextProps>({} as TradeSchoolContextProps);

export const TradeSchoolProvider: React.FC<ProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<TradeSchoolFormData>({
        personalInfo: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            mailingAddress: '',
            emailAddress: ''
        },
        academicHistory: [],
        classStanding: { tradeHighSchoolGPA: '' },
        employmentHistory: [],
        guardians: [],
        siblings: []
    });

    const updateFormData = (field: keyof TradeSchoolFormData, value: PersonalInfo | AcademicEntry[] | EmploymentEntry[] | GuardianEntry[] | SiblingEntry[] | ClassStanding) => {
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

export const useTradeSchoolContext = () => useContext(TradeSchoolContext);

export default TradeSchoolProvider;
