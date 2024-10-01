import { useState } from "react";

const Numbers = (props) => {
    const { person } = props;
    return (
        <p key={person.name}>
            {person.name} {person.number}
        </p>
    );
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const uniquePersons = persons.filter((person, index) => {
        return index === persons.findIndex((pers) => person.name === pers.name);
    });

    const addName = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
            id: uniquePersons.length + 1,
        };

        uniquePersons.map((person) => {
            if (newPerson.name === person.name) {
                alert(`${newPerson.name} is already added to phonebook`);
            } else {
                setPersons(persons.concat(newPerson));
                setNewName("");
                setNewNumber("");
            }
        });
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
                    Number:{" "}
                    <input
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {uniquePersons.map((person) => {
                return <Numbers key={person.name} person={person} />;
            })}
        </div>
    );
};

export default App;
