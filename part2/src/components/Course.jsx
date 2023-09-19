const Course = ({course}) => {
    return (
        <>
        <h1>Half Stack Application Development</h1>
        <ul>
            {course.map(note => 
            <li key={note.id}>
                {note.name} {note.exercises}
            </li>
            )}
        </ul>
        </>
    )
}

export default Course;