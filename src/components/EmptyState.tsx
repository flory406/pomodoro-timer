type EmptyStateProps = {
  title: string;
  hint: string;
  buttonText?: string;
  onClick?: () => void;
};

export function EmptyState({
  title,
  hint,
  buttonText,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column text-center">
      <h1>{title}</h1>
      <p>{hint}</p>

      {buttonText && onClick && (
        <button onClick={onClick} className="btn btn-primary">
          {buttonText}
        </button>
      )}
    </div>
  );
}
