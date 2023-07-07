import React from "react";
import "./style.scss";
import TaskForm from "../../Components/TaskForm";
import { Outlet } from "react-router-dom";
import MainContentTask from "../../Components/MainContentTask";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div className="title">CHECK TASK</div>
      <TaskForm />
      <MainContentTask />
      <div className="right-side">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
