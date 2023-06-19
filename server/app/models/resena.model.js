const sql = require("./db.js");

// constructor
const Resena = function(resena) {
  this.idresena = resena.idresena;
  this.idpelicula = resena.idpelicula;
  this.calificacion = resena.calificacion;
  this.critica = resena.critica;
  this.titulo = resena.titulo;
  this.idusuario = resena.idusuario;
};

Resena.create = (newResena, result) => {
  sql.query("INSERT INTO resena SET ?", newResena, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Resena: ", { id: res.insertId, ...newResena });
    result(null, { id: res.insertId, ...newResena });
  });
};

Resena.findById = (id, result) => {
  sql.query(`SELECT resena.idresena, resena.idpelicula, resena.calificacion, resena.critica, resena.titulo, resena.idusuario, usuario.nombre, usuario.apellido FROM Resena left join usuario on resena.idusuario = usuario.id WHERE resena.idpelicula = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Resena: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Resena with the id
    result({ kind: "not_found" }, null);
  });
};

Resena.getAll = (title,user, result) => {
  let query = "SELECT resena.idresena, resena.idpelicula, resena.calificacion, resena.critica, resena.titulo, resena.idusuario, usuario.nombre, usuario.apellido FROM Resena left join usuario on resena.idusuario = usuario.id";

  if (title) {
    query += ` WHERE resena.idpelicula = ${title}`;
  }
  if (user) {
    query += ` WHERE resena.idusuario = ${user}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Resenas de '${title}' : ", res);
    result(null, res);
  });
};

Resena.getAllPublished = result => {
  sql.query("SELECT * FROM Resena WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
     result(null, err);
      return;
    }

    console.log("Resenas: ", res);
    result(null, res);
  });
};

Resena.updateById = (id, resena, result) => {
  sql.query(
    "UPDATE Resena SET title = ?, description = ?, published = ? WHERE id = ?",
    [resena.title, resena.description, resena.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found resena with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated resena: ", { id: id, ...resena });
      result(null, { id: id, ...resena });
    }
  );
};

Resena.remove = (id, result) => {
  sql.query("DELETE FROM Resena WHERE idResena = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Resena with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Resena with id: ", id);
    result(null, res);
  });
};

Resena.removeAll = result => {
  sql.query("DELETE FROM Resena", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Resenas`);
    result(null, res);
  });
};

module.exports = Resena;
