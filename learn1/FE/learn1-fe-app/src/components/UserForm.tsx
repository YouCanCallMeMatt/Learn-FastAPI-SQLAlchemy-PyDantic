// src/components/UserForm.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserFormProps {
    userToEdit?: { id: number; name: string; email: string };
    onUserSaved: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onUserSaved }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        }
    }, [userToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userToEdit) {
            // Update user
            await axios.put(`http://localhost:8000/users/${userToEdit.id}`, { name, email });
        } else {
            // Create new user
            await axios.post('http://localhost:8000/users/', { name, email });
        }
        setName('');
        setEmail('');
        onUserSaved(); // Call the function to refresh the user list
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">{userToEdit ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default UserForm;
