
import React, { useState } from 'react'
import Form from '../forms/Form'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const { email, password} = form;
  const params = {
    email: email,
    password: password
  }

  const data = [
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
  ]

  return(
    <Form
      title="Log In"
      data={data}
      form={form}
      setForm={setForm}
      params={params}
    />
  )
}
