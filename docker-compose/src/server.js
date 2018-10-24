var express = require('express')
const { Pool, Client } = require('pg')
const app = express()
const port = 3000

const config = {
    user: 'pguser',
    password: 'pgpassword',
    host: 'postgres',
    database: 'db'
}
const pool = new Pool(config)

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT text FROM TASKS');
    const texts = result.rows.map(task => '<li>' + task.text + '</li>');
    const tasks = "<ol>".concat(texts) + '</ol><br>'
    res.send(tasks + `<form method action="/create_task"><input name="text" type=text placeholder="task text"> <input type="submit" value="Submit"></form>`)
})

app.get('/create_task', async (req, res) => {
    const task_text = req.param('text')
    const result = await pool.query('INSERT INTO TASKS(text) VALUES ($1)', [task_text])
    res.redirect('/')
})

app.listen(port, () => {
        setTimeout(function() {pool.query(`CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            text VARCHAR(100) NOT NULL
        )`)}, 5000)
    }
)
