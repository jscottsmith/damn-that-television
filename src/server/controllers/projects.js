const { Project } = require('Database/models/index');

module.exports = {
    // Example to create
    create(req, res) {
        return Project.create({
            title: req.body.title,
            content: req.body.content,
        })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Project.all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
};
