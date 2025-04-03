import { ChangeEvent, useState } from "react";
import postEmail from "../../services/postEmail";

const initialDetails = {
  name: "",
  email: "",
  message: "",
};

const initialErrorMessage = "";

const Contact = () => {
  const [formDetails, setFormDetails] = useState(initialDetails);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDetails((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormDetails((prev) => ({ ...prev, message: e.target.value }));
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    const responseData = await postEmail({
      from_name: formDetails.name,
      from_email: formDetails.email,
      message: formDetails.message,
    });
    setIsFormSubmitting(false);
    if (responseData === "SUCCESS") {
      alert("Form submitted successfully");
    }
    if (responseData.includes("ERROR")) {
      setErrorMessage("Error in sending mail");
      setTimeout(() => {
        setErrorMessage(initialErrorMessage);
      }, 2000);
      return;
    }
    setFormDetails(initialDetails);
    setErrorMessage(initialErrorMessage);
  };

  return (
    <section id="contact-section" className="p-8">
      <h2 className="text-primary bg-secondry w-full text-center py-4 rounded-md text-xl font-bold md:text-2xl lg:text-3xl underline underline-offset-2">
        Contact me
      </h2>
      <div className="flex w-full justify-center">
        <form
          action="#"
          autoComplete="off"
          className="flex flex-col gap-4 py-4 md:py-6 lg:py-8"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col justify-center gap-1">
            <label htmlFor="name_ContactForm">Name</label>
            <input
              type="text"
              name="name_ContactForm"
              value={formDetails.name}
              onChange={handleChangeName}
              autoComplete="off"
              required
              className="w-[75vw] border-2 border-primary border-opacity-45 rounded-lg py-1 px-2 text-textHeading focus:border-opacity-100 focus:outline-none  sm:w-[70vw] md:w-[60vw] lg:w-[50vw]"
              placeholder="Enter full name"
            />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <label htmlFor="email_ContactForm">Email</label>
            <input
              type="email"
              name="email_ContactForm"
              value={formDetails.email}
              onChange={handleChangeEmail}
              autoComplete="off"
              required
              className="w-[75vw] border-2 border-primary border-opacity-45 rounded-lg py-1 px-2 text-textHeading focus:border-opacity-100 focus:outline-none  sm:w-[70vw] md:w-[60vw] lg:w-[50vw]"
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <label htmlFor="message_ContactForm">Message</label>
            <textarea
              name="message_ContactForm"
              value={formDetails.message}
              onChange={handleChangeMessage}
              autoComplete="off"
              required
              className="w-[75vw] border-2 border-primary border-opacity-45 rounded-lg py-1 px-2 text-textHeading focus:border-opacity-100 focus:outline-none  sm:w-[70vw] md:w-[60vw] lg:w-[50vw]"
              placeholder="Enter message"
            />
          </div>

          <div className="w-full flex flex-col items-center">
            {errorMessage != "" && (
              <p className="text-xs text-red-600">{errorMessage}</p>
            )}
            <input
              type="submit"
              value={isFormSubmitting ? "Sending.." : "Send"}
              disabled={isFormSubmitting}
              className={`${
                isFormSubmitting
                  ? "bg-primary text-secondry"
                  : "bg-secondry text-primary"
              } w-max px-2 py-1 rounded-lg hover:bg-primary hover:text-secondry cursor-pointer active:scale-95 `}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
