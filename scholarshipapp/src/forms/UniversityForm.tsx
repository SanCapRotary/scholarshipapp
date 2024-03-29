import { Formik, Form, Field, ErrorMessage, FieldArray, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import sancaplogo from '../assets/sancaplogo.png';
import '../components/FormStyleSheet.css';

interface AcademicHistory {
    nameOfSchool: string;
    datesAttended: string;
}

interface Scholastic {
    honorsAwards: string;
    leadershipPositions: string;
    organizationsMembership: string;
}

interface ExtraCurricular {
    ecHonorsAwards: string;
    ecLeadershipPositions: string;
    ecOrganizationsMembership: string;
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

interface EmailData extends Omit<UniversityFormValues, 'academicHistories' | 'employmentHistories' | 'guardians' | 'siblings'> {
    academicHistories: string;
    employmentHistories: string;
    guardians: string;
    siblings: string;
}

interface UniversityFormValues {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    phoneNumber: string;
    email: string;
    academicHistories: AcademicHistory[];
    numberInClass: string;
    classRank: string;
    expectedGraduationDate: string;
    scholastic: Scholastic;
    extraCurricular: ExtraCurricular;
    employmentHistories: EmploymentHistory[];
    appliedCollege: string;
    plannedCollege: string;
    intendedMajor: string;
    plannedCollegeStartDate: string;
    guardians: Guardian[];
    siblings: Sibling[];
    scholarships: string;
    loans: string;
    summerEarnings: string;
    schoolYearEarnings: string;
    floridaPrePaid: string;
    fundsFromParents: string;
    fundsFromRelatives: string;
    otherSources: string;
    tuition: string;
    roomAndBoard: string;
    booksAndSupplies: string;
    allOtherExpenses: string;
    workedOnSanibel: boolean;
    questionOne: string;
    questionTwo: string;
    documentLink: string;
}

const maxMessageWords = 250;
const maxQuestionWords = 500;

const UniversitySchema = Yup.object().shape({
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
    numberInClass: Yup.string().required('Number in class is required'),
    classRank: Yup.string().required('Class rank is required'),
    expectedGraduationDate: Yup.string().required('Expected graduation date is required'),
    workedOnSanibel: Yup.boolean(),
    questionOne: Yup.string().required('Required'),
    questionTwo: Yup.string().required('Required'),
    documentLink: Yup.string().required('Required'),
});

const handlePrint = () => {
    window.print();
};

const UniversityForm = () => {
    const [honorsWordCount, setHonorsWordCount] = useState(0);
    const [leadershipWordCount, setLeadershipWordCount] = useState(0);
    const [membershipWordCount, setMembershipWordCount] = useState(0);
    const [ecHonorsWordCount, setECHonorsWordCount] = useState(0);
    const [ecLeadershipWordCount, setECLeadershipWordCount] = useState(0);
    const [ecMembershipWordCount, setECMembershipWordCount] = useState(0);
    const [questionOneWordCount, setQuestionOneWordCount] = useState(0);
    const [questionTwoWordCount, setQuestionTwoWordCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const sendEmail = (templateParams: EmailData) => {
        const serviceId = 'service_55zyzln';
        const templateId = 'template_hwgv5qm';
        const userId = '5MK4rWbh_fCErDO7u';

        // Create a params object of type Record<string, unknown>
        const params: Record<string, unknown> = {};

        // Use keyof to iterate over the keys of UniversityFormValues
        (Object.keys(templateParams) as Array<keyof UniversityFormValues>).forEach(key => {
            params[key] = templateParams[key];
        });

        console.log("Sending email with params:", templateParams);

        emailjs.send(serviceId, templateId, params, userId)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
    };

    const handleFormSubmit = async (
        values: UniversityFormValues,
        { resetForm, setSubmitting }: FormikHelpers<UniversityFormValues>
    ) => {
        console.log("Form submission started");
        try {
            // Convert academicHistories array to a string
            const academicHistoriesString = values.academicHistories.map(history =>
                `School: ${history.nameOfSchool}\nDates Attended: ${history.datesAttended}\n\n`
            ).join('');

            const employmentHistoriesString = values.employmentHistories.map(job =>
                `Employer: ${job.placeOfEmployment}\nAddress: ${job.employmentAddress}\nTitle: ${job.jobTitle}\nSupervisor: ${job.supervisorName}\nStart Date: ${job.startDate}\nEnd Date: ${job.endDate}\nHours per Week: ${job.hoursPerWeek}\n\n`
            ).join('');

            const guardiansString = values.guardians.map(guardian =>
                `Name: ${guardian.name}\nRelationship: ${guardian.relationship}\nAddress: ${guardian.address}\nMobile: ${guardian.mobileNumber}\nEmail: ${guardian.email}\nOccupation: ${guardian.occupation}\nEmployer: ${guardian.employer}\n\n`
            ).join('');

            const siblingsString = values.siblings.map(sibling =>
                `Name: ${sibling.name}\nAge: ${sibling.age}\nRelationship: ${sibling.relationship}\nSchool: ${sibling.school}\n\n`
            ).join('');

            // Create an email data object
            const emailData: EmailData = {
                ...values,
                academicHistories: academicHistoriesString,
                employmentHistories: employmentHistoriesString,
                guardians: guardiansString,
                siblings: siblingsString
            };

            console.log("Email data being sent:", emailData);

            await sendEmail(emailData);
            setIsSubmitted(true);
            resetForm({});
        } catch (error) {
            console.error('Submission error', error);
        } finally {
            setSubmitting(false);
            console.log("handleFormSubmit 'finally' reached.");
        }
    };

    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        fieldName: 'honorsAwards' | 'leadershipPositions' | 'organizationsMembership',
        setFieldValue: (field: string, value: string) => void
    ) => {
        const { value } = e.target;
        const words = value.trim().split(/\s+/);
        const wordCount = words.length;

        if (fieldName === 'honorsAwards' && wordCount <= maxMessageWords) {
            setHonorsWordCount(wordCount);
            setFieldValue('scholastic.honorsAwards', value);
        } else if (fieldName === 'leadershipPositions' && wordCount <= maxMessageWords) {
            setLeadershipWordCount(wordCount);
            setFieldValue('scholastic.leadershipPositions', value);
        } else if (fieldName === 'organizationsMembership' && wordCount <= maxMessageWords) {
            setMembershipWordCount(wordCount);
            setFieldValue('scholastic.organizationsMembership', value);
        }
    };

    const handleECTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        fieldName: 'ecHonorsAwards' | 'ecLeadershipPositions' | 'ecOrganizationsMembership',
        setFieldValue: (field: string, value: string) => void
    ) => {
        const { value } = e.target;
        const words = value.trim().split(/\s+/);
        const wordCount = words.length;

        if (fieldName === 'ecHonorsAwards' && wordCount <= maxMessageWords) {
            setECHonorsWordCount(wordCount);
            setFieldValue('extraCurricular.ecHonorsAwards', value);
        } else if (fieldName === 'ecLeadershipPositions' && wordCount <= maxMessageWords) {
            setECLeadershipWordCount(wordCount);
            setFieldValue('extraCurricular.ecLeadershipPositions', value);
        } else if (fieldName === 'ecOrganizationsMembership' && wordCount <= maxMessageWords) {
            setECMembershipWordCount(wordCount);
            setFieldValue('extraCurricular.ecOrganizationsMembership', value);
        }
    };

    const handleQuestionTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        fieldName: 'questionOne' | 'questionTwo',
        setWordCount: (count: number) => void,
        setFieldValue: (field: string, value: string) => void
    ) => {
        const { value } = e.target;
        const words = value.trim().split(/\s+/);
        const wordCount = words.length;

        if (wordCount <= maxQuestionWords) {
            setWordCount(wordCount);
            setFieldValue(fieldName, value);
        }
    };

    const initialValues: UniversityFormValues = {
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        phoneNumber: '',
        email: '',
        academicHistories: [{
            nameOfSchool: '',
            datesAttended: '',

        }],
        numberInClass: '',
        classRank: '',
        expectedGraduationDate: '',
        scholastic: {
            honorsAwards: '',
            leadershipPositions: '',
            organizationsMembership: '',
        },
        extraCurricular: {
            ecHonorsAwards: '',
            ecLeadershipPositions: '',
            ecOrganizationsMembership: '',
        },
        employmentHistories: [{
            placeOfEmployment: '',
            employmentAddress: '',
            jobTitle: '',
            supervisorName: '',
            startDate: '',
            endDate: '',
            hoursPerWeek: '',
        }],
        appliedCollege: '',
        plannedCollege: '',
        intendedMajor: '',
        plannedCollegeStartDate: '',
        guardians: [{
            name: '',
            relationship: '',
            address: '',
            mobileNumber: '',
            email: '',
            occupation: '',
            employer: ''
        }],
        siblings: [{
            name: '',
            age: '',
            relationship: '',
            school: ''
        }],
        scholarships: '',
        loans: '',
        summerEarnings: '',
        schoolYearEarnings: '',
        floridaPrePaid: '',
        fundsFromParents: '',
        fundsFromRelatives: '',
        otherSources: '',
        tuition: '',
        roomAndBoard: '',
        booksAndSupplies: '',
        allOtherExpenses: '',
        workedOnSanibel: false,
        questionOne: '',
        questionTwo: '',
        documentLink: '',
    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={UniversitySchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, setFieldValue, isValid, submitCount, isSubmitting }) => (

                    <Form>
                        <div className="print-area">

                            <img src={sancaplogo} className="logo img-fluid" alt="Sanibel Captiva Rotary Club logo" />
                            <h3>University Scholarship Application</h3>
                            <h5>Must be submitted by April 15</h5>

                            { /* Personal Information Section */}
                            <div className="section-container">
                                <b>Personal Information</b>

                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <Field name="firstName" type="text" placeholder="first name" />
                                    <ErrorMessage name="firstName" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <Field name="lastName" type="text" placeholder="last name" />
                                    <ErrorMessage name="lastName" component="div" />
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

                            { /* Academic History Section */}
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
                                    Expected Graduation Date
                                    <Field name="expectedGraduationDate" placeholder="Expected Graduation" />
                                    <ErrorMessage name="expectedGraduationDate" component="div" />
                                </div>
                            </div>

                            {/* Scholastic Section */}
                            <div className="section-container">
                                <b>Scholastic</b>
                                <div className="trade-honors-awards-form-group">
                                    {/* Honors, Awards & Distinctions */}
                                    <label htmlFor="scholastic.honorsAwards">
                                        Honors, Awards & Distinctions Received (Year and Nature of Award):
                                    </label>
                                    <span className="word-count">Word Count: {honorsWordCount}/{maxMessageWords}</span>
                                    <Field name="scholastic.honorsAwards" as="textarea"
                                        placeholder="Detail your honors and awards"
                                        value={values.scholastic.honorsAwards}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextAreaChange(e, 'honorsAwards', setFieldValue)}
                                    />
                                    <ErrorMessage name="scholastic.honorsAwards" component="div" />

                                    {/* Office and Positions of Leadership */}
                                    <label htmlFor="scholastic.leadershipPositions">
                                        Office and Positions of Leadership (Organization, Position, Year):
                                    </label>
                                    <span className="word-count">Word Count: {leadershipWordCount}/{maxMessageWords}</span>
                                    <Field name="scholastic.leadershipPositions" as="textarea"
                                        placeholder="Detail your leadership positions"
                                        value={values.scholastic.leadershipPositions}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextAreaChange(e, 'leadershipPositions', setFieldValue)}
                                    />
                                    <ErrorMessage name="scholastic.leadershipPositions" component="div" />

                                    {/* Member of Organization */}
                                    <label htmlFor="scholastic.organizationsMembership">
                                        Member of Organization (Where no office was held):
                                    </label>
                                    <span className="word-count">Word Count: {membershipWordCount}/{maxMessageWords}</span>
                                    <Field name="scholastic.organizationsMembership" as="textarea"
                                        placeholder="Detail your organization memberships"
                                        value={values.scholastic.organizationsMembership}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextAreaChange(e, 'organizationsMembership', setFieldValue)}
                                    />
                                    <ErrorMessage name="scholastic.organizationsMembership" component="div" />
                                </div>
                            </div>

                            {/* ExtraCurricular Section */}
                            <div className="section-container">
                                <b>Extra Curricular</b>
                                {/* Honors, Awards & Distinctions */}
                                <div className="trade-honors-awards-form-group">
                                    Honors, Awards & Distinctions Received (Year and Nature of Award):
                                    <span className="word-count">Word Count: {ecHonorsWordCount}/{maxMessageWords}</span>
                                    <Field
                                        name="extraCurricular.ecHonorsAwards"
                                        as="textarea"
                                        placeholder="Detail your honors and awards"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleECTextAreaChange(e, 'ecHonorsAwards', setFieldValue)}
                                    />
                                    <ErrorMessage name="extraCurricular.ecHonorsAwards" component="div" />
                                </div>

                                {/* Office and Positions of Leadership */}
                                <div className="trade-honors-awards-form-group">
                                    Office and Positions of Leadership (Organization, Position, Year):
                                    <span className="word-count">Word Count: {ecLeadershipWordCount}/{maxMessageWords}</span>
                                    <Field
                                        name="extraCurricular.ecLeadershipPositions"
                                        as="textarea"
                                        placeholder="Detail your leadership positions"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleECTextAreaChange(e, 'ecLeadershipPositions', setFieldValue)}
                                    />
                                    <ErrorMessage name="extraCurricular.ecLeadershipPositions" component="div" />
                                </div>

                                {/* Member of Organization (Where no office was held) */}
                                <div className="trade-honors-awards-form-group">
                                    Member of Organization (Where no office was held):
                                    <span className="word-count">Word Count: {ecMembershipWordCount}/{maxMessageWords}</span>
                                    <Field
                                        name="extraCurricular.ecOrganizationsMembership"
                                        as="textarea"
                                        placeholder="Detail your organization memberships"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleECTextAreaChange(e, 'ecOrganizationsMembership', setFieldValue)}
                                    />
                                    <ErrorMessage name="extraCurricular.ecOrganizationsMembership" component="div" />
                                </div>
                            </div>

                            {/* Employment History Section */}
                            <div className="section-container">

                                <FieldArray name="employmentHistories">
                                    {({ remove, push }) => (
                                        <div>
                                            <b>Employment History</b>
                                            {values.employmentHistories.map((_, index: number) => (
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

                            {/* College Section */}
                            <div className="section-container">
                                <b>College</b>
                                <div className="form-group">
                                    <label htmlFor="appliedCollege">Which College, University, or Post-Secondary Institution have you applied to?</label>
                                    <Field name="appliedCollege" type="text" placeholder="College Name" />
                                    <ErrorMessage name="appliedCollege" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="plannedCollege">Which College do you plan to attend?</label>
                                    <Field name="plannedCollege" type="text" placeholder="Planned College" />
                                    <ErrorMessage name="plannedCollege" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="intendedMajor">What is your intended Major?</label>
                                    <Field name="intendedMajor" type="text" placeholder="Intended Major" />
                                    <ErrorMessage name="intendedMajor" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="plannedCollegeStartDate">When do you plan to start?</label>
                                    <Field name="plannedCollegeStartDate" type="date" />
                                    <ErrorMessage name="plannedCollegeStartDate" component="div" />
                                </div>
                            </div>

                            {/* Family Information Section */}
                            <div className="section-container">
                                <b>Family Information</b>
                                <p />

                                <div className="form-group">
                                    <label htmlFor="workedOnSanibel">Have you or your family lived or worked on Sanibel?</label>
                                    <Field name="workedOnSanibel" as="select">
                                        <option value="true">Yes</option>
                                        <option value="workedOnSanibel">No</option>
                                    </Field>

                                </div>

                                <b>Parent / Guardian</b>

                                <FieldArray name="guardians">
                                    {({ remove, push }) => (
                                        <div>
                                            {values.guardians.map((_, index: number) => (
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
                                            {values.siblings.map((_, index: number) => (
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

                            {/* Budget Section */}
                            <div className="section-container">
                                <b>Projected Budget for Next Year</b>
                                <div className="form-group">
                                    <label htmlFor="scholarships">Scholarships:</label>
                                    <Field name="scholarships" type="text" placeholder="Scholarships Amount" />
                                    <ErrorMessage name="scholarships" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="loans">Loan(s):</label>
                                    <Field name="loans" type="text" placeholder="Loan Amount" />
                                    <ErrorMessage name="loans" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="summerEarnings">Summer Earnings:</label>
                                    <Field name="summerEarnings" type="text" placeholder="Summer Earnings Amount" />
                                    <ErrorMessage name="summerEarnings" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="schoolYearEarnings">School Year Earnings:</label>
                                    <Field name="schoolYearEarnings" type="text" placeholder="School Year Earnings Amount" />
                                    <ErrorMessage name="schoolYearEarnings" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="floridaPrePaid">Florida Pre-Paid:</label>
                                    <Field name="floridaPrePaid" type="text" placeholder="Florida Pre-Paid Amount" />
                                    <ErrorMessage name="floridaPrePaid" component="div" />
                                </div>
                            </div>

                            {/* Other Income Section */}
                            <div className="section-container">
                                <b>Other Income</b>
                                <div className="form-group">
                                    <label htmlFor="fundsFromParents">Funds from Parents or Guardians:</label>
                                    <Field name="fundsFromParents" type="text" placeholder="Amount from Parents/Guardians" />
                                    <ErrorMessage name="fundsFromParents" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fundsFromRelatives">Funds from Relatives or Friends:</label>
                                    <Field name="fundsFromRelatives" type="text" placeholder="Amount from Relatives/Friends" />
                                    <ErrorMessage name="fundsFromRelatives" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="otherSources">Other Sources:</label>
                                    <Field name="otherSources" type="text" placeholder="Other Income Sources" />
                                    <ErrorMessage name="otherSources" component="div" />
                                </div>
                            </div>

                            {/* Estimated Costs Section */}
                            <div className="section-container">
                                <b>Estimated Costs</b>
                                <div className="form-group">
                                    <label htmlFor="tuition">Tuition:</label>
                                    <Field name="tuition" type="text" placeholder="Tuition Cost" />
                                    <ErrorMessage name="tuition" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="roomAndBoard">Room & Board:</label>
                                    <Field name="roomAndBoard" type="text" placeholder="Room and Board Cost" />
                                    <ErrorMessage name="roomAndBoard" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="booksAndSupplies">Books & Supplies:</label>
                                    <Field name="booksAndSupplies" type="text" placeholder="Cost of Books & Supplies" />
                                    <ErrorMessage name="booksAndSupplies" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="allOtherExpenses">All Other Expenses:</label>
                                    <Field name="allOtherExpenses" type="text" placeholder="Other Expenses" />
                                    <ErrorMessage name="allOtherExpenses" component="div" />
                                </div>
                            </div>

                            {/* Question One Section */}
                            <div className="section-container">
                                <b>Essay Questions</b>
                                <div className="trade-honors-awards-form-group">
                                    Why do you want to pursue a College Degree? How will your college experience prepare you to achieve your life goals?
                                    <span className="word-count">Word Count: {questionOneWordCount}/{maxQuestionWords}</span>
                                    <Field
                                        name="questionOne"
                                        as="textarea"
                                        placeholder="Your response to Question One"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleQuestionTextAreaChange(e, 'questionOne', setQuestionOneWordCount, setFieldValue)}
                                    />
                                    <ErrorMessage name="questionOne" component="div" />
                                </div>

                                {/* Question Two Section */}
                                <div className="trade-honors-awards-form-group">
                                    What is your opinion of Rotary's "4-Way Test"?
                                    <span className="word-count">Word Count: {questionTwoWordCount}/{maxQuestionWords}</span>
                                    <Field
                                        name="questionTwo"
                                        as="textarea"
                                        placeholder="Your response to Question Two"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleQuestionTextAreaChange(e, 'questionTwo', setQuestionTwoWordCount, setFieldValue)}
                                    />
                                    <ErrorMessage name="questionTwo" component="div" />
                                </div>
                            </div>

                        </div>

                        {/* Attachments Section */ }
                        <div className="section-container">
                            <p style={{ textAlign: 'left' }}>

                                In addition to the questions above, you must submit the following attachments:

                                <ul>
                                    <li>Two Letters of Recommendation from Non-Relatives</li>
                                    <li>Transcripts (unofficial transcripts for the most recently completed term)</li>
                                    <li>ACT or SAT Scores</li>
                                    <li>First and Second page of Applicant's most recent 1040 (if applicable)</li>
                                    <li>EFC (Expected Family Contribution) obtained from FAFSA</li>
                                    <li>Any additional information or documentation that may be helpful to the Review Committee</li>
                                </ul>

                                Please upload these documents to a cloud storage service (Google Drive, Dropbox, etc.) and provide the link in the field below.
                            </p>

                            <div className="form-group">
                                <label htmlFor="documentLink">Link to Documents:</label>
                                <Field name="documentLink"
                                    type="text"
                                    placeholder="Link to Documents" />
                                <ErrorMessage name="documentLink" component="div" />
                            </div>

                        </div>

                        

                        {/* Print Section */}
                        <div className="section-container">
                            <p style={{ textAlign: 'left' }}>

                                You can print your application for your records by clicking the button below <strong>before</strong> you submit your application.
                                <br></br>
                                <br></br>
                                Once you click the <strong>Submit</strong> button, all fields will be reset.
                            </p>
                            <center>
                                <button type="button" onClick={handlePrint}>
                                    Print Application
                                </button>
                            </center>
                        </div>

                        {/* Submit Button */}
                        <div className="section-container">
                            <p style={{ textAlign: 'left' }}>
                                By clicking the <b>Submit Application</b> button below you acknowledge that you have completed this application truthfully to the best of your ability.
                            </p>

                            {submitCount > 0 && !isValid && (
                                <div className="alert alert-danger" role="alert">
                                    Your application has <strong>NOT</strong> been submitted.  Please fill in all required fields before submitting.
                                </div>
                            )}

                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <input type="submit" value="Submit Application" className="btn btn-primary" disabled={isSubmitting || isSubmitted} />
                            </div>
                        </div>

                        {isSubmitted && (
                            <div className="alert alert-success" role="alert">
                                Your application has been submitted successfully!
                            </div>
                        )}

                        {/*<button type="button" onClick={() => fillTestValues(setFieldValue)} className="btn btn-secondary">*/}
                        {/*    Fill Test Values*/}
                        {/*</button>*/}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UniversityForm;