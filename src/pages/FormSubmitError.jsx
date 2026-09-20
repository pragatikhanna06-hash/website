import { useLanguage } from "./LanguageContext";
import "./FormSubmitError.css";

/* Shown under a form's submit button when the email could not be sent by the
   server: just a small "Send by email" link that opens the visitor's email app
   with the details pre-filled (the app is also opened automatically). */
export default function FormSubmitError({ show, mailto }) {
  const { tr } = useLanguage();
  if (!show || !mailto) return null;
  return (
    <a className="fse" href={mailto}>{tr("Send by email")}</a>
  );
}
