import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React from "react";
import { useCvPageContext } from "../context/useCVContext";
import { Component } from "@/types/cv/state/Component";
import { BaseSection } from "@/types/cv/BaseSection";
import { EditableCvCertificateList } from "./specific/CvCertificateList"; // and other specific files as needed
import { ExperienceList } from "@/types/cv/ExperienceList";
import { EditableCvSkillList } from "./specific/CvSkillList";
import { EditableCvExperienceList } from "./specific/CvExperienceList";
import { EditableCvProjectList } from "./specific/CvProjectList";
import { EditableCvEducation } from "./specific/CvEducation";
import { EditableCvHeading } from "./specific/CvHeading";
import { EditableCvContact } from "./specific/CvContact";
import { EditableCvCustom } from "./specific/CvCustom";
import { EditableCvSummary } from "./specific/CvSummary";
import { SkillList } from "@/types/cv/SkillList";
import { ProjectList } from "@/types/cv/ProjectList";
import { Education } from "@/types/cv/Education";
import { Heading } from "@/types/cv/Heading";
import { Contact } from "@/types/cv/Contact";
import { Summary } from "@/types/cv/Summary";
import { CustomSection } from "@/types/cv/CustomSection";
import { Cv } from "@/types/cv/state/Cv";

export interface CvComponentEditorDrawerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  componentId: string;
  setClose: () => void;
}
const CvComponentEditorDrawer = ({
  open,
  setClose,
  componentId,
}: CvComponentEditorDrawerProps) => {
  const { currentCv, setCurrentCv } = useCvPageContext();
  const currentComponent = currentCv?.Components.find(
    (component) => component.id === componentId
  );
  // Local state for editing details
  const [details, setDetails] = React.useState(currentComponent?.details);

  React.useEffect(() => {
    setDetails(currentComponent?.details);
  }, [currentComponent]);

  function handleDetailsChange(newDetails: any) {
    setDetails(newDetails);
    console.log("Details changed:", newDetails);
  }
  function handleSave() {
    if (currentComponent && details) {
      const updatedComponent = {
        ...currentComponent,
        details: details as BaseSection,
      };
      const updatedComponents = currentCv?.Components.map((comp) =>
        comp.id === componentId ? updatedComponent : comp
      );
      setCurrentCv({
        ...currentCv,
        Components: updatedComponents || [],
      } as Cv);
      setClose();
    }
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(_) => setClose()}
      placement={"start"}
      size={"xl"}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                {currentComponent?.name} - {currentComponent?.id}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {currentComponent &&
                _selectEditor(currentComponent, details!, handleDetailsChange)}
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={handleSave}>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CvComponentEditorDrawer;
function _selectEditor(
  component: Component<BaseSection>,
  detailsUsed: BaseSection,
  onChange: (details: any) => void
): React.ReactNode {
  const componentName = component.details.componentName;
  const detail = detailsUsed;
  switch (componentName) {
    case "CertificateList":
      return (
        <EditableCvCertificateList
          detail={detail as ExperienceList}
          onChange={onChange}
        />
      );
    case "SkillList":
      return (
        <EditableCvSkillList
          detail={detail as SkillList}
          onDetailChange={(skillList: SkillList) => {
            onChange(skillList);
          }}
        />
      );
    case "ExperienceList":
      return <EditableCvExperienceList detail={detail as ExperienceList} />;
    case "ProjectList":
      return (
        <EditableCvProjectList
          detail={detail as ProjectList}
          onChange={onChange}
        />
      );
    case "Education":
      return (
        <EditableCvEducation detail={detail as Education} onChange={onChange} />
      );
    case "Heading":
      return <EditableCvHeading detail={detail as Heading} />;
    case "Contact":
      return (
        <EditableCvContact detail={detail as Contact} onChange={onChange} />
      );
    case "Summary":
      return <EditableCvSummary detail={detail as Summary} />;
    case "CustomSection":
      return <EditableCvCustom detail={detail as CustomSection} />;
    default:
      return <div>Default Editor</div>;
  }
}
