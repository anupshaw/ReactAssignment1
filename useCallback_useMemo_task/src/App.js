import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  const [listTitle, setListTitle] = useState("My List");
  const [sortAscending, setSortAscending] = useState(true);

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  const sortingHandler = useCallback(() => {
    console.log("sorting is in progress");
    setSortAscending(!sortAscending);
  }, [sortAscending]);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList OnSort={sortAscending} title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
      <Button onClick={sortingHandler}>
        {sortAscending
          ? "change to Descending order"
          : "change to Ascending order"}
      </Button>
    </div>
  );
}

export default App;
