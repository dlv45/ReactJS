import { Button } from "antd";
import "./style.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routers";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import {
  actDeleteTaskById,
  actFetchAllTask,
} from "../../redux/features/tasks/taskSlice";

const Task = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirectToDetailPage = () => {
    const taskId = props.task.id;
    navigate(generatePath(ROUTES.DETAIL_TASK, { id: taskId }));
  };

  const handleDeleteTaskById = async () => {
    await dispatch(actDeleteTaskById(props.task.id));
    dispatch(actFetchAllTask());
  };

  return (
    <div className="task-wrapper">
      <div className="task-container">
        <div className="task-container__task-name">
          <b>Task Name: </b>
          {props.task.taskName}
        </div>
        <div className="task-container__create-at">
          <b>Create At: </b>
          {format(new Date(), "yyyy-MM-dd HH:mm")}
        </div>
        <div className="task-container__description">
          <b>Description: </b> {props.task.description}
        </div>
        <div className="task-container__group-btn">
          <Button onClick={handleRedirectToDetailPage}>Detail</Button>
          <Button onClick={handleDeleteTaskById}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
