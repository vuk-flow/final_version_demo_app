# Base Python image
FROM python:3.11

# Set working directory inside the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
# RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

# Copy the rest of the code (your FastAPI app)
COPY app ./app

# Expose the port Uvicorn will run on
EXPOSE 5555

# Run the FastAPI app using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5555", "--reload"]
