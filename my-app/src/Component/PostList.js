import React, { useEffect, useState } from 'react';

function PostList() {
  const userId = localStorage.getItem('userId');
  const [comments, setComments] = useState([]);

  const fetchUserComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/comments/${userId}`);
      if (response.ok) {
        const fetchedComments = await response.json();
        setComments(fetchedComments); // Set the comments in the component state
      } else {
        console.error('Failed to fetch user comments.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserComments();
  }, [userId]);

  return (
    <div>
      <h2>User Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.comments}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
