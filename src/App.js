import { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
        <a href="https://github.com/DanielClemKim/search-coins">
          <button class="button is-pulled-right mb-3">
            <span class="icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span>GitHub</span>
          </button>
        </a>
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
            const price = Math.round(coin.quotes.USD.price * 1000) / 1000;
            if (nameOfCoin.includes(nameOfSearch)) {
              return (
                <li className="box my-1" key={coin.id}>
                  <b>
                    {coin.name}({coin.symbol})
                  </b>{" "}
                  : ${price} USD
                  <button className="button is-success is-small is-pulled-right px-5">
                    Buy
                  </button>
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
