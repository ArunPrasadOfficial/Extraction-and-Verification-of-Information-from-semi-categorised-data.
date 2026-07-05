import os
import json
from unittest import result
from PIL import Image
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Read API key
api_key = os.getenv("GEMINI_API_KEY")

# Create Gemini client
client = genai.Client(api_key=api_key)


def extract_information(image_path):
    """
    Extract structured information from an uploaded document image.
    """

    image = Image.open(image_path)

    prompt = """
You are an information extraction system.

Extract all important information from the uploaded document.

Return ONLY valid JSON.

Required fields:

{
    "name":"",
    "phone":"",
    "email":"",
    "course":"",
    "address":"",
    "college":"",
    "date":"",
    "status":""
}

Rules:
1. Do not explain anything.
2. Return JSON only.
3. If a field is missing, return an empty string.
4. Do not include markdown (```json).
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image]
    )

    result = response.text.strip()

    # Remove markdown if Gemini returns it
    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    try:
        data = json.loads(result)
    except Exception:
        data = {}

    required_fields = [
        "name",
        "phone",
        "email",
        "course",
        "address",
        "college",
        "date",
        "status"
    ]

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            data[field] = "Missing"

    return data
