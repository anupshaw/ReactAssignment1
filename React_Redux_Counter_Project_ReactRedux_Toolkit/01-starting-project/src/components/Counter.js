import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
// import { counterAction } from "./store/index";
import { counterAction } from "./store/AfterSpilitingCode/counter";
const Counter = () => {
  const dispatch = useDispatch();

  const Counter = useSelector((state) => state.counter.counter);
  const show=useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterAction.increment());
  };

  const decrementHandler = () => {
    dispatch(counterAction.decrement());
  };

  const increaseHandler = () => {
    dispatch(counterAction.increase(5));
  };



  const toggleCounterHandler = () => {
    dispatch(counterAction.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{Counter}</div>}
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
