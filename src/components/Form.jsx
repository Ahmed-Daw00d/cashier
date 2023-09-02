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
  //display and none display
  var [displayBtn, setDisplayBtn] = useState("none");
  var [displayPrice, setDisplayPrice] = useState("none");
//pill
  var [products, setProducts] = useState([]);
  var [totalBill, setTotalBill] = useState(0);
  //product and price product
  var pizza = ["pizza", "pizza2", "pizza3"];
  var pizzaPrice = { pizza: 5, pizza2: 2, pizza3: 3 };
  //push for firebase
  const handlePushData = () => {
    addDoc(collection(db, "AllOrders"), {
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
          {/* name */}
          <div>
            {/* choice product */}
            <label htmlFor="nameProduct">product</label>
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
              <option>select product</option>
              <optgroup label="eat">
                {pizza.map((p) => (
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

          {/* end name */}

          {/* price */}

          <div>
            
          <label htmlFor="price">price</label>
          <div className="price">
            <p id="price">{price}£</p>
            <button type="button" onClick={()=>{displayPrice==="none"?setDisplayPrice("inline"):setDisplayPrice("none")}} >Altri prezzi</button>
            
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
            /></div>
          </div>

          {/* end price */}

          {/* count */}
          <div>
            <label htmlFor="count">count</label>
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
              onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            />
            <button type="button" onClick={countPlus}>
              +
            </button>
          </div>

          {/* end count */}

          {/* total */}

          <div>
            <label htmlFor="total">total price</label>
            <br />
            <input
              type="total"
              id="total"
              placeholder="total price"
              value={total}
              onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            />
          </div>

          {/*end total */}
          {/* Add to bill */}
          <button
            type="button"
            onClick={() => {
              totalHandel();
              submitHandel();
            }}
          >
            Add to bill
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
            submit
          </button>
        </form>
      </section>
      {/* Bill */}
      <section className="container2">
        <div id="print">
          <table>
            <tr>
              <th>product</th>
              <th>price</th>
              <th>amount</th>
              <th>total</th>
            </tr>
            {products.map((p) => (
              <Products
                key={Math.random()}
                name={p.Name}
                price={p.Price}
                total={p.Total}
                count={p.Count}
              />
            ))}
          </table>
          <div className="TotalBill">
            <h3>TOTAl</h3> <span>{totalBill}€</span>
          </div>
        </div>

        <br />

        {products.length < 1 ? (
          "Bill"
        ) : (
          <button
            className="btnPrint"
            onClick={() => {
              handlePushData();
              window.print();
              // window.location.reload();
            }}
          >
            print
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
