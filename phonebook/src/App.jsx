import { useState } from "react";

const Person = ({ person }) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    );
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");

    const uniquePersons = persons.filter((person, index) => {
        return index === persons.findIndex((pers) => person.name === pers.name);
    });

    const searchPersons = (pArr, pQuery) => {
        return pArr.filter((el) => {
            return el.name.toLowerCase().includes(pQuery.toLowerCase());
        });
    };

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

    const listPersons = searchPersons(uniquePersons, search);

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with{" "}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <h2>Add a new</h2>
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
            {listPersons.map((person) => {
                return <Person key={person.id} person={person} />;
            })}
        </div>
    );
};

export default App;
