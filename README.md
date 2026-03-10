# FinSight
**FinSight** es un Gestor Inteligente de Gastos Personales basado en Modelos de Lenguaje Grande (LLM). Permite analizar el historial de gastos cargado por el usuario en formato Excel, procesar los datos estadísticamente y generar interpretaciones comprensibles que ayuden a entender el comportamiento financiero.

---

## Características

- Carga de archivos Excel con historial de gastos.
- Procesamiento estadístico de los datos.
- Generación de interpretaciones y resúmenes financieros automáticos usando LLM.
- Interfaz web para visualizar reportes y recomendaciones.

---

## Tecnologías

- Backend: FastAPI
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Contenedores: Docker + Docker Compose
- Modelos de lenguaje: Gemini

---

## Requisitos

- Docker >= 24.x
- Docker Compose >= 2.x

---

## Instalación y Ejecución

1. Clona el repositorio:
```
git clone https://github.com/tu_usuario/Taller1-ProyectoIntegradorII.git
cd Taller1-ProyectoIntegradorII
```
2. Configurar el archivo .env de acuerdo al archivo .env.example

3. Construye y levanta los contenedores con Docker Compose:
```
docker-compose up --build
```
Esto iniciará tres servicios principales:
- backend: API de FastAPI
- frontend: Aplicación React
- db: Base de datos PostgreSQL

Para ver los contenedores levantados puedes usar el comando 
```
docker ps
```
<img width="1312" height="74" alt="image" src="https://github.com/user-attachments/assets/41a5db5c-3b7c-4ec8-b497-73c0791491e4" />

4. Accede a la aplicación:

* Frontend: http://localhost:80
* API: http://localhost:8000/docs

---

## Uso

1. Sube tu archivo Excel con los gastos personales desde la interfaz web.
2. Espera a que el backend procese los datos.
3. Visualiza los reportes, análisis estadísticos y recomendaciones generadas por el LLM.

---

## Estructura del Proyecto
```
├─ backend/         # Código de FastAPI
├─ frontend/        # Código de React + Vite
├─ db/              # Scripts de inicialización de PostgreSQL
├─ docker-compose.yml
└─ README.md
```





