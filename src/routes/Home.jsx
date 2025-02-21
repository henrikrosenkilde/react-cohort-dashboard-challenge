import "../styles/Content.css";
import PostInput from "../components/PostComponents/PostInput";
import Post from "../components/PostComponents/Post";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllPosts } from "../services/PostService";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { isLoading, error } = useQuery("posts", () => getAllPosts(setPosts));

  const removePost = (id) => {
    const removed = posts.filter((p) => p.id !== id);
    setPosts(removed);
  };

  const sortedPosts = posts.sort((a, b) => b.id - a.id);

  return (
    <div className="content">
      <h1>Home</h1>
      <PostInput onClick={(post) => setPosts([...posts, post])} />
      {isLoading && <p>Posts are loading...</p>}
      {error && <p>{error.message}</p>}
      {!error &&
        sortedPosts.map((post) => (
          <Post
            onDelete={(id) => removePost(id)}
            title={post.title}
            key={post.id}
            id={post.id}
            contactId={post.contactId}
          >
            {post.content}
          </Post>
        ))}
    </div>
  );
}