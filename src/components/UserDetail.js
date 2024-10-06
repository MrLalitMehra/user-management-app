import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if (!response.ok) throw new Error('Failed to fetch user details');
            const data = await response.json();
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]); // Fetch when id changes

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container mt-4">
            <h2>User Details</h2>
            {user ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                        <Card.Text><strong>Phone:</strong> {user.phone}</Card.Text>
                        <Card.Text><strong>Username:</strong> {user.username}</Card.Text>
                        <Card.Text>
                            <strong>Website:</strong> 
                            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
                        </Card.Text>
                        <Card.Text><strong>Address:</strong> {user.address.street}, {user.address.city}</Card.Text>
                        <Card.Text><strong>Company:</strong> {user.company.name}</Card.Text>
                        <Link to="/">
                            <Button variant="primary">Back to User List</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
};

export default UserDetail;
