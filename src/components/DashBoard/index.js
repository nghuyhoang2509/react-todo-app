import React, { useState, useEffect, useContext } from "react";
import styles from "./DashBoard.module.scss";
import classnames from "classnames/bind";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  loadProject,
  saveProject,
  setProjectSelected,
  deleteProject,
} from "../../store";
import GroupTodo from "./components/GroupTodo";
import Spin from "../Spin";
import { AuthContext } from "../../Context/AuthProvider";

const cx = classnames.bind(styles);

export default function DashBoard() {
  const { email } = useContext(AuthContext);
  const state = useSelector((state) => state);
  const [inputProject, setInputProject] = useState("");
  const { projectSelected, loading, project } = state;
  const [editTitle, setEditTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState(projectSelected.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProject({ email }));
    return () => {};
    // eslint-disable-next-line
  }, []);

  const handleAddProject = () => {
    if (inputProject) {
      setInputProject("");
      dispatch(addProject({ name: inputProject, email }));
    } else {
      alert("invalid value");
    }
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div
            className={`container-fluid d-none d-md-flex vh-100 vw-100 ${cx(
              "warpper"
            )} `}
          >
            <div className="row h-100 w-100">
              <div
                className={`col-md-3 d-none d-md-flex flex-column ${cx(
                  "navbar"
                )}`}
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
                  {project.length ? (
                    project.map((project) => (
                      <h5
                        className={`${cx("project-name")} ${
                          project.id === projectSelected.id
                            ? cx("project-select")
                            : ""
                        }`}
                        key={project.id}
                        onClick={() => {
                          setEditTitle(false);
                          dispatch(setProjectSelected(project));
                          setInputTitle(project.name);
                        }}
                      >
                        {project.name}
                      </h5>
                    ))
                  ) : (
                    <></>
                  )}
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
              {projectSelected.name ? (
                <div className={`col-md-9 col-12 ${cx("project")}`}>
                  <h3 className="mb-3">
                    {editTitle ? (
                      <span>
                        <input
                          onChange={(e) => setInputTitle(e.target.value)}
                          value={inputTitle}
                          type="text"
                        />
                        <img
                          className="ms-3"
                          alt="save"
                          src="https://img.icons8.com/emoji/36/000000/check-mark-emoji.png"
                          onClick={() => {
                            dispatch(
                              saveProject([
                                projectSelected.id,
                                "name",
                                inputTitle,
                              ])
                            );
                            dispatch(loadProject({ email }));
                            setEditTitle(false);
                          }}
                        />
                      </span>
                    ) : (
                      <span>
                        {projectSelected.name}
                        <img
                          className="ms-3 pointer"
                          alt="edit name"
                          src="https://img.icons8.com/color/24/000000/edit--v1.png"
                          onClick={() => setEditTitle(true)}
                        />
                        <img
                          className="ms-2 pointer"
                          alt="delete"
                          src="https://img.icons8.com/color/24/000000/trash--v1.png"
                          onClick={() => {dispatch(deleteProject(projectSelected.id)); dispatch(loadProject({ email }))}}
                        />
                      </span>
                    )}

                  </h3>
                    <div className={cx("todos")}>
                        <GroupTodo
                          data={projectSelected.todo}
                          keyword="todo"
                          title="To do"
                        />
                        <GroupTodo
                          data={projectSelected.inprogress}
                          title="In progress"
                          keyword="inprogress"
                        />
                        <GroupTodo
                          data={projectSelected.completed}
                          title="Completed"
                          keyword="completed"
                        />
                    </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="d-md-none d-block">No support in mobile.</div>
        </>
      )}
    </>
  );
}
