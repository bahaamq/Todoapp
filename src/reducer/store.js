import {createStore} from 'redux'
import notesReducer from './notes'

const store = createStore(notesReducer)

export default store