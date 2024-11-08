import { NextResponse } from "next/server";
import db from '../../../libs/db' 

export async function POST(req) {
  try {
    const body = await req.json();
    const { B_status, B_inventory_adjustment, F_date } = body;

    const newClosing = await db.accounting_closings.create({
      data: {
        F_date: F_date || new Date(), 
        B_status,
        B_inventory_adjustment,
      },
    });

    return NextResponse.json({ message: "Cierre contable guardado con éxito.", newClosing });
  } catch (error) {
    console.error("Error al guardar el cierre contable:", error);
    return NextResponse.json({ error: "Error al guardar el cierre contable" }, { status: 500 });
  }
}
