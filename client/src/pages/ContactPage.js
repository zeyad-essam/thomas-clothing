import React from "react";

import { Helmet } from "react-helmet";

import PageHeader from "../components/UI/PageHeader";
import ContactForm from "../components/contact/ContactForm";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Thomas | Contact</title>
      </Helmet>
      <PageHeader title="Contact Us" />
      <ContactForm />
    </>
  );
};

export default ContactPage;
