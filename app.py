from flask import Flask, request, jsonify
import smtplib, ssl
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route("/send-message", methods=["POST"])
def send_message():
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    sender_email = "info@yuktix.net"
    receiver_email = "info@yuktix.net"
    password = "fcN-%A5yFuQ#N4?"  # same password you use for login

    body = f"From: {name} <{email}>\n\n{message}"
    msg = MIMEText(body)
    msg["Subject"] = f"New Contact Message from {name}"
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.titan.email", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        return jsonify({"message": "Message sent successfully!"})
    except Exception as e:
        print("SMTP Error:", e)  # log real error
        return jsonify({"message": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
