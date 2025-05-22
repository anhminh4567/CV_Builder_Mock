from typing import Optional, Union
from pydantic import BaseModel, Field

class BaseComponent(BaseModel):
    componentName: str = Field(default="", description="Name of the component type, example, if this is a Heading component ==> name is Heading, MUST BE EXACT NAME  ")

class Heading(BaseComponent):
    fullname:str = Field(default="", description="Full name of the candidate")
    introduction: Optional[str] = Field(default="", description="Introduction of the candidate")
    
class Contact(BaseComponent):
    email: Optional[str] = Field(default="", description="Email of the candidate")
    phone: Optional[str] = Field(default="", description="Phone number of the candidate")
    address: Optional[str] = Field(default="", description="Address of the candidate")
    linkedin: Optional[str] = Field(default="", description="LinkedIn profile of the candidate")
    github: Optional[str] = Field(default="", description="GitHub profile of the candidate")
    website: Optional[str] = Field(default="", description="Website of the candidate")
    
class Education(BaseComponent):
    institution: Optional[str] = Field(default="", description="Name of the institution")
    degree: Optional[str] = Field(default="", description="Degree obtained")
    gpa: Optional[float] = Field(default=0.0, description="GPA obtained")
    date: Optional[str] = Field(default="", description="Date of graduation")
    major: Optional[str] = Field(default="", description="Major of the degree")



class Skill(BaseComponent):
    skill_type: Optional[str] = Field(default="", description="Type of the skill")
    name: Optional[str] = Field(default="", description="Name of the skill")

    
class SkillList(BaseComponent):
    skills: list[Skill] = Field(default=[], description="List of skills")
    
class Experience(BaseComponent):
    job_title: Optional[str] = Field(default="", description="Job title")
    company: Optional[str] = Field(default="", description="Company name")
    from_date: Optional[str] = Field(default="", description="Start date of the job, format: MM/YYYY")
    to_date: Optional[str] = Field(default="", description="End date of the job, format: MM/YYYY, if not provided, default to 'NOW'")
    description: list[str] = Field(default="", description="list of outline of description of the job")
    
class ExperienceList(BaseComponent):
    experiences: list[Experience] = Field(default=[], description="List of experiences")
    
class Summary(BaseComponent):
    summary_list: list[str] = Field(default=[], description="List of summary points")
    
class Certificate(BaseComponent):
    name: Optional[str] = Field(default="", description="Name of the certificate")
    date: Optional[str] = Field(default="", description="Date from to of the certificate, format: MM/YYYY, if not provided, default to 'NOW'")
    issuer: Optional[str] = Field(default="", description="Issuer of the certificate")
    
class CertificateList(BaseComponent):
    certificates: list[Certificate] = Field(default=[], description="List of certificates")
    
class Project(BaseComponent):
    name: Optional[str] = Field(default="", description="Name of the project")
    description: list[str] = Field(default="", description="Description of the project")
    link: Optional[str] = Field(default="", description="Link to the project")
class ProjectList(BaseComponent):
    projects: list[Project] = Field(default=[], description="List of projects")
    
class CustomSection(BaseComponent):
    name: Optional[str] = Field(default="", description="Name of the custom section")
    content: list[str] = Field(default="", description="Content of the custom section")
    


all_classes: list[BaseComponent] = [
    Heading, Contact, Education, Skill, SkillList, Experience, ExperienceList,
    Summary, Certificate, CertificateList, Project, ProjectList, CustomSection
]
def get_json_schema_for_all_classes() -> str:
    """Get the JSON schema for all classes."""

    schema_str = ""
    for cls in all_classes:
        schema_str += f"{cls.__name__}: {cls.model_json_schema()}\n\n"
    return schema_str