import React, { useEffect } from "react";
import Form from "./components/form/Form";
import { register, setStatus } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import STATUSES from "../../globals/status/statuses";

const Register = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleRegister = (data) => {
    dispatch(register(data));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      dispatch(setStatus(null));
      navigate("/login");
    }
  }, [status]);
  return <Form type="Register" onSubmit={handleRegister} />;
};

export default Register;
