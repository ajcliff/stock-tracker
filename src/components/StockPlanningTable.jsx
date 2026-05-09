import { useState, useEffect } from "react";
import {
  saveStockNeededToday,
  getStockNeededToday
} from "../services/stockService";

const products = [
  { name: "Dunhill Double Switch", price: 5200 },
  { name: "Dunhill Single Switch", price: 5200 },
  { name: "Embassy Lights", price: 5100 },
  { name: "Embassy Kings", price: 5100 },
  { name: "Rothmans by London", price: 4000 },
  { name: "Rothman Switch", price: 4000 },
  { name: "Rothman by SM", price: 4000 },
  { name: "Rothman Blast", price: 2610 },
  { name: "Pallmall Blue", price: 1700 },
  { name: "Pallmall Green", price: 1700 },
  { name: "Pallmall Red", price: 1700 },
  { name: "Rooster", price: 1500 }
];

export default function StockPlanningTable() {
  const [stock, setStock] = useState({});

  useEffect(() => {
    async function loadStock() {
      const savedStock =
        await getStockNeededToday();

      if (savedStock) {
        setStock(savedStock);
      }
    }

    loadStock();
  }, []);

  function handleChange(product, value) {
    setStock({
      ...stock,
      [product]:
        value === ""
          ? ""
          : Number(value)
    });
  }

  function rowTotal(product, price) {
    return (stock[product] || 0) * price;
  }

  function totalStockValue() {
    return products.reduce(
      (total, p) =>
        total +
        rowTotal(
          p.name,
          p.price
        ),
      0
    );
  }
function handleResetDay() {
  setStock({});
}
  async function handleSave() {
    await saveStockNeededToday(
      stock
    );

    alert(
      "Stock saved successfully"
    );
  }

  return (
    <div
      style={{
        padding: 20
      }}
    >
      <h2>
        Daily Stock Planning
      </h2>

      <div
        style={{
          overflowX: "auto"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            minWidth: "500px"
          }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (p) => (
                <tr key={p.name}>
                  <td>
                    {p.name}
                  </td>

                  <td>
                    <input
                      type="number"
                      value={
                        stock[
                          p.name
                        ] ?? ""
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          p.name,
                          e.target
                            .value
                        )
                      }
                      style={{
                        width: 70
                      }}
                    />
                  </td>

                  <td>
                    {p.price}
                  </td>

                  <td>
                    {rowTotal(
                      p.name,
                      p.price
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: 15,
          border:
            "1px solid #ccc"
        }}
      >
        <h3>
          Total Stock Value:
          {" "}
          {totalStockValue()}
        </h3>
      </div>

      <button
        onClick={
          handleSave
        }
        style={{
          marginTop: 20
        }}
      >
        Save Stock
      </button>
      <button onClick={handleResetDay}>
  Reset Day
</button>
    </div>
  );
}