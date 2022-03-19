import "../css/quest.css";
import { useState } from "react";
import QuestItem from "./QuestItem";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function Quest({ id, name, completed, userId }) {
  console.log(name);

  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const questDocRef = doc(db, "aventuriers", userId, "quests", id);
    try {
      await updateDoc(questDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const questDocRef = doc(db, "aventuriers", userId, "quests", id);
    try {
      await deleteDoc(questDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`quest ${checked && "quest--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="quest__body">
        <h2>{name}</h2>
        <div className="quest__buttons">
          <div className="quest__deleteNedit">
            <button className="quest__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <QuestItem onClose={handleClose} name={name} open={open.view} />
      )}
    </div>
  );
}

export default Quest;
