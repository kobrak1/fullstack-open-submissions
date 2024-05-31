const filterReducer = (state='', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.payload.content
        default:
            return state
    }
}

export const filterAnecdote = (content) => {
    return {
        type: 'FILTER',
        payload: {content}
    }
}

export default filterReducer