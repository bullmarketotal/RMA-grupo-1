from passlib.context import CryptContext

# contexto de encriptación
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
