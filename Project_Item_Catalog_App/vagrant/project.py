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

# Show login
@app.route('/catalog/login')
def showLogin():
	return render_template('login.html')

# Show logout
@app.route('/catalog/logout')
def showLogout():
	return render_template('logout.html')

# Show the catalog
@app.route('/')
@app.route('/catalog')
def showCatalog():
	catalog = session.query(Catalog).order_by(asc(Catalog.name))
	investments = session.query(Investment).order_by(Investment.createDate.desc())
	for investment in investments:
		print investment.createDate
#	if 'username' not in login_session:
#		return render_template('publiccatalog.html', catalog=catalog)
#	else:
	return render_template('catalog.html', catalog=catalog, investments=investments)

# Show the investments
@app.route('/catalog/<int:catalog_id>/')
@app.route('/catalog/<int:catalog_id>/investment/')
def showInvestments(catalog_id):
	catalog = session.query(Catalog).order_by(asc(Catalog.name))
	thisCatalog = session.query(Catalog).filter_by(id=catalog_id).one()
	investments = session.query(Investment).filter_by(catalog_id=catalog_id).all()
	return render_template('investment.html', investments=investments, catalog=catalog, thisCatalog=thisCatalog)

# Show the investment details
@app.route('/catalog/<int:catalog_id>/<int:investment_id>/')
def showInvestmentDetails(catalog_id, investment_id):
	catalog = session.query(Catalog).filter_by(id=catalog_id).one()
	investment = session.query(Investment).filter_by(id=investment_id).one()
	return render_template('investmentDetails.html', investment=investment, catalog=catalog)

# Create new catalog
@app.route('/catalog/new', methods=['GET', 'POST'])
def newCatalog():
	if request.method == 'POST':
		newCatalog = Catalog(user_id=1, name = request.form['name'])
		session.add(newCatalog)
		session.commit()
		return redirect(url_for('showCatalog'))
	else:
		return render_template('newCatalog.html')

# Create new investment
@app.route('/catalog/<int:catalog_id>/new/', methods=['GET', 'POST'])
def newInvestment(catalog_id):
	if request.method == 'POST':
		newInvestment = Investment(name=request.form['name'], description=request.form['description'], price=request.form['price'], catalog_id=catalog_id)
		session.add(newInvestment)
		session.commit()
		return redirect(url_for('showInvestments', catalog_id=catalog_id))
	else:
		return render_template('newInvestment.html', catalog_id=catalog_id)

# Edit the investment
@app.route('/catalog/<int:catalog_id>/<int:investment_id>/edit/', methods = ['GET', 'POST'])
def editInvestment(catalog_id, investment_id):
	catalog = session.query(Catalog).order_by(asc(Catalog.name))
	editedInvestment = session.query(Investment).filter_by(id = investment_id).one()
	if request.method == 'POST':
		editedInvestment.name = request.form['name']
		editedInvestment.description = request.form['description']
		editedInvestment.price = request.form['price']
		editedInvestment.catalog_id = request.form['catalog_id']
		session.add(editedInvestment)
		session.commit()
		return redirect(url_for('showInvestments', catalog_id = catalog_id))
	else:
		return render_template('editInvestment.html', catalog_id=catalog_id, investment_id=investment_id, catalog=catalog, i = editedInvestment)

# Edit the investment
@app.route('/catalog/<int:catalog_id>/<int:investment_id>/delete/', methods= ['GET', 'POST'])
def deleteInvestment(catalog_id, investment_id):
	investmentToDelete = session.query(Investment).filter_by(id = investment_id).one()
	if request.method == 'POST':
		session.delete(investmentToDelete)
		session.commit()
		return redirect(url_for('showInvestments', catalog_id = catalog_id))
	else:
		return render_template('deleteInvestment.html', i = investmentToDelete)

if __name__ == '__main__':
	app.secret_key = 'super_secret_key'
	app.debug = True
	app.run(host='0.0.0.0', port = 8000)