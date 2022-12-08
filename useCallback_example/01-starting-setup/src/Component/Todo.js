import React from "react";
const Todo = (props) => {

   console.log('todo  is executed successfully');
  return (
    <div>
      <h1>My Todo</h1>
      {props.item.map((todo, index) => {
        return <p key={index}>{todo + index}</p>;
      })}
      <button onClick={props.onAdd}>ADD Todo</button>
    </div>
  );
};

export default React.memo(Todo);
