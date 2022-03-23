import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import {TiTrash} from "react-icons/ti";
import {FaSort} from "react-icons/fa"
import style from "../mystyle.module.css";
import BootstrapTable from "react-bootstrap-table/lib/BootstrapTable";

export default function ProductManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [productRows, setProductRows] = useState([]);
  const [product, setProduct] = useState({
    item: "",
    price: 0,
    qty: 0,
  });
  const [total, setTotal] = useState(0);
  const [productOptions, setProductOptions] = useState([]);
  const [price, setPrice] = useState(0);
  const [SelectProducts, setSelectProducts] = useState([]);

  const itemRef = useRef();
  const priceRef = useRef();
  const qtyRef = useRef();

  useEffect(() => { document.body.style.backgroundColor = 'lightblue' }, [])

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        data = data.filter((e) => "code" in e);

        console.log(data);
        const z = data.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ));
        setSelectProducts(data);
        setProductOptions(z);
      });
  }, []);

  useEffect(() => {
    let sum = 0;
    fetch(`${API_URL}/quotations`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e, i) => {
          let amount = e.qty * e.price;
          sum += amount;
          return (
            <tr key={i} className = {style.textCenter}>
              <td>
                <TiTrash
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>
              <td>{e.qty}</td>
              <td>{e.item}</td>
              <td>{formatNumber(e.price)}</td>
              <td>{formatNumber(amount)}</td>
            </tr>
          );
        });

        setProducts(data);
        setProductRows(rows);
        setTotal(sum);
      });
  }, []);

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  
  const handleDelete = (product) => {
    console.log(product);
    if (window.confirm(`Are you sure to delete [${product.item}]?`)) {
      fetch(`${API_URL}/quotations/${product._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === product._id) {
              products.splice(i,1);
              break;
            }
          }

          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <TiTrash
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.code}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
              </tr>
            );
          });
  
          setProducts(products);
          setProductRows(rows);  
        });
    }
  };
  
  return (
    <>
      <Container>
        <h1 class="mt-2">Quotation Management</h1>
        {/* API_URL: {API_URL} */}

        <Table data-toggle="table" >
          <thead>
            <tr>
              <th style={{width: "60px" , backgroundColor: "#F7EBC8" }} >&nbsp;</th>
              <th style={{ backgroundColor: "#F7EBC8" }} className={style.textCenter} >Quantity</th>
              <th style={{ backgroundColor: "#F7EBC8" }} className={style.textCenter}data-field="name" data-sortable="true" >Name</th>
              <th style={{ backgroundColor: "#F7EBC8" }} className={style.textCenter}>Price/Unit</th>
              <th style={{ backgroundColor: "#F7EBC8" }} className={style.textCenter}>Amount</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
          <tfoot>
          <tr>
            <td colSpan={4} className={style.textCenter} style={{ backgroundColor: "#F7EBC8" }} >
              <b>Total</b>
            </td>
            <td className={style.textCenter} style={{ backgroundColor: "#F7EBC8" }} >
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
        </Table>
        <div className="float-end">
        <Button className={style.button} role="button" href="/react-quotation/quotation"  > 
        {/* variant="outline-success" */}
          <FaPlus /> Add
        </Button>
        </div>
      </Container>

      </>

  );
  
}

