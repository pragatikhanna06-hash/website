import { useLanguage } from "./LanguageContext";
import "./FormSubmitError.css";

/* Shown under a form's submit button when the email could not be sent.
   Offers a mailto: fallback with the visitor's details pre-filled. */
export default function FormSubmitError({ show, mailto }) {
  const { tr } = useLanguage();
  if (!show) return null;
  return (
    <div className="fse" role="alert">
      <p>{tr("We couldn't send your details right now. Please try again in a moment.")}</p>
      {mailto && (
        <a href={mailto}>{tr("Or send them by email instead")}</a>
      )}
    </div>
  );
}
