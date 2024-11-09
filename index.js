const express = require('express');
const cors = require('cors');

const app = express();
let latestCommand = '';

app.use(cors());
app.use(express.json());

app.post('/execute', (req, res) => {
    const { command } = req.body;
    if (command) {
        latestCommand = command;
        console.log(`Received command: ${command}`);
        return res.json({ message: 'Command received', command });
    }
    return res.status(400).json({ error: 'No command provided' });
});

app.get('/command', (req, res) => {
    if (latestCommand) {
        const commandToSend = latestCommand;
        latestCommand = '';
        return res.json({ command: commandToSend });
    }
    return res.status(404).json({ error: 'No command available' });
});

module.exports = app;
