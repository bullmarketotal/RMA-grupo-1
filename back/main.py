from typing import Union
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from fastapi import FastAPI

# importamos los routers desde nuestros modulos
#from router import router

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# asociamos los routers a nuestra app
#app.include_router(router)
