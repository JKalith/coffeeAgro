import db from '../../../libs/db';

export async function GET() {
  try {
    const paymentMethods = await db.payment_methods.findMany();

    return new Response(
      JSON.stringify(paymentMethods),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*', 
        },
      }
    );
  } catch (error) {
    console.error("Error fetching payment methods:", error.message);

    return new Response(
      JSON.stringify({ error: "Error fetching payment methods" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*', // Descomenta si necesitas CORS
        },
      }
    );
  }
}
