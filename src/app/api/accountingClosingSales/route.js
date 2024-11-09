import { NextResponse } from "next/server";
import db from "../../../libs/db";
export async function GET(req) {
  try {
    const sales = await db.Accounting_closings.findMany({
      
    });

    return new Response(JSON.stringify(sales), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sales: ", error);
    return new Response(JSON.stringify({ error: "Error fetching sales" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
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

    return NextResponse.json(newClosing, { status: 201 });
  } catch (error) {
    console.error("Error al guardar el cierre contable:", error);
    return NextResponse.json(
      { error: "Error al guardar el cierre contable" },
      { status: 500 }
    );
  }
}
