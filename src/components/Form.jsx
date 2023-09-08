import { useState } from "react";
import Products from "./Product";
import Clock from "./clock";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
function Form() {
  var [name, setName] = useState("🤨🤔");
  var [price, setPrice] = useState(0);
  var [count, setCount] = useState(1);
  var [total, setTotal] = useState(0);
  var [tarbiza, setTarbiza] = useState();
  //display and none display
  var [displayBtn, setDisplayBtn] = useState("none");
  var [displayPrice, setDisplayPrice] = useState("none");
  //pill
  var [products, setProducts] = useState([]);
  var [totalBill, setTotalBill] = useState(0);
  //product and price product
  var pizza = ["pizza1", "pizza2", "pizza3"];
  var drink = ["drink1", "drink2", "drink3"];
  var pizzaPrice = {
    pizza1: 5,
    pizza2: 2,
    pizza3: 3,
    drink1: 5,
    drink2: 2,
    drink3: 3,
  };
  //push for firebase
  const handlePushData = () => {
    addDoc(collection(db, "AllOrders"), {
      tarbiza: tarbiza,
      products: products,
      totalBill: totalBill,
      date: new Date().toLocaleString(),
    })
      .then(() => {
        alert("order has been submitted");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // end push firebase
  //
  var totalHandel = () => {
    setTotal(count * price);
  };

  var countPlus = () => {
    if (count < 10) {
      setCount(++count);
    } else {
      alert("max element=10");
      setCount(10);
    }
    totalHandel();
  };
  var countMines = () => {
    if (count > 1) {
      setCount(--count);
    } else {
      alert("min element=1");
      setCount(1);
    }
    totalHandel();
  };

  var submitHandel = () => {
    setDisplayBtn("inline");
  };

  var noneSubmitHandel = () => {
    setDisplayBtn("none");
  };
  //
  var sortData = (N, P, C, T) => {
    price !== 0 && price !== "" && name !== "🤨🤔" && name !== ""
      ? setProducts((products) => [
          ...products,
          { Name: N, Price: P, Count: C, Total: T },
        ])
      : alert("product name or price is empty");
  };
  //
  var totals = () => {
    products.map((p) => setTotalBill(totalBill + p.Total));
  };

  //choice product and add price
  var sortName = (e) => {
    setName(e.target.value);
    setPrice(pizzaPrice[e.target.value]);
    setDisplayBtn("none");
    setCount(1);
  };

  return (
    <>
      <section className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit god");
            totals();
          }}
        >
          {/* tarbiza */}
          <div>
            <label htmlFor="tarbiza">Tabella</label>
            <input
              type="text"
              name="tarbiza"
              id="tarbiza"
              placeholder="Numero Tabella"
              onChange={(e) => {
                setTarbiza(e.target.value);
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </div>
          {/* choice product */}
          <div>
            <label htmlFor="nameProduct">Prodotto</label>
            <br />
            <select
              required
              name="nameProduct"
              id="nameProduct"
              onChange={sortName}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            >
              <option>Seleziona Il Prodotto</option>
              <optgroup label="pizza🍕">
                {pizza.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Bevande 🍻">
                {drink.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </optgroup>
            </select>
            {/* end choice product */}
            {/* <br />
            <label htmlFor="name">Product</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter Product"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            /> */}
          </div>

          {/* end choice product */}

          {/* count */}
          <div className="count">
            <label htmlFor="count">Quantità</label>
            <br />
            <button type="button" onClick={countMines}>
              -
            </button>
            <input
              type="number"
              id="count"
              placeholder="enter count"
              readOnly
              value={count}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <button type="button" onClick={countPlus}>
              +
            </button>
          </div>
          <br />
          {/* end count */}
          {/* price */}

          <div className="price">
            {/* <label htmlFor="price">Prezzo</label> */}
            <p>Prezzo: {price}£</p>
            <button
              type="button"
              onClick={() => {
                displayPrice === "none"
                  ? setDisplayPrice("inline")
                  : setDisplayPrice("none");
              }}
            >
              Altri prezzo
            </button>
            <input
              style={{ display: displayPrice }}
              type="number"
              id="price"
              placeholder="enter price"
              onChange={(e) => {
                setPrice(e.target.value);
                setDisplayBtn("none");
              }}
              required
              step="any"
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              value={price}
            />
          </div>

          {/* end price */}

          {/* total */}

          <div>
            <br />
            <p>Prezzo Pieno: {total}</p>
            <br />
          </div>

          {/*end total */}
          {/* Add to bill */}
          <div className="ptnPill">
            <button
              type="button"
              onClick={() => {
                totalHandel();
                submitHandel();
              }}
            >
              Aggiungi alla fattura
            </button>
            {/* submitBtn */}
            <button
              style={{ display: displayBtn }}
              onClick={() => {
                sortData(name, price, count, total);
                noneSubmitHandel();
              }}
              type="submit"
            >
              per essere sicuro 🤔
            </button>
          </div>
        </form>
      </section>
      {/* Bill */}
      <section className="container2">
        <div id="print">
          <h2>Tabella: {tarbiza}</h2>
          <table>
            <thead>
              <tr>
                <th>Prodotto</th>
                <th>Prezzo</th>
                <th>Quantità</th>
                <th>Totale</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <Products
                  key={Math.random()}
                  name={p.Name}
                  price={p.Price}
                  total={p.Total}
                  count={p.Count}
                />
              ))}
            </tbody>
          </table>
          <div className="TotalBill">
            <h3>Conto-Totale</h3> <span>{totalBill}€</span>
          </div>
          <p>😊Grazie per aver visitato il ristorante😊</p>
        </div>

        <br />

        {products.length < 1 ? (
          "Freddo"
        ) : (
          <button
            className="btnPrint"
            onClick={() => {
              handlePushData();
              window.print();
              // window.location.reload();
            }}
          >
            Stampa la fattura
          </button>
        )}
      </section>
      <footer>
        <Clock />
      </footer>
    </>
  );
}

export default Form;
