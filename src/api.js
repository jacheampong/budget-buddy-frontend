import axios from 'axios'

// get Budget by Budget Id
const getAllBudgets = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/budgets`)
}

// get Budget by Budget Id
const getBudgetById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}api/budgets/${id}`)
}

// export methods
export {getAllBudgets, getBudgetById}