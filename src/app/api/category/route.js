
import db from '../../../libs/db'
export async function GET(req) {
  try {
    const categories = await db.categories.findMany(); 
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error categorias: ", error);
    return new Response(JSON.stringify({ error: "Error fetching categories" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}