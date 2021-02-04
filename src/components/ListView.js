import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ListView(props) {

  if (!props.items.length) {
    return (
      <h1>no data</h1>
    )
  } else {
    return (
      <div className="list-container">
        <h2 className="ml-5">Items</h2>
  
        <ul>
          {props?.items?.map(item => (
            <li key={item.id} className="item" onClick={() => props.selectItem(item)}>
              <div className="list-item">
                <span>{item.name}</span>
                <span>{item.description}</span>
              </div>
  
              <div className="btn-actions">
                <button onClick={() => props.delete(item.id)}>
                  <FontAwesomeIcon icon="times" />
                </button>

                <button onClick={() => props.relocate(item.id)}>
                  <FontAwesomeIcon icon="ellipsis-v" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListView;
