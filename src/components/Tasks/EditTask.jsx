import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { EDIT_TASK, PUBLISH_TASK } from "../../utils/mutations";

const EditTask = ({ task, toggleModal }) => {
  const [editTask] = useMutation(EDIT_TASK);
  const [publishTask] = useMutation(PUBLISH_TASK);

  const initialValues = {
    title: task.title,
    board_id: task.board_id,
  };

  const saveItem = async (values) => {
    try {
      editTask({
        variables: {
          taskId: task.id,
          taskInput: {
            title: values.title,
            taskStatus: values.board_id,
          },
        },
      });
      await publishTask({
        variables: {
          taskId: task.id,
        },
      });
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (values) => {
    await saveItem(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
        })}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form className="space-y-3 m-3">
            <div>
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
                  <span className="text-sm text-red-600">{errors.title}</span>
                )}
              </div>
            </div>

            <div>
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

            <button
              className="btn btn-outline btn-primary btn-sm normal-case mr-1"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="loading loading-spinner loading-sm "></span>
              )}{" "}
              Save
            </button>
            {/* </div> */}
            <button
              className="btn btn-outline btn-sm normal-case"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditTask;
