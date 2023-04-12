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
      <PageHeader
        title="Contact Us"
        text="We'd love to hear from you! Reach out to us with any questions, comments, or concerns."
      />
      <ContactForm />
    </>
  );
};

export default ContactPage;
