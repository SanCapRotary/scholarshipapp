import React, { useState } from 'react';

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    dateOfBirth: string; // This could be Date type if you want to handle Date objects
    mailingAddress: string;
    emailAddress: string;
};

type PersonalInfoFormProps = {
    onUpdate: (info: PersonalInfo) => void; // This function will be used to update the state in the parent component
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onUpdate }) => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        mailingAddress: '',
        emailAddress: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInfo = {
            ...personalInfo,
            [name]: value
        };
        setPersonalInfo(updatedInfo);

        // Update the parent component state
        onUpdate(updatedInfo);
    };

    return (
        <form>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Date of Birth:
                <input
                    type="date"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handleChange}
                />
            </label>
            <label>
                Mailing Address:
                <input
                    type="text"
                    name="mailingAddress"
                    value={personalInfo.mailingAddress}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email Address:
                <input
                    type="email"
                    name="emailAddress"
                    value={personalInfo.emailAddress}
                    onChange={handleChange}
                />
            </label>
        </form>
    );
};

export default PersonalInfoForm;
