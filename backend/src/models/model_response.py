from pydantic import BaseModel, Field

from src.models.components import BaseComponent


class GoogleModelCvResponse(BaseModel):
    success: bool = Field(..., description="Indicates if the operation was successful")
    message: str = Field(..., description="Message providing additional information about the operation")
    components: list[BaseComponent] = Field(default=[], description="List of components extracted from the CV") 
    