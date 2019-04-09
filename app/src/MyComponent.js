import React from "react";
import {
  /*AccountData,
  ContractData,
  ContractForm,*/
} from "drizzle-react-components";

import logo from "./logo.png";
import UIGenerator from "./UIGenerator";
import LogsContainer from "./LogsContainer";

export default ({ accounts }) => (
  <div className="App">
    <div className="mainContainer">
      <div>
        <h1><img src={logo} alt="drizzle-logo" /> Contract UI Generator</h1>
        <p>Generates a smart contract UI using a Truffle project &amp; Drizzle.</p>
      </div>

      {/*<div className="section">
        <h2>Active Account</h2>
        <AccountData accountIndex={0} units="ether" precision={3} />
      </div>*/}

      <UIGenerator />
    </div>

    <LogsContainer account={accounts[0]} />
  </div>
);
