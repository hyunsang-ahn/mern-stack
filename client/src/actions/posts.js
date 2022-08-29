import * as api from '../api'
import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE } from '../constants/actionTypes';

//action creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data })

  } catch (error) {
    console.log(error.message)
  }

}








export const createPost = (post) => async (dispatch) => {
  try {
    console.log('post===============', post)

    const { data } = await api.createPost(post);
    console.log('data===============', data)

    dispatch({ type: CREATE, payload: data })

  } catch (error) {
    console.log(error.message)
  }

}


// export const updatePost = (id, post) => async (dispatch) => {
//   console.log('id==================', id)
//   console.log('post==================', post)

//   try {
//     const { data } = await api.updatePost(id, post)
//     console.log('data===============',data)
//     dispatch({ type: 'UPDATE', payload: data })
//   } catch (error) {
//     console.log(error.message)

//   }
// }

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};




export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });

  } catch (error) {
    console.log(error.message);

  }
};

export const likePost = (id) => async (dispatch) => {
  try {

    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error.message);

  }
}
