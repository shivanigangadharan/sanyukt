
export const dataReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BOOKMARK':
            return { ...state, bookmarks: action.payload }
    }
}