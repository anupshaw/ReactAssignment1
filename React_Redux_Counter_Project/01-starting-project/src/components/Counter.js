import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
const Counter = () => {
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const increaseHandler = () => {
    dispatch({ type: "increase", amount: 5 });
  };
  const toggleCounterHandler = () => {};
  const Counter = useSelector((state) => state.counter);
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{Counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;