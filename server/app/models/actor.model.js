const sql = require("./db.js");

// constructor
const Actor = function(actor) {
  this.nombre = actor.nombre;
  this.apellido = actor.title;
  this.nacionalidad = actor.title;
  this.edad = actor.contrasena
  this.obras = actor.description;
  this.proyactual = actor.published;
};

Actor.create = (newActor, result) => {
  sql.query("INSERT INTO actor SET ?", newActor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created actor: ", { id: res.insertId, ...newActor });
    result(null, { id: res.insertId, ...newActor });
  });
};

Actor.findById = (id, result) => {
  sql.query(`SELECT * FROM actor WHERE idactor = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found actor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found actor with the id
    result({ kind: "not_found" }, null);
  });
};

Actor.getAll = (title, result) => {
  let query = "SELECT * FROM actor";

  if (title) {
    query += ` WHERE nombre LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("actors: ", res);
    result(null, res);
  });
};

Actor.getAllPublished = result => {
  sql.query("SELECT * FROM actor WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
     result(null, err);
      return;
    }

    console.log("actors: ", res);
    result(null, res);
  });
};

Actor.updateById = (id, actor, result) => {
  sql.query(
    "UPDATE actor SET title = ?, description = ?, published = ? WHERE id = ?",
    [actor.title, actor.description, actor.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found actor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated actor: ", { id: id, ...actor });
      result(null, { id: id, ...actor });
    }
  );
};

Actor.remove = (id, result) => {
  sql.query("DELETE FROM actor WHERE idactor = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found actor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted actor with id: ", id);
    result(null, res);
  });
};

Actor.removeAll = result => {
  sql.query("DELETE FROM actor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} actors`);
    result(null, res);
  });
};

module.exports = Actor;
