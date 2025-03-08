usernames = ["adam", "joe", "ted", "fred"]
passwords = ["adam", "joe", "ted", "fred"]


def sign_up():
   while True:
       username = str(input("Enter a username: "))
       if username in usernames:
           print("Name is taken, try again")
       else: 
           usernames.append(username)
           break
   
   password = str(input("Enter a password: "))
   passwords.append(password)
   start()
   
def login():
    while True:
        username = str(input("Enter your username: "))
        if username in usernames:
            key = usernames.index(username)
            break
        else:
            print("Username not found")
    
    while True:
        password = str(input("Enter your password: "))    
        if password == passwords[key]:
            home()
            break
        else:
            print("Incorrect, try again.")

def start():
    while True:
        try:
            question = int(input("What do you want to do? \n 1: Register \n 2: Login \n 3: Exit \n")) 
            if question == 1:
                sign_up()
            if question == 2:
                login()
            if question == 3:
                break
        except ValueError:
            print("Try again.")
      
def home():
    print("Welcome!")



