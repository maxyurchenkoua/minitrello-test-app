import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const EditTask = ({ title }) => {
  const initialValues = {
    title: title,
  };

  const submit = async (values) => {
    // await saveItem(values);
    alert("Saved!");
    console.log(values);
  };

  return (
    <>
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title is required"),
            })}
          >
            {({ isSubmitting, errors, touched }) => (
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
                <div className="modal-action w-full pt-3">
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

export default EditTask;
