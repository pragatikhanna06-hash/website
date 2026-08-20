import { Helmet } from "react-helmet-async";

const SITE_NAME = "NyayShield — Forfra Solutions";
const DEFAULT_DESCRIPTION =
  "Court-admissible digital forensics, fraud investigation, legal drafting, and lawyer booking services for government agencies, banks, and corporates across India.";

export default function Seo({ title, description, path }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = path ? `https://new-project-1pmy.vercel.app${path}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {url && <link rel="canonical" href={url} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}