import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_TASK, PUBLISH_TASK } from "../../utils/mutations";

const AddTask = ({ boardId, updateTasks }) => {
  const [addTask] = useMutation(ADD_TASK);
  const [publishTask] = useMutation(PUBLISH_TASK);

  const initialValues = {
    title: "",
    board_id: "Todo",
  };

  const saveItem = async (values) => {
    try {
      const {
        data: {
          createTask: { id: taskId },
        },
      } = await addTask({
        variables: {
          taskInput: {
            title: values.title,
            taskStatus: boardId,
          },
        },
      });
      await publishTask({
        variables: {
          taskId: taskId,
        },
      });
      // alert("Task added successfully");
      updateTasks();
      document.getElementById("add-task").close();
    } catch (error) {
      alert("Error adding task:", JSON.stringify(error));
    }
  };

  const submit = async (values) => {
    await saveItem(values);
  };

  return (
    <>
      <dialog id="add-task" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add task</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title is required"),
            })}
          >
            {({ isSubmitting, errors, touched, values, handleChange }) => (
              <Form className="space-y-3">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <Field
                      name="title"
                      placeholder="Title"
                      label="Title:"
                      className={`block w-full rounded-md border-0 px-3 py-1.5 font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                      ${
                        touched.title &&
                        errors.title &&
                        "border-2 border-red-600 leading-none"
                      }`}
                    />
                    {touched.title && errors.title && (
                      <span className="text-sm text-red-600">
                        {errors.title}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      name="board_id"
                      onChange={(event) => {
                        handleChange(event);
                        values.board_id = event.target.value;
                      }}
                      className="block w-full rounded-md border-0 px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In work">In work</option>
                      <option value="Done">Done</option>
                    </Field>
                  </div>
                </div>

                <div className="modal-action w-full pt-3">
                  <button
                    className="btn btn-outline btn-sm normal-case"
                    onClick={() => document.getElementById("add-task").close()}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline btn-primary btn-sm normal-case"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}{" "}
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </dialog>
    </>
  );
};

export default AddTask;
