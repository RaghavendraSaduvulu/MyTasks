import './index.css'

const TasksList = props => {
  const {tasks} = props

  return (
    <ul className="tasks-list">
      {tasks.map(eachItem => (
        <li className="task-list-item" key={eachItem.id}>
          <p className="task">{eachItem.task}</p>
          <p className="tag">{eachItem.tag}</p>
        </li>
      ))}
    </ul>
  )
}

export default TasksList
