import { useContext } from "react";
import "./SideBar.css";
import AppContext from "../../contexts/AppContext";

function SideBar({ handleEditProfileClick }) {
  const { currentUser, handleLogout } = useContext(AppContext);

  return (
    <div className="sidebar__profile">
      <div className="sidebar__profile-info">
        <div className="sidebar__avatar">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="sidebar__avatar-image"
            />
          ) : currentUser.username?.trim() ? (
            currentUser.username[0].toUpperCase()
          ) : (
            ""
          )}
        </div>
        <p className="sidebar__username">
          {currentUser.username?.trim() || "Guest"}
        </p>
      </div>
      <div className="sidebar__profile-actions">
        <button
          className="sidebar__profile-actions-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__profile-actions-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
