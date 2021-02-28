import React, { useEffect, useReducer } from "react";
import styles from './index.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { doIncrement } from "../../store/user";

const RemoteVideo = ({ peer }) => {
  // const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  // const handleSave = () => {
  //   dispatch(doIncrement(2))
  // }
  return (
    <div>
      <div>{peer.userId.slice(0, 6)}</div>
      <div className={styles.video__container}>

      </div>
    </div>
  );
};

export default RemoteVideo;
