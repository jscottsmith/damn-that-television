import { projects as projectController } from '../controllers';

export default function apiRoutes(app) {
    app.get('/api', (req, res) =>
        res.status(200).send({
            message: 'Welcome to the API!',
        })
    );

    app.post('/api/projects', projectController.create);
    app.get('/api/projects', projectController.list);
    app.get('/api/projects/:projectId', projectController.retrieve);
}
