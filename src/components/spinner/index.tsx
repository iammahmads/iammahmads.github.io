import "./style.css";

export default function Spinner() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
