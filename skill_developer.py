import random

# Define a list of interview questions
questions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why do you want to work for us?",
    "What are your salary expectations?",
    "What do you know about our company?",
    "How do you handle stress?",
    "Tell me about a time when you overcame a challenge.",
    "What are your long-term career goals?",
    "Do you have any questions for us?"
]

# Define a function to randomly select a question from the list
def get_question():
    return random.choice(questions)

# Define a function to prompt the user to answer a question
def answer_question(question):
    print(question)
    answer = input("Your answer: ")
    print()

    # Print a response based on the length of the answer
    if len(answer) == 0:
        print("You didn't provide an answer.")
    elif len(answer) < 10:
        print("Your answer is too short.")
    elif len(answer) > 100:
        print("Your answer is too long.")
    else:
        print("Your answer is just right.")

# Prompt the user to answer 5 random questions
for i in range(5):
    question = get_question()
    answer_question(question)
