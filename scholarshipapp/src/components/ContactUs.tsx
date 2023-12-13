import React, { useRef, useState, useEffect, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import './FormStyleSheet.css';

export const ContactUs: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const maxWords = 500;

    // Add state for submission status
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState('');

    useEffect(() => {
        const words = message.trim().split(/\s+/);
        const filteredWords = words.filter(word => word.length > 0);
        setWordCount(filteredWords.length);
    }, [message]);

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitted(false);
        setSubmissionError('');

        if (form.current) {
            emailjs.sendForm('service_55zyzln', 'template_rbwigdh', form.current, '5MK4rWbh_fCErDO7u')
                .then((result) => {
                    // Set submission status
                    setIsSubmitted(true);
                    console.log(result.text);

                    // Reset form fields
                    setUserName('');
                    setUserEmail('');
                    setMessage('');
                }, (error) => {
                    setSubmissionError(error.text);
                    console.log(error.text);
                });
        }
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        // We count the words and update the state if they are less than or equal to maxWords
        const words = value.trim().split(/\s+/);
        if (words.length <= maxWords || value === "") {
            setMessage(value);
        }
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <p>
                <label>Name</label>
                <input
                    type="text"
                    name="user_name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
            </p>

            <p>
                <label>Email</label>
                <input
                    type="email"
                    name="user_email"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                />
            </p>

            <div className="textAreaContainer">
                <label>Message</label>
                <textarea
                    name="message_area_01"
                    value={message}
                    onChange={handleMessageChange}
                />
                <div className="smallFont">
                    Word Count: {wordCount}/{maxWords}
                </div>
            </div>

            {isSubmitted && !submissionError && (
                <div className="submissionSuccess">
                    Your message has been sent successfully!
                </div>
            )}

            {submissionError && (
                <div className="submissionError">
                    Failed to send the message: {submissionError}
                </div>
            )}

            <p>
                <input type="submit" value="Send" />
            </p>
        </form>
    );
};
