import React, { useState, useEffect } from "react";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import Header from "./components/Header";
import ListView from "./components/ListView";
import DetailsView from "./components/DetailsView";

function App() {
  const [selectedItem, setItem] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('https://server-30-x-30.herokuapp.com/items')
      .then(res => {
        setItems(res.data)
      }).catch(error => {
        console.log(error)
      });
  });

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const selectItem = item => {
    setItem(item);
  };

  const updateItem = () => {
    setItems(currItem => {
      currItem = Object.assign({}, currItem);
    });
  };

  const addItem = text => {
    if (!text) {
      alert('Error', 'Please enter an item', {text: 'Ok'});
    } else {
      setItems(prevItems => {
        return [text, ...prevItems];
      });
    }
  };

  return (
    <div>
      <Header/>
      <div className="wrapper">
        <ListView items={items} selectItem={selectItem} delete={deleteItem} />
        <DetailsView item={selectedItem} update={updateItem} add={addItem}/>
      </div>
    </div>
  );
  
}
library.add(faBars, faUser, faTimes);
export default App;
