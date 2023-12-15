import React, { useState } from 'react';
import '../FormStyleSheet.css'


export type PersonalInfo = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    mailingAddress: string;
    emailAddress: string;
};

type PersonalInfoFormProps = {
    onUpdate: (info: PersonalInfo) => void;
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onUpdate }) => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        mailingAddress: '',
        emailAddress: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInfo = {
            ...personalInfo,
            [name]: value,
        };
        setPersonalInfo(updatedInfo);
        onUpdate(updatedInfo);
    };

    return (
        <div className="personal-info-container">
            <label>Personal Info</label>

            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handleChange}
                    placeholder="first name"
                />
            </div>
            <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handleChange}
                    placeholder="last name"
                />
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Mailing Address:</label>
                <input
                    type="text"
                    name="mailingAddress"
                    value={personalInfo.mailingAddress}
                    onChange={handleChange}
                    placeholder="street/city/state/zip"
                />
            </div>
            <div className="form-group">
                <label>Email Address:</label>
                <input
                    type="email"
                    name="emailAddress"
                    value={personalInfo.emailAddress}
                    onChange={handleChange}
                    placeholder="name@domain"

                />
            </div>
        </div>
    );



};

export default PersonalInfoForm;
