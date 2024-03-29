export const useGetUserID = () => {
  // We need to get the UserID from the local storage
  const userID = window.localStorage.getItem("userID");

  return userID;
}