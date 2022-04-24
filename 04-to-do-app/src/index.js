import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClientProvider } from "react-query";
import client from "./react-query-client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>
);
