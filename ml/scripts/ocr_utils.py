import pytesseract
import fitz  # PyMuPDF
import pandas as pd
import json
import cv2
import numpy as np
from pdf2image import convert_from_path
from PIL import Image
import os

# Set Tesseract path (Modify based on installation)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def preprocess_image(image_path):
    """Preprocess image for better OCR accuracy."""
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_LINEAR)
    image = cv2.GaussianBlur(image, (5,5), 0)
    _, image = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return image

def extract_text_from_image(image_path):
    """Extract text from image files using Tesseract OCR."""
    preprocessed_image = preprocess_image(image_path)
    text = pytesseract.image_to_string(preprocessed_image)
    return text.strip()

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF using PyMuPDF (fitz)."""
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text("text") + "\n"
    
    # If text is empty, try OCR on PDF images
    if not text.strip():
        images = convert_from_path(pdf_path)
        for img in images:
            text += pytesseract.image_to_string(img) + "\n"
    return text.strip()

def extract_text_from_csv(csv_path):
    """Extract text from CSV files."""
    df = pd.read_csv(csv_path)
    return df.to_string(index=False)

def extract_text_from_json(json_path):
    """Extract text from JSON files."""
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return json.dumps(data, indent=4)

def extract_text(file_path):
    """Determine file type and extract text accordingly."""
    ext = os.path.splitext(file_path)[1].lower()

    if ext in [".png", ".jpg", ".jpeg"]:
        return extract_text_from_image(file_path)
    elif ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".csv":
        return extract_text_from_csv(file_path)
    elif ext == ".json":
        return extract_text_from_json(file_path)
    else:
        return "Unsupported file format"
