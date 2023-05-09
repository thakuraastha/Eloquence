import tkinter as tk
import random

class InterviewPracticeApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Interview Practice")
        self.geometry("400x200")

        self.questions = [
            "Tell me about yourself.",
            "What are your strengths?",
            "What are your weaknesses?",
            "Why do you want to attend this college?",
            "Why do you want to work for our company?",
            "Where do you see yourself in 5 years?",
            "Why should we accept you into our program?",
            "Why should we hire you?",
            "What are your salary expectations?",
            "Describe a challenging situation you faced and how you handled it."
        ]

        self.tips = [
            "Be confident and maintain eye contact.",
            "Use the STAR method (Situation, Task, Action, Result) to answer behavioral questions.",
            "Research the college, program, company, or role you're applying for.",
            "Be prepared to discuss your accomplishments, skills, and experiences.",
            "Practice active listening and take your time to respond.",
            "Ask thoughtful questions about the college, program, company, or role.",
            "Dress professionally and appropriately for the interview.",
            "Follow up with a thank you email after the interview."
        ]

        self.question_label = tk.Label(self, text="", wraplength=350, justify="left")
        self.question_label.pack(pady=10)

        self.tip_label = tk.Label(self, text="", wraplength=350, justify="left")
        self.tip_label.pack(pady=10)

        self.generate_button = tk.Button(self, text="Generate Question & Tip", command=self.generate)
        self.generate_button.pack(pady=10)

        self.quit_button = tk.Button(self, text="Quit", command=self.quit)
        self.quit_button.pack(pady=10)

    def generate(self):
        question = random.choice(self.questions)
        tip = random.choice(self.tips)
        self.question_label.config(text=f"Question: {question}")
        self.tip_label.config(text=f"Tip: {tip}")

if __name__ == "__main__":
    app = InterviewPracticeApp()
    app.mainloop()
