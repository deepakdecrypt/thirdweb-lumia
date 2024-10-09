import React, { useEffect } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertErrorSVG,
  AlertSuccessSVG,
  AlertWarningSVG,
  AlertInfoSVG,
} from "../../assets/svg";
import "./AlertManager.css";

const AlertManager = ({ message, type, isOpen, handleCloseAlertBox }) => {
  const getTitleByType = (type) => {
    switch (type) {
      case "success":
        return "Success!";
      case "warning":
        return "Alert!";
      case "danger":
        return "Oops!";
      case "error":
        return "Oops!";
      case "primary":
        return "Information";
      case "info":
        return "Information";
      default:
        return "Notification";
    }
  };

  const getIconByType = (type) => {
    switch (type) {
      case "success":
        return <AlertSuccessSVG />;
      case "warning":
        return <AlertWarningSVG />;
      case "danger":
        return <AlertErrorSVG />;
      case "error":
        return <AlertErrorSVG />;
      case "primary":
        return <AlertInfoSVG />;
      case "info":
        return <AlertInfoSVG />;
      default:
        return <AlertInfoSVG />;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const content = (
        <div className="alert-box">
          <div className="alert-icon">{getIconByType(type)}</div>
          <div className="alert-content">
            <strong>{getTitleByType(type)}</strong>
            <div>{message}</div>
          </div>
        </div>
      );

      const toastOptions = {
        onClose: handleCloseAlertBox,
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      };

      switch (type) {
        case "success":
          toast.success(content, toastOptions);
          break;
        case "warning":
          toast.warning(content, toastOptions);
          break;
        case "danger":
          toast.error(content, toastOptions);
          break;
        case "primary":
          toast.info(content, toastOptions);
          break;
        default:
          toast(content, toastOptions);
          break;
      }
    }
  }, [message, type, isOpen]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default AlertManager;
