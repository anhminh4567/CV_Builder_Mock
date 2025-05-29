import { Cv } from "@/types/cv/state/Cv";
// import { parseSection } from "./CvParsingService";
// import { BaseSection } from "@/types/cv/BaseSection";
// import { Component } from "@/types/cv/state/Component";

async function getUserCvState(userId: string): Promise<Cv | null> {
  console.log("Fetching CV state for user:", userId);
  const cvState = Cv.loadFromLocalStorage();
  if (cvState) {
    return new Promise<Cv>((resolve) => {
      setTimeout(() => resolve(cvState), 1000);
    });
  } else {
    return null;
  }
}
async function createNewCvState(userId: string, cv: Cv): Promise<Cv> {
  console.log("Creating new CV state for user:", userId);
  cv.saveToLocalStorage();
  return Promise.resolve(cv);
}
async function saveCvState(userId: string, cv: Cv): Promise<Cv> {
  console.log("Saving CV state for user:", userId);
  Cv.fromType(cv).saveToLocalStorage();
  return Promise.resolve(cv);
}

export const cvService = {
  getUserCvState,
  createNewCvState,
  saveCvState,
};
// const jsonCV = {
//   success: true,
//   message: "",
//   sections: [
//     {
//       componentName: "Heading",
//       fullname: "TRAN DINH ANH MINH",
//       introduction: ".NET / Backend Engineer",
//     },
//     {
//       componentName: "Contact",
//       email: "anhminh052003@gmail.com",
//       phone: "0847 942 496",
//       address: "District 11, HCM City",
//       linkedin: null,
//       github: "https://github.com/anhminh4567",
//       website: null,
//     },
//     {
//       componentName: "Summary",
//       summary_list: [
//         "Desire to work on new projects to acquire experiences with technologies and work environment",
//         "Expect to work with microservice architect, to improve knowledge on API, Security, Scalling",
//       ],
//     },
//     {
//       componentName: "Education",
//       institution: "FPT University HCM Campus",
//       degree: "Bachelor of Software Engineer",
//       gpa: 3.33,
//       date: "1/2022 - 1/2025",
//       major: null,
//     },
//     {
//       componentName: "Experience",
//       job_title: "OJT Devops at FSoft high tech district",
//       company: null,
//       from_date: "9/2023",
//       to_date: "12/2023",
//       description: [
//         "Use Azure to setup VM, proxy NGINX, manage Certificate and Secret with Key Vault and rotation, infrastructure automation with Bicep",
//         "Setup Development environment for Sodexo company",
//         "Solve certificate chain problem in VM, security to VM, setup jump server",
//       ],
//     },
//     {
//       componentName: "CertificateList",
//       certificates: [
//         {
//           componentName: "Certificate",
//           name: "AZ-900",
//           date: "5/2025",
//           issuer: "From Microsoft",
//         },
//         {
//           componentName: "Certificate",
//           name: "Microsoft Azure: from zero to hero",
//           date: "5/2025",
//           issuer: "From Udemy",
//         },
//         {
//           componentName: "Certificate",
//           name: "Software Development Cycle",
//           date: "1/2023",
//           issuer:
//             "From University of Minnesota, Cousera, about AGILE, Scrum process",
//         },
//         {
//           componentName: "Certificate",
//           name: "Computer Communication",
//           date: "11/2022",
//           issuer:
//             "From Colorado University, Cousera, about OSI model, 7 layers and Protocols",
//         },
//         {
//           componentName: "Certificate",
//           name: "IELTS 7.0",
//           date: "2/2021",
//           issuer: null,
//         },
//       ],
//     },
//     {
//       componentName: "SkillList",
//       skills: [
//         {
//           componentName: "Skill",
//           skill_type: "Language",
//           name: "English",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Frontend",
//           name: "HTML, CSS, Tailwind, React TS, JS",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Backend",
//           name: "C#, Python, ASP.NET, .NET, Razor Page, Django, FastAPI, RabbitMQ",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Database",
//           name: "Postgresql, MSSQL, Mongodb",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Desktop",
//           name: "WPF, Winform",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Cloud / CI/CD, Hosting",
//           name: "Azure, Azure Devops, Docker, Github Action, AWS",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Version Control",
//           name: "Git, Source Tree, Github",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Server & Proxy",
//           name: "Ubuntu, Nginx, Yarp",
//         },
//         {
//           componentName: "Skill",
//           skill_type: "Architecture Pattern",
//           name: "Clean Architecture, SOLID, DDD, Modular Monolith, MVC, MVVM",
//         },
//       ],
//     },
//     {
//       componentName: "ProjectList",
//       projects: [
//         {
//           componentName: "Project",
//           name: "DiamondShop System (Capstone)",
//           description: [
//             "Create management system for jewellry diamond GIA",
//             "Stack: ASP.NET 8, Pgsql, Azure, Azure App Service, CI/CD Github",
//             "Team Size: 4 members(2 FE, 2 BE)",
//             "Role: BE, BA, ERD design, manage source code and architecture, CI/CD, infrastructure",
//           ],
//           link: "https://github.com/anhminh4567/DiamondShopSystem/DSS_BE",
//         },
//         {
//           componentName: "Project",
//           name: "Chat App Microservice",
//           description: [
//             "Chat app with SignalR, Microservice architect, RabbitMq for async communication between modules",
//             "Stack: ASP.NET 8, RabbitMq (Azure Service Bus for Cloud Deployment), Azure blob, AWS Cognito, Otlp & Trace with jaeger & Prometheus (locally)",
//             "Team size: 1 (FullStack)",
//           ],
//           link: "https://github.com/anhminh4567/ChatApp_MicroService",
//         },
//         {
//           componentName: "Project",
//           name: "Chat App Web Client",
//           description: [
//             "Chat app client with React TS support darkmode and oidc public client",
//             "Stack: React, TS, Zustand, Antd, SignalR, Tanstack Query, Host with Azure Static Webapp",
//             "Team size: 1 (FullStack)",
//           ],
//           link: "https://github.com/anhminh4567/ChatApp_ReactTsClient",
//         },
//         {
//           componentName: "Project",
//           name: "Real-Estate Auction Web App",
//           description: [
//             "Create real estate aution management system",
//             "Tech: C# Razor Page, MSSQL, Docker container",
//             "Team Size: 5 members(3 FE, 2 BE)",
//             "Role: BE, Business Analysis, ERD designe, project management",
//           ],
//           link: "https://github.com/anhminh4567/Estate-Auction-Razor",
//         },
//       ],
//     },
//   ],
// };
