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

// get logout current user
const logoutUser = () => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}api/sessions/logout`)
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

// create New Budget for User
const createBudgetForCurrentUser = (data) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}api/budgets`, data)
}

// update Budget 
const updateBudgetForCurrentUser = (id, data) => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}api/budgets/${id}`, data)
}

// get Budget by Budget Id
const getAllBudgetsForUser = (userId) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/budgets/user/${userId}`)
}

// get Budget by Budget Id
const getBudgetById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/budgets/${id}`)
}

// export methods
export {
    getCurrentUser, 
    registerNewUser, 
    loginUser, 
    getAllBudgets, 
    getBudgetById, 
    logoutUser,
    getAllBudgetsForUser,
    createBudgetForCurrentUser,
    updateBudgetForCurrentUser
}