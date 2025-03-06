const MainContainer = (props: { children: React.ReactNode }) => {
  return (
    <body className="flex flex-col min-h-screen antialiased p-4 lg:p-10 gap-4 lg:gap-8">
      {props.children}
    </body>
  );
};

export default MainContainer;
