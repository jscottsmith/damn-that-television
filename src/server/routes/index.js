import { projects } from '../controllers';

export default function apiRoutes(app) {
    app.get('/api', (req, res) =>
        res.status(200).send({
            message: 'Welcome to the API!',
        })
    );

    app.post('/api/projects', projects.create);
    app.get('/api/projects', projects.list);
}
