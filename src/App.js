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
  const onClick = () => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
      });
  };
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Coins!</h1>
        <h2 className="subtitle">There's {coins.length} coins in this list</h2>
        <div className="buttons">
          <a
            href="https://github.com/DanielClemKim/search-coins"
            className="button"
          >
            <span className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span>GitHub</span>
          </a>
        </div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <div className="columns is-centered">
            <form className="column is-11 control">
              <input
                className="input mb-3"
                onChange={onChange}
                type="text"
                placeholder="What coins?"
              />
            </form>
            <div className="column buttons">
              <button
                onClick={onClick}
                className="button px-5 ml-0 is-danger is-light"
              >
                <span>Refresh</span>
              </button>
            </div>
          </div>
        )}
        <ul>
          {coins.map((coin) => {
            const nameOfCoin = coin.name.toLowerCase();
            const nameOfSymbol = coin.symbol.toLowerCase();
            const name = nameOfCoin + nameOfSymbol;
            const nameOfSearch = searchCoin.toLowerCase();
            const price = Math.round(coin.quotes.USD.price * 1000) / 1000;
            if (name.includes(nameOfSearch)) {
              return (
                <div key={coin.id} className="columns is-centered mt-3">
                  <li className="column box is-11 my-0 is-size-5">
                    <b>
                      {coin.name}({coin.symbol})
                    </b>{" "}
                    : ${price} USD
                  </li>
                  <div className="column">
                    <button className="button is-success px-5 ml-3">
                      <b>Buy</b>
                    </button>
                  </div>
                </div>
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
