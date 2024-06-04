import ContexApi from "~/hook/context/Defaultcontextapi";
import Header from "../Conponent/Header/Header";

function HeaderOnlyLayout({ children }) {
  return (
    <div>
      <ContexApi>
        <Header />
        {children}
      </ContexApi>
    </div>
  );
}
export default HeaderOnlyLayout;
