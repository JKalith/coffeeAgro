import stylesDashboard from "../../styles/dashboard.module.css";

export default function createInvoice() {
  return (
    <div>
      <div className={stylesDashboard.container}>
        <span>
          <p>aqui se crea el cierre contable</p>

          <div className={stylesDashboard.table}>
            <p>aqui se crea los campos de la tabla </p>
            <div className={stylesDashboard.displayTitle}>
              <p>cedula</p>
              <p>telefono</p>
              <p>hora</p>
            </div>
            <p>Lorem ipsum dolor sit amet . Los operadores del sector gráfico y tipográfico lo saben bien, en realidad todas las profesiones que se ocupan del universo de la comunicación tienen una relación estable con estas palabras, pero ¿qué es? Lorem ipsum es un texto falso sin ningún sentido.</p>
          </div>
        </span>
      </div>
    </div>
  );
}
