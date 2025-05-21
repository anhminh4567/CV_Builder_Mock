from typing import  Annotated, Any,  AsyncIterator
from fastapi import APIRouter, File, UploadFile
from langchain_core.runnables import RunnableSerializable

from src.services.cv_agent import cv_analizer_agent
from src.configuration import ACCEPTABLE_UPLOADED_FILE
from src.services.file_service import get_file_full_path, pdf_page_to_base64, save_file

router = APIRouter(prefix="/api/cv-scan", tags=["cv scan"])


@router.post("")
async def read_cv_return_json(file: Annotated[UploadFile, File(description="A PDF file,txt,msword, excel")]):
    if file.content_type not in ACCEPTABLE_UPLOADED_FILE:
        raise ValueError(
            f"Unsupported file type: {file.content_type}. Supported types are: {', '.join(ACCEPTABLE_UPLOADED_FILE)}"
        )
    # file_path = "CV-Staging-ENG (1)_20250513210404.pdf"
    # file_path = LocalFileStorage().get_file_full_path(file_path)
    save_temp_file_name = await save_file(file)
    save_temp_file_path = get_file_full_path(save_temp_file_name)
    base64_images = pdf_page_to_base64(save_temp_file_path)
    rag_chain: RunnableSerializable[Any, str] = cv_analizer_agent(base64_images)
    # res = rag_chain.stream(questions)
    # response_cache = []
    # async def streamreturn() -> AsyncIterator[str]:
    #     yield "event: start\ndata: [START]\n\n"
    #     async for chunk in rag_chain.astream("anything"):
    #         response_cache.append(chunk)
    #         yield f"data: {chunk}\n\n"
    #     yield "event: end\ndata: [DONE]\n\n"
    #     full_response = "".join(response_cache)
    #     print(full_response)
    response = rag_chain.invoke({})
    return response
    # return StreamingResponse(streamreturn(), media_type="text/event-stream")