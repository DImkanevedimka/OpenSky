import React, { Component } from "react";
import moment from "moment";
import "./index.css";
import * as Api from "../../helpers/Api";
import * as CONSTANTS from "../../constants";
import { ModalContainer as Modal } from "./Modal";

class Dashboard extends Component {
  state = {
    departures: [],
    arrivals: [],
    departuresEnd: 12,
    arrivalsEnd: 12,
    isModalOpen: false,
    isFetching: false,
    selectedCity: null
  };

  onCityClick = code => {
    this.setState({
      isFetching: true,
      isModalOpen: true,
      departures: [],
      arrivals: [],
      selectedCity: code
    });
    this.onFetchInfo(code);
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  onFetchInfo = async code => {
    const { departuresEnd, arrivalsEnd } = this.state;
    const end = moment()
      .startOf("d")
      .unix();
    try {
      const [arrivals, departures] = await Promise.all([
        Api.fetchArrivals(
          code,
          end - arrivalsEnd * CONSTANTS.SECONDS_IN_HOUR,
          end
        ),
        Api.fetchDepartures(
          code,
          end - departuresEnd * CONSTANTS.SECONDS_IN_HOUR,
          end
        )
      ]);
      this.setState({ departures, arrivals, isFetching: false });
    } catch (err) {
      this.setState({ isFetching: false });
    }
  };

  onUpdateInfo = async (type, endTime) => {
    const { selectedCity } = this.state;
    const end = moment()
      .startOf("d")
      .unix();
    try {
      if (type === "arrivalsEnd") {
        const arrivals = await Api.fetchArrivals(
          selectedCity,
          end - endTime * CONSTANTS.SECONDS_IN_HOUR,
          end
        );
        this.setState({ isFetching: false, arrivals });
      } else if (type === "departuresEnd") {
        const departures = await Api.fetchDepartures(
          selectedCity,
          end - endTime * CONSTANTS.SECONDS_IN_HOUR,
          end
        );
        this.setState({ isFetching: false, departures });
      }
    } catch (err) {
      this.setState({ isFetching: false });
    }
  };

  onSelectChange = (value, type) => {
    this.setState({ [type]: value.value, isFetching: true });
    this.onUpdateInfo(type, value.value);
  };

  render() {
    const {
      arrivals,
      departures,
      isModalOpen,
      isFetching,
      arrivalsEnd,
      departuresEnd
    } = this.state;
    const airportsList = CONSTANTS.airports.map(arp => (
      <li key={arp.code} onClick={() => this.onCityClick(arp.code)}>
        {arp.name}
      </li>
    ));
    return (
      <div className="container">
        <div>
          <ul className="cities-list">{airportsList}</ul>
        </div>
        <Modal
          arrivals={arrivals}
          departures={departures}
          isModalOpen={isModalOpen}
          isFetching={isFetching}
          departuresEnd={departuresEnd}
          arrivalsEnd={arrivalsEnd}
          onSelectChange={this.onSelectChange}
          onCloseModal={this.onCloseModal}
        />
      </div>
    );
  }
}

export default Dashboard;
