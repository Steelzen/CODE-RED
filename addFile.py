import local_constants
from google.cloud import datastore, storage
import google.oauth2.id_token
from flask import Flask, render_template, request, redirect, url_for
from google.auth.transport import requests



app = Flask(__name__)
datastore_client = datastore.Client()
firebase_request_adapter = requests.Request()


def addFile(file):
    storage_client = storage.Client(project=local_constants.PROJECT_NAME)
    bucket = storage_client.bucket(local_constants.PROJECT_STORAGE_BUCKET)
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file)


@app.route('/add_tweet', methods=['POST'])
def addTweet():
    id_token = request.cookies.get("token")
    error_message = None
    claims = None
    user = None

    if id_token:
        try:
            claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)

            file=request.files['img']
            addFile(file)
            
            
        except ValueError as exc:
            error_message = str(exc)
    return redirect('/')







if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)