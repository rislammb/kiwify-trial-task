const Label = ({ title, htmlFor, styleClsss }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium leading-5 text-gray-700 ${styleClsss}`}
    >
      {title}
    </label>
  );
};

export default Label;
