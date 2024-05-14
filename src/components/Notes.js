'use client'
import React, { useState } from "react";

const Notes = ({ notes ,setEditedCategory,handledelete}) => {
    const [title,setTitle]= useState(" ")
    const [description,setDescription]= useState(" ")
    // const [notes,setNotes]=useState([])
  return (
    <div>
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-col">
        {notes.length > 0 &&
          notes.map((e,i) => (
            <div key={i} className="rounded-lg border mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 flex justify-between items-center">
              <span> {e.title}</span>
              <span> {e.description}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditedCategory(e);
                    setTitle(e.title);
                    setDescription(e.description);
                    
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handledelete(e._id)}>Del</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
