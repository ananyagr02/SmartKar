import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

const UserProfile = () => {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        dob: "",
        phoneNumber: "",
        panNumber: "",
        aadharNumber: ""
    });

    // Auto-fill form when user data is loaded
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                password: "",
                dob: user.dob ? user.dob.split("T")[0] : "",
                phoneNumber: user.phoneNumber || "",
                panNumber: user.panNumber || "",
                aadharNumber: user.aadharNumber || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/api/user/profile", formData, { withCredentials: true });
            setUser(response.data.user); // Update context with new data
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password (Leave blank if unchanged)</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">PAN Number</label>
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Aadhar Number</label>
                    <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
