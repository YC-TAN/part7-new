import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(
          (data) => setAnecdotes(data)
        )
      }, [])

    const addAnecdote = async (obj) => {
        anecdoteService.createNew(obj).then(
            data => setAnecdotes([...anecdotes, data])
        )
    }

    return {anecdotes, addAnecdote}
}