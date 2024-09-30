const Header = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    );
};

const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>
                {part} {exercises}
            </p>
        </div>
    );
};

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) => {
                return (
                    <Part
                        key={part.id}
                        part={part.name}
                        exercises={part.exercises}
                    />
                );
            })}
        </div>
    );
};

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

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    );
};

export default Course;
