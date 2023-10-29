const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'ialocker',
    password: '132132w',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
const addPasscode = (request, response) => {
    const { passcode, userId } = request.body;

    pool.query('INSERT INTO passcode (passcode, "userId") VALUES ($1, $2)', [passcode, userId], (error, results) => {

        if (error) {
            throw error;
        }
        response.status(201).send(`Passcode added for user with ID: ${userId}`);
    });
};

const deletePasscode = (request, response) => {
    const passcodeId = parseInt(request.params.id);

    pool.query('DELETE FROM passcode WHERE id = $1', [passcodeId], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Passcode deleted with ID: ${passcodeId}`);
    });
};

const getPasscodes = (request, response) => {
    pool.query('SELECT * FROM passcode', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addPasscode,
    deletePasscode,
    getPasscodes,
}