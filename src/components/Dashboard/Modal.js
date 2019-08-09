import React from "react";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { Title } from "../../blocks/TableTitle";
import { InfoRow } from "../../blocks/InfoRow";
import * as CONSTANTS from "../../constants";

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

export const ModalContainer = ({
  arrivals,
  departures,
  isModalOpen,
  departuresEnd,
  arrivalsEnd,
  isFetching,
  onSelectChange,
  onCloseModal
}) => {
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
      <div className="close-modal" onClick={onCloseModal}>
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
            <span>Arrivals: </span>
            <Select
              value={CONSTANTS.options.find(opt => opt.value === arrivalsEnd)}
              options={CONSTANTS.options}
              onChange={value => onSelectChange(value, "arrivalsEnd")}
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
              value={CONSTANTS.options.find(opt => opt.value === departuresEnd)}
              options={CONSTANTS.options}
              onChange={value => onSelectChange(value, "departuresEnd")}
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
};
