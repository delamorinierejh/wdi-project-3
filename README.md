# SWISHList

![alt text](http://imgur.com/yru3arx.png "Homepage")

##Overview
SWISHList was a General Assembly group project inspired by the recent trend towards sharing economy applications. Users can upload unwanted items of clothing, and set up trades with other users (‘swishing’). 

The site can be viewed here: [https://swishlists.herokuapp.com](https://swishlists.herokuapp.com)

##The Build
The app used JWT authentication and was built using the MEAN stack, with Bootstrap v4 as a CSS framework to make the site mobile responsive. My role in our team of 4 predominantly saw me working on the Backend, making the project TDD by writing Mocha tests for users, authentications, clothing items and transactions. I also focussed on building out the complex Mongoose validation logic for updating the status/availability of the resources on given events (e.g. the initiation and completion of transactions). On the Frontend, I was involved in the design/UX of the site and developed several features including filters.

##How it works

![alt text](http://imgur.com/bfyh024.png "How a Swish Works")

Users can upload items of clothing and browse items that other users have submitted. If they come across an item which they like (Item A), they can ‘swish’ the item, which invites the owner of said item to look through the user’s ‘wardrobe’ (uploaded items of clothing) to find an item for which they are happy to trade (Item B). The final step sees the user either accepting the offer to trade Item A for Item B or the reject it. Participants in a successful swish are given each other’s contact details to arrange the trade.

##Main pages of the site

**Browse clothes:** Users can see all the items that have been uploaded to the site and use filters to search for specific types of clothing. If a user clicks through to an item that they own, they can edit or delete the item. If they click on an item which belongs to another user, they can click the ‘Swish’ button to get the trade process started.

![alt text](http://imgur.com/aHFnEHo.png "Browse Clothes")

**Add an item:** The page for adding a new item of clothing.



**Wardrobe:** The page where the user can see only the items that they themselves have uploaded.

![alt text](http://imgur.com/cWbeKMK.png "Wardorbe (Mobile)")

**Incoming Swishes:**  The transaction ‘inbox’ page where users can see trades that have been initiated by other users. From here, the user can browse the ‘wardrobe’ belonging to other users who want to swish to see if they own any items for which they are happy to do the trade.

![alt text](http://imgur.com/Wa049Ua.png "Incoming Swishes")

**Outgoing Swishes:** The transaction outbox page where users can see trades that they have initiated. This is also the page where a user can review the final terms of a trade (i.e. you want this item, I want that item) and either confirm or reject it.

![alt text](http://imgur.com/WQbalUw.png "Outgoing Swishes")

**Archive:** The page where completed swishes are stored and from where the users involved in a trade can access each other’s contact details for arranging the swap.

![alt text](http://imgur.com/Lhqj8tq.png "Archive")
