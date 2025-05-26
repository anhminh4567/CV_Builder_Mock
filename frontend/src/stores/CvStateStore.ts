import { cvService } from "@/services/CvModifyingService";
import { parseComponent, parseSection } from "@/services/CvParsingService";
import { BaseSection } from "@/types/cv/BaseSection";
import { Cv } from "@/types/cv/state/Cv";
import { create } from "zustand";

export interface CvModificationStateStore {
  currentCv: Cv;
  isLoading: boolean;
  error: Error | null;
  isSaving: boolean;
  setCurrentCv: (cv: Cv) => void;
  fetchCvState: (userId: string) => Promise<void>;
}
export const useCvModificationStateStore = create<CvModificationStateStore>(
  (set) => ({
    currentCv: new Cv("CV", "CV Description"),
    setCurrentCv: (cv: Cv) => {
      set({ currentCv: cv });
    },
    isLoading: true,
    error: null,
    isSaving: false,
    fetchCvState: async (userId: string) => {
      set({ isLoading: true, error: null }); // Set loading to true
      try {
        console.log("Fetching CV state for user:", userId);
        const cvState = await cvService.getUserCvState(userId); // Fetch CV state
        if (!cvState) {
          console.log("No CV state found, creating a new one.");
          let jsonSections = jsonCV["sections"] as BaseSection[];
          let parsesection = jsonSections
            .map((section) => parseSection(section))
            .filter((comp) => comp != null);
          console.log("Parsed sections:", parsesection);
          let components = parsesection
            .map((sec) => parseComponent(sec))
            .filter((comp) => comp != null);
          const newCv = new Cv(
            "CV test for user " + userId,
            "CV test purpose",
            undefined,
            undefined,
            undefined,
            components
          );
          await cvService.createNewCvState(userId, newCv); // Create a new CV state
          console.log("Created new CV state:", newCv);
          set({ currentCv: newCv, isLoading: false }); // Set new CV state and turn off loading
        } else {
          set({ currentCv: cvState, isLoading: false }); // Set data and turn off loading
          console.log("Fetched CV state:", cvState);
        }
      } catch (error: any) {
        set({ error: error, isLoading: false }); // Set error and turn off loading
      }
    },
  })
);
const jsonCV = {
  success: true,
  message: "",
  sections: [
    {
      componentName: "Heading",
      fullname: "TRAN DINH ANH MINH",
      introduction: ".NET / Backend Engineer",
    },
    {
      componentName: "Contact",
      email: "anhminh052003@gmail.com",
      phone: "0847 942 496",
      address: "District 11, HCM City",
      github: "https://github.com/anhminh4567",
      linkedin: null,
      website: null,
    },
    {
      componentName: "Summary",
      summary_list: [
        "Desire to work on new projects to acquire experiences with technologies and work environment",
        "Expect to work with microservice architect, to improve knowledge on API, Security, Scalling",
      ],
    },
    {
      componentName: "Education",
      institution: "FPT University HCM Campus",
      degree: "Bachelor of Software Engineer",
      gpa: 3.33,
      date: "1/2022 - 1/2025",
      major: null,
    },
    {
      componentName: "ExperienceList",
      items: [
        {
          componentName: "Experience",
          job_title: "OJT Devops at FSoft high tech district",
          company: null,
          from_date: "9/2023",
          to_date: "12/2023",
          description: [
            "Use Azure to setup VM, proxy NGINX, manage Certificate and Secret with Key Vault and rotation, infrastructure automation with Bicep",
            "Setup Development environment for Sodexo company",
            "Solve certificate chain problem in VM, security to VM, setup jump server",
          ],
        },
      ],
    },
    {
      componentName: "CertificateList",
      items: [
        {
          componentName: "Certificate",
          name: "AZ-900",
          date: "5/2025",
          issuer: "From Microsoft",
        },
        {
          componentName: "Certificate",
          name: "Microsoft Azure: from zero to hero",
          date: "5/2025",
          issuer: "From Udemy",
        },
        {
          componentName: "Certificate",
          name: "Software Development Cycle",
          date: "1/2023",
          issuer:
            "From University of Minnesota, Cousera, about AGILE, Scrum process",
        },
        {
          componentName: "Certificate",
          name: "Computer Communication",
          date: "11/2022",
          issuer:
            "From Colorado University, Cousera, about OSI model, 7 layers and Protocols",
        },
        {
          componentName: "Certificate",
          name: "IELTS 7.0",
          date: "2/2021",
          issuer: null,
        },
      ],
    },
    {
      componentName: "SkillList",
      items: [
        {
          componentName: "Skill",
          skill_type: "Language",
          name: "English",
        },
        {
          componentName: "Skill",
          skill_type: "Frontend",
          name: "HTML, CSS, Tailwind, React TS, JS",
        },
        {
          componentName: "Skill",
          skill_type: "Backend",
          name: "C#, Python, ASP.NET, .NET, Razor Page, Django, Fastapi, RabbitMQ",
        },
        {
          componentName: "Skill",
          skill_type: "Database",
          name: "Postgresql, MSSQL, Mongodb",
        },
        {
          componentName: "Skill",
          skill_type: "Desktop",
          name: "WPF, Winform",
        },
        {
          componentName: "Skill",
          skill_type: "Cloud",
          name: "CI/CD, Hosting: Azure, Azure Devops, Docker, Github Action, AWS",
        },
        {
          componentName: "Skill",
          skill_type: "Version Control",
          name: "Git, Source Tree, Github",
        },
        {
          componentName: "Skill",
          skill_type: "Server & Proxy",
          name: "Ubuntu, Nginx, Yarp",
        },
        {
          componentName: "Skill",
          skill_type: "Architecture Pattern",
          name: "Clean Architecture, SOLID, DDD, Modular Monolith, MVC, MVVM",
        },
      ],
    },
    {
      componentName: "ProjectList",
      items: [
        {
          componentName: "Project",
          name: "Diamondshop System (Capstone)",
          description: [
            "https://github.com/anhminh4567/DiamondShopSystem/DSS_BE",
            "Create management system for jewellry diamond GIA",
            "Stack: ASP.NET 8, Pgsql, Azure, Azure App Service, CI/CD Github",
            "Team Size: 4 members(2 FE, 2 BE)",
            "Role: BE, BA, ERD design, manage source code and architecture, CI/CD, infrastructure",
          ],
          link: null,
        },
        {
          componentName: "Project",
          name: "Chat App Microservice",
          description: [
            "https://github.com/anhminh4567/ChatApp_MicroService",
            "Chat app with SignalR, Microservice architect, RabbitMq for async communication between modules",
            "Stack: ASP.NET 8, RabbitMq (Azure Service Bus for Cloud Deployment), Azure blob, AWS Cognito, Otlp & Trace with jaeger & Prometheus (locally)",
            "Team size: 1 (FullStack)",
          ],
          link: null,
        },
        {
          componentName: "Project",
          name: "Chat App Web Client",
          description: [
            "https://github.com/anhminh4567/ChatApp_ReactTsClient",
            "Chat app client with React TS support darkmode and oidc public client",
            "Stack: React, TS, Zustand, Antd, SignalR, Tanstack Query, Host with Azure Static Webapp",
            "Team size: 1 (FullStack)",
          ],
          link: null,
        },
        {
          componentName: "Project",
          name: "Real-Estate Auction Web App",
          description: [
            "https://github.com/anhminh4567/Estate-Auction-Razor",
            "Create real estate aution management system",
            "Tech: C# Razor Page, MSSQL, Docker container",
            "Team Size: 5 members(3 FE, 2 BE)",
            "Role: BE, Business Analysis, ERD designe, project management",
          ],
          link: null,
        },
      ],
    },
  ],
};
