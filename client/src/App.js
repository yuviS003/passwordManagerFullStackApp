import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showPasswords").then((res) => {
      console.log(res.data);
      setPasswordList(res.data);
    });
  }, []);

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password,
      title,
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((res) => {
      console.log(res.data);
      setPasswordList(
        passwordList.map((val) => {
          return val.id === encryption.id
            ? {
                id: val.id,
                password: val.id,
                title: res.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ex. Facebook"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addPassword}>Add Password</button>
      </div>
      <div className="Passwords">
        {passwordList.map((password, index) => {
          return (
            <div
              className="password"
              key={index}
              onClick={() => decryptPassword(password)}
            >
              <h3>{password.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
