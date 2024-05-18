import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditModal from "./components/EditModal";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [id, setId] = useState();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/v1/tasks");
      const data = await response.data;
      const sortedTask = data.tasks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTasks(sortedTask);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/tasks", { name });
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      fetchData();
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
    }
  };

  const handleModal = (id) => {
    document.getElementById("my_modal_1").showModal();
    setId(id);
  };

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <div className="card card-bordered p-5 bg-base-300 w-full sm:w-[450px] flex flex-col gap-5">
        <h1 className="text-center text-2xl font-bold">Task Manager</h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input w-full"
          />
          <button className="btn text-3xl">+</button>
        </form>
      </div>

      {error && <p className="p-5">Something went wrong!</p>}

      {isLoading && <p className="p-5">Loading...</p>}

      <div className="flex flex-col gap-3 w-full mt-10 justify-center items-center">
        {tasks?.map((task) => (
          <div
            key={task._id}
            className=" p-5 bg-base-300 w-full sm:w-[450px] flex justify-between items-center rounded-md"
          >
            <h3 className={`${task.completed ? "line-through" : ""}`}>
              {" "}
              {task.name}{" "}
            </h3>
            <div className="flex gap-3">
              <button onClick={() => handleModal(task._id)}>
                <FaRegEdit size={20} />
              </button>

              <button onClick={() => handleDeleteTask(task._id)}>
                <MdDeleteOutline size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal- initially hidden */}
      <EditModal id={id} fetchData={fetchData} />
    </div>
  );
};

export default App;
