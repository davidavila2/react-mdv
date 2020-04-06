import React, { useState, useEffect } from "react";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import Header from "./components/Header";
import ListView from "./components/ListView";
import DetailsView from "./components/DetailsView";

function App() {
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('https://server-30-x-30.herokuapp.com/items')
      .then(res => {
        setItems(res.data)
      }).catch(error => {
        console.log(error)
      });
  }, []);

  const deleteItem = id => {
    axios
    .delete(`https://server-30-x-30.herokuapp.com/items/${id}`, selectedItem)
    .then(res => {
      setItems(prevItems => {
        return prevItems.filter(item => item.id !== id);
      });
      console.log(res.data, 'lol')
      }).catch(error => {
      console.log(error)
      }, {});
  };

  const selectItem = item => {
    console.log('selected:', item);
    setSelectedItem(item);
  };

  const resetItem = () => {
    setSelectedItem({});
  }

  const updateItem = item => {
    console.log(item, 'item from root');
    axios
    .patch(`https://server-30-x-30.herokuapp.com/items/${item.id}`, selectedItem)
    .then(res => {
      setItems(currItem => {
        currItem = Object.assign({}, currItem);
      });
      console.log(res.data, 'lol')
      }).catch(error => {
      console.log(error)
      }, {});
  };

  const addItem = text => {
    if (!text) {
      alert('Please fill out form', {text: 'Ok'});
    } else {
      setSelectedItem(text);

      axios
        .post('https://server-30-x-30.herokuapp.com/items', text)
        .then(res => {
          setItems(res?.data)
          console.log(res.data, 'lol')
      }).catch(error => {
        console.log(error)
      }, {});
    }
  };

  return (
    <div>
      <Header/>
      <div className="wrapper">
        <ListView
          items={items}
          selectItem={selectItem}
          delete={deleteItem}
        />
        <DetailsView
          item={selectedItem}
          update={updateItem}
          resetSelectedItem={resetItem}
          add={addItem}
        />
      </div>
    </div>
  );
  
}
library.add(faBars, faUser, faTimes);
export default App;
