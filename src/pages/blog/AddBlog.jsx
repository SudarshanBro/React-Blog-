import React, { useEffect } from "react";

import Layout from "../../components/layout/Layout";
import Form from "./components/form/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../../store/blogSlice";
import STATUSES from "../../globals/status/statuses";

const AddBlog = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const handleAddBlog = (data) => {
    dispatch(addBlog(data));
    if (status === STATUSES.SUCCESS) {
      navigate("/");
    }
  };
  return (
    <Layout>
      <Form type="Create" onSubmit={handleAddBlog} />
    </Layout>
  );
};

export default AddBlog;
