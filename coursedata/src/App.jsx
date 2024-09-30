const App = (props) => {
    const { notes } = props;

    // Ceci est cependant, non recommandé et peut créer des
    // problèmes indésirables même s'il semble fonctionner
    // correctement.

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note, i) => (
                    <li key={i}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
