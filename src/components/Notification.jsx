import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
const Notification = () => {
  const {notification, className} = useSelector((state) => state.notification)
  
  return <div className={className}>{notification}</div>;
};

export default Notification;
