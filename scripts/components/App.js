"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var App = _react2["default"].createClass({
  displayName: "App",

  render: function render() {
    var codeBlockStyle = { "fontFamily": "monospace",
      "backgroundColor": "#D0D0D0" };
    return _react2["default"].createElement(
      "div",
      null,
      _react2["default"].createElement(
        "header",
        null,
        _react2["default"].createElement(
          "h1",
          null,
          "react"
        ),
        _react2["default"].createElement(
          "h3",
          null,
          "A React/Flux app generate by RF, powered with Babel"
        )
      ),
      _react2["default"].createElement(
        "article",
        { className: "context" },
        _react2["default"].createElement(
          "p",
          null,
          "Greeting form ",
          _react2["default"].createElement(
            "a",
            { href: "https://github.com/taiansu/generator-rf" },
            "RF generator"
          ),
          "."
        ),
        _react2["default"].createElement(
          "p",
          null,
          "Remember you are powered with ",
          _react2["default"].createElement(
            "a",
            { href: "https://gaearon.github.io/react-hot-loader/" },
            "react-hot-loader"
          ),
          " now. Edit this file in ",
          _react2["default"].createElement(
            "span",
            { style: codeBlockStyle },
            "src/scripts/components/App.js"
          ),
          " and save it, it will auto reload the page for you."
        ),
        _react2["default"].createElement(
          "h2",
          null,
          "123"
        )
      )
    );
  }
});

module.exports = App;
//# sourceMappingURL=/Users/PastLeo/GDrive/PastLeoClouDisk/ITData/workspace/TestTryLearn/react/scripts/components/App.js.map