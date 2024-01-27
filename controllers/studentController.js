const express = require("express");
const db = require("../models/db");


module.exports = (router) => {
  
// GET /mahasiswa
router.get("/mahasiswa", (req, res) => {
  // res.send('hello word')
  db.query("SELECT a.*, b.name as class_name, b.room, b.kaprodi FROM mahasiswa a LEFT JOIN class b ON a.class_id = b.id", (error, result) => {
    if (error) {
      console.error("error fetching mahasiswa:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

// GET /mahasiswa/:nim
router.get("/mahasiswa/:nim", (req, res) => {
  const mahasiswaId = req.params.nim;
  db.query(
    "SELECT a.*, b.name as class_name, b.room, b.kaprodi FROM mahasiswa a LEFT JOIN class b ON a.class_id = b.id WHERE nim = ?",
    [mahasiswaId],
    (error, results) => {
      if (error) {
        console.error("Error fetching mahasiswa:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Mahasiswa not found" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

// PUT /mahasiswa/:nim
router.put("/mahasiswa/:nim", (req, res) => {
  const mahasiswaNim = req.params.nim;
  const { nama, gender, alamat, class_id } = req.body;
  console.log(req.body)
  db.query(
    "UPDATE mahasiswa SET nama = ?, gender = ?, alamat = ?, class_id = ? WHERE nim = ?",
    [nama, gender, alamat, class_id ,mahasiswaNim],
    (error) => {
      if (error) {
        console.error("Error updating mahasiswa:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json({ message: "Updating mahasiswa successfully" });
      }
    }
  );
});

// PUT /mahasiswa/:nim
router.post("/mahasiswa", (req, res) => {
  const { nama, gender, prodi, alamat, nim, class_id } = req.body;
  console.log(req.body)
  db.query(
    "INSERT mahasiswa values (?,?,?,?,?,?)",
    [nim,nama, gender, prodi, alamat, class_id],
    (error) => {
      if (error) {
        console.error("Error creating mahasiswa:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json({ message: "Create mahasiswa successfully" });
      }
    }
  );
});

// PUT /mahasiswa/:nim
router.delete("/mahasiswa/:nim", (req, res) => {
  const mahasiswaNim = req.params.nim;
  db.query(
    "DELETE FROM mahasiswa WHERE nim = ?",
    [mahasiswaNim],
    (error) => {
      if (error) {
        console.error("Error delete mahasiswa:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json({ message: "Deleted mahasiswa successfully" });
      }
    }
  );
});
};
