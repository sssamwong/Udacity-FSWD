#!/usr/bin/python3

import psycopg2

dbname = "news"

def connect(database_name):
    # Connect to the PostgreSQL database. Returns a databse connection.query
    try:
        db = psycopg2.connect(database=database_name)
        c = db.cursor()
        return db, c
    except psycopg2.Error as e:
        print ('Unable to connect to database')
        raise e

class get_query_results(object):
    # Parent class to get the query results
    def __init__(self, query):
        self.query = query
        db, c = connect(dbname)
        c.execute(self.query)
        self.rows = c.fetchall()
        db.close()

class poparticles(get_query_results):
    # Return the all time most popular articles
    def __init__(self, query):
        # Initialize attributes of the parent class
        super().__init__(query)
        # Print the results of the child class
        for (title, count) in self.rows:
            print(" {} - {} views".format(title, count))

class popauthors(get_query_results):
    # Return the all time most popular authors
    def __init__(self, query):
        # Initialize attributes of the parent class
        super().__init__(query)
        # Print the results of the child class
        for (name, count) in self.rows:
            print(" {} - {} views".format(name, count))

class requesterror(get_query_results):
    # Return on which days did more than 1% of requests lead to errors
    def __init__(self, query):
        # Initialize attributes of the parent class
        super().__init__(query)
        # Print the results of the child class
        for (formattedate, errorrate) in self.rows:
            print("{} - {:.2}% errors".format(formattedate, errorrate))
#        for row in self.rows:
#            print (str(row[0]), ' - ', str(round(row[1], 1)), '% errors')
