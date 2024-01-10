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

interface FormValues {
    name: string;
    dob: string;
    address: string;
    phoneNumber: string;
    email: string;
    message: string;
    academicHistories: AcademicHistory[];
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

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const words = value.split(' ').filter(n => n);
        const currentWordCount = words.length;
        if (currentWordCount <= maxMessageWords) {
            setMessageWordCount(currentWordCount);
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
                        <h5>Must be submitted by March 15</h5>

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

                        <div className="section-container">
                            <FieldArray name="academicHistories">
                                {({ remove, push }) => (
                                    <div>
                                        <b>Academic History</b>
                                        {values.academicHistories.map((_, index) => (
                                            <div className="academic-history-entry" key={index}>
                                                <Field name={`academicHistories.${index}.nameOfSchool`} placeholder="Name of School" />
                                                <ErrorMessage name={`academicHistories.${index}.nameOfSchool`} component="div" />
                                                <Field name={`academicHistories.${index}.datesAttended`} placeholder="Dates Attended" />
                                                <ErrorMessage name={`academicHistories.${index}.datesAttended`} component="div" />
                                                <Field name={`academicHistories.${index}.numberInClass`} placeholder="Number in Class" />
                                                <ErrorMessage name={`academicHistories.${index}.numberInClass`} component="div" />
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
