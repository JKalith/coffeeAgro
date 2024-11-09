import db from "../../../../libs/db";
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const accountingDetails = await db.Accounting_details.findMany({
      where: {
        C_accounting_closing: parseInt(id),
      },
      include: {
        Products: true,
        Accounting_closings: true,
      },
    });

    if (!accountingDetails) {
      return new Response(
        JSON.stringify({
          error: "No se encontraron detalles para esta factura",
        }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(accountingDetails), { status: 200 });
  } catch (error) {
    console.error("Error fetching sale details:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener detalles de la factura" }),
      { status: 500 }
    );
  }
}