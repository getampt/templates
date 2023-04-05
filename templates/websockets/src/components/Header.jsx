export const Header = ({ text, top = true }) => {
  const position = top ? "top-0" : "bottom-0";
  return (
    <div className={`fixed inset-x-0 ${position}`}>
      <div className="bg-indigo-600 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">{text}</p>
      </div>
    </div>
  );
};
