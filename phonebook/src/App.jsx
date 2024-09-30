import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const addName = (evt) => {
        evt.preventDefault();
        const newPerson = {
            name: newName,
        };
        setPersons(persons.concat(newPerson));
        setNewName("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    Name:{" "}
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return <p key={person.name}>{person.name}</p>;
            })}
        </div>
    );
};

export default App;
