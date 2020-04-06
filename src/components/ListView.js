import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ListView(props) {
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

            <button onClick={() => props.delete(item.id)}>
              <FontAwesomeIcon icon="times" />
            </button>
          </li>
        ))}
      </ul>
      {props.data}
    </div>
  );
}

export default ListView;
