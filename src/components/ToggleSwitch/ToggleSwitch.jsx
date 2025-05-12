import "./ToggleSwitch.css";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function ToggleSwitch({ onColor }) {
  const { handleToggleSwitchChange, isOn } = useContext(AppContext);

  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggleSwitchChange}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
        <p
          style={{
            color: !isOn ? onColor : "#00000080",
            zIndex: 1,
          }}
          className="react-switch-temp"
        >
          F
        </p>
        <p
          style={{
            color: isOn ? onColor : "#00000080",
            zIndex: 1,
          }}
          className="react-switch-temp"
        >
          C
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
