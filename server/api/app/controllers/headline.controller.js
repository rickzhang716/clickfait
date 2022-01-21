const { default: axios } = require("axios");
const { Http2ServerRequest } = require("http2");
const db = require("../models");
const Headline = db.headlines;
const Op = db.Sequelize.Op;
const FormData = require('form-data')
// Create and Save a new Headline
exports.create = (req, res) => {
    if (!req.body.title) {
        console.log();
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const headline = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        clickbait: req.body.clickbait,
        sentiment: req.body.sentiment

    };

    Headline.create(headline)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured when saving the headline."
            });
        });


};

// Retrieve all Headlines from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;


    Headline.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving headlines."
            });
        });

};

// Find a single Headline with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Headline.findByPk(id)
        .then(data => {
            if (data) {
                console.log(data.title)
                res.send(data);
            } else {
                console.log("error")
                res.status(404).json({
                    message: `Cannot find headline with id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving headline with id " + id
            });
        });
};

// Update a Headline by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Headline.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The tutuorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update the article with id ${id}. Headline might not be found or req.body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating headline with id " + id
            });
        });
};

// Delete a Headline with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Headline.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Headline was deleted successfully." });
            } else {
                res.send({
                    message: `Could not delete headline with id ${id}. Headline might not be found or req.body was empty.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delter Headline with id " + id
            });
        });
};

// Delete all Headlines from the database.
exports.deleteAll = (req, res) => {
    Headline.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} articles were deleted successfully.` })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all saved articles."
            });
        });
};

// Find all published Headlines
exports.findAllSaved = (req, res) => {
    Headline.findAll({ where: { published: true } })
        .then(data => {
            if (data) {
                console.log(data)
                res.send(data);
            } else {
                console.log("error")
                res.status(404).json({
                    message: "Cannot find any saved articles."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving saved articles."
            });
        });

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
            res.send(data);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        })
}