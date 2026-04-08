from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

app = FastAPI()

class BookRecommendation(BaseModel):
    id: int
    title: str
    author: str

@app.get("/recommendations", response_model=List[BookRecommendation])
async def get_recommendations():
    return [
        {"id": 101, "title": "The AI Revolution", "author": "Future Author"},
        {"id": 102, "title": "Neural Networks for Beginners", "author": "Data Scientist"},
        {"id": 103, "title": "Robotic Dreams", "author": "Isaac Asimov"}
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
