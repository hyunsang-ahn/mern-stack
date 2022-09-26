import {
  FETCH_ALL, CREATE, FETCH_BY_SEARCH,
  UPDATE,
  LIKE,
  DELETE
} from "../constants/actionTypes";



export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      console.log('action.payload===================', action.payload)
      return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPage: action.payload.numberOfPage }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CREATE:
      return [...posts, action.payload]
    case UPDATE:
      return state.map((post) => (post._id === action.payload._id ? action.payload : post))
    case LIKE:
      return state.map((post) => post._id === action.payload._id ? action.payload : post)

    case DELETE:
      return state.filter((post) => post._id !== action.payload)
    default:
      return state;

  }

}