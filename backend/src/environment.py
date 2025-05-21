import os
from pathlib import Path
from dotenv import load_dotenv


load_dotenv()
DB_CONNECTION_STRING = os.getenv("DB_CONNECTION_STRING")
STORAGE_PATH = os.path.join(
    Path(__file__).resolve().parent.parent, "file_storage")

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT", "")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "")
PINECONE_INDEX_DIMENSION = int(os.getenv("PINECONE_INDEX_DIMENSION", "0"))
PINECONE_INDEX_METRIC = os.getenv("PINECONE_INDEX_METRIC", "")
PINECONE_HOST = os.getenv("PINECONE_HOST", "")
PINECONE_EMBEDDINGS_MODEL = os.getenv("PINECONE_EMBEDDINGS_MODEL", "")
HUGGINGFACE_EMBEDDINGS_MODEL = "F:\\HUGGING-FACE-MODEL\\text-embedding\\nomic-embed-text-v1"
HUGGINGFACE_EMBEDDINGS_TOKEN = os.getenv("HUGGINGFACE_EMBEDDINGS_TOKEN", None)
CHAT_MODEL_NAME = os.getenv("CHAT_MODEL_NAME", None)
CHAT_CONTEXT_WINDOW = int(os.getenv("CHAT_CONTEXT_WINDOW", "4096"))
CHAT_MODEL_THRESHOLD = float(os.getenv("CHAT_MODEL_THRESHOLD", "0"))
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", None)

def load_environment_variables():
    print("Loading environment variables...")
