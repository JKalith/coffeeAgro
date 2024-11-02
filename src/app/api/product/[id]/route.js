import db from '../../../../libs/db'

export async function GET(req, { params }) {
    try {
      const { id } = params; // Obtener el ID de los parámetros de la URL
  
      const product = await db.products.findUnique({
        where: {
         C_product : parseInt(id), // Asegúrate de que el ID sea un número si es de tipo entero
        },
        include: {
          Categories: true,
        },
      });
  
      if (!product) {
        return new Response(JSON.stringify({ error: "Producto no encontrado" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
  
      return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error producto: ", error);
      return new Response(JSON.stringify({ error: "Error fetching producto" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }