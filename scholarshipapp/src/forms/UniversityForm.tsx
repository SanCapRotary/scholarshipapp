import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import sancaplogo from '../assets/sancaplogo.png';
import '../components/FormStyleSheet.css'; // Ensure this path is correct

interface AcademicHistory {
    nameOfSchool: string;
    datesAttended: string;
    numberInClass: string;
    classRank: string;
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

interface FormValues {
    name: string;
    dob: string;
    address: string;
    phoneNumber: string;
    email: string;
    message: string;
    academicHistories: AcademicHistory[];
    scholastic: Scholastic;
    extraCurricular: ExtraCurricular;
    employmentHistories: EmploymentHistory[];
    appliedCollege: string;
    plannedCollege: string;
    intendedMajor: string;
    plannedCollegeStartDate: string;
    guardians: Guardian[];
    siblings: Sibling[];
}

const maxMessageWords = 250;

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    dob: Yup.date().required('Required').max(new Date(), 'Date of birth cannot be in the future'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().max(maxMessageWords, `Message cannot exceed ${maxMessageWords} words`).required('Required'),
    academicHistories: Yup.array().of(
        Yup.object().shape({
            nameOfSchool: Yup.string().required('School name required'),
            datesAttended: Yup.string().required('Dates attended are required'),
            numberInClass: Yup.string().required('Number in class is required'),
            classRank: Yup.string().required('Class rank is required'),
        })
    ),
});

const sendEmail = (templateParams: FormValues) => {
    const serviceId = 'service_55zyzln';
    const templateId = 'template_hwgv5qm';
    const userId = '5MK4rWbh_fCErDO7u';

    emailjs.send(serviceId, templateId, templateParams as unknown as Record<string, unknown>, userId)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            console.log('FAILED...', err);
        });
}

const UniversityForm = () => {
    const [messageWordCount, setMessageWordCount] = useState(0);
    const [honorsWordCount, setHonorsWordCount] = useState(0);
    const [leadershipWordCount, setLeadershipWordCount] = useState(0);
    const [membershipWordCount, setMembershipWordCount] = useState(0);
    const [ecHonorsWordCount, setECHonorsWordCount] = useState(0);
    const [ecLeadershipWordCount, setECLeadershipWordCount] = useState(0);
    const [ecMembershipWordCount, setECMembershipWordCount] = useState(0);


    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const words = value.split(' ').filter(n => n);
        const currentWordCount = words.length;
        if (currentWordCount <= maxMessageWords) {
            setMessageWordCount(currentWordCount);
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

    const initialValues: FormValues = {
        name: '',
        dob: '',
        address: '',
        phoneNumber: '',
        email: '',
        message: '',
        academicHistories: [{
            nameOfSchool: '',
            datesAttended: '',
            numberInClass: '',
            classRank: '',
        }],
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
    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                    sendEmail(values);
                    resetForm({});
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <img src={sancaplogo} className="logo img-fluid" alt="Sanibel Captiva Rotary Club logo" />
                        <h3>University Scholarship Application</h3>
                        <h5>Must be submitted by April 15</h5>

                        { /* Personal Information Section */ }
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

                            <div className="trade-honors-awards-form-group">
                                <label htmlFor="message">Message:</label>
                                <span className="word-count">
                                    Word Count: {messageWordCount}/{maxMessageWords}
                                </span>
                                <Field
                                    name="message"
                                    as="textarea"
                                    placeholder="Message"
                                    value={values.message}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        handleMessageChange(e);
                                        setFieldValue("message", e.target.value);
                                    }}
                                />
                                <ErrorMessage name="message" component="div" />
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
                                            Number in Class
                                                <Field name={`academicHistories.${index}.numberInClass`} placeholder="Number in Class" />
                                                <ErrorMessage name={`academicHistories.${index}.numberInClass`} component="div" />
                                            Class Rank
                                                <Field name={`academicHistories.${index}.classRank`} placeholder="Class Rank" />
                                                <ErrorMessage name={`academicHistories.${index}.classRank`} component="div" />
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
                            <b>ExtraCurricular</b>

                            {/* Honors, Awards & Distinctions */}
                            <div className="trade-honors-awards-form-group">
                                <label htmlFor="extraCurricular.ecHonorsAwards">Honors, Awards & Distinctions Received (Year and Nature of Award):</label>
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
                                <label htmlFor="extraCurricular.ecLeadershipPositions">Office and Positions of Leadership (Organization, Position, Year):</label>
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
                                <label htmlFor="extraCurricular.ecOrganizationsMembership">Member of Organization (Where no office was held):</label>
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

                        {/* Employment History Section */ }
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

export default UniversityForm;