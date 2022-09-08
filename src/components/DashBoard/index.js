import React, { useContext, useState } from "react";
import styles from "./DashBoard.module.scss";
import classnames from "classnames/bind";
import { StoreContext } from "../../store";
import { auth } from "../../firebase/config";

const cx = classnames.bind(styles);

export default function DashBoard() {
  const [inputProject, setInputProject] = useState("");
  const [state, dispatch] = useContext(StoreContext);

  const handleAddProject = () => {
    if (inputProject) {
      const action = { type: "addProject", data: { name: inputProject } };
      setInputProject("");
      dispatch(action);
    } else {
      alert("invalid value");
    }
  };
  return (
    <div className={`container-fluid vh-100 vw-100 ${cx("warpper")} `}>
      <div className="row h-100 w-100">
        <div
          className={`col-md-3 d-none d-md-flex flex-column ${cx("navbar")}`}
        >
          <h3 className={`mt-4 mb-4 ${cx("title")}`}>Todo-app</h3>
          <input
            onChange={(e) => setInputProject(e.target.value)}
            value={inputProject}
            type="text"
            className={`mt-4 ${cx("input-project")}`}
            placeholder="Type name project"
          />
          <button
            onClick={handleAddProject}
            className={`btn btn-sm btn-outline-primary mt-0 me-2 mb-0 ${cx(
              "btn-add-project"
            )}`}
          >
            Add
          </button>
          <div className={cx("store-project")}>
            {state.length ? (
              state.map((project, index) => (
                <h5 className={cx('project-name')} key={`${project};${index}`}>
                  {project.name}
                </h5>
              ))
            ) : (
              <></>
            )}
            <h5 className={cx('project-name')}>Project 1</h5>
            <h5 className={`${cx('project-name')} ${cx('project-select')}`}>Project 1</h5>
            <h5 className={cx('project-name')}>Project 1</h5>
            
          </div>
          <h5 onClick={() => auth.signOut()} className="mb-4 pointer">
            <img
              alt=" "
              className="me-2"
              src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/000000/external-log-out-ecommerce-user-interface-inkubators-detailed-outline-inkubators.png"
            />{" "}
            Log out
          </h5>
        </div>
        <div className={`col-md-9 col-12 ${cx("project")}`}></div>
      </div>
    </div>
  );
}
