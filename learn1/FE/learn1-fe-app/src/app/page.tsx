// src/app/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import axios from 'axios';

const Home: React.FC = () => {
    const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
    const [userToEdit, setUserToEdit] = useState<{ id: number; name: string; email: string } | undefined>(undefined);

    // Function to fetch users
    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8000/users/');
        setUsers(response.data);
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user: { id: number; name: string; email: string }) => {
        setUserToEdit(user);
    };

    const handleUserSaved = () => {
        setUserToEdit(undefined); // Set to undefined after saving
        fetchUsers(); // Refresh the user list after saving
    };

    const handleDelete = async (userId: number) => {
        await axios.delete(`http://localhost:8000/users/${userId}`);
        fetchUsers(); // Refresh the user list after deletion
    };

    return (
        <div>
            <h1>User Management</h1>
            <UserForm userToEdit={userToEdit} onUserSaved={handleUserSaved} />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Home;
