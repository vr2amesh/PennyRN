#!/usr/bin/env python

#-----------------------------------------------------------------------
# penny.py
# Author: Vinay Ramesh
# Description: This file is really only necessary to access the 
# database.
#-----------------------------------------------------------------------

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

# Which database to fetch from:
basedir = os.path.abspath(os.path.dirname(__file__))


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'penny.sqlite')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

#######################################################################################

class Books(db.Model):
	book_id = db.Column(db.Integer, primary_key = True)
	author = db.Column(db.Unicode, unique = False)
	title = db.Column(db.Unicode, unique = False)
	price = db.Column(db.Float, unique = False)

	def __init__(self, author, title, price):
		self.author = author
		self.title = title
		self.price = price

class BookSchema(ma.Schema):
	class Meta:
		fields = ('author', 'title', 'price')

book_schema = BookSchema()
books_schema = BookSchema(many = True)

#######################################################################################
## RESTAPI endpoint. This app only needs a singular endpoint.
#######################################################################################

# Endoint to retrieve the books based on the query
@app.route("/penny/getAuthors", methods = ["POST"])
def handleQuery():
	query_string = request.json['query_string']
	query = "%" + str(query_string) + "%"

	books = Books.query.filter(Books.author.like(query))

	return books_schema.jsonify(books)

##############################################################################################################################################################################

# Endpoint to create a new book (unaccessable to Penny app)
@app.route("/penny/addAuthor", methods = ["POST"])
def newBook():
	author = request.json['author']
	title = request.json['title']
	price = request.json['price']

	new_book = Books(author, title, price)

	db.session.add(new_book)
	db.session.commit()

	return book_schema.jsonify(new_book)

##############################################################################################################################################################################

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')






