import React from 'react';
import "./Setting.css"
import PropTypes from "prop-types";

function Setting(props) {
    return (
        <span className="setting">
            <label>{props.label}</label>
            {props.children}
        </span>
    );
}

Setting.propTypes = {
    label: PropTypes.string
}

export default Setting;