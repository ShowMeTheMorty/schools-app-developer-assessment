import { AsideMode } from "contexts/aside/aside.types";
import { useAside } from "contexts/aside/AsideContext"
import SchoolDetails from "../SchoolDetails";
import CreateSchoolForm from "../CreateSchoolForm";

const AsideContent = () => {
  const { asideState, closeAside } = useAside();

  switch (asideState.mode) {
    case AsideMode.SchoolDetails:
      return <SchoolDetails school={asideState.payload.school} onClose={closeAside} />;
    case AsideMode.CreateSchool:
      return <CreateSchoolForm onClose={closeAside} />;
    default:
      return null;
  }
};

export default AsideContent;