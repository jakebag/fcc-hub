import { useState } from "react";

import Container from "./Container";
import { PasswordInput, TextInput } from "./Inputs";
import { SubmitButton } from "./Buttons";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      </div>
    </Container>
  );
}
