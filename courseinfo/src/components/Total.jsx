const Total = ({ course }) => {
    const initialValue = 0;

    const total = course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        initialValue
    );

    return (
        <>
            <h3>Total of {total} exercises</h3>
        </>
    );
};

export default Total;
