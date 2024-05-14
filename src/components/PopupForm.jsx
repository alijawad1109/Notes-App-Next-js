"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Notes from "./Notes";

const PopupForm = () => {
  const [description, setDescription] = useState(" ");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  useEffect(() => {
    fetchNotes();
  }, []);
  async function fetchNotes() {
    const res = await fetch("/api/notes");
    if (res.ok) {
      const data = await res.json();
      setNotes(data);
    } else {
      // Handle errors or unexpected responses
      console.error("Failed to fetch categories");
    }
  }
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditedCategory(null);
  };
  const handledelete = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/notes?_id=" + _id, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error in deleting",
    });
    fetchNotes();
    resetForm();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { description , title };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const res = await fetch("/api/notes", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setTitle(" ");
      setDescription(" ");
      fetchNotes();
      setEditedCategory(" ");
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(creationPromise, {
      loading: editedCategory ? "Updated  Note" : "Creating your note...",
      success: editedCategory ? "Updated Successfully!" : "Note created...",
      error: "Error in creating note...",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div class="bg-white border border-slate-200 grid grid-cols-6 w-[300px] gap-2 rounded-xl p-2 text-sm">
          <h1 class="text-center text-slate-200 text-xl font-bold col-span-6">
          <label>
                {editedCategory ? "Update Note" : "New Note"}{" "}
                {editedCategory && (
                  <>
                    {" "}
                    : <b>{editedCategory.title}</b>
                  </>
                )}
              </label>
          </h1>
          <textarea
            rows={2}
            type="text"
            placeholder="Your title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-100 text-slate-600 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 flex outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
          ></textarea>
          <span class="col-span-2"></span>
          <textarea
            placeholder="Your note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
          ></textarea>
          <div className=" flex gap-3">
            <button
              className="relative inline-flex items-center justify-center p-3 text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-r from-purple-700 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white dark:focus:ring-blue-800 w-[100px]"
              disabled={!title.trim() && !description.trim()}
            >
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              onClick={() => {
                setEditedCategory(null);
                setTitle("");
                setDescription("")
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <Notes
        notes={notes}
        setEditedCategory={setEditedCategory}
        handledelete={handledelete}
      />
    </>
  );
};

export default PopupForm;
