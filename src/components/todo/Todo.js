import React, { useEffect, useState } from "react";
import "./style.css";

//get the local storage data
function getLocalData() {
  const lists = localStorage.getItem("my-todo-list");
  if (lists) return JSON.parse(lists);
  else return [];
}

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [editItemId, setEditItemId] = useState("");
  const [toggle, setToggle] = useState(false);

  //   add items function
  function addItem() {
    if (inputData === "") {
      alert("Please fill the data");
      return;
    } else if (inputData && toggle) {
      setItems(
        items.map((currElem) => {
          if (currElem.id === editItemId) {
            return { ...currElem, name: inputData };
          }
          return currElem;
        })
      );
      setInputData("");
      setToggle(false);
    
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newItem]);
      setInputData("");
      setToggle(false);
    }
  }

  //function to delete a item
  function deleteItem(id) {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== id;
    });

    setItems(updatedItems);
  }

  //function to delete all items
  function deleteAll() {
    setItems([]);
  }

  //adding localstorage
  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(items));
  }, [items]);

  //function to edit a item
  function editItem(id) {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id === id;
    });
    setInputData(item_todo_edited.name);
    setEditItemId(id);
    setToggle(true);
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="todo-logo" />
            <figcaption>Add your list here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              className="form-control"
              type="text"
              placeholder="✍️ Add Item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggle ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show all items */}

          <div className="showItems">
            {items.map((item, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(item.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all items */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={deleteAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
