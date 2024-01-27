const express = require("express");
const db = require("../models/db");

module.exports = (router) => {

// GET /class
router.get("/class", (req, res) => {
    // res.send('hello word')
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
  router.get("/class/:id", (req, res) => {
    const classId = req.params.id;
    db.query(
      "SELECT * FROM class WHERE id = ?",
      [classId],
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
  router.put("/class/:id", (req, res) => {
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
  router.post("/class", (req, res) => {
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
  router.delete("/class/:id", (req, res) => {
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
