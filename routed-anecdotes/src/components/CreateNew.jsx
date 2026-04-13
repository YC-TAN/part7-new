import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useAnecdotes } from '../hooks/useAnecdotes'

const CreateNew = () => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()
  const {addAnecdote} = useAnecdotes();

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ 
      content: content.bind.value, 
      author: author.bind.value, 
      info: info.bind.value, 
      votes: 0 
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content.bind} />
        </div>
        <div>
          author
          <input {...author.bind} />
        </div>
        <div>
          url for more info
          <input {...info.bind} />
        </div>
        <button>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
