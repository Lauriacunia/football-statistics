const {Router} = require('express');
const router = Router();
const Container = require('../persistence/container.js');
const file = 'src/productos.txt';
const containerProducts = new Container();

/** 🚫 Los administradores son los únicos que
 * podrán crear, actualizar y eliminar productos.
 */
const esAdministrador = true;

/** LISTAR TODOS LOS PRODUCTOS */
router.get('/', (req, res) => {
   const products = containerProducts.getAll(file)
   products
     ? res.status(200).json(products)
     : res.status(200).json({ mensaje: "No hay productos cargados" });
});

/** OBTENER UN PRODUCTO POR ID*/
router.get('/:id', (req, res) => {  
   const { id } = req.params;
   console.log("id", id);
   const producto = containerProducts.getById(parseInt(id), file);
   producto
     ? res.status(200).json({ mensaje: "Producto encontrado", producto })
     : res.status(404).json({ mensaje: `Producto no encontrado. Id: ${id}` });
});

/** GUARDAR UN NUEVO PRODUCTO */
router.post('/', (req, res) => {
    if (esAdministrador) {
        const body = req.body;
        /**  🗨 antes de guardar el objeto le puedo agregar otros campos.*/
        body.timestamp = Date.now();
        const productoGuardado = containerProducts.save(body, file);
        productoGuardado
          ? res.status(200).json({
              mensaje: "Producto guardado con éxito",
              producto: productoGuardado,
            })
          : res.status(400).json({ mensaje: "No se pudo guardar el producto" });
    } else {
        res.status(401).json({ mensaje: "No tiene permisos para realizar esta acción" });
    }
});

/** ACTUALIZAR UN PRODUCTO EXISTENTE - BUSCA POR ID */
router.put("/:id", (req, res) => {
  if (esAdministrador) {
      const { id } = req.params;
      console.log("id", id);
      /**  🗨 verifico que el producto exista en nuestro file*/
      const producto = containerProducts.getById(parseInt(id), file);
      if (producto) {
          const productoActualizado = containerProducts.update(
            parseInt(id),
            req.body,
            file
          );
          productoActualizado
            ? res
                .status(200)
                .json({
                  mensaje: "Producto actualizado con éxito",
                  producto: productoActualizado,
                })
            : res
                .status(404)
                .json({ mensaje: `Error actualizando producto. Id: ${id}` });
          } else {
            res.status(404).json({ mensaje: `Producto no encontrado. Id: ${id}` });
          }
  } else {
    res.status(401).json({ mensaje: "No tiene permisos para realizar esta acción" });
  }
});

/** BORRAR UN PRODUCTO EXISTENTE - BUSCA POR ID */

router.delete('/:id', (req, res) => {
  if (esAdministrador) {
      const { id } = req.params;
      const producto = containerProducts.getById(parseInt(id), file);
      if (producto) {
        const productoBorrado = containerProducts.deleteById(parseInt(id), file);
        productoBorrado
          ? res
              .status(200)
              .json({
                mensaje: "Producto borrado con éxito",
                producto: productoBorrado,
              })
          : res
              .status(404)
              .json({ mensaje: `Error borrando producto. Id: ${id}` });
      } else {
        res.status(404).json({ mensaje: `Producto no encontrado. Id: ${id}` });
      }
  } else {
    res.status(401).json({ mensaje: "No tiene permisos para realizar esta acción" });
  }
});

/** SI SENTIS QUE ESTE CONTENIDO TE ES ÚTIL 
 *  RECORDÁ ESCRIBIR COMENTARIOS EN LAS VALORACIONES.👩‍💻🔥💟
 *  ESO ME MOTIVA A SEGUIR CREANDO CONTENIDO DE VALOR PARA TODOS.
 *  🌟 GRACIAS!
 *  
*/

module.exports = router;