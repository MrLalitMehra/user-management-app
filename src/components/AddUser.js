import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = ({ addUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    companyName: '',
    website: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const { name, email, phone, street, city, companyName, website } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!name.trim()) formErrors.name = 'Name is required.';
    else if (name.length < 3) formErrors.name = 'Name must be at least 3 characters.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) formErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) formErrors.email = 'Invalid email format.';

    const phoneRegex = /^[0-9]+$/;
    if (!phone.trim()) formErrors.phone = 'Phone number is required.';
    else if (!phoneRegex.test(phone)) formErrors.phone = 'Phone number must be numeric.';

    if (!street.trim()) formErrors.street = 'Street address is required.';
    if (!city.trim()) formErrors.city = 'City is required.';

    if (companyName && companyName.length < 3) 
      formErrors.companyName = 'Company name must be at least 3 characters.';

    const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (website && !websiteRegex.test(website)) formErrors.website = 'Invalid website URL.';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser = await response.json();
      addUser(newUser); // Add the new user to the state
      navigate('/'); // Navigate to home after successful addition
    } catch (error) {
      setApiError('Failed to add user. Please try again later.');
    }
  };

  return (
    <div className="container py-5">
      <div className="w-75 mx-auto shadow p-5 m-5">
        <h2 className="text-left mb-4">Add A User</h2>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group m-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter Your Name"
              name="name"
              id="name"
              value={name}
              onChange={onInputChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="form-group m-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter Your Email"
              name="email"
              id="email"
              value={email}
              onChange={onInputChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group m-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
              placeholder="Enter Your Phone"
              name="phone"
              id="phone"
              value={phone}
              onChange={onInputChange}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          <div className="form-group m-3">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.street ? 'is-invalid' : ''}`}
              placeholder="Enter Your Street"
              name="street"
              id="street"
              value={street}
              onChange={onInputChange}
            />
            {errors.street && <div className="invalid-feedback">{errors.street}</div>}
          </div>
          <div className="form-group m-3">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.city ? 'is-invalid' : ''}`}
              placeholder="Enter Your City"
              name="city"
              id="city"
              value={city}
              onChange={onInputChange}
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="form-group m-3">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.companyName ? 'is-invalid' : ''}`}
              placeholder="Enter Your Company Name (optional)"
              name="companyName"
              id="companyName"
              value={companyName}
              onChange={onInputChange}
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
          </div>
          <div className="form-group m-3">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.website ? 'is-invalid' : ''}`}
              placeholder="Enter Your Website URL (optional)"
              name="website"
              id="website"
              value={website}
              onChange={onInputChange}
            />
            {errors.website && <div className="invalid-feedback">{errors.website}</div>}
          </div>
          <button className="btn btn-success btn-block m-3" type="submit">
            Add User
          </button>
          <Link className="btn btn-primary m-3" to="/">Back to Home</Link>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
