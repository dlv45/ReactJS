import React, { useEffect } from "react";
import "./style.scss";
import Task from "../Tasks";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { actFetchAllTask } from "../../redux/features/tasks/taskSlice";

const MainContentTask = (props) => {
  const dispatch = useDispatch();
  const { isLoading, tasks } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(actFetchAllTask());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTask = (tasks) => {
    return tasks.map((task) => {
      return <Task key={task.id} task={task} />;
    });
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="main-content-wrapper">
      <div className="main-content-task">
        {tasks.length === 0 ? (
          <i style={{ paddingLeft: "0px" }}>No tasks </i>
        ) : (
          renderTask(tasks)
        )}
      </div>
    </div>
  );
};

export default MainContentTask;
