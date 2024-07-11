import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/api/user/668e3701a9d53b34dfd37bed').then(response => {
            setUser(response.data);
        });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.fullName}</h1>
            <p>{user.about}</p>
            <img src={user.imageUrl} alt="Profile" />
        </div>
    );
};

export default UserProfile;
