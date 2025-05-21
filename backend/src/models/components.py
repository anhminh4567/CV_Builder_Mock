from enum import Enum
from pydantic import BaseModel, Field

class ComponentType(Enum):
    CONTAINER  = "container"
    TEXT       = "text"
    TITLE      = "title"
    LIST       = "list"
    LIST_ITEM  = "list_item"
    IMAGE     = "image"


class BaseComponent(BaseModel):
    name: str = Field(..., description="Name of the component")
    lable: str = Field( description="Label of the component")
    type: ComponentType = Field(..., description="Type of the component")
    components: list["BaseComponent"] = Field(default = [], description="List of components inside the container")

    
class ContainerComponent(BaseComponent):
    type: ComponentType = Field(default=ComponentType.CONTAINER, description="Type of the component")
    
class TextComponent(BaseComponent):
    type: ComponentType = Field(default=ComponentType.TEXT, description="Type of the component")
    components: tuple = Field(default_factory=tuple, description="TextComponent cannot contain other components")