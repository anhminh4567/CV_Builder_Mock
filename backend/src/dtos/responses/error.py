
from typing import Annotated, Any
from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    code: Annotated[int, Field(
        ge=400, le=599, description="HTTP error status code between 400 and 599")]
    message: str
    details: str | None = None  # Optional field for additional error details
    errors: dict[str, list[Any]] | None = None

    def __init__(self, code, message, details=None):
        super().__init__(code=code, message=message, details=details)
        self.code = code
        self.message = message
        self.details = details

    def set_errors(self, errors: dict[str, list[str]]):
        self.errors = errors
