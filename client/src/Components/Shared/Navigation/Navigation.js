import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../Http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import logoutIcon from "../../../images/logout-icon.png";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <span style={logoText}>AuralLink</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={
                user.avatar
                  ? user.avatar
                  : "https://png.pngtree.com/background/20230528/original/pngtree-the-avatar-of-a-man-with-headphones-in-front-of-a-picture-image_2772528.jpg?alt=search"
              }
              alt="avatar"
            />
          </Link>
          <button className={styles.logoutButton} onClick={() => logoutUser()}>
            <img src={logoutIcon} alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
