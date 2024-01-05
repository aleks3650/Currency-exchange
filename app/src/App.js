import React, { useState } from "react";
import axios from "axios";

function App() {
  const [firstCurrency, setFirstCurrency] = useState("");
  const [secondCurrency, setSecondCurrency] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: {
        from: firstCurrency,
        to: secondCurrency,
        q: "1.0",
      },
      headers: {
        "X-RapidAPI-Key": "cf09aabd12mshabea522b8fbe05bp10a57ejsn38172426debd",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResponse(
        `1 ${firstCurrency} is equal to ${response.data.toFixed(
          2
        )} ${secondCurrency} `
      );
    } catch (error) {
      console.log(error);
      setResponse("Invalid data");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    if (firstCurrency === "" || secondCurrency === "") {
      setResponse("No data");
    } else {
      setLoading(true);
      fetchData();
      console.log(firstCurrency, secondCurrency);
    }
    setFirstCurrency("");
    setSecondCurrency("");
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="Container">
        <h1>Exchange app</h1>
        <h2>{loading ? "loading..." : response}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="FirstCurrency">First Currency</label>
          <input
            type="text"
            placeholder="Enter currency"
            value={firstCurrency}
            id="FirstCurrency"
            onChange={(e) => setFirstCurrency(e.target.value)}
          />
          <label htmlFor="SecondCurrency">Second Currency</label>
          <input
            type="text"
            placeholder="Enter currency"
            value={secondCurrency}
            id="SecondCurrency"
            onChange={(e) => setSecondCurrency(e.target.value)}
          />
          <button type="submit">exchange</button>
        </form>
      </div>
    </div>
  );
}

export default App;
