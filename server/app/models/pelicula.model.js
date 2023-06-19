const sql = require("./db.js");

// constructor
const Pelicula = function(pelicula) {
  this.nombre = pelicula.nombre;
  this.director = pelicula.director;
  this.sinopsis = pelicula.sinopsis;
  this.dia = pelicula.contrasena;
  this.mes = pelicula.mes;
  this.anio = pelicula.anio;
  this.pais = pelicula.pais;
  this.puntuacion = pelicula.puntuacion;
  this.genero = pelicula.genero;
};

Pelicula.create = (newPelicula, result) => {
  sql.query("INSERT INTO pelicula SET ?", newPelicula, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pelicula: ", { id: res.insertId, ...newPelicula });
    result(null, { id: res.insertId, ...newPelicula });
  });
};

Pelicula.findById = (id, result) => {
  sql.query(`SELECT * FROM pelicula WHERE idpelicula = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pelicula: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found pelicula with the id
    result({ kind: "not_found" }, null);
  });
};

Pelicula.getAll = (title,pais,lugar, result) => {
  let query = "SELECT * FROM pelicula";

  if (title) {
    query += ` WHERE nombre LIKE '%${title}%'`;
  }
  if (pais) {
    query += ` WHERE pais = ${pais}`;
  }
  if (lugar) {
    query += ` WHERE pais = ${lugar} and puntuacion > 85`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("peliculas: ", res);
    result(null, res);
  });
};

Pelicula.getAllPublished = result => {
  sql.query("SELECT * FROM pelicula WHERE puntuacion >= 95 limit 3;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("peliculas: ", res);
    result(null, res);
  });
};

Pelicula.updateById = (id, pelicula, result) => {
  sql.query(
    "UPDATE pelicula SET title = ?, description = ?, published = ? WHERE id = ?",
    [pelicula.title, pelicula.description, pelicula.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found pelicula with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pelicula: ", { id: id, ...pelicula });
      result(null, { id: id, ...pelicula });
    }
  );
};

Pelicula.remove = (id, result) => {
  sql.query("DELETE FROM pelicula WHERE idpelicula = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pelicula with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pelicula with id: ", id);
    result(null, res);
  });
};

Pelicula.removeAll = result => {
  sql.query("DELETE FROM pelicula", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} peliculas`);
    result(null, res);
  });
};

module.exports = Pelicula;
