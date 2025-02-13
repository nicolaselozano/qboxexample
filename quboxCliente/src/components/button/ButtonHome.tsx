interface Content {
  children: React.ReactNode;
  classname?: string;
}

const ButtonHome: React.FC<Content> = ({ children, classname }: Content) => {
  return (
    <button className={`group`}>
      <div
        className={`border-2 ${classname} bg-black bg-opacity-45 shadow-purple-glow
      
                hover:bg-general_bg active:bg-general_bg hover:cursor-pointer text-qbox font-bold text-sm py-2 px-4 rounded-lg mt-2 shadow-md transform transition-all duration-300 group-hover:scale-105 group-active:scale-95`}
      >
        {children}
      </div>
    </button>
  );
};

export default ButtonHome;
