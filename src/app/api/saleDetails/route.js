import { NextResponse } from "next/server";
import db from "../../../libs/db";

// Método POST para registrar los detalles de una venta
export const POST = async (req) => {
  try {
    const { C_sale, C_Product, Q_quantity } = await req.json();

    // Asegurarnos de que Q_quantity sea un número
    const quantity = Number(Q_quantity);
    if (isNaN(quantity)) {
      return NextResponse.json(
        { error: "Q_quantity debe ser un número válido" },
        { status: 400 }
      );
    }

    const newSaleDetail = await db.sale_Details.create({
      data: {
        C_sale,
        C_Product,
        Q_quantity: quantity, // Aquí estamos usando el valor numérico
      },
    });

    // Respuesta exitosa con el detalle de la venta creado
    return NextResponse.json(newSaleDetail, { status: 201 });
  } catch (error) {
    console.error("Error al registrar los detalles de la venta:", error);
    return NextResponse.json(
      { error: "Error al registrar los detalles de la venta" },
      { status: 500 }
    );
  }
};
