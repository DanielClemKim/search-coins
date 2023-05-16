import { useEffect, useState } from "react";
import "bulma/css/bulma.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChange = (event) => {
    setSearchCoin(event.target.value);
  };
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Coins!</h1>
        <h2 className="subtitle">There's {coins.length} coins in this list</h2>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <form className="control is-loading">
            <input
              className="input mb-3"
              onChange={onChange}
              type="text"
              placeholder="What coins?"
            />
          </form>
        )}
        <ul>
          {coins.map((coin) => {
            const nameOfCoin = coin.name.toLowerCase();
            const nameOfSearch = searchCoin.toLowerCase();
            if (nameOfCoin.includes(nameOfSearch)) {
              return (
                <li className="box my-1" key={coin.id}>
                  {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    </section>
  );
}

export default App;
