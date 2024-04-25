import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "./Container";
import { PasswordInput, TextInput } from "./Inputs";
import { SubmitButton } from "./Buttons";

import useUserStore from "../hooks/useUserStore";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { user, setUser } = useUserStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    const lowercaseUsername = formData.username.toLowerCase();
    let identifiedUser;

    axios
      .get(`https://json-server-t23y.onrender.com/users/`)
      .then((response) => {
        const returnedUsers = response.data;
        identifiedUser = returnedUsers.find(
          (u) =>
            u.username === lowercaseUsername && u.password === formData.password
        );
        if (!identifiedUser) {
          throw new Error();
        }
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) identifiedUser.cart = savedCart;
        setUser(identifiedUser);
        localStorage.setItem("token", JSON.stringify(identifiedUser));
        localStorage.removeItem("cart");
        navigate("/products");
        console.log(identifiedUser);
      })
      .then(() => {
        return axios.put(
          `https://json-server-t23y.onrender.com/users/${identifiedUser.id}`,
          identifiedUser
        );
      })
      .catch(() => {
        setError("Invalid credentials!");
      });
  }

  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-center font-bold text-2xl">
          Login to your account
        </h1>

        <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
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
