import "./App.css";
import { useQuery, useMutation } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

const fetcher = (url, body) =>
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

function App() {
    const [tempLang, setTempLang] = useState("");

    const mutation = useMutation(
        body => fetcher("http://localhost:1337/api/add-lang", body),
        {
            onSuccess(data) {
                console.log("Got response from backend: ", data);
            },
            onError(error) {
                console.log("Got response from backend (error): ", error);
            },
        }
    );

    const {
        data: favLanguages,
        isLoading,
        isError,
    } = useQuery("favLangs", () =>
        fetch("http://localhost:1337/api/favlangs").then(d => d.json())
    );

    function callMutation() {
        mutation.mutate({ record: tempLang });
    }

    if (isLoading) return <h1>Loading...</h1>;

    if (isError) return <h1>Error with request</h1>;

    // if (postID != null) {
    //     return <Post postID={postID} goBack={() => setPostID(null)} />;
    // }

    return (
        <div className='App'>
            <h1>Some favorite programming languages</h1>
            {favLanguages.lang.map(lang => {
                return <div key={lang}>{lang}</div>;
            })}
            <input
                type='text'
                value={tempLang}
                onChange={e => setTempLang(e.target.value)}
            />
            <p onClick={callMutation}>Submit</p>
            <ReactQueryDevtools />
        </div>
    );
}

export default App;

// {
//     posts.map(post => {
//         return (
//             <p key={post.id}>
//                 <a onClick={() => setPostID(post.id)} href='#'>
//                     {post.id}-{post.title}
//                 </a>
//             </p>
//         );
//     });
// }
