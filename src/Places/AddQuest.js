import Modal from "../components/Modal";
import { useState } from "react";
import "../css/addQuest.css";
import { db } from "../firebase";
import { collection, addDoc, doc, Timestamp } from "firebase/firestore";

function AddQuest({ onClose, open, id }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "aventuriers", id, "quests"), {
        name: name,
        completed: false,
        userId: id,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Quest" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addQuest" name="addQuest">
        <input
          type="text"
          name="title"
          onChange={(e) => setName(e.target.value.toUpperCase())}
          value={name}
          placeholder="Enter quest name"
        />
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddQuest;
