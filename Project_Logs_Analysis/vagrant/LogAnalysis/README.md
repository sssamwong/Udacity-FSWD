# Log Analysis

This is a python code running on a virtual machine and terminal/command line to show some simple log analysis of the database, which contains data about a newspaper sit.

## Software requirement

Code was written in python 3 and postgreSQL, while the log analysis is shown in the virtual machine and terminal/command line. Hence, the below will be required to run the log analysis:

  1. Python 3
  2. Postgre SQL
  3. Virtual Machine (Vagrant and VirtualBox)
  4. Terminal or command line

### How to Use

The code should be run from the terminal and command line following the below steps:

  *    Ensure the 2 python files - 'analysis.py' and 'analysismethod.py' - and the downloaded data were saved in the directory under vagrant.

  data [here](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip)

  *  Open Terminal or command line
  *  cd to the directory of the 2 python files
  *  Connect to the virtual machine by typing 'vagrant up' and 'vagrant ssh' in the terminal or command line
  *  cd /vagrant
  *  Connect to the databse by typing - 'psql -d news -f newsdata.sql'
  *  See the log analysis by typing - 'python3 analysis.py'

#### Contribution

Any further good improvement please send an email to siuswong6@gmail.com

##### Issue

Should be free of issues but do send an email to siuswong6@gmail.com if any
