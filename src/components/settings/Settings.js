import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableActionOnAdd,
  setDisableActionOnEdit
} from "../../actions/settingsActions";

class Settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setDisableActionOnAdd } = this.props;
    setDisableActionOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableActionOnEdit } = this.props;
    setDisableActionOnEdit();
  };
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link className="btn btn-link" to="/">
              <i className="fas fa-arrow-circle-left" />
              Back
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>
                {}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  onChange={this.allowRegistrationChange}
                  checked={!!allowRegistration}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>
                {}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  onChange={this.disableBalanceOnAddChange}
                  checked={!!disableBalanceOnAdd}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Edit</label>
                {}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  onChange={this.disableBalanceOnEditChange}
                  checked={!!disableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableActionOnAdd: PropTypes.func.isRequired,
  setDisableActionOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  {
    setAllowRegistration,
    setDisableActionOnAdd,
    setDisableActionOnEdit
  }
)(Settings);
