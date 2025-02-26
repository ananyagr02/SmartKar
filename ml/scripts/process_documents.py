import os
from ocr_utils import extract_text

def process_documents(documents):
    """Processes multiple documents and extracts text."""
    extracted_data = {}

    for doc_type, file_paths in documents.items():
        extracted_data[doc_type] = []
        
        if isinstance(file_paths, list):  # For multiple files
            for path in file_paths:
                extracted_data[doc_type].append(extract_text(path))
        else:  # Single file
            extracted_data[doc_type] = extract_text(file_paths)
    
    return extracted_data

# Example Usage
if __name__ == "__main__":
    # Simulating received files from the backend
    uploaded_docs = {
        "form16": "uploads/form16.pdf",
        "form26AS": "uploads/form26AS.pdf",
        "salarySlips": ["uploads/salary1.png", "uploads/salary2.jpg"],
        "investmentProofs": ["uploads/invest1.pdf", "uploads/invest2.png"],
        "loanDocuments": ["uploads/loan1.pdf"]
    }

    results = process_documents(uploaded_docs)

    for doc, content in results.items():
        print(f"\n--- {doc.upper()} ---\n{content}\n")
