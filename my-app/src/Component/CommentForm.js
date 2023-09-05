import React, { useState } from 'react';

function CommentForm({ onCommentSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onCommentSubmit(message);
    setMessage('');
  };

  return (
    <div>
      <textarea
        placeholder="Write a comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Comment</button>
    </div>
  );
}

export default CommentForm;
