const express = require("express");
const Users = require("./db"); // bring in the queries file

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const { name, bio } = newUser;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(newUser)
      .then(user => {
        res.status(200).json({ message: "New user successfully added." });
      })
      .catch(error => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "User successfully deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { name, bio } = changes;
  if (name || bio) {
    Users.update(id, changes)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({
            errorMessage: "The user information could not be modified."
          });
      });
  } else {
    res
      .status(500)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

module.exports = router;
