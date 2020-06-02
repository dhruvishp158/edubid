import React from "react";

function ChatCard(props) {
  console.log(props.chat);
  return (
    <div style={{ width: "90%" }}>
      <span>{props.user.user.name}</span>
      {props.chat.text.substring(0, 7) === "uploads" ? (
        <div>
          {props.chat.text.substring(props.chat.text.length - 3) === "mp4" ? (
            <video
              src={`http://localhost:3000/${props.chat.text}`}
              typeof='video/mp4'
              controls
              style={{ width: "300px", height: "300px" }}
            />
          ) : (
            <img
              src={`http://localhost:3000/${props.chat.text}`}
              style={{ width: "300px", height: "300px" }}
              alt=''
            />
          )}
        </div>
      ) : (
        <p style={{ fontWeight: "500" }}>{props.chat.text}</p>
      )}
    </div>
  );
}

export default ChatCard;
// import React from "react";

// function ChatCard(props) {
//   console.log(props.chat);
//   return (
//     <div style={{ width: "90%" }}>
//       <span>{props.user.user.name}</span>
//       {props.chat.text.substring(0, 7) === "uploads" ? (
//         <div>
//           {props.chat.text.substring(props.chat.messages.text.length - 3) ===
//           "mp4" ? (
//             <video
//               src={`http://localhost:3000/${props.chat.messages.text}`}
//               typeof='video/mp4'
//               controls
//               style={{ width: "300px", height: "300px" }}
//             />
//           ) : (
//             <img
//               src={`http://localhost:3000/${props.chat.messages.text}`}
//               style={{ width: "300px", height: "300px" }}
//               alt=''
//             />
//           )}
//         </div>
//       ) : (
//         <p style={{ fontWeight: "500" }}>{props.chat.message}</p>
//       )}
//     </div>
//   );
// }

// export default ChatCard;
