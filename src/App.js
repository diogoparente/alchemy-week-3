import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import TransactionsTable from "./Table";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      return blockNumber;
    }

    async function getTransactions(b) {
      const { transactions } = await alchemy.core.getBlockWithTransactions(b);
      setTransactions(transactions);
      console.log({ transaction: transactions[0] });
      return;
    }

    getBlockNumber().then(async (b) => await getTransactions(b));
  }, [blockNumber]);

  return (
    <div className="App">
      Block Number: {blockNumber}
      <TransactionsTable data={transactions} />
    </div>
  );
}

export default App;
