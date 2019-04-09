import React from "react";
import PropTypes from "prop-types";
import {
  ContractData,
  ContractForm
} from "drizzle-react-components";
import ContractCallForm from "./ContractCallForm";

export default class UIGenerator extends React.Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateUI = this.generateUI.bind(this);
  }

  handleSubmit() {
    alert('It worked!');
  }

  generateUI() {
    return (
      Object.keys(this.contracts).map(contract => {
        return this.contractUI(this.contracts[contract]);
      })
    );
  }

  contractUI(contract) {
    return (
      <div className="contractSection">
        <h3>{contract.contractName}</h3>

        {contract.abi.map(node => {
          if (node.type !== "event" && node.type !== "constructor") {
            if (node.constant && node.inputs.length === 0) {
              return (
                <div>
                  <p><strong>{node.name}</strong></p>
                  <ContractData contract={contract.contractName} method={node.name} />
                </div>
              )
            }

            if (node.constant && node.inputs.length > 0) {
              return (
                <div>
                  <p><strong>{node.name}</strong></p>
                  <ContractCallForm contract={contract.contractName} method={node.name} />
                </div>
              )
            }

            return (
              <div>
                <p><strong>{node.name}</strong></p>
                <ContractForm contract={contract.contractName} method={node.name} />
              </div>
            )
          }

          return ("")
        })}
      </div>
    );
  }

  render() {
    let theUI = this.generateUI();

    return (
      <div>
        <div className="section">
          {theUI}
        </div>
      </div>
    );
  }
}

UIGenerator.contextTypes = {
  drizzle: PropTypes.object
}