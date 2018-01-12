from flask import Flask, render_template, request, redirect, jsonify, url_for, flash
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Catalog, Investment, User
app = Flask(__name__)

# Connect to Database and create database session
engine = create_engine('sqlite:///itemcatalog.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

# Show the catalog
@app.route('/')
@app.route('/catalog')
def showCatalog():
	catalog = session.query(Catalog).order_by(asc(Catalog.name))
#	if 'username' not in login_session:
#		return render_template('publiccatalog.html', catalog=catalog)
#	else:
	return render_template('catalog.html', catalog=catalog)

@app.route('/catalog/<int:catalog_id>/')
@app.route('/catalog/<int:catalog_id>/investment/')
def showInvestment(catalog_id):
	catalog = session.query(Catalog).filter_by(id=catalog_id).one()
	investments = session.query(Investment).filter_by(catalog_id=catalog_id).all()
	return render_template('investment.html', investments=investments, catalog=catalog)

if __name__ == '__main__':
	app.secret_key = 'super_secret_key'
	app.debug = True
	app.run(host='0.0.0.0', port = 8000)