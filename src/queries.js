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

const deletePasscodeById = (request, response) => {
    const passcodeId = parseInt(request.params.id);

    pool.query('DELETE FROM passcode WHERE id = $1', [passcodeId], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Passcode deleted with ID: ${passcodeId}`);
    });
};

const deletePasscodeByCode = (request, response) => {
    const passcode = parseInt(request.params.id);

    pool.query('DELETE FROM passcode WHERE passcode = $1', [passcode], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Passcode number ${passcode} has been deleted successfuly`)
    })
}

const getPasscodes = (request, response) => {
    pool.query('SELECT * FROM passcode', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
const validateSignIn = (request, response) => {
    const { email, password } = request.body;
  
    // Check if the email and password are provided
    if (!email || !password) {
      return response.status(400).json({ error: 'Email and password are required.' });
    }
  
    // Query the database to find a user with the provided email
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error;
      }
  
      // Check if the user with the given email exists
      if (results.rows.length === 0) {
        return response.status(401).json({ error: 'Invalid email or password.' });
      }
  
      // In a real-world scenario, you would compare the hashed password using bcrypt
      // For simplicity, let's compare the plain text password for now
      const user = results.rows[0];
      if (user.password === password) {
        // Passwords match, sign-in successful
        return response.status(200).json({ success: true });
      } else {
        // Passwords do not match
        return response.status(401).json({ error: 'Invalid email or password.' });
      }
    });
  };



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addPasscode,
    deletePasscodeById,
    deletePasscodeByCode,
    getPasscodes,
    validateSignIn,
}