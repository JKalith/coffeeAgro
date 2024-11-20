
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

export async function POST(req) {
  try{
    const {D_category_name, B_status } = await req.json();
    const newCategory = await db.categories.create({
      data: {
        D_category_name,
        B_status
      },
    });
    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error al crear la categoria: ", error);
    return new Response(JSON.stringify({ error: "Nombre de categoria ya existente"}),{
      status: 500,
      headers:{
        'Content-Type': 'application/json',
      },
    });
  }
}