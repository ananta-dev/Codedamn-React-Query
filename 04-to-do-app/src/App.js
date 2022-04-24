import "./App.css";
import { useQuery, useMutation } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import client from "./react-query-client";

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
                console.log("Got response from backend: ", { data });
                client.invalidateQueries("favLangs");
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
        setTempLang("");
    }

    if (isLoading) return <h1>Loading...</h1>;

    if (isError) return <h1>Error with request</h1>;

    return (
        <div className='App'>
            <h1>Some favorite programming languages</h1>
            {favLanguages.lang.map(lang => {
                return <div key={lang.id}>{lang.name}</div>;
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
