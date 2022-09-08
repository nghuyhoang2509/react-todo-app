import React, { useRef } from "react";
import styles from "./Todo.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { saveProject } from "../../../../store";

const cx = classNames.bind(styles);

export default function Todo({ keyword, title, children, index }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const deleteRef = useRef();
  const todoRef = useRef();
  const { projectSelected } = state;
  const handleSaveProject = () => {
    let data = [...projectSelected[keyword]];
    data[index] = {
      title: todoRef.current.children[0].innerText,
      content: todoRef.current.children[1].innerText,
    };
    deleteRef.current.style.display = "none";
    dispatch(saveProject([projectSelected.id, keyword, data]));
  };
  const handleSaveProjectDel = () => {
    let data = [...projectSelected[keyword]];
    data = [...data.slice(0, index), ...data.slice(index + 1, data.length)];
    dispatch(saveProject([projectSelected.id, keyword, data]));
  };

  return (
    <div
      id={`todo${index}`}
      className={cx("todo")}
      suppressContentEditableWarning={true}
      contentEditable={true}
      onBlur={handleSaveProject}
      onFocus={() => (deleteRef.current.style.display = "block")}
      ref={todoRef}
    >
      <h6>{title}</h6>
      <p>{children}</p>
      <img
        ref={deleteRef}
        onClick={handleSaveProjectDel}
        className={cx("trash")}
        alt="delete"
        src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"
      />
    </div>
  );
}
