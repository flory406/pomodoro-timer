import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="not-found-page">
      <div className="not-found-glow not-found-glow-left" />
      <div className="not-found-glow not-found-glow-right" />

      <div className="not-found-card text-center">
        <p className="not-found-eyebrow">{t("lostTimer")}</p>
        <div className="not-found-code">404</div>
        <h1 className="h2 mb-3">{t("pageNotFound")}</h1>
        <p className="text-secondary mb-4">{t("pageNotFoundHint")}</p>
        <Link to="/" className="btn btn-primary rounded-pill px-4">
          {t("backToTimer")}
        </Link>
      </div>
    </div>
  );
}
