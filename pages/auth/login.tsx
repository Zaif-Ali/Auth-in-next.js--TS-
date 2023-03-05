import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
interface Props {}

const Login: NextPage<Props> = ({}) => {
  const [userData, setdata] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdata((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const signin = async () => {
    try {
      const res = await axios.post("/api/auth/signin",  userData );
      const data = res.data;
      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <label htmlFor="email">email</label>
        <input type="text" name="email" onChange={handleChangeInput} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={handleChangeInput} />
        <button onClick={signin}>Sign in</button>
      </div>
    </>
  );
};

export default Login;
