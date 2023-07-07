import { Button, Input } from "antd";
import "./style.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { actCreateNewTask } from "../../redux/features/tasks/taskSlice";

const schema = Yup.object().shape({
  taskName: Yup.string().required("Please Input Title"),
  description: Yup.string().required("Please Input Description"),
});
const TaskForm = ({ isDetail = false, currentTask }) => {
  const dispatch = useDispatch();
  //   const navigte = useNavigate;
  const methods = useForm({
    defaultValues: {
      taskName: "",
      createAt: new Date(),
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onValid = (formValue) => {
    dispatch(actCreateNewTask(formValue));
  };

  return (
    <div className="task-form-wrapper">
      <form className="task-form-container" onSubmit={handleSubmit(onValid)}>
        <div className="task-form">
          <label className="task-form__label">Task Name: </label>
          <Controller
            control={control}
            name="taskName"
            render={({ field }) => {
              return <Input placeholder="Please input Task Name!" {...field} />;
            }}
          />
        </div>
        {!!errors.taskName?.message && (
          <i style={{ color: "red" }} className="valid">
            {errors.taskName?.message}
          </i>
        )}
        <div className="task-form">
          <label className="task-form__label">Description: </label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return (
                <Input placeholder="Please input Description!" {...field} />
              );
            }}
          />
        </div>
        {!!errors.description?.message && (
          <i style={{ color: "red" }} className="valid">
            {errors.description?.message}
          </i>
        )}
        <div className="task-form-btn">
          <Button htmlType="submit" onSubmit={handleSubmit(onValid)}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
