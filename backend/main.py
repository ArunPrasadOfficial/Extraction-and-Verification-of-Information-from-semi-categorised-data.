from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from gemini_extractor import extract_information
from verification import verify_data
from database import insert_data

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads folder if it doesn't exist
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Extraction and Verification API is Running"}


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save uploaded image
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract information using Gemini
        data = extract_information(file_path)

        # Verify extracted data
        status = verify_data(data)

        # Save to MySQL
        insert_data(data, status)

        # Return response
        return {
            "success": True,
            "status": status,
            "extracted_data": data
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
