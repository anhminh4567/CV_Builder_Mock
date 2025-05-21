
import base64
import datetime
from io import UnsupportedOperation
import io
import os
from pathlib import Path
from typing import Awaitable, List
import aiofiles
from aiofiles.threadpool.binary import AsyncBufferedReader
from fastapi import UploadFile
from langchain_core.documents.base import Document
from PIL import Image
import fitz
from langchain_community.document_loaders import JSONLoader, PyPDFLoader, TextLoader, UnstructuredExcelLoader, UnstructuredWordDocumentLoader
from langchain_core.document_loaders import BaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.environment import STORAGE_PATH

TOKEN_SIZE = 2048
BUFFER_WRITE_SIZE = 1024
SUPPORTED_LOADERS: dict[str, BaseLoader] = {
    ".pdf": PyPDFLoader,
    ".txt": TextLoader,
    ".md": TextLoader,  # Example: treat Markdown files as text
    ".docx": UnstructuredWordDocumentLoader,
    ".xlsx": UnstructuredExcelLoader,
    ".csv": UnstructuredExcelLoader,
    ".json": JSONLoader,
}

def _check_if_file_exists(absolute_file_path: str) -> None:
    if not os.path.exists(absolute_file_path):
        raise FileNotFoundError(f"PDF file not found at {absolute_file_path}")
    _, file_extension = os.path.splitext(absolute_file_path)
    file_extension = file_extension.lower()
    # loader = UnstructuredPDFLoader(pdf_path) # Alternative
    loader_class = SUPPORTED_LOADERS.get(file_extension)
    if loader_class is None:
        supported_extensions = ", ".join(SUPPORTED_LOADERS.keys())
        raise UnsupportedOperation(
            f"Unsupported file type: {file_extension}. Supported types are: {supported_extensions}"
        )
def load_documents(absolute_file_path: str):
    """Loads documents from the specified data path."""
    _check_if_file_exists(absolute_file_path) 
    _, file_extension = os.path.splitext(absolute_file_path)
    file_extension = file_extension.lower()
    loader_class = SUPPORTED_LOADERS.get(file_extension)
    loader: BaseLoader = loader_class(absolute_file_path)
    documents: List[Document] = loader.load()
    return documents

def _load_documents_keep_format(absolute_file_path: str) -> List[fitz.Page]:
    """Loads documents from the specified data path and keeps the format."""
    _check_if_file_exists(absolute_file_path)
    pdf_document = fitz.open(absolute_file_path)
    return [pdf_document.load_page(i) for i in range(pdf_document.page_count)]
    # pix = page.get_pixmap()
    # img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

def split_documents(documents):
    """Splits documents into smaller chunks."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=TOKEN_SIZE,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    all_splits = text_splitter.split_documents(documents)
    print(f"Split into {len(all_splits)} chunks")
    return all_splits

def pdf_page_to_base64(absolute_file_path: str) -> list[str]:
    _check_if_file_exists(absolute_file_path)
    # pdf_document = fitz.open(absolute_file_path)
    # page: fitz.Page = pdf_document.load_page(page_number - 1)
    pages = _load_documents_keep_format(absolute_file_path)
    pix_map_pages = [page.get_pixmap() for page in pages]
    imgs = [ Image.frombytes("RGB", [pix.width, pix.height], pix.samples) for pix in pix_map_pages] 
    # img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    base64_list = []
    for img in imgs:
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        base64_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        base64_list.append(base64_str)
    return base64_list

def delete_file(file_name: str) -> bool:
    file_path = os.path.join(STORAGE_PATH, file_name)
    if os.path.exists(file_path):
        os.remove(file_path)
        return True
    return False

async def save_file( file: UploadFile) -> Awaitable[str]:
    save_path = STORAGE_PATH
    file_name = Path(file.filename).stem
    file_extension = Path(file.filename).suffix
    date_time_now = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    final_name = f"{file_name}_{date_time_now}{file_extension}"
    async with aiofiles.open(os.path.join(save_path, final_name), 'wb') as out_file:
        while content := await file.read(BUFFER_WRITE_SIZE):
            await out_file.write(content)
    return final_name
def get_file_full_path( file_name):
    file_path = os.path.join(STORAGE_PATH, file_name)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return file_path
    raise FileNotFoundError(
        f"File {file_name} not found in {STORAGE_PATH}")