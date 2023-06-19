const sql = require("./db.js");

// constructor
const Elenco = function(elenco) {
  this.idelenco = elenco.idelenco;
  this.idactor = elenco.idactor;
  this.idpelicula = elenco.idpelicula;
};

Elenco.create = (newElenco, result) => {
  sql.query("INSERT INTO Elenco SET ?", newElenco, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Elenco: ", { id: res.insertId, ...newElenco });
    result(null, { id: res.insertId, ...newElenco });
  });
};

Elenco.findById = (id, result) => {
  sql.query(`SELECT actor.idactor,actor.nacionalidad,actor.proyactual,actor.edad, actor.nombre, actor.apellido, actor.foto from elenco left join actor on elenco.idactor = actor.idactor WHERE elenco.idpelicula = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Elenco: ", res);
      result(null, res);
      return;
    }

    // not found Elenco with the id
    result({ kind: "not_found" }, null);
  });
};

Elenco.getAll = (title, result) => {
  let query = "SELECT * FROM Elenco";

  if (title) {
    query += ` WHERE nombre LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Elencos: ", res);
    result(null, res);
  });
};

Elenco.getAllPublished = result => {
  sql.query("SELECT * FROM Elenco WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Elencos: ", res);
    result(null, res);
  });
};

Elenco.updateById = (id, elenco, result) => {
  sql.query(
    "UPDATE Elenco SET title = ?, description = ?, published = ? WHERE id = ?",
    [Elenco.title, Elenco.description, Elenco.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Elenco with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Elenco: ", { id: id, ...elenco });
      result(null, { id: id, ...elenco });
    }
  );
};

Elenco.remove = (id, result) => {
  sql.query("DELETE FROM Elenco WHERE idElenco = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Elenco with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Elenco with id: ", id);
    result(null, res);
  });
};

Elenco.removeAll = result => {
  sql.query("DELETE FROM Elenco", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Elencos`);
    result(null, res);
  });
};

module.exports = Elenco;
