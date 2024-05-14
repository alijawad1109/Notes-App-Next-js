"use client";
import Button from "@/components/Button";
import Notes from "@/components/Notes";
import PopupForm from "@/components/PopupForm";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(); // Ref to track the form DOM element
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  function closeForm() {
    setShowForm(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the form is visible and if the clicked target is not within the form element
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    }
    // Add the event listener if the form is shown
    if (showForm) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener when the form is closed or the component unmounts
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]); // Dependency on showForm to add/remove the event listener correctly

  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <Button onClick={toggleForm} />  
          {showForm && (
            <div ref={formRef}>
              <PopupForm />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
