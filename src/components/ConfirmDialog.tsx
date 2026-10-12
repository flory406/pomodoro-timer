type ConfirmDialogProps = {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
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
              Скасувати
            </button>

            <button onClick={onConfirm} className="btn btn-outline-danger">
              Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
