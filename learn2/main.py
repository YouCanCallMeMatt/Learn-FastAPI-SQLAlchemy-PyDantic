from fastapi import FastAPI, HTTPException
from enum import Enum

app = FastAPI()

class GenreURLChoices(Enum):
    ROCK = 'rock'
    ELECTRONIC = 'electronic'
    METAL = 'metal'
    HIP_HOP = 'hip-hop'

BANDS = [
    {'id': 1, 'name': 'The Kinks', 'genre': 'Rock'},
    {'id': 2, 'name': 'Aphex Twin', 'genre': 'Electronic'},
    {'id': 3, 'name': 'Slowdive', 'genre': 'Metal'},
    {'id': 4, 'name': 'Wu-Tang Clan', 'genre': 'Hip-Hop'},
]


@app.get('/')
async def index() -> dict[str, str]:
    return {'message': 'Hello, FastAPI!'}

@app.get('/about')
async def about() -> str:
    return 'An Amazing Company'

@app.get('/bands')
async def bands() -> list[dict]:
    return BANDS

@app.get('/bands/{band_id}')
# @app.get('/bands/{band_id}', status_code=206)
async def band(band_id: int ) -> dict:
    band = next((b for b in BANDS if b['id'] == band_id), None)
    
    if band is None:
        # status code 404
        raise HTTPException(status_code=404, detail="Band not found")
        
    return band

@app.get('/bands/genre/{genre}')
async def band_for_genre(genre: GenreURLChoices) -> list[dict]:
    return [
        b for b in BANDS if b['genre'].lower() == genre.value
    ]