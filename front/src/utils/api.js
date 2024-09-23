export const fetchMessages = async () => {
  const response = await fetch("http://localhost:5000/messages");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
