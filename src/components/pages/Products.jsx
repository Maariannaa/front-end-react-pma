import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../App"
import { products, rate as exchange, categories } from '../common/constants';
import { AiOutlineStar } from 'react-icons/ai';
import { BsBasket } from 'react-icons/bs';
import Column from "../common/column/Column";
import Select from "../common/Select";
import { totalPrice } from "../common/common";
import { useHistory } from "react-router-dom";

const Products = () => {
  const { currentUser } = useContext(AuthContext);
  const [category, setCategory] = useState('meat');
  const [allProducts, setAllProducts] = useState(products);

  const history = useHistory()

  useEffect(() => {
    if (currentUser) {
    fetch(`${process.env.REACT_APP_BACKEND_API}/products`)
      .then(response => response.json())
      .then(data => setAllProducts(data));
    }
  }, [currentUser]);

  const theadTable = () => (
    <thead style={{ color: '#fff' }}>
      <tr>
        <th>#id</th>
        <th>Title</th>
        <th>Category</th>
        <th>Germany</th>
        <th>Quantity</th>
        <th>Weight, g</th>
        <th>Price, €</th>
        <th>Buy Date</th>
        <th>End Date</th>
        <th>Take to</th>
        <th>Keep, days</th>
        <th>Shop</th>
        <th>Sale</th>
        <th>Total, €</th>
        <th>₴</th>
        <th><AiOutlineStar size="1.5rem"/></th>
      </tr>
    </thead>
  )

  const handleShowProduct = (id) => {
    history.push(`/products/${id}`)
  }

  const bodyTable = (product) => {
    const {
      id, title,
      category, germany,
      quantity, weight,
      price, buy,
      end, expiry,
      keep, total,
      out, shop,
      sale, rate
    } = product;

    return(
      <tbody key={id}>
        <tr className={out ? 'end'  : ''}  onClick={() => handleShowProduct(id)}>
          <th>{id}</th>
          <th>{title}</th>
          <th>{category}</th>
          <th>{germany}</th>
          <th>{quantity}</th>
          <th>{weight} g</th>
          <th>{price} €</th>
          <th>{new Date(buy).toLocaleDateString()}</th>
          <th>{new Date(end).toLocaleDateString()}</th>
          <th>{new Date(expiry).toLocaleDateString()}</th>
          <th>{keep}</th>
          <th>{shop}</th>
          <th><input type="checkbox" checked={sale} readOnly/></th>
          <th>{total} €</th>
          <th>{(exchange[1]?.sale * price).toFixed(2)}</th>
          <th>{rate}</th>
        </tr>
      </tbody>
    )
  }

  const renderAllTable = (category) => {
    const productsOfCategory = allProducts?.filter(item => item.category === category)
    return(
      productsOfCategory.length === 0 ?
      <Column style={{ margin: '5%'}}>
        <BsBasket size="5rem" />
        <h3>You didn't buy anything from {category}...</h3>
      </Column>
      :
      <>
        <table className="table">
          {theadTable()}
          {productsOfCategory.map(product => bodyTable(product))}
        </table>
        <h3>
          <b>Total: </b>
          <i>{totalPrice(productsOfCategory)} €</i>
        </h3>
      </>
    )
  }

  return (
    <Column>
      <h1>Choose category of products:</h1>
      <Select
        name="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        data={categories}
      />
      {category &&
        renderAllTable(category)
      }
    </Column>
  )
}

export default Products
