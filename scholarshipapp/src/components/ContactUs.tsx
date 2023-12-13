import React, { useRef, useState, useEffect, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import './FormStyleSheet.css';

export const ContactUs: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [message, setMessage] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const maxWords = 500;

    useEffect(() => {
        const words = message.trim().split(/\s+/);
        const filteredWords = words.filter(word => word.length > 0);
        setWordCount(filteredWords.length);
    }, [message]);

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();

        if (form.current) {
            emailjs.sendForm('service_55zyzln', 'template_rbwigdh', form.current, '5MK4rWbh_fCErDO7u')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
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
                <input type="text" name="user_name" />
            </p>

            <p>
                <label>Email</label>
                <input type="email" name="user_email" />
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

            <p>
                <input type="submit" value="Send" />
            </p>
        </form>
    );
};
