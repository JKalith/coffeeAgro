import React from "react";
import globals from "../../styles/globals.module.css";
import icon from "../../ui/styles/icons.module.css";

export default function RegisterSaleTable({ productList, removeProduct }) {
  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Cantidad</p>
          </div>
          <div className={globals.cell}>
            <p>Categoria</p>
          </div>
          <div className={globals.cell}>
            <p>Total</p>
          </div>
          <div className={globals.cell}>
            <p>Quitar</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
      <div className={globals.containerRows}>
        {productList.map((product) => (
          <div key={product.C_product} className={globals.productRow}>
            <div className={globals.cell}>
              <p>{product.D_product_name}</p>
            </div>
            <div className={globals.cell}>
              <p>{product.quantity}</p>
            </div>
            <div className={globals.cell}>
              <p>{product.Categories?.D_category_name}</p>
            </div>
            <div className={globals.cell}>
              <p>{product.M_unit_price * product.quantity}</p>
            </div>
            <div className={globals.cell}>
              <button onClick={() => removeProduct(product.C_product)}>
                <div className={`${icon.containerIcon} ${icon.buyIcon}`}></div>
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>    </div>
  );
}
