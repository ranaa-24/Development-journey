import { useState } from 'react'
import Post from './Post.jsx'
import './App.css'

function App() {
  let [posts, setPosts] = useState([]); // array of objs 
  
  let postComponents = posts.map((post) => {  // array of <Post/> component from raw posts objs
    return <Post pfp={post.pfp} name={post.name} followers={post.followers} postContent={post.postContent} />
  });

  function addPost() {
    const postToBeCreated = {
      pfp: "https://i.pinimg.com/736x/24/7c/14/247c14e67e1d68913412f29d51559c3b.jpg",
      name: "Ruhiiii🌻",
      followers: "12,312",
      postContent: "Helloooo, I assists customers with selecting cat food, toys, accessories, and other products."
    }
    setPosts([...posts, postToBeCreated]);
  }

  return (
    <div>
      <button onClick={addPost} style={{ position: 'fixed' }}>Add Post</button>
      {/* posts */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {postComponents}
      </div>

    </div>
  )
}

export default App
