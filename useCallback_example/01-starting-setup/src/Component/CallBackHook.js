import React, {useCallback, useState } from "react";
import classes from "./CallBackHook.module.css";
import Todo from "./Todo";
const CallBackHook = () => {
  let [count, setCount] = useState(0);
  let [todos, setTodos] = useState([]);

  const IncrementHandler = () => {
    setCount(count++);
  };

console.log('CallBackHook is executed successfully' )

  const addTodoHandler = useCallback(() => {
    setTodos((prevTodos) => {
     return [...prevTodos,"new Entry"];
    });
  },[]);

  return (
    <div className={classes.CallBackHook}>
      <Todo item={todos} onAdd={addTodoHandler} />
      <div className={classes.countButton}>
        <div>Count:{count}</div>
        <button onClick={IncrementHandler}>+</button>
      </div>
    </div>
  );
};

export default CallBackHook;
