const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.apellido = usuario.apellido;
  this.correo = usuario.correo;
  this.contrasena = usuario.contrasena;
  this.foto = usuario.foto;
  this.edad = usuario.edad;
  this.pais = usuario.pais;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found usuario with the id
    result({ kind: "not_found" }, null);
  });
};

Usuario.findByCorreo = (title,correo, result) => {
let query = "SELECT * from usuario";

  if (title) {
    query += ` WHERE usuario.nombre LIKE '%${title}%'`;
  }
  if (correo) {
    query += ` WHERE usuario.correo= ${correo}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.getAll = (title,pais, result) => {
  let query = "SELECT usuario.id, usuario.nombre nombre,usuario.apellido,usuario.correo, usuario.contrasena, usuario.edad, usuario.foto, pais.nombre pais from usuario left join pais on usuario.pais = pais.idpais";

  if (title) {
    query += ` WHERE usuario.nombre LIKE '%${title}%'`;
  }
  if (pais) {
    query += ` WHERE pais= ${pais}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.getAllPublished = result => {
  sql.query("SELECT * FROM usuario WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuario SET edad = ?, foto=?, pais=? WHERE id = ?",
    [usuario.edad,usuario.foto,usuario.pais, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found usuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found usuario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
