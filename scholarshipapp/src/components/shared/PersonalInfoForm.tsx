import React, { useState } from 'react';
import '../FormStyleSheet.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const validateField = (name: string, value: string): boolean => {
        if (!value.trim()) {
            alert(`Please fill out the ${name} field.`);
            return false;
        }
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    //const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //    const { name, value } = e.target;
    //    validateField(name, value);
    //};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        for (const [key, value] of Object.entries(personalInfo)) {
            if (!validateField(key, value)) return;
        }
        onUpdate(personalInfo);
    };

    return (
        <form onSubmit={handleSubmit} className="section-container">
            <label><h5>Personal Info</h5></label>

            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handleChange}
                    placeholder="first name"
                    required // This makes the field required
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
                    required // This makes the field required
                />
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <input
                    className="none" // Ensure this class name is correct and does what you expect
                    type="date"
                    name="dateOfBirth" // This should match the key in the PersonalInfo state
                    value={personalInfo.dateOfBirth} // Bind value to the state
                    onChange={handleChange} // Use the handleChange function to update state
                    required // This makes the field required
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
                    required // This makes the field required
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
                    required // This makes the field required
                />
            </div>
        </form>
    );
};

export default PersonalInfoForm;