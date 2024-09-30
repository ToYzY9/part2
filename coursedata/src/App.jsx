const App = (props) => {
    const { notes } = props;

    const resultId = notes.map((note) => note.id);
    console.log("resultId", resultId);

    const resultContent = notes.map((note) => note.content);
    console.log("resultContent", resultContent);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
