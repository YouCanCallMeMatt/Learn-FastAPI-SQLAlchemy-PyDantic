// src/components/UserList.tsx

import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => onEdit(user)}>Edit</button>
                        <button onClick={() => onDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
