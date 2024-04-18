import { useEffect, useState } from "react";
import axios from "axios";

import Container from "./Container";
import { PasswordInput, TextInput } from "./Inputs";
import { SubmitButton, SecondaryButton } from "./Buttons";

import useUserStore from "../hooks/useUserStore";

export default function Register() {
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    firstname: "",
    username: "",
    password: "",
  });

  const { user, setUser } = useUserStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditedValues({ ...user });
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleEditClick() {
    setEditMode(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const lowercaseUsername = editedValues.username.toLowerCase();

    const newUser = {
      ...user,
      username: lowercaseUsername,
      firstname: editedValues.firstname,
      password: editedValues.password,
    };

    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const usernames = response.data.map((u) => u.username);
        if (
          usernames.includes(lowercaseUsername) &&
          lowercaseUsername !== user.username
        ) {
          throw new Error("Username already exists!");
        }
      })
      .then(() => {
        return axios.put(`http://localhost:3000/users/${user.id}`, newUser);
      })
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setUser(newUser);
        setEditMode(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  if (!user)
    return (
      <Container className="py-16">
        <h1 className="text-center font-bold text-2xl">
          You need to be logged in to see your profile
        </h1>
      </Container>
    );

  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-center font-bold text-2xl">Your Profile</h1>

        <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
          {editMode ? (
            <TextInput
              placeholder="James"
              value={editedValues.firstname}
              onChange={handleChange}
            >
              FirstName
            </TextInput>
          ) : (
            <div>
              <div className="block text-sm font-medium text-gray-700">
                Firstname
              </div>
              <div className="mt-1 font-semibold text-xl">{user.firstname}</div>
            </div>
          )}
          {editMode ? (
            <TextInput
              placeholder="yourusername"
              value={editedValues.username}
              onChange={handleChange}
            >
              Username
            </TextInput>
          ) : (
            <div>
              <div className="block text-sm font-medium text-gray-700">
                Username
              </div>
              <div className="mt-1 font-semibold text-xl">{user.username}</div>
            </div>
          )}
          {editMode ? (
            <PasswordInput
              placeholder="password"
              value={editedValues.password}
              onChange={handleChange}
            >
              Password
            </PasswordInput>
          ) : (
            <div>
              <div className="block text-sm font-medium text-gray-700">
                Password
              </div>
              <div className="mt-1 font-semibold text-xl">{user.password}</div>
            </div>
          )}
          <div className="mt-5 text-center">
            {!editMode ? (
              <SecondaryButton onClick={handleEditClick}>Edit</SecondaryButton>
            ) : (
              <SubmitButton>Submit</SubmitButton>
            )}
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
