const sql = require("./db.js");

// constructor
const Director = function(director) {
  this.nombre = director.nombre;
  this.apellido = director.apellido;
  this.edad = director.edad;
  this.obra = director.obra;
  this.genero = director.genero;
};

Director.create = (newDirector, result) => {
  sql.query("INSERT INTO Director SET ?", newDirector, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Director: ", { id: res.insertId, ...newDirector });
    result(null, { id: res.insertId, ...newDirector });
  });
};

Director.findById = (id, result) => {
  sql.query(`SELECT * FROM Director WHERE idDirector = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Director: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Director with the id
    result({ kind: "not_found" }, null);
  });
};

Director.getAll = (title, result) => {
  let query = "SELECT * FROM director";

  if (title) {
    query += ` WHERE nombre LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Directors: ", res);
    result(null, res);
  });
};

Director.getAllPublished = result => {
  sql.query("SELECT * FROM Director WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Directors: ", res);
    result(null, res);
  });
};

Director.updateById = (id, director, result) => {
  sql.query(
    "UPDATE Director SET title = ?, description = ?, published = ? WHERE id = ?",
    [director.title, director.description, director.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Director with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Director: ", { id: id, ...director });
      result(null, { id: id, ...director });
    }
  );
};

Director.remove = (id, result) => {
  sql.query("DELETE FROM Director WHERE idDirector = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Director with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Director with id: ", id);
    result(null, res);
  });
};

Director.removeAll = result => {
  sql.query("DELETE FROM Director", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Directors`);
    result(null, res);
  });
};

module.exports = Director;
