import axios from 'axios'

// get current user
const getCurrentUser = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/sessions/currentUser`)
}

// get current user
const loginUser = (username, password) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}api/sessions/`, {
        username, password
    })
}

// get current user
const logoutUser = () => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}api/sessions/logout`)
}

// get create new user
const registerNewUser = (username, password, email, phone) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}api/users`, {
        username, password, email, phone
    })
}

// get Budget by Budget Id
const getAllBudgets = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/budgets`)
}

// get Budget by Budget Id
const getBudgetById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/budgets/${id}`)
}

// export methods
export {getCurrentUser, registerNewUser, loginUser, getAllBudgets, getBudgetById, logoutUser}