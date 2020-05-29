import React from "react";

function ChatCard(props) {
  return (
    <div style={{ width: "90%" }}>
      <span>{props.chat.sender.name}</span>
      {props.chat.message.substring(0, 7) === "uploads" ? (
        <div>
          {props.chat.message.substring(props.chat.message.length - 3) ===
          "mp4" ? (
            <video
              src={`http://localhost:3000/${props.chat.message}`}
              typeof='video/mp4'
              controls
              style={{ width: "300px", height: "300px" }}
            />
          ) : (
            <img
              src={`http://localhost:3000/${props.chat.message}`}
              style={{ width: "300px", height: "300px" }}
              alt=''
            />
          )}
        </div>
      ) : (
        <p style={{ fontWeight: "500" }}>{props.chat.message}</p>
      )}
    </div>
  );
}

export default ChatCard;
