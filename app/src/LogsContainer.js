import React from "react";
import PropTypes from "prop-types";

export default class LogsContainer extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      logs: []
    };

    this.web3 = context.drizzle.web3;
    this.contracts = context.drizzle.contracts;

    this.subscription = this.web3.eth.subscribe('logs', {
      address: Object.keys(this.contracts).map(contract => this.contracts[contract].address),
      topics: null
    })
    .on("data", (log) => {
      console.log(log);

      this.setState(prevState => ({
        logs: [log, ...prevState.logs]
      }));
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe((error, success) => {
      if(success)
          console.log('Successfully unsubscribed!');
    });
  }

  render() {
    return (
      <div className="logsContainer">
        <h2>Logs</h2>
        {this.state.logs.map(log => {
          return (
            <ul>{Object.keys(log).map(logProp => {
              return (
                <li><strong>{logProp}</strong>: {log[logProp]}</li>
              )
            })}</ul>
          )
        })}
      </div>
    );
  }
}

LogsContainer.contextTypes = {
  drizzle: PropTypes.object
}