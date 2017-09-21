from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import cgi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()
restaurant_list = session.query(Restaurant).all()

class rename_restaurant(object):
    def __init__(self, newName, id_number):
        self.newName = newName
        self.id_number = id_number
        targeted_restaurant = session.query(Restaurant).filter_by(id = self.id_number).one()  # noqa
        print targeted_restaurant.name
        targeted_restaurant.name = self.newName[0]
        session.add(targeted_restaurant)
        session.commit()

class add_restaurant(object):
    def __init__(self, new_restaurant_name):
        self.new_restaurant_name = new_restaurant_name
        newRestaurant = Restaurant(name=self.new_restaurant_name[0])
        session.add(newRestaurant)
        session.commit()

class webserverHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if self.path.endswith("/restaurants"):
                RestaurantNames = session.query(Restaurant).all()
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                output = ""
                output += "<html><body>"
                output += "<a href = '/restaurants/new'>Make a New Restaurant Here</a><br><br>"   # noqa
                for RestaurantName in RestaurantNames:
                    output += RestaurantName.name
                    id_number = RestaurantName.id
                    output += "<br>"
                    output += "<a href = '/restaurants/%s/edit'>Edit</a><br>" % id_number  # noqa
                    output += "<a href = '/restaurants/%s/edit'>Delete</a><br>" %id_number  # noqa
                    output += "<br><br>"
                output += "</body></html>"
                self.wfile.write(output)
                print (output)
                return

            if self.path.endswith("/restaurants/new"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                output = ""
                output += "<html><body>"
                output += "<h1> Make a New Restaurant</h1>"
                output += "<form method = 'POST' enctype = 'multipart/form-data' action='/restaurants/new'>"  # noqa
                output += "<input name = 'newRestaurantName' type = 'text' placeholder = 'New Restaurant Name'>"  # noqa
                output += "<input type = 'submit' value='Create'>"
                output += "</body></html>"
                self.wfile.write(output)
                print (output)
                return

            for RestaurantName in restaurant_list:
                id_number = RestaurantName.id
                if self.path.endswith("/restaurants/%s/edit" % id_number):
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html')
                    self.end_headers()
                    output = ""
                    output += "<html><body>"
                    output += "<h1> %s </h1>" % RestaurantName.name
                    output += "<form method = 'POST' enctype = 'multipart/form-data' action='/restaurants/%s/edit'>" % id_number  # noqa
                    output += "<input name = 'renameRestaurantName' type = 'text' placeholder = '%s'>" % RestaurantName.name  # noqa
                    output += "<input type = 'submit' value='Rename'>"
                    output += "</body></html>"
                    self.wfile.write(output)
                    print (output)
                    return

            if self.path.endswith("/hello"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                output = ""
                output += "<html><body>"
                output += "Hello!"
                output += "<form method = 'POST' enctype = 'multipart/form-data' action='/hello'><h2>What would you like me to say?</h2><input name = 'message' type = 'text' ><input type = 'submit' value = 'Submit'> </form>"  # noqa
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
            if self.path.endswith("/restaurants/new"):
                ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))  # noqa
                if ctype == 'multipart/form-data':
                    fields = cgi.parse_multipart(self.rfile, pdict)
                messagecontent = fields.get('newRestaurantName')
                print messagecontent
                # Adding the new restaurant name
                add_restaurant(messagecontent)

                self.send_response(301)
                self.send_header('Content-type', 'text/html')
                self.send_header('Location', '/restaurants')
                self.end_headers()
                return

            for RestaurantName in restaurant_list:
                id_number = RestaurantName.id
                if self.path.endswith("/restaurants/%s/edit" % id_number):
                    ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))  # noqa
                    if ctype == 'multipart/form-data':
                        fields = cgi.parse_multipart(self.rfile, pdict)
                    newName = fields.get('renameRestaurantName')

                    # Adding the new restaurant name
                    rename_restaurant(newName, id_number)

                    self.send_response(301)
                    self.send_header('Content-type', 'text/html')
                    self.send_header('Location', '/restaurants')
                    self.end_headers()
                    return

#            self.send_response(301)
#            self.end_headers()
#            ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))  # noqa
#            if ctype == 'multipart/form-data':
#                fields = cgi.parse_multipart(self.rfile, pdict)
#                messagecontent = fields.get('message')
#                output = ""
#                output += "<html><body>"
#                output += " <h2> Okay, how about this: </h2>"
#                output += "<h1> %s </h1>" % messagecontent[0]
#                output += "<form method = 'POST' enctype = 'multipart/form-data' action='/hello'><h2>What would you like me to say?</h2><input name = 'message' type = 'text' ><input type = 'submit' value = 'Submit'> </form>"  # noqa
#                output += "</body></html>"
#                self.wfile.write(output)
#                print output

        except Exception as e:
            pass

def main():
    try:
        port = 8080
        server = HTTPServer(('', port), webserverHandler)
        print ("Web server running on port %s" % port)
        server.serve_forever()

    except KeyboardInterrupt:
        print ("^C entered stopping web server")
        server.socket.close()

if __name__ == '__main__':
    main()
