// src/forms/TradeSchoolForm.tsx

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTradeSchoolContext } from '../contexts/TradeSchoolContext';
import PersonalInfoForm, { PersonalInfo } from '../components/shared/PersonalInfoForm';
import AcademicHistoryForm, { AcademicEntry } from '../components/shared/AcademicHistoryForm';
import TradeHonorsAwardsOrgsForm, { HonorsAwardsOrgsInfo } from '../components/tradeSchool/TradeHonorsAwardsOrgsForm';
import TradeClassStandingForm, { ClassStanding } from '../components/tradeSchool/TradeClassStandingForm';
import EmploymentForm, { EmploymentEntry } from '../components/shared/EmploymentForm';
import TradeEmploymentPlanForm, { EmploymentPlan } from '../components/tradeSchool/TradeEmploymentPlanForm';
import FamilyInformationForm, { GuardianEntry, SiblingEntry } from '../components/shared/FamilyInformationForm';
import TradeSchoolApplicationForm, { TradeApplicationEntry } from '../components/tradeSchool/TradeSchoolApplicationForm';
import sancaplogo from '../assets/sancaplogo.png';
import '../components/FormStyleSheet.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    const handleEmploymentPlanUpdate = (employmentPlan: EmploymentPlan) => {
        updateFormData('employmentPlan', employmentPlan);
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
            employmentPlans: formData.employmentPlan.employmentPlans,
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
        <form ref={form} onSubmit={sendEmail} className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <img
                        src={sancaplogo}
                        className="logo img-fluid"
                        alt="Sanibel Captiva Rotary Club logo"
                    />
                </div>

                <div className="col-12 col-md-8 text-center">
                    <h3>Trade School Scholarship Application</h3>
                    <h5>Must be submitted by February 15</h5>
                </div>

                <PersonalInfoForm onUpdate={handlePersonalInfoUpdate} />
                <AcademicHistoryForm onUpdate={handleAcademicHistoryUpdate} />
                <TradeClassStandingForm onUpdate={handleClassStandingUpdate} />
                <TradeHonorsAwardsOrgsForm onUpdate={handleHonorsAwardsOrgsUpdate} />
                <TradeSchoolApplicationForm onUpdate={handleTradeSchoolApplicationUpdate} />
                <EmploymentForm onUpdate={handleEmploymentUpdate} />
                <TradeEmploymentPlanForm onUpdate={handleEmploymentPlanUpdate} />
                <FamilyInformationForm onUpdate={handleFamilyInfoUpdate} />

                <div className="section-container">
                    <h5>LETTER OF RECOMMENDATION</h5>
                    <p style={{ textAlign: 'left' }}>
                        A letter of recommendation is <strong>REQUIRED</strong> as part of this application.  That letter must be from an instructor or program director of the academy you are attending. The letter must be sent via email to <strong>someone@sancaprotary.com</strong>.
                    </p>
                    <p style={{ textAlign: 'left' }}>
                        It is your responsibility to make certain the email has been sent.
                    </p>
                </div>
                <div className="section-container">
                    <p style={{ textAlign: 'left' }}>
                        By clicking the <b>Submit Application</b> button below I acknowledge that I have completed this application truthfully to the best of my ability.
                    </p>


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

                    <div className="col-12" style={{ textAlign: 'center' }}>
                        <input type="submit" value="Submit Application" className="btn btn-primary" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TradeSchoolForm;
