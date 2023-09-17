# Hello

Run these command from backend folder to create a docker container:
docker build -t backend-image .
docker run -d -p 3001:3001 --name backend-container -e PORT=3001 backend-image
