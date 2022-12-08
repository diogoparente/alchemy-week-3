import React from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { toNumber } from "ethers";

const Hash = ({ hash }) => {
  return <Link to={`/transaction/${hash}`}>{hash}</Link>;
};
const columns = [
  {
    Header: "Hash",
    accessor: "hash",
    Cell: ({ cell: { value } }) => {
      return <Hash hash={value} />;
    },
  },
  {
    Header: "Type",
    accessor: "type",
  },
  { Header: "From", accessor: "from" },
  { Header: "To", accessor: "to" },
  {
    Header: "Gas Price Hex",
    accessor: "gasPrice._hex",
    cell: (hexValue) => {
      return <div>{toNumber(hexValue)}</div>;
    },
  },
];

function Table({ data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px gray" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px papayawhip",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      maxWidth: (columns.length - 1) * 100,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      padding: "10px",
                      border: "solid 1px papayawhip",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function TransactionsTable({ data }) {
  return (
    <div style={{ padding: 20 }}>
      <Table data={data} />
    </div>
  );
}
