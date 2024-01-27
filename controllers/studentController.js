const express = require("express");
const db = require("../models/db");
const { verifytoken } = require("../middleware/auth");


module.exports = (router) => {
  
// GET /mahasiswa
router.get("/mahasiswa", verifytoken, (req, res) => {
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
router.get("/mahasiswa/:nim", verifytoken, (req, res) => {
  const schema = Joi.object({
    nim: Joi.required(),
  });
  const {error} = schema.validate(req.params);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

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
router.put("/mahasiswa/:nim", verifytoken, (req, res) => {
  const schema = Joi.object({
    class_id: Joi.required(),
    nama : Joi.string().required(),
    gender : Joi.string().required(),
    prodi : Joi.string().required(),
    alamat : Joi.string().required(),
    nim : Joi.string().required(),
  });
  const {error} = schema.validate({...req.body, ...req.params});
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

  const mahasiswaNim = req.params.nim;
  const { nama, gender, prodi, alamat, class_id } = req.body;
  console.log(req.body)
  db.query(
    "UPDATE mahasiswa SET nama = ?, gender = ?, alamat = ?, class_id = ?, prodi = ? WHERE nim = ?",
    [nama, gender, alamat, class_id, prodi ,mahasiswaNim],
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
router.post("/mahasiswa", verifytoken, (req, res) => {
  const schema = Joi.object({
    class_id: Joi.required(),
    nama : Joi.string().required(),
    gender : Joi.string().required(),
    prodi : Joi.string().required(),
    alamat : Joi.string().required(),
    nim : Joi.string().required(),
  });
  const {error} = schema.validate({...req.body, ...req.params});
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

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
router.delete("/mahasiswa/:nim", verifytoken, (req, res) => {
  const schema = Joi.object({
    nim: Joi.required(),
  });
  const {error} = schema.validate(req.params);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

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