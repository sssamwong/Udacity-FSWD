# Investment catalog beta 1.00

This is a website written in python code running on a virtual machine and terminal/command line to an investment catalog with function to add, modify and delete catagories and investments, if authorized and authenicated.

## Software requirement

Code was written in python 2, SQLAlchemy Google Oauth 2.0 for login. While the code is run in the virtual machine and terminal/command line, the below will be required:

  1. Python 2
  2. SQLAlchemy
  3. A Google account
  4. Virtual Machine (Vagrant and VirtualBox)
  5. Terminal or command line

### How to Use

The code should be run from the terminal and command line following the below steps:

  *    Download from the below github directory

  Github [here](https://github.com/sssamwong/Udacity-FSWD/tree/master/Project_Item_Catalog_App/vagrant)

  *  Open Terminal or command line
  *  cd to the directory of the download
  *  Connect to the virtual machine by typing 'vagrant up' and 'vagrant ssh' in the terminal or command line
  *  cd /vagrant
  *  Run the project.py by entering - 'python project.py'
  *  Open Chrome or other browers
  *  Go to http://localhost:8000/
  *  Start to explore

#### JSON API Endpoint

API could be access through below:

  *  http://localhost:8000/json/catalog
  *  http://localhost:8000/json/catalog/<id of the category>

#### Contribution

Any suggestion or recommendation please send an email to siuswong6@gmail.com

#### Credit to investopedia and wikipedia for the initial descriptions