import React, { useEffect } from "react";
import "./style.scss";
import Task from "../../Components/Tasks";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { actFetchTaskById } from "../../redux/features/tasks/taskSlice";
import { ROUTES } from "../../constants/routers";

const DetailPage = (props) => {
  const task = useSelector((state) => state.task.currentTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(actFetchTaskById(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const handleRedirectToHomePage = () => {
    navigate(generatePath(ROUTES.HOME_NEW));
  };

  return (
    <div className="detail-task-container">
      <div className="detail-task-container__content">
        <Task task={task} />
        <div>
          <Button onClick={handleRedirectToHomePage}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
