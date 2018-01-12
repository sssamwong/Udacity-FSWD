from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Base, Catalog, Investment, User

engine = create_engine('sqlite:///itemcatalog.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()


# Create dummy user
User1 = User(name="Warren Buffett", email="wb@gmail.com",
             picture='https://pbs.twimg.com/profile_images/2671170543/18debd694829ed78203a5a36dd364160_400x400.png')

session.add(User1)
session.commit()

# Menu for UrbanBurger
catalog1 = Catalog(user_id=1, name="Stocks")

session.add(catalog1)
session.commit()

# description from wikipedia

investment1 = Investment(user_id=1, name="Alibaba Group Holding Ltd", description="A Chinese multinational e-commerce, retail, Internet and technology conglomerate founded in 1999 that provides consumer-to-consumer, business-to-consumer and business-to-business sales services via web portals, as well as electronic payment services, shopping search engines and data-centric cloud computing services. It also owns and operates a diverse array of businesses around the world in numerous sectors.", price="$189", catalog=catalog1)

session.add(investment1)
session.commit()

print "added menu items!"

