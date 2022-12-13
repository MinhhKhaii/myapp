import {useReducer , useRef} from 'react'

const initstate = {
  job: '',
  jobs: []
}

const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'
const setJob = payload => {
  return {
    type: SET_JOB,
    payload
  }
}
const addJob = payload => {
  return {
    type: ADD_JOB,
    payload
  }
}
const deleteJob = payload => {
  return {
    type: DELETE_JOB,
    payload
  }
}


const reducer = (state, action) => {
  switch(action.type) {
    case SET_JOB:
      return {
        ...state, job: action.payload
      }
    case ADD_JOB:
      return {
        ...state,job:'', jobs: [...state.jobs, action.payload]
      }
    case DELETE_JOB:
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1)
      return {
        ...state, jobs: newJobs
      }
    default:
      throw new Error('Error')
  }
  
}



function App() {

  const [state, dispacth] = useReducer(reducer, initstate)
  const {job, jobs} = state

  const handleSubmit = () =>
    dispacth(addJob(job))

  return (
    <div>
      <h3>Todo</h3>
      <input 
        value={job}
        placeholder="Enter todo..."
        onChange={e => {
          dispacth(setJob(e.target.value))
        }}>
      </input>
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}
          <span onClick={() => dispacth(deleteJob())}
            >&times;
          </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
