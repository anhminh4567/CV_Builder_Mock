from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_google_genai import ChatGoogleGenerativeAI
from src.models.cv_sections import get_json_schema_for_all_classes
from src.environment import GOOGLE_API_KEY
from src.models.model_response import GoogleModelCvResponse

def cv_analizer_agent(base64pdf_pages: list[str] ):
    if len(base64pdf_pages) == 0:
        raise ValueError("No base64 PDF pages provided.")
    llm = ChatGoogleGenerativeAI(
      api_key=GOOGLE_API_KEY,
      model="gemini-2.0-flash",
      temperature=0.1,
      max_tokens=65536,
      timeout=30,
      max_retries=0,
      # other params...
    )
    parser = JsonOutputParser(pydantic_object=GoogleModelCvResponse)
    format_instructions = parser.get_format_instructions()
    fault_template = """
    {
        "success": false,
        "message": "I don't have enough information to answer that question from the provided context.",
        "components": []
    }"""
    system_message = SystemMessage(f"""
        You are a CV analyzer agent. Your task is to analyze the CV, 
        extract relevant information, put them into components and return them in JSON format.
        remember to extract from the image, do not just use generic like objective and child section objective item, must have data in image
        Only return the extracted data from the CV. do not make up information.
        If you are not sure if this is a CV or the image is corrupted, reply with:
        {fault_template}
        to the field message of the json schema below and mark success as false, section field will be empty list,
        otherwise mark success as true, message empty string and populate section list according to the cv scanned from the uploaded CV PDF
        Here is the relevant JSON instruction for success response:
        {format_instructions}
        Now are all the possible components you can categorize the CV into and put them in the JSON response section:
        {get_json_schema_for_all_classes()}
       
    """)
    #  Finally: the structure should be like this:
    #     - a type:container must always wrap other components, and it usually have a type:title component
    #     - a type:list_item must always be wrapped by a type:list and the type:list dont need a name or label, just to mark it as wrapper
        
    human_message = HumanMessage(content=[
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{page}"},
        }
        for page in base64pdf_pages
    ])
  
    prompt = ChatPromptTemplate.from_messages([system_message, human_message])
    rag_chain = (
        # {RunnablePassthrough()}
        RunnablePassthrough()
        # .pipe(lambda x: {"question": x})
        .pipe(prompt)
        .pipe(llm)
        .pipe(parser)
    )

    return rag_chain


def get_model_response_json(
) -> GoogleModelCvResponse:
    """Get the model response in JSON format."""
    
    
    return get_json_schema_for_all_classes()