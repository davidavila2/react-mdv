import React, { useState, useEffect } from "react";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import Header from "./components/Header";
import ListView from "./components/ListView";
import DetailsView from "./components/DetailsView";

const BASEURL = 'https://server-30-x-30.herokuapp.com/items/'

const getUrlWithId = id => `${BASEURL}${id}`;

function App() {
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(BASEURL)
      .then(res => {
        setItems(res.data)
      }).catch(error => {
        console.log(error)
      });
  }, []);

  const deleteItem = async id => {
    try {
      await axios.delete(getUrlWithId(id), selectedItem);
      setItems(prevItems => prevItems = prevItems.filter(item => item.id !== id));
    } catch(error) {
      console.log('ERROR from Delete Item in The Parent', error);
    } finally {
      resetItem();
    }
  };

  const selectItem = item => {
    setSelectedItem(item);
  };

  const resetItem = () => {
    setSelectedItem({});
  }

  const updateItem = async item => {
    try {
      await axios.patch(getUrlWithId(item.id), selectedItem);
      setItems(currItems => currItems = currItems.map(currItem => item.id === currItem.id ? {...item} : currItem));
    } catch (error) {
      console.error('ERROR from Update Item in Parent', error);
    } finally {
      resetItem();
    }
  };

  const addItem = async item => {
    console.log(item, 'item cosnoke')
    if (!item) {
      console.log('Hey yo', item.name);
      alert('Please fill out form');
    } else {
      setSelectedItem(item);
      console.log(item)

      try {
        const newItem = (await axios.post(BASEURL, item)).data;
        setItems((currentItems) => currentItems = [...currentItems, newItem]);
      } catch (error) {
        console.error('ERROR from ADD Item In Parent', error);
      } finally {
        resetItem();
      }
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
