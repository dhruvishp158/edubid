import React, { Component } from "react";
import io from "socket.io-client";
import DropZone from "react-dropzone";
import { getChats, afterPostMessage } from "../../actions/chat";
import { connect } from "react-redux";
import ChatCard from "./ChatCard";
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

  onDrop = async (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/chat/uploadFiles", formData, config).then((res) => {
      if (res.data.success) {
        let chatMessage = res.data.url;
        let userId = this.props.auth.user._id;
        let tId = this.props.match.params.toId;
        let name = this.props.auth.user.name;
        let type = "VideoOrImage";

        this.socket.emit("Input chat message", {
          chatMessage,
          userId,
          tId,
          name,
          type,
        });
      }
    });
  };
  handleDiv = () => {
    let chats = this.props.chats.chats;

    if (chats) {
      return chats.map((message) => (
        <ChatCard
          key={message._id}
          chat={message}
          user={this.props.auth}
          to={this.props.match.params.toId}
        />
      ));
    }
  };

  render() {
    return (
      <div>
        <a
          className='btn btn-primary'
          href='/'
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          GO BACK TO PROFILE
        </a>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>Chat</p>
        </div>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            className='infinite-container'
            style={{
              height: "700px",
              overflowY: "scroll",
              background: "black",
              padding: "1rem",
              style: "relative",
            }}
          >
            {this.handleDiv()}
            <div
              ref={(el) => {
                this.messageEnd = el;
              }}
            ></div>

            <div>
              <form
                onSubmit={(e) => this.handleSubmit(e)}
                style={{
                  margin: "2rem 1rem",
                }}
              >
                <div className='input-group'>
                  <div className='input-group-append'>
                    <DropZone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />{" "}
                          <span
                            className='input-group-text attach_btn'
                            style={{
                              width: "45.5px",
                              height: "44.5px",
                              borderRadius: "50%",
                              padding: "1rem",
                              marginRight: "1rem",
                              fontWeight: "bold",
                              background: "white",
                            }}
                          >
                            <i className='fas fa-paperclip'></i>
                          </span>
                        </div>
                      )}
                    </DropZone>
                  </div>
                  <input
                    id='message'
                    name=''
                    className='form-control type_msg'
                    placeholder='Type your message...'
                    value={this.state.chatMessage}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    style={{
                      paddingLeft: "1rem",
                      background: "white",
                      height: "44.5px",
                      borderRadius: "2rem",
                    }}
                  />
                  <button
                    type='submit'
                    className='input-group-text send_btn'
                    style={{
                      height: "44.5px",
                      borderRadius: "50%",
                      padding: "1rem",
                      marginLeft: "1rem",
                      background: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <i className='fas fa-location-arrow'></i>
                  </button>
                  <div className='input-group-append'></div>
                </div>
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
