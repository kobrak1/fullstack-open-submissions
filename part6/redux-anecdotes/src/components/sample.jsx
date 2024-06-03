    // craete a selector for filter and anecdotes reducers
    const filterSelector = createSelector(
        state => state.filter,
        state => state.anecdotes,
        (filter, anecdotes) => {
            const filteredAnecdotes = filter
              ? anecdotes.filter(item => item.content.toLowerCase().includes(filter))
              : anecdotes
            
            return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
        }
    )

    // filtered anecdotes
    const anecdotes = useSelector(filterSelector)