const MainContent = (props: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 gap-4 *:shrink-0 shrink-0 w-full h-full items-center">
      {props.children}
    </div>
  );
};

export default MainContent;
