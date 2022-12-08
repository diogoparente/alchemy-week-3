import { alchemy } from "./App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Transaction() {
  let { transactionId } = useParams();
  const [transaction, setTransaction] = useState();
  useEffect(() => {
    const getReceipt = async () => {
      console.log({ transactionId });
      const receipt = await alchemy.core.getTransactionReceipt(transactionId);
      setTransaction(receipt);
    };
    getReceipt();
  }, [transactionId]);

  return (
    <div>
      {transaction
        ? Object.entries(transaction).map(([key, value]) => (
            <div key={key}>
              <strong>{key}: </strong> {JSON.stringify(value)}
            </div>
          ))
        : null}
    </div>
  );
}
