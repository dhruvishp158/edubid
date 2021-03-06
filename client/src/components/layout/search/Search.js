import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { GET_SEARCH_RESULT } from "../../../actions/types";
import { connect } from "react-redux";
import SearchItem from "./SearchItem";
import uuid from "react-uuid";

const Search = (props) => {
  const [text, setText] = useState("");

  const handleChange = async (e) => {
    setText(e.target.value);
    let search = e.target.value;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let res = await axios.post("/api/profile/search", { search }, config);
    props.dispatch({ type: GET_SEARCH_RESULT, payload: res.data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("");
  };

  return (
    <div>
      <form
        className='form-inline my-2 my-lg-0'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{ display: "block" }}
      >
        <input
          className='form-control form-control-sm mr-3 w-75'
          type='search'
          name='search'
          placeholder='Search for courses'
          autoComplete='off'
          aria-label='Search'
          style={{ color: "white" }}
          onChange={handleChange}
        />
        <i className='fas fa-search' aria-hidden='true'></i>
      </form>
      <div
        style={{
          width: "200px",
          height: "auto",
          background: "#f1f1f1",
          color: "black",
          position: "absolute",
          zIndex: "200",
        }}
      >
        {props.data.found &&
          props.data.found.map((result) => (
            <SearchItem key={uuid()} data={result} />
          ))}
      </div>
    </div>
  );
};

Search.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.search,
});
export default connect(mapStateToProps)(Search);
