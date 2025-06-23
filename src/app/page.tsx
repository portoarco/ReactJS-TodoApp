"use client";
import { useRef, useState } from "react";

export default function Home() {
  // membuat variabel penampung data
  const inTask = useRef<HTMLInputElement>(null);
  // buat variabel untuk penampung data dan checkbox
  const [data, setData] = useState<{ text: string; done: boolean }[]>([]);
  // Buat variabel untuk filter status all/active/completed
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "completed"
  >("all");

  // Fungsi filter status (expression func)

  const filteredData = data.filter((item) => {
    if (filterStatus === "active") return !item.done;
    if (filterStatus === "completed") return item.done;
    return true;
  });

  // User Klik Enter untuk tambah data
  function onSubmitEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    // Logical Operator

    if (event.key === "Enter" && inTask.current) {
      // console.log(inTask.current.value)
      const value = inTask.current.value.trim();
      if (!value) return;

      const filter = data.filter((item) => item.text === value);

      if (!filter.length) {
        setData([...data, { text: value, done: false }]);
        inTask.current.value = "";
      } else {
        alert("Periksa kembali data Anda");
      }
    }
  }

  function doneToggle(value: string) {
    const updatedData = data.map((item) =>
      item.text === value ? { ...item, done: !item.done } : item
    );

    setData(updatedData);
  }

  const itemLeft = data.filter((item) => !item.done).length;

  function clearCompleted() {
    const filtered = data.filter((item) => !item.done);
    setData(filtered);
  }

  return (
    <>
      <img
        src="/background.png"
        alt=""
        className="absolute top-0 w-full h-64 -z-10"
      />
      <div id="container" className="w-[34em] flex flex-col justify-center ">
        <div id="header" className="flex justify-between ">
          <h1 className="select-none">TODO</h1>
          <a href="#">
            <img src="/night.png" alt="" width={50} />
          </a>
        </div>

        {/* Add Task Feature */}
        <div id="add-task" className="flex align-middle gap-3">
          <input type="checkbox" id="checkbox-btn" />
          <input
            type="text"
            placeholder="Create a new todo..."
            spellCheck="false"
            className="caret-[#3A7CFD]"
            ref={inTask}
            onKeyDown={onSubmitEnter}
          />
        </div>

        {/* Task List Feature */}
        <div id="task-list" className="shadow-lg/20">
          <div id="task-list-show" className="flex flex-col justify-around">
            {filteredData.map(
              (item: { text: string; done: boolean }, index: number) => (
                <div
                  key={`${item}-${index}`}
                  className="flex gap-5 border-b-1 border-[#e3e4f1] p-5"
                >
                  <input
                    type="checkbox"
                    id="checkbox-btn"
                    onChange={() => doneToggle(item.text)}
                    checked={item.done}
                    className="ml-1.5"
                  />
                  <p
                    className={
                      item.done
                        ? "line-through text-gray-300 select-none"
                        : "select-none"
                    }
                  >
                    {item.text}
                  </p>
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 cursor-pointer items-end"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </button>
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <div
            id="task-list-footer"
            className="flex align-middle justify-between"
          >
            <div id="item-left">
              <p className="text-base">
                <span id="">{itemLeft}</span> task left
              </p>
            </div>
            <div id="sort-status">
              <ul className="flex align-middle justify-between gap-2 text-base">
                <li>
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={
                      filterStatus === "all"
                        ? "text-blue-600 font-bold"
                        : "cursor-pointer"
                    }
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilterStatus("active")}
                    className={
                      filterStatus === "active" ? "text-blue-600 font-bold" : ""
                    }
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilterStatus("completed")}
                    className={
                      filterStatus === "completed"
                        ? "text-blue-600 font-bold"
                        : ""
                    }
                  >
                    Completed
                  </button>
                </li>
              </ul>
            </div>
            <div id="clear-item" className="text-base">
              <button onClick={clearCompleted}>Clear Completed</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
