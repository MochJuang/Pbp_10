const express = require("express");
const db = require("../models/db");
const { verifytoken } = require("../middleware/auth");
const Joi = require('joi')

module.exports = (router) => {

// GET /class
router.get("/class", verifytoken, (req, res) => {

    db.query("SELECT * FROM class", (error, result) => {
      if (error) {
        console.error("error fetching class:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json(result);
      }
    });
  });
  
  // GET /class/:id
  router.get("/class/:id", verifytoken, (req, res) => {
    const schema = Joi.object({
        id: Joi.required(),
    });
    const {error} = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const classId = req.params.id;
    db.query(
      "SELECT * FROM class WHERE id = ?",
      [req.params.id],
      (error, results) => {
        if (error) {
          console.error("Error fetching class:", error);
          res.status(500).json({ message: "Internal Server Error" });
        } else if (results.length === 0) {
          res.status(404).json({ message: "class not found" });
        } else {
          res.json(results[0]);
        }
      }
    );
  });
  
  // PUT /class/:id
  router.put("/class/:id", verifytoken, (req, res) => {
    const schema = Joi.object({
        id: Joi.required(),
        name: Joi.string().required(),
        room: Joi.string().required(),
        kaprodi: Joi.string().required(),
    });
    const {error} = schema.validate({...req.body, ...req.params});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    const classId = req.params.id;
    const { name, room, kaprodi} = req.body;
    console.log(req.body)
    db.query(
      "UPDATE class SET name = ?, room = ?, kaprodi = ? WHERE id = ?",
      [name, room, kaprodi, classId],
      (error) => {
        if (error) {
          console.error("Error updating class:", error);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.json({ message: "Updating class successfully" });
        }
      }
    );
  });
  
  // PUT /class/:id
  router.post("/class", verifytoken, (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        room: Joi.string().required(),
        kaprodi: Joi.string().required(),
    });
    const {error} = schema.validate({...req.body, ...req.params});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, room, kaprodi } = req.body;
    console.log(req.body)
    db.query(
      "INSERT class (name, room, kaprodi) values (?,?,?)",
      [name, room, kaprodi],
      (error) => {
        if (error) {
          console.error("Error creating class:", error);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.json({ message: "Create class successfully" });
        }
      }
    );
  });
  
  // PUT /class/:id
  router.delete("/class/:id", verifytoken, (req, res) => {
    const schema = Joi.object({
        id: Joi.required(),
    });
    const {error} = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const classId = req.params.id;
    db.query(
      "DELETE FROM class WHERE id = ?",
      [classId],
      (error) => {
        if (error) {
          console.error("Error delete class:", error);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.json({ message: "Deleted class successfully" });
        }
      }
    );
  });
  
};
