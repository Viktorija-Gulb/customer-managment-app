import React, { useState } from 'react';
import TextInput from './TextInput/TextInput';

interface User {
  firstName: string;
  lastName: string;
}

const Form: React.FC = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit ', user);
  };

  return (
    <>
      <h2>Personal information</h2>

      <form className="form" onSubmit={handleSubmit}>
        <TextInput
          id="first-name"
          nameAttr="firstName"
          label="First name"
          value={user.firstName}
          onChange={(e) => handleChange(e)}
        />
        <TextInput
          id="last-name"
          nameAttr="lastName"
          label="Last name"
          value={user.lastName}
          onChange={(e) => handleChange(e)}
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
