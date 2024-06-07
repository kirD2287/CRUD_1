let users = [];
let currentId = 1


module.exports = {
     async getUsers(req, res) { 
        try {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (e) {
            console.log(e)
        }
    },
     async addUser(req, res) {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const user = JSON.parse(body);
                user.id = currentId++;
                users.push(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            });
        } catch (e) {
            console.log(e)
        }
     },
      async updateUser(req, res) {
        try {
            const id = parseInt(req.url.split('/')[2])
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const user = JSON.parse(body);
                const userIndex = users.findIndex(user => user.id === id);
                if (userIndex!== -1) {
                    users[userIndex] = {...users[userIndex],...user };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(users[userIndex]));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            });
        } catch (e) {
            console.log(e)
        }
      },
     async getUserById(req,res) {
        try {
            const id = parseInt(req.url.split('/')[2]);
            const user = await users.find(user => user.id === id);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        } catch(e) {
            console.log(e)
        }
     },
     async deleteUser(req,res) {
        try {
            const id = parseInt(req.url.split('/')[2]);
            const userIndex = await users.find(user => user.id === id);
            if (userIndex!== -1) {
                users.splice(userIndex, 1);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User deleted' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        } catch (e) {
            console.log(e)
        }
     },
}

 