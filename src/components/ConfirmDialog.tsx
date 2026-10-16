type ConfirmDialogProps = {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
};

export function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
  confirmText,
}: ConfirmDialogProps) {
  const { t } = useLanguage();
  const actionText = confirmText ?? t("delete");

  if (open === false) {
    return null;
  }

  return (
    <div
      className="d-block modal"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">{message}</div>

          <div className="modal-footer">
            <button onClick={onCancel} className="btn btn-secondary">
              {t("cancel")}
            </button>

            <button onClick={onConfirm} className="btn btn-outline-danger">
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useLanguage } from "../context/LanguageContext";
