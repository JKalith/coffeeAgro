import { NextResponse } from "next/server";
import db from '../../../libs/db' 

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      C_product,
      C_accounting_closing,
      Q_system_quantity,
      Q_physical_quantity,
      Q_subtraction,
      D_justification,
    } = body;

    const newAccountingDetail = await db.accounting_details.create({
      data: {
        C_product,
        C_accounting_closing,
        Q_system_quantity,
        Q_physical_quantity,
        Q_subtraction,
        D_justification,
      },
    });

    return NextResponse.json({ message: "Detalle contable guardado con éxito.", newAccountingDetail });
  } catch (error) {
    console.error("Error al guardar el detalle contable:", error);
    return NextResponse.json({ error: "Error al guardar el detalle contable" }, { status: 500 });
  }
}
