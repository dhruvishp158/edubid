// import React, { Component } from "react";
// import io from "socket.io-client";
// import DropZone from "react-dropzone";
// import { getChats, afterPostMessage } from "../../actions/chat";
// import { connect } from "react-redux";
// import ChatCard from "./ChatCard";
// // import moment from "react-moment";
// import axios from "axios";
// export class Chat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chatMessage: "",
//     };
//   }
//   componentDidMount() {
//     let toId = this.props.match.params.toId;
//     const server = "http://localhost:7000";
//     this.props.dispatch(getChats(toId));
//     this.socket = io(server);
//     this.socket.on("Output chat message", (messageFromBackEnd) => {
//       this.props.dispatch(afterPostMessage(messageFromBackEnd));
//     });
//   }
//   componentDidUpdate() {
//     this.messageEnd.scrollIntoView({ behavior: "smooth" });
//   }
//   handleChange = (e) => {
//     this.setState({
//       chatMessage: e.target.value,
//     });
//   };
//   handleSubmit = (e) => {
//     e.preventDefault();
//     let chatMessage = this.state.chatMessage;
//     let userId = this.props.auth.user._id;
//     let tId = this.props.match.params.toId;
//     let name = this.props.auth.user.name;
//     let type = "Text";

//     this.socket.emit("Input chat message", {
//       chatMessage,
//       userId,
//       tId,
//       name,
//       type,
//     });

//     this.setState({
//       chatMessage: "",
//     });
//   };

//   renderCards = () => {
//     this.props.chats.chats &&
//       this.props.chats.chats.map((chat, i) => (
//         <ChatCard key={chat._id} chat={chat} user={chat.sender} />
//       ));
//   };
//   onDrop = async (files) => {
//     console.log(files);
//     let formData = new FormData();
//     const config = {
//       header: { "content-type": "multipart/form-data" },
//     };
//     formData.append("file", files[0]);
//     axios.post("/api/chat/uploadFiles", formData, config).then((res) => {
//       if (res.data.success) {
//         console.log(res.data.url);
//         let chatMessage = res.data.url;
//         let userId = this.props.auth.user._id;
//         let name = this.props.auth.user.name;
//         let type = "VideoOrImage";

//         this.socket.emit("Input chat message", {
//           chatMessage,
//           userId,
//           name,
//           type,
//         });
//       }
//     });
//   };
//   render() {
//     return (
//       <div>
//         <div>
//           <p style={{ fontSize: "2rem", textAlign: "center" }}>Chat</p>
//         </div>
//         <div style={{ maxWidth: "880px", margin: "0 auto" }}>
//           <div
//             className='infinite-container'
//             style={{ height: "500px", overflowY: "scroll" }}
//           >
//             {this.props.chats.chats &&
//               this.props.chats.chats.map((chat, i) => (
//                 <ChatCard key={chat._id} chat={chat} user={chat.sender} />
//               ))}
//             <div
//               ref={(el) => {
//                 this.messageEnd = el;
//               }}
//             ></div>
//             <div>
//               <DropZone onDrop={this.onDrop}>
//                 {({ getRootProps, getInputProps }) => (
//                   <section>
//                     <div {...getRootProps()}>
//                       <input {...getInputProps()} />
//                       <button>Drop here</button>
//                     </div>
//                   </section>
//                 )}
//               </DropZone>
//             </div>
//             <div>
//               <form onSubmit={(e) => this.handleSubmit(e)}>
//                 <input
//                   id='message'
//                   type='text'
//                   placeholder="Let's have a chat!"
//                   value={this.state.chatMessage}
//                   onChange={(e) => {
//                     this.handleChange(e);
//                   }}
//                 />

//                 <input type='submit' style={{ width: "100%" }} value='send' />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   chats: state.chat,
// });
// export default connect(mapStateToProps)(Chat);
// // import React from "react";

// // function Chat() {
// //   return <div>Chat</div>;
// // }

// // export default Chat;
import React, { Component } from "react";
import io from "socket.io-client";
import DropZone from "react-dropzone";
import { getChats, afterPostMessage } from "../../actions/chat";
import { connect } from "react-redux";
import ChatCard from "./ChatCard";
// import moment from "react-moment";
import axios from "axios";
export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
    };
  }
  componentDidMount() {
    let toId = this.props.match.params.toId;
    const server = "http://localhost:7000";
    this.props.dispatch(getChats(toId));
    this.socket = io(server);
    this.socket.on("Output chat message", (messageFromBackEnd) => {
      this.props.dispatch(afterPostMessage(messageFromBackEnd, toId));
    });
  }
  componentDidUpdate() {
    this.messageEnd.scrollIntoView({ behavior: "smooth" });
  }
  handleChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let chatMessage = this.state.chatMessage;
    let userId = this.props.auth.user._id;
    let tId = this.props.match.params.toId;
    let name = this.props.auth.user.name;
    let type = "Text";

    this.socket.emit("Input chat message", {
      chatMessage,
      userId,
      tId,
      name,
      type,
    });

    this.setState({
      chatMessage: "",
    });
  };

  // renderCards = () => {
  //   this.props.chats.chats &&
  //     this.props.chats.chats.map((chat, i) => (
  //       <ChatCard key={chat._id} chat={chat} user={chat.sender} />
  //     ));
  // };
  onDrop = async (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/chat/uploadFiles", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data.url);
        let chatMessage = res.data.url;
        let userId = this.props.auth.user._id;
        let name = this.props.auth.user.name;
        let type = "VideoOrImage";

        this.socket.emit("Input chat message", {
          chatMessage,
          userId,
          name,
          type,
        });
      }
    });
  };
  handleDiv = () => {
    let chats = this.props.chats.chats;
    console.log(chats);
    if (chats) {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {chats.friend && (
            <div className='user'>
              User
              {chats.friend.messages.map((message) => (
                <ChatCard
                  key={message._id}
                  chat={message}
                  user={this.props.auth}
                />
              ))}
            </div>
          )}
          {chats.user && (
            <div className='friends'>
              Friend
              {chats.user.messages.map((message) => (
                <ChatCard
                  key={message._id}
                  chat={message}
                  user={this.props.auth}
                />
              ))}
            </div>
          )}
        </div>
      );

      // if (chats.user && chats.friend) {
      //   console.log("both");
      //   return chats.friend.messages.map((message) => (
      //     <ChatCard key={message._id} chat={message} user={this.props.auth} />
      //   ));
      // } else if (chats.friend) {
      //   return chats.friend.messages.map((message) => (
      //     <ChatCard key={message._id} chat={message} user={this.props.auth} />
      //   ));
      // } else if (chats.user) {
      //   return chats.user.messages.map((message) => (
      //     <ChatCard key={message._id} chat={message} user={this.props.auth} />
      //   ));
      // }
    }
  };
  render() {
    return (
      <div>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>Chat</p>
        </div>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div
            className='infinite-container'
            style={{ height: "500px", overflowY: "scroll" }}
          >
            {/* {this.props.chats.chats &&
              this.props.chats.chats.map((chat, i) =>
                chat.messages.map((message) => (
                  <ChatCard
                    key={chat._id}
                    chat={message}
                    user={this.props.auth}
                  />
                ))
              )} */}
            {this.handleDiv()}
            <div
              ref={(el) => {
                this.messageEnd = el;
              }}
            ></div>
            <div>
              <DropZone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button>Drop here</button>
                    </div>
                  </section>
                )}
              </DropZone>
            </div>
            <div>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                  id='message'
                  type='text'
                  placeholder="Let's have a chat!"
                  value={this.state.chatMessage}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />

                <input type='submit' style={{ width: "100%" }} value='send' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chats: state.chat,
});
export default connect(mapStateToProps)(Chat);
