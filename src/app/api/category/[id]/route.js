import { NextResponse } from "next/server";
import db from "../../../../libs/db"; 

export async function PUT(request, { params }) {
  const { id } = params; 

  try {
    const data = await request.json(); 

    
    const categoryExists = await db.categories.findUnique({
      where: { C_category: parseInt(id) }, 
    });

    if (!categoryExists) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }
    const updatedCategory = await db.categories.update({
      where: { C_category: parseInt(id) },
      data: {
        D_category_name: data.D_category_name !== undefined ? data.D_category_name : undefined,
        B_status: data.B_status !== undefined ? data.B_status : undefined,
      },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    return NextResponse.json(
      { error: "Error al actualizar la categoría" },
      { status: 500 }
    );
  }
}
