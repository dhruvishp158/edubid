import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Search = (props) => {
  const [text, setText] = useState("");
  return (
    <div>
      <form
        className='form-inline '
        onSubmit={(e) => {
          // e.preventDefault();
          console.log(text);
          // let search = text;
          const config = {
            Params: {
              search: text,
            },
          };
          let res = axios.get("/api/profile/search");
          console.log(res.data);
        }}
      >
        <input
          className='form-control form-control-sm mr-3 w-75'
          type='search'
          name='search'
          placeholder='Search for courses'
          aria-label='Search'
          style={{ color: "white" }}
          onKeyUp={(e) => setText(e.target.value)}
        />
        <i className='fas fa-search' aria-hidden='true'></i>
      </form>
    </div>
  );
};

Search.propTypes = {};

export default Search;
