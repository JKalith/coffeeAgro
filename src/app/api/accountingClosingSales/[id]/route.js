import { NextResponse } from "next/server";
import db from "../../../../libs/db";

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const accountingExists = await db.Accounting_closings.findUnique({
      where: { C_accounting_closing: parseInt(id) },
    });

    if (!accountingExists) {
      return NextResponse.json(
        { error: "Cierre no encontrado" },
        { status: 404 }
      );
    }

    if (accountingExists.B_status === false) {
      return NextResponse.json(
        { error: "Cierre ya esta revertido" },
        { status: 400 }
      );
    }

    const updatedSale = await db.Accounting_closings.update({
      where: { C_accounting_closing: parseInt(id) },
      data: {
        B_status: false,
      },
    });

    return NextResponse.json(updatedSale, { status: 200 });
  } catch (error) {
    console.error("Error a revertir cierre", error);
    return NextResponse.json(
      { error: "Error a revertir cierre" },
      { status: 500 }
    );
  }
}
