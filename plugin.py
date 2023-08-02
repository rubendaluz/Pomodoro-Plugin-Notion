import openai

# Set your API key here
api_key = "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"

# Initialize the OpenAI API client
openai.api_key = api_key

# Your prompt - specify the task you want the model to perform
prompt = "Translate the following English text to French: 'Hello, how are you?'"

# Call the API to get the model's response
response = openai.Completion.create(
    engine="text-davinci-002",  # GPT-3.5 engine
    prompt=prompt,
    max_tokens=100,  # Adjust the max tokens for desired response length
)

# Extract and print the generated response
print(response["choices"][0]["text"])
