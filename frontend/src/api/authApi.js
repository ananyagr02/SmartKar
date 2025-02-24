// const API_URL = "http://localhost:5000/api/auth"; // Adjust if needed

// // Register User
// export const registerUser = async (userData) => {
//   try {
//     const response = await fetch(`${API_URL}/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Registration failed");

//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Login User
// export const loginUser = async (userData) => {
//   try {
//     const response = await fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Login failed");

//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
