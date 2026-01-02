const Button = ({ onClick }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <button className="btn-load" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;
