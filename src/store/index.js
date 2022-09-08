import React, { useReducer, createContext, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const StoreContext = createContext();
const collectionProject = collection(db, "project");

const initState = [];
/* {
  name: "Project 1",
  listTodo: [
    {
      name: "completed",
      todos: [
        { title: "Design", content: "jhasjhaskjdh adjkahd ahukdha" },
        { title: "Code", content: "jhasjhaskjdh adjkahd ahukdha" },
      ],
    },
    {
      name: "active",
      todos: [
        { title: "Design", content: "jhasjhaskjdh adjkahd ahukdha" },
        { title: "Code", content: "jhasjhaskjdh adjkahd ahukdha" },
      ],
    },
  ],
},
{
  name: "Project 2",
  listTodo: [
    {
      name: "completed",
      todos: [
        { title: "Design", content: "jhasjhaskjdh adjkahd ahukdha" },
        { title: "Code", content: "jhasjhaskjdh adjkahd ahukdha" },
      ],
    },
    {
      name: "active",
      todos: [
        { title: "Design", content: "jhasjhaskjdh adjkahd ahukdha" },
        { title: "Code", content: "jhasjhaskjdh adjkahd ahukdha" },
      ],
    },
  ],
}, */

const todoReducer = (state, action) => {
  console.log('1 times')
  switch (action.type) {
    case "addProject":
      addDoc(collectionProject, {
        name: action.data.name,
        listTodo: [],
      });
      return state
    default:
      alert("action type vaild");
  }
};

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initState);
  useEffect(() => {
    const unsub = onSnapshot(collectionProject, (doc) => {
      console.log("Current data: ", doc);
  });
  
    return () => {
      unsub()
    }
  }, [])
  

  
  
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}
