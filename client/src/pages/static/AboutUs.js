import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import axios from "axios";
import PageLoading from "../../components/UI/PageLoading";

import classes from "./static.module.css";
import PageHeader from "../../components/UI/PageHeader";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const getFileContent = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}/api/get-markdown`,
          {
            params: {
              fileName: "about-us",
            },
          }
        );
        setFileContent(data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFileContent();
  }, []);

  return (
    <>
      <PageHeader title="About us" />
      {loading && (
        <div className={classes.height_holder}>
          <PageLoading />
        </div>
      )}
      {!loading && (
        <div className={classes.markdown_wrapper}>
          <ReactMarkdown
            components={{
              a: ({ href, children }) => <Link to={href}>{children}</Link>,
            }}
            children={fileContent}
          />
        </div>
      )}
    </>
  );
};

export default AboutUs;
