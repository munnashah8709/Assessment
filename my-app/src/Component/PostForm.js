import React, { useState, useEffect } from 'react';
import '../App.css';

function PostForm() {
  const [name, setName] = useState('');
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentItems, setCommentItems] = useState({});
  const [commentText, setCommentText] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user: name 
        }),
      });

      if (response.ok) {
        localStorage.setItem('userId', response._id);
        console.log(response);
        // Clear the input field
        setName('');
        // Fetch and update the list of post data
        fetchPostData();
      } else {
        console.error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await fetch('http://localhost:3001/postdata');
      if (response.ok) {
        const data = await response.json();
        setPostData(data);
      } else {
        console.error('Failed to fetch post data.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCommentClick = async (postId) => {
    setCommentItems({
      ...commentItems,
      [postId]: !commentItems[postId],
    });
    console.log(`Comment button clicked for post with ID: ${postId}`);
  };

  const userId = localStorage.getItem('userId');
  const handlePostComment = async (postId) => {
    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            userid:userId,
            Postid:postId,
            Comments:commentText[postId]
        }),
      });

      if (response.ok) {
        console.log(response);
        alert("comment posted Successfully")
      } else {
        console.error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlerouts =()=>{
    window.location.href = '/CommentList';
  }

  useEffect(() => {
    fetchPostData();
  }, []);


  return (
    <div>
      <div className='card' style={{ marginTop: "-250px" }}>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <br></br>

    
        <h2>Post Data</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
          {postData.map((post) => (
            <li key={post._id}>
              <span>{post.user}</span>
              <span className="comment-link" onClick={() => handleCommentClick(post._id)}>Comment</span>
              <span> {commentItems[post._id] && (
                  <div>
                    <input type="text" placeholder="Add a comment" value={commentText[post._id] || ''}
                      onChange={(e) =>
                        setCommentText({
                          ...commentText,
                          [post._id]: e.target.value,
                        })
                      } />
                    <span><button onClick={() => handlePostComment(post._id)}>Post</button></span>  
                  </div>
                )}</span>
             
            </li>
          ))}
        </ul>
        )}

<button type="submit" onClick={handlerouts}>List Of Comments</button>
      </div>
  );
}

export default PostForm;
