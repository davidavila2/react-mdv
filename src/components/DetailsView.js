import React, {useState} from "react";
import { useForm } from 'react-hook-form';

function DetailsView(props) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = textValue => props.item.id ? setText(textValue) : props.add(text);
  const [text, setText] = useState('');

  return (
    <div className="details-container">
      <h2 className="ml-5">Select a Computer</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input type="text" placeholder="Title" name="First name" ref={register({required: true, maxLength: 80})} defaultValue={props.item.name} />
        <input type="text" placeholder="Details" name="Last name" ref={register({required: true, maxLength: 100})} defaultValue={props.item.description} />
        <div>
            <button onClick={() => props.add(text)}>{props.item.id ? 'Update' : 'Create'}</button>
            <button type="reset" onClick={() => reset()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DetailsView;
