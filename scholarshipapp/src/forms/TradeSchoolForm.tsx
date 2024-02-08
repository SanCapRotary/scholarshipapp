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

interface EmailData extends Omit<TradeSchoolApplicationFormValues, 'academicHistories' | 'employmentHistories' | 'guardians' | 'siblings'> {
    academicHistories: string;
    employmentHistories: string;
    guardians: string;
    siblings: string;
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
    workedOnSanibel: boolean;
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
            placeOfEmployment: Yup.string(),
            employmentAddress: Yup.string(),
            jobTitle: Yup.string(),
            supervisorName: Yup.string(),
            startDate: Yup.date(),
            endDate: Yup.date(),
            hoursPerWeek: Yup.string(),
        })
    ),
    workedOnSanibel: Yup.boolean(),
    guardians: Yup.array().of(
        Yup.object().shape({
            name: Yup.string(),
            relationship: Yup.string(),
            address: Yup.string(),
            mobileNumber: Yup.string(),
            email: Yup.string().email('Invalid email'),
            occupation: Yup.string(),
            employer: Yup.string(),
        })
    ),
    siblings: Yup.array().of(
        Yup.object().shape({
            name: Yup.string(),
            age: Yup.string(),
            relationship: Yup.string(),
            school: Yup.string(),
        })
    ),
});

const sendEmail = (templateParams: EmailData): Promise<void> => {
    const serviceId = 'service_55zyzln';
    const templateId = 'template_rbwigdh';
    const userId = '5MK4rWbh_fCErDO7u';

    return emailjs.send(serviceId, templateId, templateParams as unknown as Record<string, unknown>, userId)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            console.log('FAILED...', err);
            throw err; // Rethrow the error for the catch block in handleFormSubmit
        });
}

const handlePrint = () => {
    window.print();
};

const TradeSchoolForm = () => {
    // State hooks for word counts
    const [scholasticHonorsWordCount, setScholasticHonorsWordCount] = useState(0);
    const [extraCurricularActivitiesWordCount, setExtraCurricularActivitiesWordCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const handleFormSubmit = async (
        values: TradeSchoolApplicationFormValues,
        { resetForm }: FormikHelpers<TradeSchoolApplicationFormValues>
    ) => {
        try {
            // Convert academicHistories, employmentHistories, guardians, and siblings arrays to strings
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
                siblings: siblingsString,
            };

            await sendEmail(emailData);

            setIsSubmitted(true);
            resetForm({});
        } catch (error) {
            console.error('Submission error', error);
            // Handle submission error here
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
        workedOnSanibel: false,
        guardians: [{ name: '', relationship: '', address: '', mobileNumber: '', email: '', occupation: '', employer: '' }],
        siblings: [{ name: '', age: '', relationship: '', school: '' }],
    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={TradeSchoolSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, setFieldValue, isValid, submitCount, isSubmitting }) => (
                    <Form>
                        <div className="print-area">
                            <img src={sancaplogo} className="logo img-fluid" alt="Sanibel Captiva Rotary Club logo" />
                            <h3>Trade School Application</h3>
                            <h5>Must be submitted by March 15, 2024</h5>

                            {/* Personal Information Section */}
                            <div className="section-container">
                                <b>Personal Information</b>

                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <Field name="firstName" type="text" placeholder="First Name" />
                                    <ErrorMessage name="firstName" component="div" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <Field name="lastName" type="text" placeholder="Last Name" />
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
                                    Expected Graduation
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
                                <b>Scholastic</b>
                                <div className="trade-honors-awards-form-group">
                                    <label htmlFor="scholasticHonors">Scholastic Honors, Awards, Distinctions Received:</label>
                                    <Field as="textarea" name="scholasticHonors"
                                        placeholder="Detail your scholastic honors and awards"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            handleWordCountChange(e, maxWords, setScholasticHonorsWordCount, setFieldValue, 'scholasticHonors')}
                                    />
                                    <span className="word-count">Word Count: {scholasticHonorsWordCount}/{maxWords}</span>
                                    <ErrorMessage name="scholasticHonors" component="div" />
                                </div>
                            </div>

                            {/* Extra Curricular Activities Section */}
                            <div className="section-container">
                                <b>Extra Curricular</b>
                                <div className="trade-honors-awards-form-group">
                                    <label htmlFor="extraCurricularActivities">Extra Curricular Activities:</label>
                                    <Field as="textarea" name="extraCurricularActivities"
                                        placeholder="Detail your extra curricular activities"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            handleWordCountChange(e, maxWords, setExtraCurricularActivitiesWordCount, setFieldValue, 'extraCurricularActivities')}
                                    />
                                    <span className="word-count">Word Count: {extraCurricularActivitiesWordCount}/{maxWords}</span>
                                    <ErrorMessage name="extraCurricularActivities" component="div" />
                                </div>
                            </div>

                            {/* Employment History Section */}
                            <div className="section-container">

                                <div className="form-group">
                                    <label htmlFor="workedOnSanibel">Have you or your family lived or worked on Sanibel?</label>
                                    <Field name="workedOnSanibel" as="select">
                                        <option value="true">Yes</option>
                                        <option value="workedOnSanibel">No</option>
                                    </Field>
                                </div>

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

                            {/* Letter of Recommendation Section */}
                            <div className="section-container">
                                <h5>LETTER OF RECOMMENDATION</h5>
                                <p style={{ textAlign: 'left' }}>
                                    A letter of recommendation is <strong>REQUIRED</strong> as part of this application.  That letter must be from an instructor or program director of the academy you are attending. The letter must be sent via email to <strong>chet@sanibelrotary.org</strong>.
                                </p>
                                <p style={{ textAlign: 'left' }}>
                                    It is your responsibility to make certain the email has been sent.
                                </p>
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
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TradeSchoolForm;