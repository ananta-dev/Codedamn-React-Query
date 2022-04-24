import "./App.css";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import Post from "./Post";

function App() {
    const [postID, setPostID] = useState(null);

    const fetcher = url => fetch(url).then(res => res.json());

    const { isLoading, data: posts } = useQuery("posts", () =>
        fetcher("https://jsonplaceholder.typicode.com/posts")
    );

    if (isLoading) return <h1>Loading...</h1>;

    if (postID != null) {
        return <Post postID={postID} goBack={() => setPostID(null)} />;
    }

    return (
        <div className='App'>
            {posts.map(post => {
                return (
                    <p key={post.id}>
                        <a onClick={() => setPostID(post.id)} href='#'>
                            {post.id}-{post.title}
                        </a>
                    </p>
                );
            })}
            <ReactQueryDevtools />
        </div>
    );
}

export default App;
