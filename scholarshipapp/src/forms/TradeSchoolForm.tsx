// src/forms/TradeSchoolForm.tsx

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTradeSchoolContext } from '../contexts/TradeSchoolContext';
import PersonalInfoForm, { PersonalInfo } from '../components/shared/PersonalInfoForm';
import AcademicHistoryForm, { AcademicEntry } from '../components/shared/AcademicHistoryForm';
import TradeHonorsAwardsOrgsForm, { HonorsAwardsOrgsInfo } from '../components/tradeSchool/TradeHonorsAwardsOrgsForm';
import TradeClassStandingForm, { ClassStanding } from '../components/tradeSchool/TradeClassStandingForm';
import EmploymentForm, { EmploymentEntry } from '../components/shared/EmploymentForm';
import FamilyInformationForm, { GuardianEntry, SiblingEntry } from '../components/shared/FamilyInformationForm';
import TradeSchoolApplicationForm, { TradeApplicationEntry } from '../components/tradeSchool/TradeSchoolApplicationForm';
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

    const handleClassStandingUpdate = (classStanding: ClassStanding) => {
        updateFormData('classStanding', classStanding);
    };

    const handleHonorsAwardsOrgsUpdate = (info: HonorsAwardsOrgsInfo) => {
        updateFormData('honorsAwardsOrgsInfo', info);
    };

    const handleEmploymentUpdate = (entries: EmploymentEntry[]) => {
        updateFormData('employmentHistory', entries);
    };

    const handleFamilyInfoUpdate = (guardians: GuardianEntry[], siblings: SiblingEntry[]) => {
        updateFormData('guardians', guardians);
        updateFormData('siblings', siblings);
    };

    const handleTradeSchoolApplicationUpdate = (entry: TradeApplicationEntry) => {
        updateFormData('tradeSchoolApplication', entry);
    };

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(false);
        setSubmissionError('');

        const schoolDetailsString = formData.academicHistory.map(entry =>
            `School: ${entry.schoolAttended}, Dates: ${entry.schoolAttendedDates}`
        ).join('\n');

        const employmentDetailsString = formData.employmentHistory.map(entry =>
            `Employer: ${entry.employmentEmployer}, Address: ${entry.employmentAddress}, Title: ${entry.employmentTitle}, Supervisor: ${entry.employmentSupervisor}, Start Date: ${entry.employmentStartDate}, End Date: ${entry.employmentEndDate}, Average Hours: ${entry.employmentAverageHours}`
        ).join('\n');

        const guardianDetailsString = formData.guardians.map(entry =>
            `Name: ${entry.guardianName}, Relationship: ${entry.guardianRelationship}, Address: ${entry.guardianAddress}, Mobile: ${entry.guardianMobile}, Email: ${entry.guardianEmail}, Occupation: ${entry.guardianOccupation}, Employer: ${entry.guardianEmployer}`
        ).join('\n');

        const siblingDetailsString = formData.siblings.map(entry =>
            `Name: ${entry.siblingName}, Age: ${entry.siblingAge}, In School: ${entry.siblingInSchool ? 'Yes' : 'No'}, School Name: ${entry.siblingSchoolName}`
        ).join('\n');

        //const tradeSchoolApplicationString = `Applied To: ${formData.tradeSchoolApplication.appliedTo}, Accepted: ${formData.tradeSchoolApplication.acceptedTo ? 'Yes' : 'No'}, Program Cost: ${formData.tradeSchoolApplication.programCost}`;

        const tradeSchoolData = {
            firstName: formData.personalInfo.firstName,
            lastName: formData.personalInfo.lastName,
            emailAddress: formData.personalInfo.emailAddress,
            mailingAddress: formData.personalInfo.mailingAddress,
            dateOfBirth: formData.personalInfo.dateOfBirth,
            schoolDetailsString,
            tradeHighSchoolGPA: formData.classStanding.tradeHighSchoolGPA,
            employmentDetailsString,
            guardianDetailsString,
            siblingDetailsString,
            honorsAndAwards: formData.honorsAwardsOrgsInfo.honorsAndAwards,
            organizationsAndLeadership: formData.honorsAwardsOrgsInfo.organizationsAndLeadership,
            appliedTo: formData.tradeSchoolApplication.appliedTo,
            acceptedTo: formData.tradeSchoolApplication.acceptedTo ? 'Yes' : 'No',
            programCost: formData.tradeSchoolApplication.programCost
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
            <TradeClassStandingForm onUpdate={handleClassStandingUpdate} />
            <TradeHonorsAwardsOrgsForm onUpdate={handleHonorsAwardsOrgsUpdate} />
            <TradeSchoolApplicationForm onUpdate={handleTradeSchoolApplicationUpdate} />
            <EmploymentForm onUpdate={handleEmploymentUpdate} />
            <FamilyInformationForm onUpdate={handleFamilyInfoUpdate} />

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
