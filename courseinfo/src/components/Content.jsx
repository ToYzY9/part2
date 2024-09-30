import Part from "./Part";

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

export default Content;
