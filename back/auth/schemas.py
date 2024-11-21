from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class TokenData(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class OAuth2PasswordRequestForm(BaseModel):
    username: str
    password: str


class TokenRefresh(BaseModel):
    refresh_token: str
