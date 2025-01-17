import { useEffect, useState } from "react";
import phonebookService from "./services/phonebook";

const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            Filter shown with <input value={search} onChange={handleSearch} />
        </div>
    );
};

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Person = ({ person }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            phonebookService.remove(person.id);
            window.location.reload();
        }
    };

    return (
        <p>
            {person.name} {person.number}{" "}
            <Button handleClick={handleDelete} text="delete" />
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

const Success = ({ message }) => {
    const successStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    if (message === null) {
        return null;
    }

    return <div style={message !== null ? successStyle : ""}>{message}</div>;
};

const Error = ({ message }) => {
    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    if (message === null) {
        return null;
    }

    return <div style={message !== null ? errorStyle : ""}>{message}</div>;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        phonebookService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

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
        };

        if (newPerson.name !== "" && newPerson.number !== "") {
            phonebookService.create(newPerson).then((returnedPerson) => {
                setPersons(uniquePersons.concat(returnedPerson));
                setNewName(""), setNewNumber("");
                setSuccessMessage(`Added ${newPerson.name}`);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);
            });

            uniquePersons.map((person) => {
                if (
                    newPerson.name.toLowerCase() === person.name.toLowerCase()
                ) {
                    if (
                        window.confirm(
                            `${newPerson.name} is already added to phonebook, replace the old number with a new one ?`
                        )
                    ) {
                        const newObject = {
                            ...person,
                            number: newPerson.number,
                        };
                        phonebookService
                            .edit(person.id)
                            .then((returnedPerson) => {
                                setPersons(
                                    uniquePersons.concat((person) =>
                                        person.id !== id
                                            ? person
                                            : returnedPerson
                                    )
                                );
                            })
                            .catch((err) => {
                                console.log(
                                    `Information of ${newPerson.name} has already been deleted from server`
                                );
                                setErrorMessage(
                                    `Information of ${newPerson.name} has already been deleted from server`
                                );
                                setTimeout(() => {
                                    setErrorMessage(null);
                                    window.location.reload();
                                }, 5000);
                            });
                    }
                }
            });
        } else {
            if (newPerson.name === "") {
                alert("Invalid name");
            } else if (newPerson.number === "") {
                alert("Invalid number");
            }
        }
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
            {successMessage ? (
                <Success message={successMessage} />
            ) : errorMessage ? (
                <Error message={errorMessage} />
            ) : (
                ""
            )}
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
