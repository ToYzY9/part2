import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";

const promise = axios.get("http://localhost:3001/notes");
console.log(promise);

promise.then((response) => {
    console.log("response", response);
});

axios.get("http://localhost:3001/notes").then((response) => {
    const notes = response.data;
    console.log("notes", notes);
});

const promise2 = axios.get("http://localhost:3001/foobar");
console.log(promise2);

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.get("http://localhost:3001/notes").then((response) => {
    const notes = response.data;
    root.render(
        <StrictMode>
            <App notes={notes} />
        </StrictMode>
    );
});
