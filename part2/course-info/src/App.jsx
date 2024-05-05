import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const total1 = courses[0].parts.reduce((sum, value) => sum + value.exercises, 0);
  const total2 = courses[1].parts.reduce((sum, value) => sum + value.exercises, 0);

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course header="Half Stack application development" course={courses} total={total1} courseIndex={0}/>
      <Course header="Node.js" course={courses} total={total2} courseIndex={1} />
    </div>
  )
}

export default App;