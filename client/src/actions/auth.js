import * as api from '../api'
import { AUTH } from '../constants/actionTypes';



export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //log in the user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })
        navigate('/')

    } catch (error) {
        console.log(error.message)
    }

}


export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //sign up the user
        console.log('formData================', formData)

        const { data } = await api.signUp(formData)
        console.log('data================', data)

        dispatch({ type: AUTH, data })
        navigate('/')

    } catch (error) {
        console.log(error.message)
    }

}
