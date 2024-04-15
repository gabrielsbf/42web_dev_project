import requests

response = requests.get("http://localhost:3333/summarization")

print(response.json())


