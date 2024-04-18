import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "./Container";
import { PasswordInput, TextInput } from "./Inputs";
import { SubmitButton } from "./Buttons";

import useUserStore from "../hooks/useUserStore";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    username: "",
    password: "",
  });

  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const lowercaseUsername = formData.username.toLowerCase();

    const newUser = {
      ...formData,
      username: lowercaseUsername,
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      orders: [],
    };

    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const usernames = response.data.map((u) => u.username);
        if (usernames.includes(lowercaseUsername)) {
          throw new Error("Username already exists!");
        }
      })
      .then(() => {
        return axios.post("http://localhost:3000/users", newUser);
      })
      .then((response) => {
        console.log("User registered successfully:", response.data);
        setUser(response.data);
        localStorage.setItem("token", JSON.stringify(newUser));
        localStorage.removeItem("cart");
        navigate("/products");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-center font-bold text-2xl">Create your account</h1>

        <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            placeholder="James"
            value={formData.firstname}
            onChange={handleChange}
          >
            FirstName
          </TextInput>
          <TextInput
            placeholder="yourusername"
            value={formData.username}
            onChange={handleChange}
          >
            Username
          </TextInput>
          <PasswordInput
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          >
            Password
          </PasswordInput>
          <div className="mt-5 text-center">
            <SubmitButton>Submit</SubmitButton>
          </div>
        </form>
        {error && (
          <div className="text-red-600 text-center mt-6 p-2 bg-red-100 rounded-sm ring-1 ring-red-300">
            {error}
          </div>
        )}
      </div>
    </Container>
  );
}
