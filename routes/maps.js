"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from('maps')
      .where({id: req.params.id})
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.status(404).send("This Map Does Not Exist");
      });
  });

  router.post("/new", (req, res) => {
    knex('maps')
      .insert({name: req.body.name, description: req.body.description, image_url: req.body.image_url})
      .then((results) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("New Map Error");
      });
  });

  return router;
}




