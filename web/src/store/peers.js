import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "peers",
  initialState: [],
  reducers: {
    addPeer: (state, { targetPeer }) => [...state, targetPeer],
    updatePeers: (state, newState) => newState,
    DeletePeer: (state, { targetPeer }) =>
      state.filter(function (peer) {
        return peer.uuid !== targetPeer.uuid;
      }),
  },
});

export default slice.reducer;

const { addPeer, updatePeers, DeletePeer } = slice.actions;
export const doAddPeer = (peer) => async (dispatch) => {
  return dispatch(addPeer(peer));
};
export const doUpdatePeers = (peers) => async (dispatch) => {
  return dispatch(updatePeers(peers));
};
export const doDeletePeer = (peer) => async (dispatch) => {
  return dispatch(DeletePeer(peer));
};
