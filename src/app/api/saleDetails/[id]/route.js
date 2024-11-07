import db from "../../../../libs/db";
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const saleDetails = await db.sale_Details.findMany({
      where: {
        C_sale: parseInt(id),
      },
      include: {
        Products: true,
        Sales: true,
      },
    });

    if (!saleDetails) {
      return new Response(
        JSON.stringify({
          error: "No se encontraron detalles para esta factura",
        }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(saleDetails), { status: 200 });
  } catch (error) {
    console.error("Error fetching sale details:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener detalles de la factura" }),
      { status: 500 }
    );
  }
}
