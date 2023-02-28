import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";

interface Props {}

const Register: NextPage<Props> = ({}) => {
  const [userData, setdata] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdata((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const signin = async () => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <div>
        <label htmlFor="email">name</label>
        <input type="text" name="name" onChange={handleChangeInput} />
        <label htmlFor="email">email</label>
        <input type="text" name="email" onChange={handleChangeInput} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={handleChangeInput} />
        <button onClick={signin}>Sign in</button>
      </div>
    </>
  );
};

export default Register;
