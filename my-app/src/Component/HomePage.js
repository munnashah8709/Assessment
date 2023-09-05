import React, { useState } from 'react';
import '../../src/App.css'; // Import your CSS file

function HomePage() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(name)
   try {
    const response = await fetch('http://localhost:3001/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user:name 
      }),
    });

    if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('userId', responseData._id);
        console.log(responseData);
        window.location.href = '/PostForm';
   
    } else {
      console.error('Failed to submit the form.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  return (
    <div className='card'>
      <h2>Enter Your Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HomePage;
