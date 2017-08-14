import { Project } from 'Database/models/index';

export default {
    // Example to create
    create(req, res) {
        console.log('CREATE REQUEST');
        return Project.create({
            title: req.body.title,
            content: req.body.content,
        })
            .then(project => res.status(201).send(project))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        console.log('LIST REQUEST');
        return Project.all()
            .then(projects => res.status(200).send(projects))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        console.log('RETRIEVE REQUEST');
        return Project.findById(req.params.projectId)
            .then(project => {
                if (!project) {
                    return res.status(404).send({
                        message: 'Project Not Found',
                    });
                }
                return res.status(200).send(project);
            })
            .catch(error => res.status(400).send(error));
    },
};
