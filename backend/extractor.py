import sys
import pdfplumber

def extract_pdf_text(file_path):
    try:
        text_content = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages[:30]: # Limit to first 30 pages
                text = page.extract_text()
                if text:
                    text_content += text + "\n"
        return text_content
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extractor.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    print(extract_pdf_text(file_path))
