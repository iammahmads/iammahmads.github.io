// import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

// const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
// const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
// const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface IEmail {
  from_name: string;
  from_email: string;
  message: string;
}

const GoogleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdBoBjQQm-0GHZxKGxrs94P0ugnRJW_SEjbm6Bmd5KHGThAMg/formResponse";

const postEmail = async ({ from_name, from_email, message }: IEmail) => {
  if (!(from_name && from_email && message)) {
    return "Invalid fields";
  }

  // making form data
  const formData = new FormData();
  formData.append("entry.2005620554", from_name);
  formData.append("entry.1045781291", from_email);
  formData.append("entry.839337160", message);

  try {
    await fetch(GoogleFormUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "ERROR: " + err;
  }
};

export default postEmail;
