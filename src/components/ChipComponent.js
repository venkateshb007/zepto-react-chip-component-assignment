import React, { useState, useEffect, useRef } from "react";

import "./ChipComponent.css";

import Pic1 from "../assets/pic1.jpg";
import Pic2 from "../assets/pic2.jpg";
import Pic3 from "../assets/pic3.jpg";
import Pic4 from "../assets/pic4.jpg";
import Pic5 from "../assets/pic5.jpg";
import Pic6 from "../assets/pic6.jpg";
import Pic7 from "../assets/pic7.jpg";
import Pic8 from "../assets/pic8.jpg";
import Pic9 from "../assets/pic9.jpg";
import Pic10 from "../assets/pic10.jpg";

const images = {
  "Nick Harry": Pic1,
  "Narayan Gamer": Pic2,
  "Anita Gros": Pic3,
  "Megan Smith": Pic4,
  "John Snow": Pic5,
  "Jack Sparrow": Pic6,
  "Alce Johon": Pic7,
  "Bob Smith": Pic8,
  "Gagan": Pic9,
  "Raj": Pic10,
};

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [users, setUsers] = useState([
    { name: "Nick Harry", email: "nick@example.com" },
    { name: "Narayan Gamer", email: "narayan@example.com" },
    { name: "Anita Gros", email: "anita@example.com" },
    { name: "Megan Smith", email: "megan@example.com" },
    { name: "John Snow", email: "john@exampl.com" },
    { name: "Jack Sparrow", email: "jack@eample.com" },
    { name: "Alce Johon", email: "ale@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Gagan", email: "gagan@exale.com" },
    { name: "Raj", email: "raj@exale.com" },
  ]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowAllUsers(false);
  };

  const handleItemClick = (user) => {
    setChips([...chips, user]);
    setUsers(users.filter((u) => u !== user));
    setInputValue("");
    setShowAllUsers(false);
    setDropdownVisible(false);
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((c) => c !== chip));
    setUsers([...users, chip]);
  };

  const handleBackspace = (e) => {
    if (e.key === "Backspace" && inputValue === "") {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        setChips(chips.filter((c) => c !== lastChip));
        setUsers([...users, lastChip]);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.email.toLowerCase().includes(inputValue.toLowerCase())
  );

  const renderChips = () => {
    return (
      <div className="chips">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="chip"
            onClick={() => handleChipRemove(chip)}
          >
            {chip && chip.name ? (
              <div className="chip-info">
                <img
                  src={images[chip.name]}
                  alt={chip.name}
                  className="chip-pic"
                />
                <span>{chip.name}</span>
                <span
                  className="chip-remove"
                  onClick={() => handleChipRemove(chip)}
                >
                  X
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const renderDropdownItems = () => {
    return filteredUsers.length > 0 ? (
      filteredUsers.map((user, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={() => handleItemClick(user)}
        >
          <div className="user-info">
            <div
              className="user-pic"
              style={{ backgroundImage: `url(${images[user.name]})` }}
            ></div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="dropdown-item not-found">
        User not found in the list
      </div>
    );
  };

  return (
    <div className="box-container">
      <div className="box">
        <h1 className="headline">Pick User</h1>
  
        {renderChips()}
  
        <div className="dropdown-container" ref={dropdownRef}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleBackspace}
            placeholder="Add User"
            className={`input ${showAllUsers ? "border-none" : ""}`}
            onClick={() => {
              setDropdownVisible(true);
              setShowAllUsers(true);
            }}
          />
          <div className="hr-line"></div> {/* Horizontal purple line */}
          
          {(inputValue || showAllUsers) && dropdownVisible && (
            <div
              className="dropdown"
              style={{ maxHeight: "150px", overflowY: "auto" }}
            >
              {renderDropdownItems()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;
