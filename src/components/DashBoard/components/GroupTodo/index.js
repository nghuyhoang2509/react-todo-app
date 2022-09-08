import React, { useRef } from "react";
import styles from "./GroupTodo.module.scss";
import classNames from "classnames/bind";
import Todo from "../Todo";
import { useDispatch, useSelector } from "react-redux";
import { saveProject } from "../../../../store";

const cx = classNames.bind(styles);

export default function GroupTodo({ title, data, keyword }) {
  const groupTodo = useRef()
  const projectSelected = useSelector((state) => state.projectSelected);
  const dispatch = useDispatch();
 
  return (
    <div className={cx("group-todo")}>
      <div className={cx("header")}>
        <h6>{title}</h6>
        <div className={cx("count-todo")}>{data.length}</div>
      </div>
      <button
        className={cx("btn-add-todo")}
        onClick={() =>{
          dispatch(
            saveProject([
              projectSelected.id,
              keyword,
              [
                ...projectSelected[keyword],
                { title: "Title", content: "write content" },
              ],
            ])
          )}
        }
      >
        +
      </button>
      <span className="flex-grow-1"  ref={groupTodo}>
      {data.map((todo, index) => (
        <Todo keyword={keyword} key={index} index={index} title={todo.title}>{todo.content}</Todo>
        ))}
      </span>
    </div>
  );
}
