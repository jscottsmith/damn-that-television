const { Project } = require('Database/models/index');

module.exports = {
    // Example to create
    create(req, res) {
        // console.log('REQUEST', req.body.title, req.body.content);
        return Project.create({
            title: req.body.title,
            content: req.body.content,
        })
            .then(project => res.status(201).send(project))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Project.all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
};
