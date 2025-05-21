from traceback import print_exception

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from src.dtos.responses.error import ErrorResponse


class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as e:
            print_exception(e)
            response = ErrorResponse(
                code=500,
                message="Internal Server Error",
                details="An unexpected error occurred.",
            )
            response.set_errors(
                {"stack_trace": e.__traceback__.tb_frame, 'error': [e.__class__.__name__]})
            # return JSONResponse(content=response)
            return response
