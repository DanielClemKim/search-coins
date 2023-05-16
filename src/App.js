import { useEffect, useState } from "react";

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
    <div>
      <h1>Coins!</h1>
      <h2>There's {coins.length} coins in this list</h2>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <form>
          <input onChange={onChange} type="text" placeholder="What coins?" />
        </form>
      )}
      <ul>
        {coins.map((coin) => {
          const nameOfCoin = coin.name.toLowerCase();
          if (nameOfCoin.includes(searchCoin)) {
            return (
              <li key={coin.id}>
                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default App;
