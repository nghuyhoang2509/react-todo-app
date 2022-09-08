import React from "react";
import classNames from "classnames/bind";
import styles from "./Toast.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteError } from "../../store";

const cx = classNames.bind(styles);

export default function Toast() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state);
  return (
    <>
      {error ? (
        <div className={cx("toast")}>
          <h5>{error}</h5>
          <img
            onClick={() => dispatch(deleteError())}
            alt="close"
            src="https://img.icons8.com/external-those-icons-flat-those-icons/24/000000/external-Delete-interface-those-icons-flat-those-icons.png"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
