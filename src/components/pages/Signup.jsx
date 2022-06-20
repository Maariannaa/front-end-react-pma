
import React, { useState } from "react"
import Form from "../forms/Form"

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  })

  const { name, email, password, confirmation} = form;
  const params = {
    name: name,
    email: email,
    password: password,
    passwordConfirmation: confirmation
  }

  const data = [
    {
      name: "name",
      value: name,
      type: "text",
    },
    {
      name: "email",
      value: email,
      type: "email",
    },
    {
      name: "password",
      value: password,
      type: "password",
    },
    {
      name: "confirmation",
      value: confirmation,
      type: "password",
    },
  ]

  return(
    <Form
      type="signup"
      title="Sign Up"
      data={data}
      form={form}
      setForm={setForm}
      params={params}
    />
  )
}
