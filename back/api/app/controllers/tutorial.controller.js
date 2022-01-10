const { default: axios } = require("axios");
const { Http2ServerRequest } = require("http2");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const FormData = require('form-data')
// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured when creating the tutorial."
            });
        });


};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;


    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find tutorial with id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving tutorial with id " + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The tutuorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update with id ${id}. Tutorial might not be found or req.body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tutorial with id " + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Tutorial was deleted successfully." });
            } else {
                res.send({
                    message: `Could not delete tutorial with id ${id}. Tutorial might not be found or req.body was empty.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delter Tutorial with id " + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} tutorials were deleted successfully.` })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving tutorials." })
        })
};


exports.evaluate = async (req, res) => {


    const title = req.query.title;
    console.log(title);
    axios.post('http://127.0.0.1:5000/go', {
        title: `${title}`
    })
        .then(response => {
            data = response.data;
            // console.log(data);
            res.send(`${data}`);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        })
}