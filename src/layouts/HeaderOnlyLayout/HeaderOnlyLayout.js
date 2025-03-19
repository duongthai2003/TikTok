import Header from "../Conponent/Header/Header";

function HeaderOnlyLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
export default HeaderOnlyLayout;
