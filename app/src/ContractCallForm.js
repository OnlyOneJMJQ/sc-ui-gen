import { drizzleConnect } from "@drizzle/store";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContractData } from "@drizzle/react-components";

class ContractCallForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {
      methodInputs: []
    };

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = initialState;
  }

  handleSubmit(event) {
    event.preventDefault();

    const convertedInputs = this.inputs.map((input, index) => {
      if (input.type === 'bytes32') {
        return this.utils.toHex(this.state[input.name])
      }
      return this.state[input.name];
    });

    this.setState({ methodInputs: [...convertedInputs] });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch (true) {
      case /^uint/.test(type):
        return "number";
      case /^string/.test(type) || /^bytes/.test(type):
        return "text";
      case /^bool/.test(type):
        return "checkbox";
      default:
        return "text";
    }
  }

  render() {
    let syncedData = "";

    if (this.state.methodInputs.length) {
      syncedData = <ContractData contract={this.props.contract} method={this.props.method} methodArgs={this.state.methodInputs} />
    }

    return (
      <div>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
          {this.inputs.map((input, index) => {
            var inputType = this.translateType(input.type);
            var inputLabel = this.props.labels
              ? this.props.labels[index]
              : input.name;
            // check if input type is struct and if so loop out struct fields as well
            return (
              <input
                key={input.name}
                type={inputType}
                name={input.name}
                value={this.state[input.name]}
                placeholder={inputLabel}
                onChange={this.handleInputChange}
              />
            );
          })}
          <button
            key="submit"
            className="pure-button"
            type="button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
        {syncedData}
      </div>
    );
  }
}

ContractCallForm.contextTypes = {
  drizzle: PropTypes.object,
};

ContractCallForm.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  sendArgs: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.string),
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(ContractCallForm, mapStateToProps);
