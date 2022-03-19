import "../css/dashboard.css";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Quest from "./Quest";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { db, logout, auth } from "../firebase";
import AddQuest from "./AddQuest";

const Dashboard = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [quests, setQuests] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    if (userId) {
      console.log(userId);
      const questColRef = query(
        collection(db, "aventuriers", userId, "quests")
      );
      onSnapshot(questColRef, (snapshot) => {
        console.log(snapshot.docs);
        setQuests(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [userId]);

  const fetchUserName = async () => {
    try {
      const q = query(
        collection(db, "aventuriers"),
        where("uid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserId(data.uid);

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="questManager">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Quest tracker... 2!
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="questManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add quest +</button>
        <div className="questManager__quests">
          {quests &&
            quests.map((quest) => (
              <Quest
                id={quest.id}
                key={quest.id}
                userId={quest.data.userId}
                completed={quest.data.completed}
                name={quest.data.name}
              />
            ))}
        </div>
      </div>

      {openAddModal && (
        <AddQuest
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
          id={userId}
        />
      )}
    </div>
  );
};

export default Dashboard;
