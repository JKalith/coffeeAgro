import { NextResponse } from "next/server";
import db from "../../../libs/db"; // Ajusta la ruta a tu instancia de Prisma
export async function GET(req) {
  try {
    const sales = await db.sales.findMany({
      include: {
        Payment_methods: true,
      },
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
    const { C_payment_method, F_date, D_client, M_total_price } =
      await req.json();

    if (
      !C_payment_method ||
      !F_date ||
      !D_client ||
      M_total_price === undefined
    ) {
      return NextResponse.json(
        { error: "Faltan datos requeridos." },
        { status: 400 }
      );
    }
    const paymentMethodId = parseInt(C_payment_method, 10);

    if (isNaN(paymentMethodId)) {
      return NextResponse.json(
        { error: "Método de pago inválido." },
        { status: 400 }
      );
    }

    const sale = await db.sales.create({
      data: {
        C_payment_method: paymentMethodId,
        F_date: new Date(F_date),
        D_client,
        M_total_price,
      },
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    console.error("Error al crear la venta:", error);
    return NextResponse.json(
      { error: "Error al registrar la venta." },
      { status: 500 }
    );
  }
}
