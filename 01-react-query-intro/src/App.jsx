import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import { useState } from "react";

function Button() {
    const [isEnabled, setIsEnabled] = useState(false);

    const { data, error, isLoading, isError, isSuccess, isIdle } = useQuery(
        "hello world",
        () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(Math.random()), 2000);
            });
        },
        {
            // Refetch the data every second
            refetchInterval: 20000,
            staleTime: 10000,
            enabled: isEnabled,
        }
    );

    console.log({ data, error, isLoading, isError, isSuccess, isIdle });

    return (
        <>
            <button>I am a button {data}</button>;
            <br />
            {isEnabled && <div>enabled</div>}
            {!isEnabled && <div>disabled</div>}
            {isIdle && <div>isIdle: True</div>}
            {!isIdle && <div>isIdle: False</div>}
            <button
                onClick={() =>
                    setIsEnabled(prevDisabledStatus => !prevDisabledStatus)
                }
            >
                Toggle disable
            </button>
            <br />
            <br />
            <br />
        </>
    );
}

function App() {
    const [isVisible, setIsVisible] = useState(true);

    function toggleButton() {
        setIsVisible(isVisible => !isVisible);
    }

    return (
        <div className='App'>
            <header className='App-header'>
                {isVisible && <Button />}
                <button onClick={toggleButton}>Toggle</button>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
