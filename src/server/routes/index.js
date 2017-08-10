const { projects } = require('../controllers');

export default function routes(app) {
    app.get('/api', (req, res) =>
        res.status(200).send({
            message: 'Welcome to the API!',
        })
    );

    app.post('/api/projects', projects.create);
}
