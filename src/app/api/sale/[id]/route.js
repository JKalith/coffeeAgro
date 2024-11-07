import { NextResponse } from "next/server";
import db from "../../../../libs/db";

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const saleExists = await db.sales.findUnique({
      where: { C_Sale: parseInt(id) },
    });

    if (!saleExists) {
      return NextResponse.json(
        { error: "Factura no encontrada o ya anulada" },
        { status: 404 }
      );
    }
    if (saleExists.B_status === false) {
      return NextResponse.json(
        { error: "Factura ya anulada" },
        { status: 404 }
      );
    }

    const updatedSale = await db.sales.update({
      where: { C_Sale: parseInt(id) },
      data: {
        B_status: false,
      },
    });

    return NextResponse.json(updatedSale, { status: 200 });
  } catch (error) {
    console.error("Error al anular la factura:", error);
    return NextResponse.json(
      { error: "Error al anular la factura" },
      { status: 500 }
    );
  }
}
