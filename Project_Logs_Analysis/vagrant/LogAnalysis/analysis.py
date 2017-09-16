#!/usr/bin/python3

import psycopg2
from analysismethod import poparticles, popauthors, requesterror

if __name__ == '__main__':
    # setting the queries below
    pop_articles_query = "select articles.title, count (*) as views from articles, log where right(path, length(path)-9)=slug group by articles.title order by views desc limit 3"  # noqa
    pop_authors_query = "select authors.name, count (*) as views from articles, authors, log where (right(path, length(path)-9)=slug) and (articles.author=authors.id) group by authors.name order by views desc;"  # noqa
    request_error_query = "select formatteddate, errorrate from (select TO_CHAR(time, 'dd/Mon/yyyy') as formatteddate, 100.0 * count (*) filter (where status = '404 NOT FOUND') / count(*) as errorrate from log group by formatteddate) as ratecal where errorrate > 1;"  # noqa
    # Printing out the questions and analysis
    print('1. What are the most popular three articles of all time?')
    print('\n''2. Who are the most popular article authors of all time?')
    popauthors(pop_authors_query)
    print('\n''3. On which days did more than 1% of requests lead to errors? ')
    requesterror(request_error_query)
