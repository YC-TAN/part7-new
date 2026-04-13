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

    const removeAnecdote = async (id) => {
        anecdoteService.remove(id).then(
            () => setAnecdotes(anecdotes.filter( a => a.id !== id))
        )
    }

    return {anecdotes, addAnecdote, removeAnecdote}
}