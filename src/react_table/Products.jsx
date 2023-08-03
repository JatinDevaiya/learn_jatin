import {
  Button,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";

const tableColumn = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ row }) => <Image src={row.values.image} height={60} />,
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ row }) => `$${row.values.price}`,
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Action",
    // accessor: "price",
    Cell: ({ row }) => (
      <Button onClick={() => alert(`$${row.values.price}`)}>Show Price</Button>
    ),
  },
];

const Products = () => {
  const [product, setProduct] = useState([]);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => product, []);

  useEffect(() => {
    const allproduct = () => {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        console.log(res, "allproduct");
        setProduct(res.data);
      });
    };
    allproduct();
  }, [ ]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: data,
      },
      useSortBy
    );

  return (
    <>
      <center>
        <Heading>React Table</Heading>
      </center>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((header) => (
            <Tr {...header.getHeaderGroupProps()}>
              {header.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? "⇩" : "⇧") : ""}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default Products;
