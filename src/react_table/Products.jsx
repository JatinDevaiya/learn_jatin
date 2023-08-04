import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Text,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";

const tableColumn = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ row }) => <Image src={row.values.image} height={50} />,
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
      <Button colorScheme="gray" onClick={() => alert(`$${row.values.price}`)}>
        Show Price
      </Button>
    ),
  },
];

const Products = () => {
  const [product, setProduct] = useState([]);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => product, [product]);

  const allproduct = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      console.log(res, "allproduct");
      setProduct(res.data);
    });
  };

  useEffect(() => {
    allproduct();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: 1 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <center>
        <Heading>React Table</Heading>
      </center>
      <Table variant="striped" colorScheme="yellow" {...getTableProps()}>
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
          {page.map((row, i) => {
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

      <Flex justify="space-between" align="center" m={4}>
        <Flex gap={4}>
          <Tooltip label="First Page">
            <IconButton
              colorScheme="yellow"
              onClick={() => gotoPage(0)}
              icon={<ArrowLeftIcon h={3} w={3} />}
            />
          </Tooltip>

          <Tooltip label="Prev Page">
            <IconButton
              colorScheme="yellow"
              onClick={previousPage}
              icon={<ChevronLeftIcon h={3} w={3} fontSize={"xl"} />}
            />
          </Tooltip>
        </Flex>

        <Flex align="center" gap={2}>
          Page
          <Text as="span" fontWeight={"bold"}>
            {pageIndex + 1}
          </Text>
          Of
          <Text as="span" fontWeight={"bold"}>
            {pageOptions.length}
          </Text>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 7, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex gap={4}>
          <Tooltip label="Next Page">
            <IconButton
              colorScheme="yellow"
              onClick={nextPage}
              icon={<ChevronRightIcon h={3} w={3} fontSize={"xl"} />}
            />
          </Tooltip>

          <Tooltip label="Last Page">
            <IconButton
              colorScheme="yellow"
              onClick={() => gotoPage(pageCount - 1)}
              icon={<ArrowRightIcon h={3} w={3} />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};

export default Products;
