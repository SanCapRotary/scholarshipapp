import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import sancaplogo from '../assets/sancaplogo.png';
import '../components/FormStyleSheet.css';

interface AcademicHistory {
    nameOfSchool: string;
    datesAttended: string;
}

interface EmploymentHistory {
    placeOfEmployment: string;
    employmentAddress: string;
    jobTitle: string;
    supervisorName: string;
    startDate: string;
    endDate: string;
    hoursPerWeek: string;
}

interface Guardian {
    name: string;
    relationship: string;
    address: string;
    mobileNumber: string;
    email: string;
    occupation: string;
    employer: string;
}

interface Sibling {
    name: string;
    age: string;
    relationship: string;
    school: string;
}

interface TradeSchoolApplicationFormValues {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    phoneNumber: string;
    email: string;
    academicHistories: AcademicHistory[];
    appliedTradeSchool: string;
    accepted: boolean;
    costOfProgram: string;
    scholasticHonors: string;
    extraCurricularActivities: string;
    employmentHistories: EmploymentHistory[];
    guardians: Guardian[];
    siblings: Sibling[];
}

const maxWords = 150;

const TradeSchoolSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    dob: Yup.date().required('Required').max(new Date(), 'Date of birth cannot be in the future'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    academicHistories: Yup.array().of(
        Yup.object().shape({
            nameOfSchool: Yup.string().required('School name required'),
            datesAttended: Yup.string().required('Dates attended are required'),
        })
    ),
    appliedTradeSchool: Yup.string().required('Required'),
    accepted: Yup.boolean().required('Required'),
    costOfProgram: Yup.string().required('Required'),
    scholasticHonors: Yup.string().max(maxWords, `Cannot exceed ${maxWords} words`).required('Required'),
    extraCurricularActivities: Yup.string().max(maxWords, `Cannot exceed ${maxWords} words`).required('Required'),
    employmentHistories: Yup.array().of(
        Yup.object().shape({
            placeOfEmployment: Yup.string().required('Required'),
            employmentAddress: Yup.string().required('Required'),
            jobTitle: Yup.string().required('Required'),
            supervisorName: Yup.string().required('Required'),
            startDate: Yup.date().required('Required'),
            endDate: Yup.date().required('Required'),
            hoursPerWeek: Yup.string().required('Required'),
        })
    ),
    guardians: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            relationship: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            mobileNumber: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            occupation: Yup.string().required('Required'),
            employer: Yup.string().required('Required'),
        })
    ),
    siblings: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            age: Yup.string().required('Required'),
            relationship: Yup.string().required('Required'),
            school: Yup.string().required('Required'),
        })
    ),
});

const sendEmail = (templateParams: TradeSchoolApplicationFormValues) => {
    const serviceId = 'service_55zyzln';
    const templateId = 'template_rbwigdh';
    const userId = '5MK4rWbh_fCErDO7u';

    emailjs.send(serviceId, templateId, templateParams as unknown as Record<string, unknown>, userId)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            console.log('FAILED...', err);
        });
}

const TradeSchoolForm = () => {
    // State hooks for word counts
    const [scholasticHonorsWordCount, setScholasticHonorsWordCount] = useState(0);
    const [extraCurricularActivitiesWordCount, setExtraCurricularActivitiesWordCount] = useState(0);

    const handleWordCountChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        maxWords: number,
        setWordCount: React.Dispatch<React.SetStateAction<number>>,
        setFieldValue: (field: string, value: string) => void,
        fieldName: string
    ) => {
        const words = e.target.value.trim().split(/\s+/);
        if (words.length <= maxWords) {
            setWordCount(words.length);
            setFieldValue(fieldName, e.target.value);
        }
    };

    // Initial values
    const initialValues: TradeSchoolApplicationFormValues = {
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        phoneNumber: '',
        email: '',
        academicHistories: [{ nameOfSchool: '', datesAttended: '' }],
        appliedTradeSchool: '',
        accepted: false,
        costOfProgram: '',
        scholasticHonors: '',
        extraCurricularActivities: '',
        employmentHistories: [{ placeOfEmployment: '', employmentAddress: '', jobTitle: '', supervisorName: '', startDate: '', endDate: '', hoursPerWeek: '' }],
        guardians: [{ name: '', relationship: '', address: '', mobileNumber: '', email: '', occupation: '', employer: '' }],
        siblings: [{ name: '', age: '', relationship: '', school: '' }],
    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={TradeSchoolSchema}
                onSubmit={(values, { resetForm }) => {
                    sendEmail(values);
                    resetForm({});
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <img src={sancaplogo} className="logo img-fluid" alt="Sanibel Captiva Rotary Club logo" />
                        <h3>Trade School Application</h3>
                        <h5>Must be submitted by [specific date]</h5>

                        {/* Personal Information Section */}
                        <div className="section-container">
                            <b>Personal Information</b>

                            <div className="form-group">
                                <label htmlFor="name">First Name:</label>
                                <Field name="name" type="text" placeholder="Name" />
                                <ErrorMessage name="name" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth:</label>
                                <Field name="dob" type="date" placeholder="Date of Birth" />
                                <ErrorMessage name="dob" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Mailing Address:</label>
                                <Field name="address" type="text" placeholder="Address" />
                                <ErrorMessage name="address" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number:</label>
                                <Field name="phoneNumber" type="text" placeholder="Phone Number" />
                                <ErrorMessage name="phoneNumber" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address:</label>
                                <Field name="email" type="email" placeholder="Email Address" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                        </div>

                        {/* Academic History Section */}
                        <div className="section-container">
                            <FieldArray name="academicHistories">
                                {({ remove, push }) => (
                                    <div>
                                        <b>Academic History</b>
                                        {values.academicHistories.map((_, index) => (
                                            <div className="academic-history-entry" key={index}>
                                                School
                                                <Field name={`academicHistories.${index}.nameOfSchool`} placeholder="Name of School" />
                                                <ErrorMessage name={`academicHistories.${index}.nameOfSchool`} component="div" />
                                                Dates Attended
                                                <Field name={`academicHistories.${index}.datesAttended`} placeholder="Dates Attended" />
                                                <ErrorMessage name={`academicHistories.${index}.datesAttended`} component="div" />
                                                <button type="button" className="remove-x-button" onClick={() => remove(index)}>
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="add-button"
                                            onClick={() => push({ nameOfSchool: '', datesAttended: '', numberInClass: '', classRank: '' })}
                                        >
                                            Add School
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            <p />

                            <div className="academic-history-entry">
                                Number in Class
                                <Field name="numberInClass" placeholder="Number in Class" />
                                <ErrorMessage name="numberInClass" component="div" />
                            </div>

                            <div className="academic-history-entry">
                                Class Rank
                                <Field name="classRank" placeholder="Class Rank" />
                                <ErrorMessage name="classRank" component="div" />
                            </div>

                            <div className="academic-history-entry">
                                Class Rank
                                <Field name="expectedGraduationDate" placeholder="Expected Graduation" />
                                <ErrorMessage name="expectedGraduationDate" component="div" />
                            </div>
                        </div>

                        {/* Trade School Specific Questions */}
                        <div className="section-container">
                            <div className="form-group">
                                <label htmlFor="appliedTradeSchool">To which accredited trade school are you applying?</label>
                                <Field name="appliedTradeSchool" type="text" placeholder="Trade School Name" />
                                <ErrorMessage name="appliedTradeSchool" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="accepted">Have you been accepted to this program?</label>
                                <Field name="accepted" as="select">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                                <ErrorMessage name="accepted" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="costOfProgram">What is the cost of this program?</label>
                                <Field name="costOfProgram" type="text" placeholder="Cost" />
                                <ErrorMessage name="costOfProgram" component="div" />
                            </div>
                        </div>

                        {/* Scholastic Honors, Awards, Distinctions Section */}
                        <div className="section-container">
                            <label htmlFor="scholasticHonors">Scholastic Honors, Awards, Distinctions Received:</label>
                            <span className="word-count">Word Count: {scholasticHonorsWordCount}/{maxWords}</span>
                            <Field as="textarea" name="scholasticHonors"
                                placeholder="Detail your scholastic honors and awards"
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    handleWordCountChange(e, maxWords, setScholasticHonorsWordCount, setFieldValue, 'scholasticHonors')}
                            />
                            <ErrorMessage name="scholasticHonors" component="div" />
                        </div>

                        {/* Extra Curricular Activities Section */}
                        <div className="section-container">
                            <label htmlFor="extraCurricularActivities">Extra Curricular Activities:</label>
                            <span className="word-count">Word Count: {extraCurricularActivitiesWordCount}/{maxWords}</span>
                            <Field
                                name="extraCurricularActivities"
                                as="textarea"
                                placeholder="Detail your extra curricular activities"
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    handleWordCountChange(e, maxWords, setExtraCurricularActivitiesWordCount, setFieldValue, 'extraCurricularActivities')}
                            />
                            <ErrorMessage name="extraCurricularActivities" component="div" />
                        </div>

                        {/* Employment History Section */}
                        <div className="section-container">
                            <FieldArray name="employmentHistories">
                                {({ remove, push }) => (
                                    <div>
                                        <b>Employment History</b>
                                        {values.employmentHistories.map((_, index) => (
                                            <div className="academic-history-entry" key={index}>
                                                Employer <br />
                                                <Field name={`employmentHistories.${index}.placeOfEmployment`} placeholder="Place of Employment" />
                                                <ErrorMessage name={`employmentHistories.${index}.placeOfEmployment`} component="div" />

                                                Address <br />
                                                <Field name={`employmentHistories.${index}.employmentAddress`} placeholder="Address" />
                                                <ErrorMessage name={`employmentHistories.${index}.employmentAddress`} component="div" />

                                                Job Title
                                                <Field name={`employmentHistories.${index}.jobTitle`} placeholder="Job Title" />
                                                <ErrorMessage name={`employmentHistories.${index}.jobTitle`} component="div" />

                                                Supervisor Name <br />
                                                <Field name={`employmentHistories.${index}.supervisorName`} placeholder="Supervisor Name" />
                                                <ErrorMessage name={`employmentHistories.${index}.supervisorName`} component="div" />


                                                Start Date <br />
                                                <Field name={`employmentHistories.${index}.startDate`} type="date" placeholder="Start Date" />
                                                <ErrorMessage name={`employmentHistories.${index}.startDate`} component="div" />


                                                End Date <br />
                                                <Field name={`employmentHistories.${index}.endDate`} type="date" placeholder="End Date" />
                                                <ErrorMessage name={`employmentHistories.${index}.endDate`} component="div" />

                                                Average Hours per Week <br />
                                                <Field name={`employmentHistories.${index}.hoursPerWeek`} type="number" placeholder="Average Hours per Week" />
                                                <ErrorMessage name={`employmentHistories.${index}.hoursPerWeek`} component="div" />

                                                <button type="button" className="remove-x-button" onClick={() => remove(index)}>X</button>
                                            </div>
                                        ))}
                                        <button type="button" className="add-button" onClick={() => push({ placeOfEmployment: '', employmentAddress: '', jobTitle: '', supervisorName: '', startDate: '', endDate: '', hoursPerWeek: '' })}>Add Employment</button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        {/* Family Information Section */}
                        <div className="section-container">
                            <b>Family Information</b>
                            <p />
                            <b>Parent / Guardian</b>

                            <FieldArray name="guardians">
                                {({ remove, push }) => (
                                    <div>
                                        {values.guardians.map((_, index) => (
                                            <div key={index} className="academic-history-entry">
                                                <Field name={`guardians.${index}.name`} placeholder="Name of Parent or Guardian" />
                                                <ErrorMessage name={`guardians.${index}.name`} component="div" />

                                                <Field name={`guardians.${index}.relationship`} placeholder="Relationship" />
                                                <ErrorMessage name={`guardians.${index}.relationship`} component="div" />

                                                <Field name={`guardians.${index}.address`} placeholder="Address" />
                                                <ErrorMessage name={`guardians.${index}.address`} component="div" />

                                                <Field name={`guardians.${index}.mobileNumber`} placeholder="Mobile Number" />
                                                <ErrorMessage name={`guardians.${index}.mobileNumber`} component="div" />

                                                <Field name={`guardians.${index}.email`} placeholder="Email address" />
                                                <ErrorMessage name={`guardians.${index}.email`} component="div" />

                                                <Field name={`guardians.${index}.occupation`} placeholder="Occupation" />
                                                <ErrorMessage name={`guardians.${index}.occupation`} component="div" />

                                                <Field name={`guardians.${index}.employer`} placeholder="Employer" />
                                                <ErrorMessage name={`guardians.${index}.employer`} component="div" />

                                                <button type="button" className="remove-x-button" onClick={() => remove(index)}>X</button>
                                            </div>
                                        ))}
                                        <button type="button" className="add-button" onClick={() => push({ name: '', relationship: '', address: '', mobileNumber: '', email: '', occupation: '', employer: '' })}>Add Guardian</button>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Siblings Information Section */}
                            <p />

                            <b>Siblings</b>
                            <FieldArray name="siblings">
                                {({ remove, push }) => (
                                    <div>
                                        {values.siblings.map((_, index) => (
                                            <div key={index} className="academic-history-entry">
                                                <Field name={`siblings.${index}.name`} placeholder="Sibling Name" />
                                                <ErrorMessage name={`siblings.${index}.name`} component="div" />

                                                <Field name={`siblings.${index}.age`} placeholder="Sibling Age" />
                                                <ErrorMessage name={`siblings.${index}.age`} component="div" />

                                                <Field name={`siblings.${index}.relationship`} placeholder="Relationship" />
                                                <ErrorMessage name={`siblings.${index}.relationship`} component="div" />

                                                <Field name={`siblings.${index}.school`} placeholder="School" />
                                                <ErrorMessage name={`siblings.${index}.school`} component="div" />

                                                <button type="button" className="remove-x-button" onClick={() => remove(index)}>X</button>
                                            </div>
                                        ))}
                                        <button type="button" className="add-button" onClick={() => push({ name: '', age: '', relationship: '', school: '' })}>Add Sibling</button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        {/* Submit Button */}
                        <div className="section-container">
                            <p style={{ textAlign: 'left' }}>
                                By clicking the <b>Submit Application</b> button below I acknowledge that I have completed this application truthfully to the best of my ability.
                            </p>

                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <input type="submit" value="Submit Application" className="btn btn-primary" />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TradeSchoolForm;



//// src/forms/TradeSchoolForm.tsx

//import React, { useRef, useState } from 'react';
//import emailjs from '@emailjs/browser';
//import { useTradeSchoolContext } from '../contexts/TradeSchoolContext';
//import PersonalInfoForm, { PersonalInfo } from '../components/shared/PersonalInfoForm';
//import AcademicHistoryForm, { AcademicEntry } from '../components/shared/AcademicHistoryForm';
//import TradeHonorsAwardsOrgsForm, { HonorsAwardsOrgsInfo } from '../components/tradeSchool/TradeHonorsAwardsOrgsForm';
//import TradeClassStandingForm, { ClassStanding } from '../components/tradeSchool/TradeClassStandingForm';
//import EmploymentForm, { EmploymentEntry } from '../components/shared/EmploymentForm';
//import TradeEmploymentPlanForm, { EmploymentPlan } from '../components/tradeSchool/TradeEmploymentPlanForm';
//import FamilyInformationForm, { GuardianEntry, SiblingEntry } from '../components/shared/FamilyInformationForm';
//import TradeSchoolApplicationForm, { TradeApplicationEntry } from '../components/tradeSchool/TradeSchoolApplicationForm';
//import sancaplogo from '../assets/sancaplogo.png';
//import '../components/FormStyleSheet.css';
//import 'bootstrap/dist/css/bootstrap.min.css';


//export const TradeSchoolForm: React.FC = () => {
//    const form = useRef<HTMLFormElement>(null);
//    const { formData, updateFormData } = useTradeSchoolContext();

//    const [isSubmitted, setIsSubmitted] = useState(false);
//    const [submissionError, setSubmissionError] = useState('');

//    const handlePersonalInfoUpdate = (info: PersonalInfo) => {
//        updateFormData('personalInfo', info);
//    };

//    const handleAcademicHistoryUpdate = (history: AcademicEntry[]) => {
//        updateFormData('academicHistory', history);
//    };

//    const handleClassStandingUpdate = (classStanding: ClassStanding) => {
//        updateFormData('classStanding', classStanding);
//    };

//    const handleHonorsAwardsOrgsUpdate = (info: HonorsAwardsOrgsInfo) => {
//        updateFormData('honorsAwardsOrgsInfo', info);
//    };

//    const handleEmploymentUpdate = (entries: EmploymentEntry[]) => {
//        updateFormData('employmentHistory', entries);
//    };

//    const handleEmploymentPlanUpdate = (employmentPlan: EmploymentPlan) => {
//        updateFormData('employmentPlan', employmentPlan);
//    };

//    const handleFamilyInfoUpdate = (guardians: GuardianEntry[], siblings: SiblingEntry[]) => {
//        updateFormData('guardians', guardians);
//        updateFormData('siblings', siblings);
//    };

//    const handleTradeSchoolApplicationUpdate = (entry: TradeApplicationEntry) => {
//        updateFormData('tradeSchoolApplication', entry);
//    };

//    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
//        e.preventDefault();
//        setIsSubmitted(false);
//        setSubmissionError('');

//        const schoolDetailsString = formData.academicHistory.map(entry =>
//            `School: ${entry.schoolAttended}, Dates: ${entry.schoolAttendedDates}`
//        ).join('\n');

//        const employmentDetailsString = formData.employmentHistory.map(entry =>
//            `Employer: ${entry.employmentEmployer}, Address: ${entry.employmentAddress}, Title: ${entry.employmentTitle}, Supervisor: ${entry.employmentSupervisor}, Start Date: ${entry.employmentStartDate}, End Date: ${entry.employmentEndDate}, Average Hours: ${entry.employmentAverageHours}`
//        ).join('\n');

//        const guardianDetailsString = formData.guardians.map(entry =>
//            `Name: ${entry.guardianName}, Relationship: ${entry.guardianRelationship}, Address: ${entry.guardianAddress}, Mobile: ${entry.guardianMobile}, Email: ${entry.guardianEmail}, Occupation: ${entry.guardianOccupation}, Employer: ${entry.guardianEmployer}`
//        ).join('\n');

//        const siblingDetailsString = formData.siblings.map(entry =>
//            `Name: ${entry.siblingName}, Age: ${entry.siblingAge}, In School: ${entry.siblingInSchool ? 'Yes' : 'No'}, School Name: ${entry.siblingSchoolName}`
//        ).join('\n');

//        //const tradeSchoolApplicationString = `Applied To: ${formData.tradeSchoolApplication.appliedTo}, Accepted: ${formData.tradeSchoolApplication.acceptedTo ? 'Yes' : 'No'}, Program Cost: ${formData.tradeSchoolApplication.programCost}`;

//        const tradeSchoolData = {
//            firstName: formData.personalInfo.firstName,
//            lastName: formData.personalInfo.lastName,
//            emailAddress: formData.personalInfo.emailAddress,
//            mailingAddress: formData.personalInfo.mailingAddress,
//            dateOfBirth: formData.personalInfo.dateOfBirth,
//            schoolDetailsString,
//            tradeHighSchoolGPA: formData.classStanding.tradeHighSchoolGPA,
//            employmentDetailsString,
//            employmentPlans: formData.employmentPlan.employmentPlans,
//            guardianDetailsString,
//            siblingDetailsString,
//            honorsAndAwards: formData.honorsAwardsOrgsInfo.honorsAndAwards,
//            organizationsAndLeadership: formData.honorsAwardsOrgsInfo.organizationsAndLeadership,
//            appliedTo: formData.tradeSchoolApplication.appliedTo,
//            acceptedTo: formData.tradeSchoolApplication.acceptedTo ? 'Yes' : 'No',
//            programCost: formData.tradeSchoolApplication.programCost
//        };

//        emailjs.send('service_55zyzln', 'template_rbwigdh', tradeSchoolData, '5MK4rWbh_fCErDO7u')
//            .then((result) => {
//                setIsSubmitted(true);
//                console.log(result.text);
//            }, (error) => {
//                setSubmissionError(error.text);
//                console.log(error.text);
//            });
//    };

//    return (
//        <form ref={form} onSubmit={sendEmail} className="container">
//            <div className="row justify-content-center">
//                <div className="col-12 col-md-8">
//                    <img
//                        src={sancaplogo}
//                        className="logo img-fluid"
//                        alt="Sanibel Captiva Rotary Club logo"
//                    />
//                </div>

//                <div className="col-12 col-md-8 text-center">
//                    <h3>Trade School Scholarship Application</h3>
//                    <h5>Must be submitted by February 15</h5>
//                </div>

//                <PersonalInfoForm onUpdate={handlePersonalInfoUpdate} />
//                <AcademicHistoryForm onUpdate={handleAcademicHistoryUpdate} />
//                <TradeClassStandingForm onUpdate={handleClassStandingUpdate} />
//                <TradeHonorsAwardsOrgsForm onUpdate={handleHonorsAwardsOrgsUpdate} />
//                <TradeSchoolApplicationForm onUpdate={handleTradeSchoolApplicationUpdate} />
//                <EmploymentForm onUpdate={handleEmploymentUpdate} />
//                <TradeEmploymentPlanForm onUpdate={handleEmploymentPlanUpdate} />
//                <FamilyInformationForm onUpdate={handleFamilyInfoUpdate} />

//                <div className="section-container">
//                    <h5>LETTER OF RECOMMENDATION</h5>
//                    <p style={{ textAlign: 'left' }}>
//                        A letter of recommendation is <strong>REQUIRED</strong> as part of this application.  That letter must be from an instructor or program director of the academy you are attending. The letter must be sent via email to <strong>someone@sancaprotary.com</strong>.
//                    </p>
//                    <p style={{ textAlign: 'left' }}>
//                        It is your responsibility to make certain the email has been sent.
//                    </p>
//                </div>
//                <div className="section-container">
//                    <p style={{ textAlign: 'left' }}>
//                        By clicking the <b>Submit Application</b> button below I acknowledge that I have completed this application truthfully to the best of my ability.
//                    </p>


//                    {isSubmitted && !submissionError && (
//                        <div className="submissionSuccess">
//                            Your application has been sent successfully!
//                        </div>
//                    )}

//                    {submissionError && (
//                        <div className="submissionError">
//                            Failed to send the application: {submissionError}
//                        </div>
//                    )}

//                    <div className="col-12" style={{ textAlign: 'center' }}>
//                        <input type="submit" value="Submit Application" className="btn btn-primary" />
//                    </div>
//                </div>
//            </div>
//        </form>
//    );
//};

//export default TradeSchoolForm;
