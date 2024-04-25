from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Initialize an empty list to store conversation history
conversation_history = []

# Simulated chatbot function
def chatbot(query):
    # This is a placeholder function, replace it with your actual chatbot logic
    return "Response from chatbot to: " + query

@app.route('/query/', methods=['POST'])
def execute_llm_query():
    if request.method == 'POST':
        query = request.form.get('query')
        response = chatbot(query)
        
        # Append the current interaction to the conversation history
        conversation_history.append({'user': query, 'bot': response})
        
        return jsonify({'query': query, 'response': response, 'history': conversation_history}), 200

if __name__ == '__main__':
    app.run(debug=True, port=3000)
