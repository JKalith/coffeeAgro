import db from '../../../../libs/db';
import { NextResponse } from "next/server";

// Helper function to create consistent responses
const createResponse = (data, status) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const product = await db.products.findUnique({
      where: {
        C_product: parseInt(id), // Ensure id is an integer
      },
      include: {
        Categories: true,
      },
    });

    if (!product) {
      return createResponse({ error: "Producto no encontrado" }, 404);
    }

    return createResponse(product, 200);
  } catch (error) {
    console.error("Error fetching product: ", error);
    return createResponse({ error: "Error fetching producto" }, 500);
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const data = await request.json();

    // Validate incoming data
    const isDataProvided = data.D_product_name || data.C_category || data.Q_stock || data.M_unit_price !== undefined || data.B_status !== undefined;
    
    if (!isDataProvided) {
      return createResponse({ error: "No hay datos para actualizar" }, 400);
    }

    // Check if the product exists
    const productExists = await db.products.findUnique({
      where: { C_product: parseInt(id) },
    });

    if (!productExists) {
      return createResponse({ error: "Producto no encontrado" }, 404);
    }

    // Prepare the data for updating
    const updatedData = {
      D_product_name: data.D_product_name ?? undefined,
      C_category: data.C_category !== undefined ? parseInt(data.C_category) : undefined,
      Q_stock: data.Q_stock !== undefined ? parseInt(data.Q_stock) : undefined,
      M_unit_price: data.M_unit_price !== undefined ? parseFloat(data.M_unit_price) : undefined,
      B_status: data.B_status !== undefined ? data.B_status : undefined,
    };

    // Update the product details
    const updatedProduct = await db.products.update({
      where: { C_product: parseInt(id) },
      data: updatedData,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return createResponse({ error: "Error al actualizar el producto" }, 500);
  }
}