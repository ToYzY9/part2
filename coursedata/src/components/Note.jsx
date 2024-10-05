const Note = ({ note, toggleImportanceOf }) => {
    const label = note.important ? "Make not important" : "Make important";

    return (
        <>
            <li>
                {note.content}{" "}
                <button onClick={toggleImportanceOf}>{label}</button>
            </li>
        </>
    );
};

export default Note;
