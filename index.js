console.log("Incio de programa");

const args = process.argv.slice(2);

async function crearproducto(producto) {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(producto),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("id del producto creado: ", data.id);
    }
  } catch (error) {}
}

async function obtenerProductos(producto) {
  try {
    const response = await fetch(`https://fakestoreapi.com/${producto}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function eliminarProductos(producto) {
  try {
    const response = await fetch(`https://fakestoreapi.com/${producto}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
switch (args[0]) {
  case "GET":
    console.log(args[0]);
    if (args[1] && args[1].startsWith("products")) {
      const products = await obtenerProductos(args[1]);
      console.log(products);
    } else {
      console.log("comando incorrecto");
    }
    break;

  case "POST":
    console.log(args[0]);
    if (args[1] && args[2] && args[3] && args[4] && args[1] == "products") {
      await crearproducto({
        title: args[2],
        price: args[3],
        category: args[4],
      });
      console.log("producto creado");
    } else {
      console.log("comando incompleto");
    }
    break;
  case "DELETE":
    console.log(args[0]);
    if (args[1].startsWith("products/") && args[1].length > 9) {
      const response = await eliminarProductos(args[1]);
      console.log("Producto eliminado", response);
    } else {
      console.log("comando incompleto o incorrecto");
    }
    break;
  default:
    console.log("comando incorrecto");
}
