import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./index.css";
import * as Api from "../../helpers/Api";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { Title } from "../../blocks/TableTitle";
import { InfoRow } from "../../blocks/InfoRow";

const options = [
  { value: 12, label: "12 hours" },
  { value: 24, label: "24 hours" },
  { value: 36, label: "36 Hours" }
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "800px",
    height: "400px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative"
  }
};

const airports = [
  { name: "Atlanta", code: "KATL" },
  { name: "Amsterdam", code: "EHAM" },
  { name: "Dubai", code: "OMDB" },
  { name: "Frankfurt", code: "EDDF" },
  { name: "Los Angeles", code: "KLAX" },
  { name: "Chicago", code: "KORD" },
  { name: "London", code: "EGLL" },
  { name: "Madrid", code: "LEMD" },
  { name: "Barcelona", code: "LEBL" },
  { name: "Paris", code: "LFPG" }
];

const SECONDS_IN_HOUR = 3600;

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
        Api.fetchArrivals(code, end - arrivalsEnd * SECONDS_IN_HOUR, end),
        Api.fetchDepartures(code, end - departuresEnd * SECONDS_IN_HOUR, end)
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
          end - endTime * SECONDS_IN_HOUR,
          end
        );
        this.setState({ isFetching: false, arrivals });
      } else if (type === "departuresEnd") {
        const departures = await Api.fetchDepartures(
          selectedCity,
          end - endTime * SECONDS_IN_HOUR,
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

  renderModal() {
    const {
      isModalOpen,
      isFetching,
      departures,
      arrivals,
      arrivalsEnd,
      departuresEnd
    } = this.state;

    const arrivalsRows = arrivals.map((arvl, index) => (
      <li key={index}>
        <InfoRow
          icao={arvl.icao24}
          departureTime={arvl.firstSeen}
          arrivalTime={arvl.lastSeen}
        />
      </li>
    ));
    const departuresRows = departures.map((dptr, index) => (
      <li key={index}>
        <InfoRow
          icao={dptr.icao24}
          departureTime={dptr.firstSeen}
          arrivalTime={dptr.lastSeen}
        />
      </li>
    ));

    return (
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div className="close-modal" onClick={this.onCloseModal}>
          &#10006;
        </div>
        {isFetching && (
          <div className="loader-container">
            <ClipLoader sizeUnit={"px"} size={20} color={"#123abc"} loading />
          </div>
        )}
        <div className="info-container">
          <div className="info-column">
            <div>
              <span>Arrivaasdls: </span>
              <Select
                value={options.find(opt => opt.value === arrivalsEnd)}
                options={options}
                onChange={value => this.onSelectChange(value, "arrivalsEnd")}
              />
            </div>
            <Title />
            <div className="info-list-container">
              <ul className="info-list">{arrivalsRows}</ul>
            </div>
          </div>
          <div className="info-column">
            <div>
              <span>Departures: </span>
              <Select
                value={options.find(opt => opt.value === departuresEnd)}
                options={options}
                onChange={value => this.onSelectChange(value, "departuresEnd")}
              />
            </div>
            <Title />
            <div className="info-list-container">
              <ul className="info-list">{departuresRows}</ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    const airportsList = airports.map(arp => (
      <li key={arp.code} onClick={() => this.onCityClick(arp.code)}>
        {arp.name}
      </li>
    ));
    return (
      <div className="container">
        <div>
          <ul className="cities-list">{airportsList}</ul>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default Dashboard;
