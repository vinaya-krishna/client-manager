import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetail extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };
    this.setState({ balanceUpdateAmount: "" });
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  onDelete = () => {
    const { client, firestore } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(this.props.history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="New Amount"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    this.doAction = () => {
      console.log("Call");
    };

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3>
                    Balance: $
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0
                      })}
                    >
                      {parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <i
                        className="fas fa-pencil-alt"
                        onClick={() => {
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          });
                        }}
                      />
                    </small>
                  </h3>
                  {/* @todo : balance update */}
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email : {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone : {client.phone}
                </li>
              </ul>
            </div>
          </div>
          <button className="btn btn-warning mt-2" onClick={this.doAction}>
            Send Remainder
          </button>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetail.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetail);
