from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import cgi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

class list_all_restaurant():
    RestaurantNames = session.query(Restaurant).all()
    return
#    for RestaurantName in RestaurantNames:
#        print RestaurantName.name


class webserverHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if self.path.endswith("/hello"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                output = ""
                output += "<html><body>"
                output += "Hello!"
                RestaurantNames = list_all_restaurant()
                for RestaurantName in RestaurantNames:
                    output += RestaurantName
#                output += "<form method = 'POST' enctype = 'multipart/form-data' action='/hello'><h2>What would you like me to say?</h2><input name = 'message' type = 'text' ><input type = 'submit' value = 'Submit'> </form>"  # noqa
                output += "</body></html>"
                self.wfile.write(output)
                print (output)
                return


            if self.path.endswith("/hola"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                output = ""
                output += "<html><body>"
                output += "&#161Hola <a href = '/hello' >Back to Hello</a>"
                output += "<form method = 'POST' enctype = 'multipart/form-data' action='/hello'><h2>What would you like me to say?</h2><input name = 'message' type = 'text' ><input type = 'submit' value = 'Submit'> </form>"  # noqa
                output += "</body></html>"  # noqa
                self.wfile.write(output)
                print (output)
                return
        except IOError:
            self.send_error(404, "File Not Found %s" % self.path)


    def do_POST(self):
        try:
            self.send_response(301)
            self.end_headers()
            ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))  # noqa
            if ctype == 'multipart/form-data':
                fields = cgi.parse_multipart(self.rfile, pdict)
                messagecontent = fields.get('message')

                output = ""
                output += "<html><body>"
                output += " <h2> Okay, how about this: </h2>"
                output += "<h1> %s </h1>" % messagecontent[0]

                output += "<form method = 'POST' enctype = 'multipart/form-data' action='/hello'><h2>What would you like me to say?</h2><input name = 'message' type = 'text' ><input type = 'submit' value = 'Submit'> </form>"  # noqa
                output += "</body></html>"
                self.wfile.write(output)
                print output

        except Exception as e:
            pass

def main():
    try:
        port = 8080
        server = HTTPServer(('', port), webserverHandler)
        print ("Web server running on port %s" % port)
        print (list_all_restaurant())
        server.serve_forever()

    except KeyboardInterrupt:
        print ("^C entered stopping web server")
        server.socket.close()

if __name__ == '__main__':
    main()
