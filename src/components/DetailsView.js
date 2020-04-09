import React from "react";
import { useForm } from 'react-hook-form';

function DetailsView({item, add, update, resetSelectedItem}) {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (textValue) => {
    if (item.id) {
      const updatedItem = Object.assign( item, textValue )
      console.log('form:', updatedItem);
      update(updatedItem);
    } else {
      add(textValue);
    }
  }

  if (item?.id) {
    setValue('object', item);
  }

  return (
    <div className="details-container">
      <h2 className="ml-5">{item.id ? `Editing: ${item.name}` : 'Select a Item'}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="Title"
          name="name"
          ref={register({ required: true, maxLength: 80 })}
          defaultValue={item.name}
        />
        <input
          type="text"
          placeholder="Details"
          name="description"
          ref={register({ required: true, maxLength: 100 })}
          defaultValue={item.description}
        />
        <div>
          <button type="submit">{item.id ? 'Update': 'Create'}</button>
          <button type="reset" onClick={() => resetSelectedItem()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DetailsView;
