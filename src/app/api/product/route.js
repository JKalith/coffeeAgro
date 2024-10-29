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
    console.error("Error categorias: ", error);
    return new Response(JSON.stringify({ error: "Error fetching productos" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}