'use client'
import { useState, FormEvent, ChangeEvent } from 'react';

type FormData = {
    name: string;
    email: string;
    address: string;
};

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        address: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            console.log('User created successfully');
            // Handle success here, e.g., redirect to another page or clear the form
        } else {
            console.error('Failed to create user');
            // Handle errors here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

            <button type="submit">Register</button>
        </form>
    );
}

