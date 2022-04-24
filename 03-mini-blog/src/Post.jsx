import { useQuery } from "react-query";

const fetcher = url => fetch(url).then(res => res.json());

const Post = ({ postID, goBack }) => {
    const { data: post, isLoading } = useQuery(["post", postID], () =>
        fetcher(`https://jsonplaceholder.typicode.com/posts/${postID}`)
    );

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <div>
            <a href='#' onClick={goBack}>
                Go back
            </a>
            <h1>Post ID: {post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

export default Post;
