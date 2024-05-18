/* eslint-disable react/prop-types */
import { baseURL } from "../constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const EditModal = ({ id, fetchData }) => {
  const [name, setName] = useState();
  const [completed, setCompleted] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await axios.get(`${baseURL}/api/v1/tasks/${id}`);
        const data = await response.data;
        setName(data.task.name);
        setCompleted(data.task.completed);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = async () => {
    try {
      await axios.patch(`/api/v1/tasks/${id}`, { name, completed });
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box px-10 pt-16">
        {name && (
          <input
            className="input input-bordered"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <div className="flex gap-5 items-center mt-5">
          <label htmlFor="completed">Completed</label>
          {completed !== undefined && (
            <input
              id="completed"
              className="checkbox size-5"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          )}
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button onClick={handleEdit} className="btn">
              Edit
            </button>
          </form>

          <form method="dialog">
            {/* Close */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
