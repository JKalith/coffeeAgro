import db from '../../../libs/db'
export async function GET(req) {
  try {
    const products = await db.products.findMany({
        include: {
            Categories: true,
        },
    }); 

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error productos: ", error);
    return new Response(JSON.stringify({ error: "Error fetching productos" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
export async function POST(req) {
  try {
 
    const { D_product_name, C_category, Q_stock, M_unit_price, B_status } = await req.json();

    if (M_unit_price < 0) {
      throw new Error("El precio unitario no puede ser negativo");
    }
    if (Q_stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }
    const newProduct = await db.products.create({
      data: {
        D_product_name,
        C_category,
        Q_stock,
        M_unit_price,
        B_status,
      },
    });
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error al crear el producto: ", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response(JSON.stringify({ error: "Ya existe un producto con este nombre." }), {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
    return new Response(JSON.stringify({ error: "Error al crear el producto" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}