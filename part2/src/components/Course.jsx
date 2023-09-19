const Course = ({course, total}) => {
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
        <div><b>total of {total} exercises</b></div>
        </>
    )
}

export default Course;