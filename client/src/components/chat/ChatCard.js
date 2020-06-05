import React, { useEffect } from "react";
import Moment from "react-moment";
import axios from "axios";
import { GET_RECEIVER_PROFILE } from "../../actions/types";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
function ChatCard(props, { getProfileById }) {
  // const getToProfile = async () => {
  //   let res = await axios.get(`/api/profile/user/${props.to}`);
  //   props.dispatch({ type: GET_RECEIVER_PROFILE, payload: res.data });
  // };
  console.log(props);
  useEffect(() => {
    // getToProfile();
    props.getProfileById(props.to);
  }, [getProfileById, props.to]);

  const leftStyle = {
    textAlign: "left",
    paddingLeft: "1rem",
    maxWidth: "700px",
  };
  const rightStyle = {
    textAlign: "right",
    paddingRight: "1rem",
  };

  let fixStyle;
  const checkStyle = () => {
    if (props.chat.id === props.user.user._id) {
      return (fixStyle = leftStyle);
    } else {
      return (fixStyle = rightStyle);
    }
  };
  const forToProfile = () => {
    if (props.toProfile.profile) {
      if (props.toProfile.profile.user) {
        return props.toProfile.profile.user.name;
      }
    }
  };
  return (
    <div style={checkStyle()}>
      {props.chat.id === props.user.user._id && forToProfile() ? (
        <div style={{ margin: "1rem 0", color: "white" }}>
          <span>{props.user.user.name}</span>
        </div>
      ) : (
        <div style={{ margin: "1rem 0" }}>
          <span style={{ color: "white" }}> {forToProfile()}</span>
        </div>
      )}
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
        <div>
          <p
            style={{
              fontWeight: "500",
              fontSize: "1.2rem",
              padding: "10px 7px",
              borderRadius: "1rem",
              background: "white",
              width: "fit-content",
              display: "inline-block",
            }}
          >
            {props.chat.text}
          </p>
          <span
            style={{
              display: "inline-block",
              marginLeft: "1rem",
              color: "grey",
            }}
          >
            <Moment fromNow>{props.chat.date}</Moment>
          </span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  toProfile: state.profile,
});
export default connect(mapStateToProps, { getProfileById })(ChatCard);
