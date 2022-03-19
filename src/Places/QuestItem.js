import Modal from "../components/Modal";
import "../css/questItem.css";

function QuestItem({ onClose, open, questName }) {
  return (
    <Modal modalLable="Quest Item" onClose={onClose} open={open}>
      <div className="questItem">
        <h2>{questName}</h2>
      </div>
    </Modal>
  );
}

export default QuestItem;
