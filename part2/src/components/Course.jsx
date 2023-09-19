const Course = ({header, course, total, courseIndex}) => {
    return (
        <>
            <h2>{header}</h2>
            <ul>
                {course[courseIndex].parts.map(note => 
                <li key={note.id}>
                    {note.name} {note.exercises}
                </li>
                )}
            </ul>
            <b>total of {total} exercises</b><br />
        </>
    )
}

export default Course;