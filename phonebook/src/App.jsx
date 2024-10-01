import { useState } from "react";

const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            filter shown with <input value={search} onChange={handleSearch} />
        </div>
    );
};
const Person = ({ person }) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    );
};
const Persons = ({ listPersons }) => {
    return listPersons.map((person) => {
        return <Person key={person.id} person={person} />;
    });
};

const PersonForm = ({
    addName,
    newName,
    newNumber,
    handleName,
    handleNumber,
}) => {
    return (
        <form onSubmit={addName}>
            <div>
                Name: <input value={newName} onChange={handleName} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
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
        return (
            index ===
            persons.findIndex(
                (pers) => person.name.toLowerCase() === pers.name.toLowerCase()
            )
        );
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
            if (newPerson.name.toLowerCase() === person.name.toLowerCase()) {
                return alert(`${newPerson.name} is already added to phonebook`);
            } else {
                return (
                    setPersons(persons.concat(newPerson)),
                    setNewName(""),
                    setNewNumber("")
                );
            }
        });
    };

    const handleName = (e) => {
        setNewName(e.target.value);
    };

    const handleNumber = (e) => {
        setNewNumber(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const listPersons = searchPersons(uniquePersons, search);

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter search={search} handleSearch={handleSearch} />
            <h2>Add a new</h2>
            <PersonForm
                addName={addName}
                newName={newName}
                newNumber={newNumber}
                handleName={handleName}
                handleNumber={handleNumber}
            />
            <h2>Numbers</h2>
            <Persons listPersons={listPersons} />
        </div>
    );
};

export default App;
