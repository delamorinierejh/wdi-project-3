## Properties

#### Filters
```category``` Clothing category.  Type of clothing.

```colour``` Clothing colour.

```gender``` Male, female, neutral.



#### Hero Page

#### 
Browse whats on offer

#### Variables
userLoggedIn = boolean

username
password


#### Pages
Hero page
User Profile
	Swishlist (we want)
	Wardrobe
	Swishes ()
	Offers (they want)
Browse / index
Show
Swap page



Specific user wardrobe page
ngUpload directive
s3 for storage
Multer upload s3


#### Modals
Login / register

#### Models
User
	id (primary key)
	username
	emailAddress
	phoneNumer
	passwordHash
	profilePicture
	timestamp
	clothing._id (foreign key) [array]
	swishRef._id (foreign key) [array]
	firstName
	lastName
ClothingItem
	id (primaryKey)
	category
	colour
	size
	brand / shop
	User._id (foreign key)
	description
	timestamp
	imageURL
	available: boolean
Swish
	id (primaryKey)
	timestamp
	user1._id
	user2._id
	clothingItem1._id
	clothingItem2._id = null
	status = 1
		1 = wishListed (I like your shit)
		2 = wishListedBack (do you want this shit)
		3 = completed (yes)
		4 = cancelled
	
	