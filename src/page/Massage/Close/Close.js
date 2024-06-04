import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Close({ children, setclose, Cancel = false }) {
  return (
    <div style={{ fontSize: " 25px", color: "#3e3c3c", cursor: "pointer" }}>
      {Cancel ? (
        <span
          className="rounded-2   "
          style={{
            fontSize: "19px",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            display: "inline-block",
            minWidth: "135px",
            padding: "4px 0",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Cancel
        </span>
      ) : (
        <FontAwesomeIcon icon={faClose} />
      )}
    </div>
  );
}
export default Close;
