export const getUserName = () => {
  return localStorage.getItem("name");
};

export const setUserName = (name) => {
  localStorage.setItem("name", name);
};

export const getUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("userId", userId);
  }
  return userId;
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getUserColor = () => {
  let userColor = localStorage.getItem("userColor");
  if (!userColor) {
    userColor = generateRandomColor();
    localStorage.setItem("userColor", userColor);
  }
  return userColor;
};
