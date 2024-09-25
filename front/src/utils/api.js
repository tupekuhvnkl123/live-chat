export const fetchMessages = async () => {
  const response = await fetch("https://live-chat-e904.onrender.com/messages");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
