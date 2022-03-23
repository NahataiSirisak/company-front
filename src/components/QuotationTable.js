import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import style from "../mystyle.module2.css";
import { FaTrashAlt } from "react-icons/fa";

function QuotationTable({ data, clearDataItems, updateDataItems }) {
  // const [dataItems, setDataItems] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.price;
      sum += amount;
      return (
        <tr key={i}>
          <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v.code)} />
          </td>
          <td className={style.textCenter}>{v.qty}</td>
          <td>{v.name}</td>
          <td className={style.textCenter}>{formatNumber(v.price)}</td>
          <td className={style.textRight}>{formatNumber(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const deleteItem = (code) => {
    var z = data.filter((value, index, arr) => value.code != code);
    updateDataItems(z);
  };

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button>
      <Table >
        <thead>
          <tr>
            <th style={{ width: "20px", backgroundColor: "#F7EBC8" }}>&nbsp;</th>
            <th style={{ backgroundColor: "#F7EBC8" }}className={style.textCenter}>Qty</th>
            <th style={{ backgroundColor: "#F7EBC8" }}className={style.textCenter}>Item</th>
            <th style={{ backgroundColor: "#F7EBC8" }}className={style.textCenter}>Price/Unit</th>
            <th style={{ backgroundColor: "#F7EBC8" }}className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td style={{ backgroundColor: "#F7EBC8" }} colSpan={4} className={style.textRight}>
              <b>Total</b>
            </td>
            <td style={{ backgroundColor: "#F7EBC8" }} className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default QuotationTable;
