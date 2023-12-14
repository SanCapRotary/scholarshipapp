// src/forms/TradeSchoolForm.tsx

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTradeSchoolContext } from '../contexts/TradeSchoolContext';
import PersonalInfoForm, { PersonalInfo } from '../components/shared/PersonalInfoForm';
import AcademicHistoryForm, { AcademicEntry } from '../components/shared/AcademicHistoryForm';
import '../components/FormStyleSheet.css';

export const TradeSchoolForm: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const { formData, updateFormData } = useTradeSchoolContext();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState('');

    const handlePersonalInfoUpdate = (info: PersonalInfo) => {
        updateFormData('personalInfo', info);
    };

    const handleAcademicHistoryUpdate = (history: AcademicEntry[]) => {
        updateFormData('academicHistory', history);
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(false);
        setSubmissionError('');

        // Prepare the schools string in plain text
        const schoolDetailsString = formData.academicHistory.map(entry =>
            `School: ${entry.schoolAttended}, Dates: ${entry.schoolAttendedDates}`
        ).join('\n'); // Separate each entry with a new line

        const tradeSchoolData = {
            firstName: formData.personalInfo.firstName,
            lastName: formData.personalInfo.lastName,
            emailAddress: formData.personalInfo.emailAddress,
            mailingAddress: formData.personalInfo.mailingAddress,
            dateOfBirth: formData.personalInfo.dateOfBirth,
            schoolDetailsString: schoolDetailsString
        };

        emailjs.send('service_55zyzln', 'template_rbwigdh', tradeSchoolData, '5MK4rWbh_fCErDO7u')
            .then((result) => {
                setIsSubmitted(true);
                console.log(result.text);
            }, (error) => {
                setSubmissionError(error.text);
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <PersonalInfoForm onUpdate={handlePersonalInfoUpdate} />
            <AcademicHistoryForm onUpdate={handleAcademicHistoryUpdate} />
            {/* ... any other form components go here ... */}

            {isSubmitted && !submissionError && (
                <div className="submissionSuccess">
                    Your application has been sent successfully!
                </div>
            )}

            {submissionError && (
                <div className="submissionError">
                    Failed to send the application: {submissionError}
                </div>
            )}

            <p>
                <input type="submit" value="Submit Application" />
            </p>
        </form>
    );
};

export default TradeSchoolForm;
