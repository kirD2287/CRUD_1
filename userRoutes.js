
const url = require('url') 
const path = require('path')
const {getUsers, getUserById, addUser, updateUser, deleteUser} = require('./controllers')

const userRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const method = req.method
    const path = parsedUrl.pathname

    if(method === 'GET' && path === '/users') {
        getUsers(req, res)
    } else if(method === 'GET' && path.startsWith('/users/')) {
        getUserById(req, res)
    } else if(method === 'POST' && path === '/users') {
        addUser(req, res)
    } else if(method === 'PUT' && path.startsWith('/users/')) {
        updateUser(req, res)
    } else if(method === 'DELETE' && path.startsWith('/users/')) {
        deleteUser(req, res)
    }
}


module.exports = userRoutes