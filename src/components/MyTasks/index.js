import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'
import TasksList from '../TasksList'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    activeId: tagsList[0].optionId,
    task: '',
    tasks: [],
    activeFilterId: '',
    activeFilter: false,
  }

  onChangeSelectOption = event => {
    this.setState({activeId: event.target.value})
  }

  onChangeTaskInput = event => {
    this.setState({task: event.target.value})
  }

  onClickAddBtn = () => {
    const {task, tasks, activeId} = this.state
    const tag = tagsList.find(eachItem => eachItem.optionId === activeId)
    const taskItem = {
      id: v4(),
      option: tag.optionId,
      task,
      tag: tag.displayText,
    }
    this.setState({
      tasks: [...tasks, taskItem],
      activeId: tagsList[0].optionId,
      task: '',
    })
  }

  onClickFilterButton = option => {
    this.setState({activeFilterId: option, activeFilter: true})
  }

  renderNoTasks = () => (
    <div className="no-task-container">
      <p className="no-task-heading">No Tasks Added Yet</p>
    </div>
  )

  renderFilteredList = () => {
    const {tasks, activeFilterId} = this.state
    const filteredList = tasks.filter(
      eachItem => eachItem.option === activeFilterId,
    )
    const filterLength = filteredList.length
    if (filterLength === 0) {
      return this.renderNoTasks()
    }
    return <TasksList tasks={filteredList} />
  }

  renderTasksList = () => {
    const {tasks, activeFilter} = this.state

    if (activeFilter === false) {
      return <TasksList tasks={tasks} />
    }
    return this.renderFilteredList()
  }

  render() {
    const {activeId, task, tasks, activeFilterId} = this.state

    const tasksLength = tasks.length

    return (
      <div className="app-container">
        <form className="create-task-container">
          <h1 className="create-task-heading">Create a task!</h1>
          <label className="label" htmlFor="task">
            Task
          </label>
          <input
            id="task"
            type="text"
            placeholder="Enter the task here"
            className="task-input"
            value={task}
            onChange={this.onChangeTaskInput}
          />
          <label className="label" htmlFor="tags">
            Tags
          </label>
          <select
            id="tags"
            className="select-options"
            value={activeId}
            onChange={this.onChangeSelectOption}
          >
            {tagsList.map(eachItem => (
              <option
                key={eachItem.optionId}
                id={eachItem.optionId}
                value={eachItem.optionId}
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-btn"
            onClick={this.onClickAddBtn}
          >
            Add Task
          </button>
        </form>
        <div className="display-task-with-filter">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachItem => {
              const {optionId, displayText} = eachItem
              const onClickFilterBtn = () => {
                this.onClickFilterButton(optionId)
              }
              const active =
                optionId === activeFilterId ? 'filter-btn active' : 'filter-btn'

              return (
                <li key={optionId}>
                  <button
                    type="button"
                    className={active}
                    onClick={onClickFilterBtn}
                  >
                    {displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          {tasksLength === 0 ? this.renderNoTasks() : this.renderTasksList()}
        </div>
      </div>
    )
  }
}

export default MyTasks
