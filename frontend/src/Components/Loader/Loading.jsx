import { TailSpin } from "react-loader-spinner";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="overlay">
      <div className="loader-container">
        <TailSpin height="80" width="80" color="blue" ariaLabel="loading" />
      </div>
    </div>
  );
};

export default Loading;
