import sys
import os
path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
print(path)
sys.path.insert(0,path )
from src.models.cv_sections import Heading,Certificate,CertificateList



for cls in [Heading, Certificate, CertificateList]:
    print(f"{cls.__name__}:")
    print(cls.model_json_schema())
    print()

